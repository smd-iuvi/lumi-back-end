import { Router } from 'express'
import AuthController from '../Controllers/AuthController'

import UserController from '../Controllers/UserController'

const routes = Router()

routes.put('/users/me', AuthController.validateUser, UserController.update)

routes.get('/users', UserController.index)

routes.get('/users/:id', UserController.getById)

export default routes