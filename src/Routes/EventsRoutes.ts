import { Router } from 'express'

import EventController from '../Controllers/EventController'
import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.get('/events', EventController.index)
routes.post('/events', AuthController.validateTeacher, EventController.create)
routes.put('/events/:id', AuthController.validateTeacher, EventController.update)
routes.delete('/events/:id', AuthController.validateTeacher, EventController.delete)

routes.get('/events/:id/videos', EventController.getVideos)
routes.delete('/events/:id/videos/:videoId', EventController.deleteVideo)
routes.post('/events/:id/videos/:videoId', EventController.addVideo)

routes.get('/events/:id/course', EventController.getCourse)
routes.patch('/events/:id/course/:courseId', EventController.updateCourse)

routes.get('/events/:id/teacher', EventController.getTeacher)
routes.patch('/events/:id/teacher/:teacherId', EventController.updateTeacher)

export default routes
