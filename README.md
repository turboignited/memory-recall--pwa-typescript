# Memory Recall Game PWA TypeScript

# About
Memory Recall is a fun and quick game which provides random sequences of items to remember and recall.

## Architecture
The main class instantiated on page load is App. Which checks for availability of a canvas 2d context and 
orchestrates necessary functionality during the lifetime.

As a PWA the app makes use of a barebones service worker as generated by the workbox-webpack-plugin.
This projects loads all assets required by the game, providing a view and reporting on progress.
After loading assets the game can be played offline.

## Storage
The game provides a simple interface to localStorage which is used to store the users score within their browser.
It is only when the user has accepted the terms and conditions that their score should then be allowed to syncronise
with a backend, yet to come, and take part in a global leaderboard.

## Views
The views are provided by subclassing View and implementing the createUI which should return the HTML container of the view.
The subclass can implement the show, resize, hide, load, render and destroy methods. It is necessary for subclasses to call super
to provide the common implementation of View.

### Resizing
As the user is capable of resizing their window it is necessary for the App to listen to this event and inform the views.
The dimensions of the App are determined by a desired resolution and a maximum resolution (usually the window width/height).
The dimensions calculate a scale value to maintain the ratio while fitting within the min/max resolution available.


## Testing
Testing is available through Jest, with canvas mocking and TypeScript.
npm run test

## Building
Building requires webpack to bundle the index.ts file. It is only when built that the service worker will be made available.
npm run build

## Developing
Developing requires the webpack-dev-server and supports reloading upon code changes.
npm run start


# TODO List
There is always more to solidify this basic implementation of a PWA. It's strength relies on using TypeScript. The code will
never be complete as there is always different ways of doing things but it's really a template example.
