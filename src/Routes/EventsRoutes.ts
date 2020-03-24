import { Router } from 'express'

import EventController from '../Controllers/EventController'

const routes = Router()

routes.get('/events', EventController.index)
routes.post('/events', EventController.create)
routes.put('/events', EventController.update)
routes.delete('/events', EventController.delete)

routes.get('/events/:id/videos', EventController.getVideos)
routes.delete('/events/:id/videos/:videoId', EventController.deleteVideo)
routes.patch('/events/:id/videos/:videoId', EventController.getVideos)

routes.get('/events/:id/course', EventController.getCourse)
routes.patch('/events/:id/course/:courseId', EventController.updateCourse)

routes.get('/events/:id/teacher', EventController.getTeacher)
routes.patch('/events/:id/teacher/:teacherId', EventController.updateTeacher)

export default routes
