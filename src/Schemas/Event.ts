import { Schema, model, Document } from 'mongoose'

import { CourseInterface } from './Course'
import { TeacherInterface } from './Teacher'

export interface EventInterface extends Document {
    name: string,
    description?: string,
<<<<<<< HEAD
    date: Date,
=======
    date: string,
>>>>>>> routes/lumi-back-end#10
    course: CourseInterface,
    teacher: TeacherInterface,
}

export const EventSchema = new Schema({
  name: { type: String, required: true },
<<<<<<< HEAD
  description: String,
  date: { type: Schema.Types.Date, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Event' },
=======
  description: { type: String },
  date: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
>>>>>>> routes/lumi-back-end#10
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true }
},
{
  timestamps: true
})

export default model<EventInterface>('Event', EventSchema)
