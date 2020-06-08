import { Router } from 'express'

import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.post('/auth/teacher/login', AuthController.teacherLogin)
routes.post('/auth/teacher/register', AuthController.teacherRegister)

routes.post('/auth/student/login', AuthController.studentLogin)
routes.post('/auth/student/register', AuthController.studentRegister)

// routes.post('/auth/signOut')

export default routes
