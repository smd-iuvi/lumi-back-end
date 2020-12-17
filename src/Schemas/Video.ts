import { Schema, model, Document } from 'mongoose'

import { TagInterface } from './Tag'
import { CourseInterface } from './Course'
import { SemesterInterface } from './Semester'
import { GenreInterface } from './Genre'
import { CommentInterface } from './Comment'
import { EventInterface } from './Event'
import { UserInterface } from './User'

export interface VideoInterface extends Document {
    createdBy: UserInterface
    title: string,
    description: string,
    duration: number,
    url: string,
    platform: string,
    tags?: Array<TagInterface>,
    course?: CourseInterface,
    semester?: SemesterInterface,
    event?: EventInterface,
    genre: GenreInterface,
    comments?: Array<CommentInterface>,
    about?: string,
    cast?: Array<String>,
    content?: string,
    imageUrl: string,
    isIndependent: boolean,
    members: Array<Object>,
    parentalRating: string,
    professor?: string,
    claps?: number,
    views?: number
}

export const VideoSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  url: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: false }],
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: false },
  semester: { type: Schema.Types.ObjectId, ref: 'Semester', required: false },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: false },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: false }],
  about: {type: Schema.Types.String, required: false},
  cast: [{type: Schema.Types.String, required: false}],
  content: {type: Schema.Types.String, required: false},
  imageUrl: {type: Schema.Types.String, required: false},
  isIndependent: {type: Schema.Types.Boolean, required: true, default: true},
  members: [{
    name: {type: Schema.Types.String},
    role: {type: Schema.Types.String}
  }],
  parentalRating: { type: Schema.Types.String, required: true, default: 'Livre'},
  professor: {type: Schema.Types.String, required: false}
}, {
  timestamps: true
})

export default model<VideoInterface>('Video', VideoSchema)
