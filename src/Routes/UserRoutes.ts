import { Router } from 'express'
import AuthController from '../Controllers/AuthController'

import UserController from '../Controllers/UserController'

const routes = Router()

routes.put('/teachers/me', AuthController.validateTeacher, UserController.update)

routes.get('/teachers', UserController.index)

routes.get('/teachers/:id', UserController.getById)

export default routes