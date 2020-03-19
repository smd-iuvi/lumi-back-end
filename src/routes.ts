import { Router } from 'express'

import UserController from './Controllers/UserController'
import StudentController from './Controllers/StudentController'
import GenreController from './Controllers/GenreController'
import VideoController from './Controllers/VideoController'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)

routes.get('/students', StudentController.index)
routes.post('/students', StudentController.create)

routes.get('/genres', GenreController.index)
routes.post('/genres', GenreController.create)

routes.get('/videos', VideoController.index)
routes.post('/videos', VideoController.create)

export default routes
