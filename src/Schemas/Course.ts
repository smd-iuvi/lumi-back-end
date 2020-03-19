import { Schema, model, Document } from 'mongoose'

import { VideoInterface } from './Video'
import { EventInterface } from './Event'

export interface CourseInterface extends Document {
    name: string,
    description: string,
    videos?: Array<VideoInterface>,
    events?: Array<EventInterface>
}

export const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
},
{
  timestamps: true
})

export default model<CourseInterface>('Course', CourseSchema)
