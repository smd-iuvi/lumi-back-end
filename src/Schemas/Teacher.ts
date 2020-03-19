import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { UserInterface, UserSchema } from './User'
import { EventInterface } from './Event'

export const TeacherErrorsMessages = {
  siapeRequired: 'Siape is required'
}

export interface TeacherInterface extends UserInterface {
    siape: string,
    events?: Array<EventInterface>
}

const TeacherSchema = new Schema({
  siape: { type: String, required: [true, TeacherErrorsMessages.siapeRequired] },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
})

TeacherSchema.add(UserSchema)
TeacherSchema.plugin(uniqueValidator)

export default model<TeacherInterface>('Teacher', TeacherSchema)
