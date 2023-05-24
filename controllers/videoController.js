import BaseController from "./baseController";

export default class VideoController extends BaseController {
  userCalling = ({ userToCall, signalData, from, name }) => {
    this.socket
      .to(userToCall)
      .emit("callUsers", { signal, signalData, from, name });
  };
  answerCall = ({ data }) => {
    this.socket.to(data.to)
    .emit("call-accepted", data.signal);
  };
}
