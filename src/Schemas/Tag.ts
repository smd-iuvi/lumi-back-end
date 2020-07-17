import { Schema, model, Document } from 'mongoose'

export interface TagInterface extends Document {
    description: string,
}

export const TagSchema = new Schema({
  description: { type: String, required: true }
}, {
  timestamps: true
})

export default model<TagInterface>('Tag', TagSchema)
