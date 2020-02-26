import { loadProductsList } from "./commandCreators";

import { cmdHandlers } from "./handlers/commands";
import { evtHandlers } from "./handlers/events";

export const AGGREGATE_NAME = "ProductsAggregate";
const initialState = {
  productsList: [],
  selectedProduct: null
};

export { ProductList } from "./ui/containers/productList";
export { ProductDetails } from "./ui/containers/productDetails";
export { Disclaimer } from "./ui/components/disclaimer";

export const aggregateConfig = {
  name: AGGREGATE_NAME,
  initialState,
  cmdHandlers,
  evtHandlers,
  bootstrap: () => loadProductsList()
};
