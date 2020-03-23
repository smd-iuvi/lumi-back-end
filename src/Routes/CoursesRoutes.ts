import { Router } from 'express'

import CourseController from '../Controllers/CourseController'

const routes = Router()

routes.get('/courses', CourseController.index)
routes.post('/courses', CourseController.create)
routes.put('/courses', CourseController.update)
routes.delete('/courses', CourseController.delete)

routes.get('/courses/:id/videos', CourseController.getVideos)
routes.get('/courses/:id/events', CourseController.getEvents)

export default routes
