import BaseController from "./baseController";
import { Room } from "../models/rooms";
import { AdminRoom } from "../models/roomOwner";

export default class RoomContoller extends BaseController {
  newRoomCreated = async ({ employer, employee }) => {
    const roomId = uuidv4();

    const roomFound = await Room.find({
      $and: [{ employer: employer }, { employee: employee }],
    });
    if (roomFound.length === 0) {
      const room = new Room({
        employer: employer,
        employee: employee,
        roomId: roomId,
      });

      await room.save();
      this.socket.emit("new-room-created-server", { roomId });
    } else {
      this.socket.emit("new-room-created-server", roomFound[0].roomId);
    }
  };

  chatWithAdmin = async ({ user }) => {
    const roomFound = await AdminRoom.find({
      $and: [{ admin: "2165464644794654" }, { user: user }],
    });
    const roomId = uuidv4();

    if (roomFound.length === 0) {
      const room = new AdminRoom({
        admin: "",
        user: user,
        roomId: roomId,
      });
      await room.save();
      this.socket.emit("admin-new-room-created-server", { roomId });
    } else {
      this.socket.emit("admin-new-room-created-server", roomFound[0].roomId);
    }
  };

  joinRoom = ({ room }) => {
    this.socket.join(room.roomId);
    this.socket.broacast.emit("new-admin-room-created");
  };

  adminRoom = ({ room }) => {
    this.socket.join(room.roomId);
    this.socket.emit("new-admin-room-created");
  };
}
