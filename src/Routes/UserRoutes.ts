import { Router } from 'express'
import AuthController from '../Controllers/AuthController'

import UserController from '../Controllers/UserController'

const routes = Router()

routes.put('/users/me', AuthController.validateUser, UserController.update)
routes.get('/users/me', AuthController.validateUser, UserController.getMe)

routes.get('/users', UserController.index)

routes.get('/users/:id', UserController.getById)

routes.get('/users/:id/comments', UserController.getComments)
routes.get('/users/:id/events', UserController.getEvents)
routes.get('/users/:id/videos', UserController.getVideos)

export default routes
