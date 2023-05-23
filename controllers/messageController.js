import { AdminRoom } from "../models/roomOwner";
import { Room } from "../models/rooms";
import BaseController from "./baseController";

export default class MessageController extends BaseController {
  sendMessage = async ({ message, room, user, me }) => {
    if (me) {
      let skt = this.socket.broadcast;
      skt = room ? skt.to(room) : skt;
      skt.emit("link-from-server", { me });
    }

    const foundRoom = await Room.find({ roomId: room });
    const adminRoom = await AdminRoom.find({ roomId: room });

    const chatMessage = {
      message: message,
      user: user,
    };

    if (foundRoom && message !== "") {
      foundRoom.chats.push(chatMessage);

      if (user === "employer") {
        foundRoom.emplyeeViewed = false;
      } else {
        foundRoom.emplyerViewed = false;
      }

      await foundRoom.save();

      let skt = this.socket.broadcast;
      skt = room ? skt.to(room) : skt;
      skt.emit("message-from-server", message);
    }

    if (adminRoom && message !== "") {
      adminRoom.chats.push(chatMessage);

      await adminRoom.save();
      let skt = this.socket.broadcast;
      skt = room ? skt.to(room) : skt;
      skt.emit("message-from-server", { message });
    }
  };
}
