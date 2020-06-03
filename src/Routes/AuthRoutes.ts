import { Router } from 'express'

import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.post('/auth/login', AuthController.login)
routes.post('/auth/register', AuthController.register)

routes.post('/auth/teacher/login', AuthController.teacherLogin)
routes.post('/auth/teacher/register', AuthController.teacherRegister)

// routes.post('/auth/signOut')

export default routes
