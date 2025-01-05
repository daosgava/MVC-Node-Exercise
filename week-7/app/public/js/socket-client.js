const initializeListeners = () => {
  const socket = io("http://localhost:3000");

  socket.on('connect', () => {
    console.log('Connected to backend');
  });

  socket.on("heart-beat", (data) => {
    console.log(data);
  });
};

initializeListeners();
