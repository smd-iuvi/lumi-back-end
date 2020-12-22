import { Router } from 'express'

import CommentController from '../Controllers/CommentController'
import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.delete('/comments/:id', AuthController.validateUser, CommentController.delete)
routes.put('/comments/:id', AuthController.validateUser, CommentController.update)
routes.get('/comments/:id', CommentController.getByID)

export default routes
