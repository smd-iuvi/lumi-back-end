import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { UserInterface, UserSchema } from './User'

export const StudentErrorsMessages = {
  registrationNumberRequired: 'Registration Number is required'
}

export interface StudentInterface extends UserInterface {
    registrationNumber: string,
    description?: string
}

const StudentSchema = new Schema({
  registrationNumber: { type: String, required: [true, StudentErrorsMessages.registrationNumberRequired] },
  description: { type: String, required: false }
})

StudentSchema.add(UserSchema)
StudentSchema.plugin(uniqueValidator)

export default model<StudentInterface>('Student', StudentSchema)
