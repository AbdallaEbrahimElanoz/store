import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware'
import config from './config'
import db from './database'
import routes from './routes'

const PORT = config.port || 3000
// create an instance server
const app: Application = express()

//middleware to parse incoming requests 
app.use(express.json())
// HTTP request logger middleware
app.use(morgan('common'))

// HTTP security middleware headers
app.use(helmet())
// Basic rate-limiting middleware for Express
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 2 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many accounts created from this IP, please try again after an hour',
  })
)


// add routing for / path
app.get('/', (req: Request, res: Response) => {
  throw new Error('Error exist')
  res.json({
    message: 'Hello World 🌍',
  })
})
//post request
app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍',
    Date:req.body,
  })
})

app.use('/api', routes)


// error handler middleware
app.use(errorMiddleware)
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message:
      'Ohh you are lost, read the API documentation to find your way back home 😂',
  })
})
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app
