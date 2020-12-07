import { Schema, model, Document } from 'mongoose'

export interface ApplauseInterface extends Document {
    userID: string,
    videoID: string,
    count: number
}

export const ApplauseSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  videoID: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  count: { type: Schema.Types.Number, required: true, default: 0 }
}, {
  timestamps: true
})

export default model<ApplauseInterface>('Applause', ApplauseSchema)
