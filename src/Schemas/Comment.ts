import { Schema, model, Document } from 'mongoose'

export interface CommentInterface extends Document {
    userId: string,
    videoId: string,
    text: string
}

export const CommentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  videoId: { type: Schema.Types.ObjectId, ref: 'Video' },
  text: { type: String, required: true }
}, {
  timestamps: true
})

export default model<CommentInterface>('Comment', CommentSchema)
