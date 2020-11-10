import { Router } from 'express'
import AuthController from '../Controllers/AuthController'

import SemesterController from '../Controllers/SemesterController'

const routes = Router()

routes.get('/semesters', SemesterController.index)
routes.post('/semesters', AuthController.validateUser, SemesterController.create)
routes.put('/semesters', AuthController.validateUser, SemesterController.update)
routes.delete('/semesters', AuthController.validateUser, SemesterController.delete)

routes.get('/semesters/:id/videos', SemesterController.getVideos)

export default routes
