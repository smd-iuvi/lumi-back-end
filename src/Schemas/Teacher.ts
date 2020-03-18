import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { UserInterface, UserSchema } from './User'

export const TeacherErrorsMessages = {
  siapeRequired: 'Siape is required'
}

export interface TeacherInterface extends UserInterface {
    siape: string
}

const TeacherSchema = new Schema({
  siape: { type: String, required: [true, TeacherErrorsMessages.siapeRequired] }
})

TeacherSchema.add(UserSchema)
TeacherSchema.plugin(uniqueValidator)

export default model<TeacherInterface>('Teacher', TeacherSchema)
