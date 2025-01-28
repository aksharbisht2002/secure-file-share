const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 4000 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (data) => {
    const parsedData = JSON.parse(data);

    if (parsedData.type === "send_file") {
      const { file, fileName } = parsedData;

      server.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "receive_file", file, fileName }));
        }
      });
    }
  });

  socket.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://localhost:4000");
