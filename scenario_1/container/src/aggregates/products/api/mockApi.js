import { data } from "./data";

const RPC_FAKE_DELAY = 500;
export const getProductsList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.reverse());
    }, RPC_FAKE_DELAY);
  });
};
