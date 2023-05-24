import { Room } from "../models/rooms";
import BaseController from "./baseController";
import fs from "fs";

export default class UploadController extends BaseController {
  uploader = async ({ data, room }) => {
    fs.writeFile(
      "upload" + "test.png",
      data,
      {
        encoding: "base64",
      },
      () => {}
    );
    const foundRoom = await Room.findOne({ roomId: room });

    const chatMessage = {
      message: data.toString("base64"),
      user: "employer",
      image: true,
    };

    if (foundRoom) {
      foundRoom.chats.push(chatMessage);
      await foundRoom.save();
    }

    this.socket
      .to(room)
      .emit("uploaded", { bufferData: data.toString("base64") });
  };
}
