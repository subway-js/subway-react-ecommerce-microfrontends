This project is a work in progress proof of contect for [SubwayJS](https://github.com/subway-js/subway) microfrontends with react.

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Payments microfrontend

This micro frontend implements the logic of the `shoppingCart` aggregate from the [ecommerce react website](https://github.com/subway-js/subway-react-ecommerce):

- it creates the internal command and event handlers
- it exposes the `ADD_TO_SHOPPING_CART` command, so that we can add products from the container application
- it creates and exposes the **checkout page container** and the **shopping cart dropdown menu** used in the navigation bar

The main difference with the [ecommerce react](https://github.com/subway-js/subway-react-ecommerce) shoppingCart source code is that now we are exporting all the UIs using the `publishComponent` SubwayJS API.


#### Micro frontend configuration

In the `src/index.js` file we uses the SubwayJS `microFrontends()` utils to install the payment micro service into the SubwayJS micro services app:

```js
Subway
  .microFrontends()
  .install('payments', ({ domSelector }) => {
    // init domain command and event handlers
  });
```

A `build.js` file has been added to override the default `create-react-app` build behavior, as we need one single javascript file for the micro frontend to be exposed.

*(Todo: tune build and avoid including react etc. in the distribution build)*

#### Build the micro frontend

- `npm install`

- `npm run build`

#### Copy the build file into the container folder

The `container` application will load this micro frontend build at run time from his public folder (work in progress: this build should be published somewhere).

- `cp build/mf_payments.js ../container/public/mfs/`
