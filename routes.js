import TypingController from "./controllers/typingController.js";
import RoomContoller from "./controllers/roomController";
import MessageController from "./controllers/messageController";
import VideoController from "./controllers/videoController";
import UploadController from "./controllers/uploadController";

const sockets = (socket) => {
  const typingController = new TypingController(socket);
  const roomController = new RoomContoller(socket);
  const messageController = new MessageController(socket);
  const videoController = new VideoController(socket);
  const uploadController = new UploadController(socket);

  socket.emit("me", socket.id);
  socket.on("send-message", messageController.sendMessage);
};

export default sockets;
