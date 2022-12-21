import cookieCutter from "cookie-cutter";
const Cryptr = require("cryptr");
import {isDesktop} from '../../helpers/device/ClientSide';

export const StoreLocalKeys = (identity: string, values: string) => {
  // Obfuscates values being saved
  const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET);

  const encryptedMessage = cryptr.encrypt(values);

  if (isDesktop()) {
    cookieCutter.set(identity, encryptedMessage, {
      path: "/",
      maxAge: 2592000,
      sameSite: true,
    });
  
  } else {
    localStorage.setItem(identity, encryptedMessage);
  }
};

export const GetLocalKeys = (identity) => {

  const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET);

  let retrieved = cookieCutter.get(identity);
  let decryptedMessage;

  if (retrieved) {
    decryptedMessage = cryptr.decrypt(retrieved);

    if (decryptedMessage) {
      return decryptedMessage;
    }

  } else if (!retrieved) {
    retrieved = localStorage.getItem(identity);

    decryptedMessage = cryptr.decrypt(retrieved);

    if (decryptedMessage) {
      return decryptedMessage;
    }
  }

  return;
};
