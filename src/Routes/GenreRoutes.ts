import { Router } from 'express'
import AuthController from '../Controllers/AuthController'
import GenreController from '../Controllers/GenreController'


const routes = Router()

routes.get('/genres', GenreController.index)

routes.post('/genres', AuthController.validateAdmin, GenreController.create)
routes.put('/genres', AuthController.validateAdmin, GenreController.update)
routes.delete('/genres', AuthController.validateAdmin, GenreController.delete)

routes.get('/genres/:id/videos', GenreController.getVideos)

export default routes
