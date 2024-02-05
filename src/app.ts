import 'module-alias/register'
import 'reflect-metadata'
import config from 'config'
import helmet from 'helmet'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import log from '@configs/logger'
import connect from '@configs/connect'
import auth from '@routes/auth'
import normal from '@routes/normal'
import errorHandler from '@middlewares/error_handle'

const port = config.get('port') as number
const host = config.get('host') as string
const app = express()

// Set Config tuan anh edit
app.use(helmet())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

// Set Cross 
// const corsOptions = {
//   origin: 'http://localhost:1337',
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
// }
app.use(cors(corsOptions))

// Router 
app.use(normal)
app.use(auth)
app.use(errorHandler)
app.use(function(req: Request, res: Response, next: NextFunction) {
  res.status(404).send("Not Found")
})

// Start server
app.listen(port, () => {
  log.info(`Server listing at http://${host}:${port}`)
  // connect()
})
