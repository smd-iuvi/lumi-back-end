import { Schema, model, Document } from 'mongoose'

export interface CommentInterface extends Document {
    userID: string,
    videoID: string
}

export const CommentSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  videoID: { type: Schema.Types.ObjectId, ref: 'Video' }
}, {
  timestamps: true
})

export default model<CommentInterface>('Comment', CommentSchema)
