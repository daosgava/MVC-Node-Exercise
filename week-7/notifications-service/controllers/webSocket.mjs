const getWebSocketController = ({ io }) => {
  const handleOnConnection = (socket) => {
    console.log("User connected");
    setInterval(() => {
      io.emit("heart-beat", "❤️")
    }, 2000);
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  };

  return {
    handleOnConnection
  };
};

export default getWebSocketController;
