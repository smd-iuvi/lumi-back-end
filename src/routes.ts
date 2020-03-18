import { Router } from 'express'

import UserController from './Controllers/UserController'
import StudentController from './Controllers/StudentController'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)

routes.get('/students', StudentController.index)
routes.post('/students', StudentController.create)

export default routes
