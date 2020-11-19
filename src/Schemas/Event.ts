import { Schema, model, Document } from 'mongoose'

import { CourseInterface } from './Course'
import { UserInterface } from './User'

export interface EventInterface extends Document {
    name: string,
    description?: string,
    date: string,
    course: CourseInterface,
    teacher: UserInterface,
    launched: boolean
}

export const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Schema.Types.Date, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Event' },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  launched: { type: Schema.Types.Boolean, default: false }
},
{
  timestamps: true
})

export default model<EventInterface>('Event', EventSchema)
