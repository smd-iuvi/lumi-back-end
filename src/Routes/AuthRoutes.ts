import { Router } from 'express'

import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.post('/auth/login', AuthController.login)
routes.post('/auth/register', AuthController.register)

export default routes
