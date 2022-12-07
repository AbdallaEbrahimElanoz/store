import { Router } from 'express'
import userRoutes from './api/users.routes'

const routes = Router()
// api/users
routes.use('/users',userRoutes)

export default routes