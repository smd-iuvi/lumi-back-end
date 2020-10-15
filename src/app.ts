import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import routes from './routes'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()

      dotenv.config()

      this.middlewares()
      this.database()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private database (): void {
      mongoose.connect('mongodb://127.0.0.1:27017/lumi', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    }

    private routes (): void {
      this.express.use('/api', routes)
    }
}

export default new App().express
