import net from "net";

const client = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  () => {}
);

client.on("data", (e) => {
  console.log(e.toString());
});

client.write("Client");
// setInterval(() => {
//   client.write("Client");
// }, 1000);
