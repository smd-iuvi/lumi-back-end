import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { UserInterface, UserSchema } from './User'
import { VideoInterface } from './Video'

export const StudentErrorsMessages = {
  registrationNumberRequired: 'Registration Number is required'
}

export interface StudentInterface extends UserInterface {
    registrationNumber: string,
    description?: string,
    videos?: Array<VideoInterface>
}

const StudentSchema = new Schema({
  registrationNumber: { type: String, required: [true, StudentErrorsMessages.registrationNumberRequired] },
  description: { type: String, required: false },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
})

StudentSchema.add(UserSchema)
StudentSchema.plugin(uniqueValidator)

export default model<StudentInterface>('Student', StudentSchema)
