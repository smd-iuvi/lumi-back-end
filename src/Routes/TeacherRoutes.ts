import { Router } from 'express'

import TeacherController from '../Controllers/TeacherController'
import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.put('/teachers', AuthController.validateTeacher, TeacherController.update)

routes.get('/teachers', TeacherController.index)

// routes.post('/auth/signOut')

export default routes
