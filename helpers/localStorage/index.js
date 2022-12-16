import cookieCutter from "cookie-cutter";
const Cryptr = require("cryptr");

export const StoreLocalKeys = (identity, values) => {
  //TODO: add logic to obfuscate the values passed in/decode
  const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET);

  const encryptedMessage = cryptr.encrypt(values);

  cookieCutter.set(identity, encryptedMessage, {
    path: "/",
    maxAge: 2592000,
    sameSite: true,
  });
  // localStorage.setItem(identity, values);
};

export const GetLocalKeys = (identity) => {
  //TODO: add logic to obfuscate the values passed in/decode

  const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET);

  let retrieved = cookieCutter.get(identity);

  if (retrieved) {
    const decryptedMessage = cryptr.decrypt(retrieved);

    if (decryptedMessage) {
      return decryptedMessage;
    }
  }

  // return localStorage.getItem(identity);
};
