import { Router } from 'express'

import TeacherController from '../Controllers/TeacherController'
import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.put('/teachers/me', AuthController.validateTeacher, TeacherController.update)

routes.get('/teachers', TeacherController.index)

routes.get('/teachers/:id', TeacherController.getById)

// routes.post('/auth/signOut')

export default routes
