import { Schema, model, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { VideoInterface } from './Video'

export const UserErrorsMessages = {
  emailRequired: 'Email is required',
  firstNameRequired: 'First name is required',
  lastNameRequired: 'Last name is required',
  authIDRequired: 'AuthID is required'
}

export interface UserInterface extends Document {
    email: string,
    firstName: string,
    lastName: string,
    photoUrl?: string,
    authID: string,
    favorites?: Array<VideoInterface>
}

export const UserSchema = new Schema({
  email: { type: String, required: [true, UserErrorsMessages.emailRequired], unique: true },
  firstName: { type: String, required: [true, UserErrorsMessages.firstNameRequired] },
  lastName: { type: String, required: [true, UserErrorsMessages.lastNameRequired] },
  photoUrl: { type: String, required: false },
  authID: { type: String, required: [true, UserErrorsMessages.authIDRequired], unique: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Video', required: false }]
}, {
  timestamps: true
})

UserSchema.plugin(uniqueValidator)

export default model<UserInterface>('User', UserSchema)
