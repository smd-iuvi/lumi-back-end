import { Schema, model, Document } from 'mongoose'

export interface GenreInterface extends Document {
    name: number,
}

export const GenreSchema = new Schema({
  name: { type: String, required: true }
}, {
  timestamps: true
})

export default model<GenreInterface>('Genre', GenreSchema)
