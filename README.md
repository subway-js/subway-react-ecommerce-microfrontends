This project is a work in progress proof of concept for [SubwayJS](https://github.com/subway-js/subway) micro frontends with react.

In this project you will find different micro frontends implementation of the [ecommerce react website](https://github.com/subway-js/subway-react-ecommerce).


#### Scenario 1

In this scenario we decide to keep the [ecommerce react website](https://github.com/subway-js/subway-react-ecommerce) as it is, but we want to separate the `shoppingCart` aggregate into an independent micro service e.g. we want a separate group of people to work on that part of our domain, and we want to release such features independently from the rest of the platform.

**The Container application**

The container application will be the same as the [ecommerce react website](https://github.com/subway-js/subway-react-ecommerce) only **without** the `shoppingCart` aggregate.

This container application doesn't contain any logic or UI related to the shopping cart and the checkout page, but it relies on the following agreement:

- we can broadcast a *ADD_TO_SHOPPING_CART* command to add a product to the shopping cart
- we can import the **Checkout** component to render the checkout page, which will take care of the whole Checkout flow
- we can import the **HeaderShoppingCartDropdown** component and use it in the navigation bar: it will take care of showing the current list of selected products, and it will show a button to go to the checkout page

**The Payments micro service**

This micro service is a react application that only includes the original `shoppingCart` aggregate code, with a few differences:

- it doesn't render anything, out of the box
- it exposes both the **Checkout** page and the **Shopping Cart dropdown menu**, knowing that they will be mounted from the Container application on some DOM element
- when a *ADD_TO_SHOPPING_CART* command is broadcasted, this micro frontend will take care to update the `shoppingCart` aggregate state

This micro frontend will also make use of features from the container such as the ability to show the login modal to proceed with the checkout.
