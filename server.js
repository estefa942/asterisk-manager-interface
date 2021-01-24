const AmiClient = require("asterisk-ami-client");
let client = new AmiClient();

client
  .connect("admin", "root", { host: "192.168.10.26", port: 5038 })
  .then((amiConnection) => {
    client
      .on("ExtensionStatus", (event) => {
        switch (event.Status) {
          case "1":
            console.log(`Extensión ${event.Exten} en uso`);
            break;
          case "0":
            console.log(`Extensión ${event.Exten} libre`);
          default:
            break;
        }
      })
      .on("event", console.log)
      .on("Hangup", console.log)
      .on("connect", console.log)
      .on("response", console.log)
      .action({
        Action: "Ping",
      })
      .action({
        Action: "ExtensionState",
        ActionID: "123",
        Exten: "101",
      })
      .on("response", console.log);
  })
  .catch((error) => console.log(error));
