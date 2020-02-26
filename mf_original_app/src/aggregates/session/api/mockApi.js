const RPC_FAKE_DELAY = 1000;

const FAKE_ACCOUNT = {
  username: 'MichaelJordan23',
  password: 'air23'
}
export const authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(username === FAKE_ACCOUNT.username && password === FAKE_ACCOUNT.password) {
        resolve({ status: "ok", jwt: "fake.jwt.token" });
      } else {
        resolve({ status: "ko", message: "wrong credentials" });
      }
    }, RPC_FAKE_DELAY);
  });
};
