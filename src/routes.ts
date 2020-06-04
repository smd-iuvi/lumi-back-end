import { Router } from 'express'

import UserController from './Controllers/UserController'
import StudentController from './Controllers/StudentController'
import GenreController from './Controllers/GenreController'

import VideoRoutes from './Routes/VideosRoutes'
import CourseRoutes from './Routes/CoursesRoutes'
import EventsRoutes from './Routes/EventsRoutes'

import AuthRoutes from './Routes/AuthRoutes'

const routes = Router()

routes.get('/users', UserController.index)

routes.get('/students', StudentController.index)
routes.post('/students', StudentController.create)

routes.get('/genres', GenreController.index)
routes.post('/genres', GenreController.create)

routes.use(VideoRoutes)
routes.use(CourseRoutes)
routes.use(EventsRoutes)

routes.use(AuthRoutes)

export default routes
