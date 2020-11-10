import { Router } from 'express'
import AuthController from '../Controllers/AuthController'

import CourseController from '../Controllers/CourseController'

const routes = Router()

routes.get('/courses', CourseController.index)

routes.post('/courses', AuthController.validateUser, CourseController.create)
routes.put('/courses', AuthController.validateUser, CourseController.update)
routes.delete('/courses', AuthController.validateUser, CourseController.delete)

routes.get('/courses/:id', CourseController.getCourse)

routes.get('/courses/:id/videos', CourseController.getVideos)
routes.get('/courses/:id/events', CourseController.getEvents)

export default routes
