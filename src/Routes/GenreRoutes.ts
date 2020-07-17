import { Router } from 'express'

import GenreController from '../Controllers/GenreController'

const routes = Router()

routes.get('/genres', GenreController.index)
routes.post('/genres', GenreController.create)
routes.put('/genres', GenreController.update)
routes.delete('/genres', GenreController.delete)

routes.get('/genres/:id/videos', GenreController.getVideos)

export default routes
