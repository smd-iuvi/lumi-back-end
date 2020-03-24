import { Schema, model, Document } from 'mongoose'

export interface CourseInterface extends Document {
    name: string,
    description: string,
}

export const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: String
},
{
  timestamps: true
})

export default model<CourseInterface>('Course', CourseSchema)
