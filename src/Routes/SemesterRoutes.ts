import { Router } from 'express'

import SemesterController from '../Controllers/SemesterController'

const routes = Router()

routes.get('/semesters', SemesterController.index)
routes.post('/semesters', SemesterController.create)
routes.put('/semesters', SemesterController.update)
routes.delete('/semesters', SemesterController.delete)

routes.get('/semesters/:id/videos', SemesterController.getVideos)

export default routes
