import { Schema, model, Document } from 'mongoose'

export interface ViewInterface extends Document {
    userID: string,
    videoID: string
}

export const ViewSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  videoID: { type: Schema.Types.ObjectId, ref: 'Video', required: true }
}, {
  timestamps: true
})

export default model<ViewInterface>('View', ViewSchema)
