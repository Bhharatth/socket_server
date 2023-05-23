import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  roomId: {
    type: String,
    req: true,
  },
  chats: {
    type: Array,
  },
  emplyeeViewed: {
    type: Boolean,
    default: true,
  },
  emplyerViewed: {
    type: Boolean,
    default: true,
  },
});

export const Room = mongoose.model("Room", roomSchema);
