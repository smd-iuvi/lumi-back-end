import { Router } from 'express'
import AuthRoutes from './Routes/AuthRoutes'
import CommentRoutes from './Routes/CommentsRoutes'
import CourseRoutes from './Routes/CoursesRoutes'
import EventsRoutes from './Routes/EventsRoutes'
import GenreRoutes from './Routes/GenreRoutes'
import SemesterRoutes from './Routes/SemesterRoutes'
import TagRoutes from './Routes/TagRoutes'
import UserRoutes from './Routes/UserRoutes'
import VideoRoutes from './Routes/VideosRoutes'

const routes = Router()

routes.use(UserRoutes)
routes.use(GenreRoutes)
routes.use(VideoRoutes)
routes.use(CourseRoutes)
routes.use(EventsRoutes)
routes.use(SemesterRoutes)
routes.use(CommentRoutes)
routes.use(TagRoutes)

routes.use(AuthRoutes)

export default routes
