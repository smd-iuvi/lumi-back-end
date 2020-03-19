import { Schema, model, Document } from 'mongoose'

export interface SemesterInterface extends Document {
    year: number,
    part: number,
}

export const SemesterSchema = new Schema({
  year: { type: Number, required: true },
  part: { type: Number, required: true }
}, {
  timestamps: true
})

export default model<SemesterInterface>('Semester', SemesterSchema)
