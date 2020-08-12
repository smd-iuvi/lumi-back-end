import { Router } from 'express'

import CommentController from '../Controllers/CommentController'
import AuthController from '../Controllers/AuthController'

const routes = Router()

routes.delete('/comments/:id', AuthController.validateUser, CommentController.delete)

export default routes
