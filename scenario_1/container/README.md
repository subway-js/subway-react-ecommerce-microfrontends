This project is a work in progress proof of contect for [SubwayJS](https://github.com/subway-js/subway) microfrontends with react.

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### `yarn install`

To install all the dependencies.

#### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Micro frontend configuration

It uses the SubwayJS `microFrontends()` utils:


```js
<script type="text/javascript">
  Subway
    .microFrontends()
    .compose({
      mfs: [{
        id: "container",
        domSelector: "root"
      }, {
        id: "payments",
        src: "/mfs/mf_payments.js"
      }]
    });
</script>
```

With this instructions we are basically saying:
- in this browser we are setting up a micro frontends app using SubwayJS
- the first one is the **container** micro frontend, and it will be mounted on the `<div id="root" />` element of the *index.html* page: we don't need to specify the location of the container js file, as this is a `create-react-app` application, the source code will be injected automatically
- the second one is the **payments** micro frontend:  we only specify were to find the source code, but we don't specify any DOM element as we won't mount anything directly, it will be the container application to decide where and when to show the elements we export
