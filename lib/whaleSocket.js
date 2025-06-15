// lib/whaleSocket.js
import Web3 from "web3";

let subscriptionInstance = null;

const THRESHOLD_WEI = Web3.utils.toWei("100", "ether");
// Use your preferred WS endpoint (Infura, Ankr, Alchemy…)
const WS_PROVIDER = `wss://rpc.ankr.com/eth_ws/00c7c34d7b50f625ab74fc42708d141f0b3d736517ef01554b6beff93ccef675`;

const web3 = new Web3(new Web3.providers.WebsocketProvider(WS_PROVIDER));

/**
 * startWhaleWatcher
 *   Subscribes to new blocks via WebSocket and invokes `onTx` for each "whale" tx.
 *
 * @param {function(tx: object)} onTx
 * @returns {Subscription} A web3.eth subscription instance
 */
export default function startWhaleWatcher(onTx) {
  if (subscriptionInstance) return subscriptionInstance;

  subscriptionInstance = web3.eth.subscribe(
    "newBlockHeaders",
    (err, header) => {
      if (err) return console.error("[WhaleWatcher] subscribe error", err);

      web3.eth
        .getBlock(header.number, true)
        .then((block) => {
          block.transactions.forEach((tx) => {
            if (BigInt(tx.value) >= BigInt(THRESHOLD_WEI)) {
              onTx({
                blockNumber: tx.blockNumber,
                from: tx.from,
                to: tx.to,
                value: web3.utils.fromWei(tx.value, "ether"),
                hash: tx.hash,
              });
            }
          });
        })
        .catch((e) => console.error("[WhaleWatcher] block fetch error", e));
    }
  );

  // Reconnect logic on error/disconnect
  web3.currentProvider.on("end", () => {
    console.warn("[WhaleWatcher] WebSocket closed—reconnecting in 3s");
    subscriptionInstance = null;
    setTimeout(() => startWhaleWatcher(onTx), 3000);
  });

  return subscriptionInstance;
}
