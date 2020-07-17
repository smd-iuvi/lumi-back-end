import { Router } from 'express'

import StudentController from '../Controllers/StudentController'
import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.put('/students/me', AuthController.validateStudent, StudentController.update)

routes.get('/students', StudentController.index)
routes.get('/students/:id', StudentController.getById)

// routes.post('/auth/signOut')

export default routes
