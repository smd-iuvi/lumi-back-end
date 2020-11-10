import { Router } from 'express'

import TagController from '../Controllers/TagController'
import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.get('/tags', TagController.index)
routes.post('/tags', AuthController.validateTeacherAndStudent, TagController.create)

routes.get('/tags/:id/videos', TagController.getVideos)

export default routes
