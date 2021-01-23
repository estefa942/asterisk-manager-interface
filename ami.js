const AmiClient = require("asterisk-ami-client");
let client = new AmiClient({ reconnect: true });

client
  .connect("admin", "root", { host: "192.168.30.71", port: 5038 })
  .then(() => {
    // any action after connection
    return client.action({ Action: "Ping" }, true);
  })
  .then((response1) => {
    // response of first action
    console.log(response1);
  })
  .then(() => {
    // any second action
    return client.action({ Action: "Ping" }, true);
  })
  .then((response2) => {
    // response of second action
    console.log(response2);
  })
  .catch((error) => error)
  .then((error) => {
    client.disconnect(); // disconnect
    if (error instanceof Error) {
      throw error;
    }
  });
