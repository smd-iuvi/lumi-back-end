import { Schema, model, Document } from 'mongoose'

import { CourseInterface } from './Course'
import { TeacherInterface } from './Teacher'

export interface EventInterface extends Document {
    name: string,
    description?: string,
    date: string,
    course: CourseInterface,
    teacher: TeacherInterface,
}

export const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true }
},
{
  timestamps: true
})

export default model<EventInterface>('Event', EventSchema)
