const RPC_FAKE_DELAY = 1000;
export const submitSuccessfulOrder = items => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ status: "ok" });
    }, RPC_FAKE_DELAY);
  });
};
