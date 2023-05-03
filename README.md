## IMPC Embryo Data

UI for accessing embryo phenotype data

## Running locally

This will require either NPM or Yarn.
In the project directory, you can run:

> `npm install` or `yarn install`

Downloads dependencies defined in the project and generates a `node_modules` folder with the installed dependencies.

> `npm start` or `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## Development approach

This application is built using [Create React App CLI in TypeScript](http://create-react-app.dev/docs/adding-typescript/). It uses [React Router v6](http://reactrouter.com/en/main/start/tutorial) to navigate the pages and [Nivo via heatmap](http://nivo.rocks/heatmap/) to visualize data.

For the components, [React Select](http://react-select.com/home) is used to easily implement a searchable multiselect dropdown. With the help of [Bootstrap 5](http://getbootstrap.com/docs/5.3/getting-started/introduction/), the custom range slider and tab navigation is implemented. Bootstrap also comes with class helpers to properly layout the pages.

For the color, some of Bootstrap's CSS variables are overridden to avoid adding SASS complexity and easily develop the application. It would be nice to add SASS later on to handle scalable theming and extensive CSS development.

A separate file is created to retrieve data. It uses async-await to handle asynchronous code and React hooks to manage it on the view side. No React middleware framework is used to reduce complexity.

It took me a day in total to finish the development with a few breaks here and there.
