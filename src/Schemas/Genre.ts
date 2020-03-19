import { Schema, model, Document } from 'mongoose'
import { VideoInterface } from './Video'

export interface GenreInterface extends Document {
    name: number,
    videos?: Array<VideoInterface>,
}

export const GenreSchema = new Schema({
  name: { type: String, required: true },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Videos' }]
}, {
  timestamps: true
})

export default model<GenreInterface>('Genre', GenreSchema)
