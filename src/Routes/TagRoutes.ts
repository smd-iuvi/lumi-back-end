import { Router } from 'express'

import TagController from '../Controllers/TagController'

const routes = Router()

routes.get('/tags', TagController.index)
routes.post('/tags', TagController.create)
routes.put('/tags', TagController.update)
routes.delete('/tags', TagController.delete)

routes.get('/tags/:id/videos', TagController.getVideos)

export default routes
