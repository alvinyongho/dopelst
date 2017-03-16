# dopelst

> Currently hosted at TODO

[![Vue.js v2.2.2](https://img.shields.io/badge/Vue.js-2.2.2-brightgreen.svg?style=flat-square)](https://vuejs.org/)


## Overview

- Frontend: HTML / CSS (Vanilla + SCSS) / JS (Vue.js + vue-router)
- Services Used: Firebase Hosting / Firebase Database
- Build Tools: Webpack


## Application Features

### Authentication

The application allows users to log in using either an app-specific login (email/password) or their google account. The auth flow is handled by Firebase.

### (C)reate

Users can create Playlists, which have playlist name, playlist description, and playlist image properties, by clicking on the "ADD PLAYLIST" text on the playlist view. Clicking the icon brings up a form that allows the user to set the properties of their new playlist.

### (R)ead

Users can see their Playlists on their home page when they are logged in (/playlist).

### (U)pdate

Users can edit all the properties of their Playlists by cicking the edit icon underneath the playlist they want to change. Clicking the icon brings up a similar flow to creating a playlist, except it updates the playlist instead of creating a new one.

### (D)elete

Users can delete their Playlists by clicking the delete icon under the playlist they want to delete.

### Asset Management

We originally planned on using Firebase Storage to store images. However, as our project development advanced into the PWA stage, we quickly realized that Firebase Storage does not have an offline mode of operation. At that stage, we had two options - to alter Firebase Storage's CORS settings (which we found could be done, but since the method is very well hidden within layers of documentation, is likely not a well supported method) or to store the images as data URLs in in Firebase Database. We ultimately went with the second option because it was more compatible with the features that we were already using (namely Firebase Database's offline features).


## Code Organization/Architecture

We organized our codebase around the features provided by Webpack and Vue. In particular, we wrote most of our application within [Vue single file components](https://vuejs.org/v2/guide/single-file-components.html). Doing this allowed us to keep the relevant HTML templates, CSS, JS in the same file. We used a slightly customized version of [Vue's suggested webpack boilerplate](https://github.com/vuejs-templates/webpack), which sped up the development cycle by allowing us to develop with hot module replacement while keeping the production build process simple and quick.

## PWA Features

### Single Page Application (SPA)

Using [vue-router](https://github.com/vuejs/vue-router) and Vue.js components, we coded our app from scratch using a SPA approach. At a high level, the implementation method was chosen with respect to the fact that the each application page is a shell (navbar + no content) combined with the content. Given this, the application pages are all rendered using [App.vue](https://github.com/alvinyongho/dopelst/blob/master/dev/src/App.vue) (which contains the navbar) as the shell and the vue-router matched view as the content. With SPA, the application does not have to unload/reload the page each time the user clicks on a link to maneuver through the application, which then provides a smoother experience for the user.

### Code Splitting

We used [webpack's code splitting feature](https://webpack.github.io/docs/code-splitting.html) to further reduce the amount of data that is initially sent to the user. To initially motivate this, we noted that when a user first visits the application, they would initially see the Index and Login components. As we were also planning on using Service Workers to conduct background loading, we noted that the Service Worker could also be used to load the routes that were not initially loaded so that they would be ready when the user finally visits those pages. In our implementation, we included the Index, Login, and Playlist (home page for logged in users) components in our main bundle. The other routes are asynchronously loaded by the Service Worker.

### Firebase Database + Firebase Authentication

We discovered that Firebase works in a functional yet limited fashion when offline without any additional configuration. In particular, we found that Firebase Database stores a local copy of the data that the client has either queried or changed. This copy is then synced with the server if it is available. Otherwise, the Firebase instance tries to do this the next time that a connection is available. In a similar fashion, Firebase Authentication also saves the login state of a user in local storage using a login token that has a 1-hour expiration time. Using these features in conjuction with a Service Worker, we are able to provide a fairly complete offline experience to a user in a 1-hour time period after the user loses online connectivity. The major shortcoming that we encountered is that the user would no longer be able to access the application after the 1-hour token expiration time. However, given that the alternative is being completely unable to access the application until they are online again, we are willing to accept this tradeoff.

### Service Worker

Our application utilizes a service worker to enable the application to be used offline subject to the constraints noted in the Firebase Database + Authentication section. The service worker follows the basic "sw-offline" service worker template. In particular, it does the following:

- "install" event - Makes a new cache (named by the current date/time ISO string for uniqueness) and adds all the assets emitted by webpack to the cache. (Precacheing)
- "activate" event - Clears out old caches and claims all clients. (Cleanup)
- "message" event - Nothing!
- "fetch" event - For same-origin GET requests, checks for the resource in the cache (it should be in the cache because of the "install" event) and returns the resource without going to the network. All other requests are ignored. (Request Interception)

### Web Manifest

Our application has a web app manifest located at /static/manifest.json. In conjunction with having a Service Worker, this allows a user to install the application onto their device, giving them a native app experience.

## Todo

## Credit