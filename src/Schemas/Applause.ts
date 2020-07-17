import { Schema, model, Document } from 'mongoose'

export interface ApplauseInterface extends Document {
    userID: string,
    videoID: string
}

export const ApplauseSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  videoID: { type: Schema.Types.ObjectId, ref: 'Video' }
}, {
  timestamps: true
})

export default model<ApplauseInterface>('Applause', ApplauseSchema)
