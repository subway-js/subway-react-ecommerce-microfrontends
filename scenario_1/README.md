This project is a work in progress proof of concept for [SubwayJS](https://github.com/subway-js/subway) microfrontends with react.

It's the micro frontends implementation of the [ecommerce react website](https://github.com/subway-js/subway-react-ecommerce).

It consists of:

- the **container**: the original app without the `shoppingCart` aggregate functionalities and UIs

- the **payments** micro frontend, which is an independent react application that provides the `shoppingCart` capabilities plus the UI elements that are used in the container application:
 - **shopping cart dropdown menu** for the navigation bar
 - the **checkout page**



#### How to run

It's a working in progress proof of concept, so at the moment the process is pretty much manual. You will find instructions in the README.md files in both the `/container` and the `/mf_payments` folders.

Overall, the steps are:

1. from the `/container` folder:
 - install the dependencies: `npm install`
 - run the app: `npm run start`

2. from the `/mf_payments` folder:
 - install the dependencies: `npm install`
 - build the app: `npm run start`
 - copy the distribution file into the container folder as per README instructions

At this point, the container should be reading at run time the payments micro service build, and the overall application looks and behaves exactly as the original [ecommerce react website](https://github.com/subway-js/subway-react-ecommerce).
