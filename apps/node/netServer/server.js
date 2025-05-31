import net from "net";

const server = net.createServer((socket) => {
  // 发送数据
  setInterval(() => {
    socket.write("Ferhannah");
  }, 1000);

  // 接收数据
  socket.on("data", (data) => {
    console.log("Received from client:", data.toString());
  });
});

// 端口号在这层实现（tcp：port）
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
