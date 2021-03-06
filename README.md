# Meeting Room Booker

## Running the Project

### Prerequisites
This app was built with Node.js v.14.17.0

I recommend using `nodenv` to install the proper version if needed: [Nodenv Docs](https://github.com/nodenv/nodenv)

#### Troubleshooting
Node 14.17.0 was released in early May. If nodenv does not list it as available to install, try running

`brew update && brew upgrade node-build`

If that still doesn't work, try installing [node-build-update-defs](https://github.com/nodenv/node-build-update-defs) and running

`nodenv update-version-defs`

### Running the App
1. `yarn install`
2. `yarn start`
   * The app will run on localhost:3000

### Running the Tests
`yarn test`

## Third-Party Libraries
1. [Create React App](https://github.com/facebook/create-react-app)
   * Used for boiler-plate React setup and pre-configured build/compile tools (ie Webpack, Babel)
2. [Sweet Alert](https://sweetalert.js.org/)
   * Simple modals used for successful booking/error alerts
3. [Axios](https://github.com/axios/axios)
   * Simpler interface for fetch requests
4. [Mock Service Worker](https://mswjs.io/)
   * Used for mocking requests to APIs in testing

## Features to Improve
* Testing--I used a TDD approach, but would have liked to spend more time on some more robust test cases. As an example, I tested a room returning a number of available slots and a room returning `null` available slots, but did not actually write a test case for a room returning 0 available slots (although this case is handled by the code).
* Loading--I do have some error handling in place if the room list fails to load, but I didn't spend time adding a "loading" state, so the "No rooms available" text does appear briefly before the API request finishes. With more time I would have liked to add a loading state with some loading text or a visual indicator.
* Sweet Alerts--This was originally on my nice-to-have list, but I decided to add it because it was easier to test an unsuccessful booking if something in the UI changed, and it took about 5 minutes to install and set up. Ideally this would be a fully custom modal or possibly a different alert/toaster style, and at the very least would be styled to better match the design of the app
* Styling--I could have easily spent the entire three hours here, so there are some things I'd like to improve. I think using grid rather than flexbox could have given me a little more control over the layout to avoid things like the extra white space on the left of the page. I did some hard-coding of numbers rather than relative size/proportions in a few places, and at very narrow screen sizes, this causes the divs containing portrait images to be taller than they are wide (although the images do retain their aspect ratio and aren't stretched or distorted). Adding a styling library or a pre-processor like Less or Sass would be a likely next step for a more fully-fledged app, too.
* File Structure--For such a small app (and because create-react-app is opinionated about where to keep tests), I kept all the relevant files in the `src` directory. I generally prefer to keep tests together in a directory outside of `src` and would also normally move any styles into their own directory as well. If I were working with other developers, cleaning up the directory structure would be a necessary quality-of-life fix.

## Features to Add
* Filter/Sort--A way to filter or sort rooms by available slots or by name would be a nice addition. Ideally even sorting by available slots on initial load would be a nice way to move the unbookable rooms to the end of the list
* Disabled State--For rooms with no slots available, I only disabled the "Book!" button, but I would have liked to add some styling (like a partial opacity) to the room details and image to make it more immediately apparent that it isn't available.
* Book a Time--Of course in a real world setting, a user would want the ability to book for a specific time and see which time slots are available. If I were going to build out this app further I would have the "Book!" button open a scheduler to select a date/time, or have a user input their preferred date/time and show only rooms that have that slot available.
* Capacity--In the same vein as booking a specific time, I would like to add more data about room capacity and include that in the room details, filter/sort options, and any features for suggesting a room.
