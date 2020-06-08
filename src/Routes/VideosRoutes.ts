import { Router } from 'express'

import VideoController from '../Controllers/VideoController'
import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.get('/videos', VideoController.index)
routes.post('/videos', VideoController.create)

routes.get('/videos/:id', VideoController.getById)
routes.put('/videos/:id', AuthController.validateStudent, VideoController.update)
routes.delete('/videos/:id', VideoController.delete)

routes.get('/videos/:id/course', VideoController.getCourse)
routes.put('/videos/:id/course')

routes.get('/videos/:id/genre', VideoController.getGenre)
routes.put('/videos/:id/genre')

routes.get('/videos/:id/owner', VideoController.getOwner)

routes.get('/videos/:id/tags', VideoController.getTags)
// routes.post('/videos/:id/tags')
// routes.delete('/videos/:id/tags/:tagId')

routes.get('/videos/:id/comments', VideoController.getComments)
// routes.post('/videos/:id/comments', VideoController.pushComment)
routes.patch('/videos/:id/comments/:commentId')
routes.delete('/videos/:id/comments/:commentId')

export default routes
