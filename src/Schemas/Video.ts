import { Schema, model, Document } from 'mongoose'

import { TagInterface } from './Tag'
import { CourseInterface } from './Course'
import { SemesterInterface } from './Semester'
import { GenreInterface } from './Genre'
import { CommentInterface } from './Comment'
import { EventInterface } from './Event'
import { UserInterface } from './User'

export interface VideoInterface extends Document {
    owner: UserInterface
    title: string,
    description: string,
    duration: number,
    url: string,
    photoUrl?: string,
    platform: string,
    tags?: Array<TagInterface>,
    course?: CourseInterface,
    semester?: SemesterInterface,
    event?: EventInterface,
    genre: GenreInterface,
    comments?: Array<CommentInterface>
}

export const VideoSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  url: { type: String, required: true },
  photoUrl: { type: String, required: false },
  platform: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: false }],
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: false },
  semester: { type: Schema.Types.ObjectId, ref: 'Semester', required: false },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: false },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: false }]
}, {
  timestamps: true
})

export default model<VideoInterface>('Video', VideoSchema)
