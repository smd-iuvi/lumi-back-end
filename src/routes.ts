import { Router } from 'express'

import UserController from './Controllers/UserController'
import StudentController from './Controllers/StudentController'
import GenreController from './Controllers/GenreController'

import VideoRoutes from './Routes/VideosRoutes'
import CourseRoutes from './Routes/CoursesRoutes'
import EventsRoutes from './Routes/EventsRoutes'

import TeacherRoutes from './Routes/TeacherRoutes'
import StudentRoutes from './Routes/StudentsRoutes'

import SemesterRoutes from './Routes/SemesterRoutes'

import AuthRoutes from './Routes/AuthRoutes'

import CommentRoutes from './Routes/CommentsRoutes'

const routes = Router()

routes.get('/users', UserController.index)

routes.get('/students', StudentController.index)

routes.get('/genres', GenreController.index)
routes.post('/genres', GenreController.create)

routes.use(VideoRoutes)
routes.use(CourseRoutes)
routes.use(EventsRoutes)
routes.use(TeacherRoutes)
routes.use(StudentRoutes)
routes.use(SemesterRoutes)
routes.use(CommentRoutes)

routes.use(AuthRoutes)

export default routes
