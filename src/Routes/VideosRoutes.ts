import { Router } from 'express'

import VideoController from '../Controllers/VideoController'
import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.get('/videos', VideoController.index)
routes.post('/videos', AuthController.validateStudentTeacher, VideoController.create)

routes.get('/videos/:id', VideoController.getById)
routes.put('/videos/:id', AuthController.validateStudentTeacher, VideoController.update)
routes.delete('/videos/:id', AuthController.validateStudentTeacher, VideoController.delete)

// routes.get('/videos/:id/course', VideoController.getCourse)
// routes.put('/videos/:id/course')

// routes.get('/videos/:id/genre', VideoController.getGenre)
// routes.put('/videos/:id/genre')

// routes.get('/videos/:id/owner', VideoController.getOwner)

// routes.get('/videos/:id/tags', VideoController.getTags)
// routes.post('/videos/:id/tags')
// routes.delete('/videos/:id/tags/:tagId')

routes.post('/videos/:id/favorite', AuthController.validateUser, VideoController.favoriteToggle)

routes.get('/videos/:id/comments', VideoController.getComments)
routes.post('/videos/:id/comments', AuthController.validateUser, VideoController.pushComment)
routes.patch('/videos/:id/comments/:commentId')
routes.delete('/videos/:id/comments/:commentId')

routes.post('/videos/:id/applauses', AuthController.validateUser, VideoController.pushApplauses)
routes.get('/videos/:id/applauses', VideoController.getApplauses)

export default routes
