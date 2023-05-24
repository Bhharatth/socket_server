import BaseController from "./baseController";

export default class TypingController extends BaseController {
  typingstarted = ({ room }) => {
    let skt = this.socket.broadcaset;
    skt = room ? skt.to(room) : skt;
    skt.emit("typing-stated-from-server");
  };

  typingStoped = ({ room }) => {
    let skt = this.socket.broadcast;
    skt = room ? skt.to(room) : skt;
    skt.emit("typing-stoped-from-server");
  };
}
