import { Schema, model, Document } from 'mongoose'

export interface ApplauseInterface extends Document {
    userID: string,
<<<<<<< HEAD
    videoID: string
=======
    videoID: string,
    count: number
>>>>>>> routes/lumi-back-end#10
}

export const ApplauseSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
<<<<<<< HEAD
  videoID: { type: Schema.Types.ObjectId, ref: 'Video' }
=======
  videoID: { type: Schema.Types.ObjectId, ref: 'Video' },
  count: { type: Schema.Types.Number, required: true, default: 0 }
>>>>>>> routes/lumi-back-end#10
}, {
  timestamps: true
})

export default model<ApplauseInterface>('Applause', ApplauseSchema)
