import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import roles from '../roles'

import User from '../Schemas/User'

interface UserJWT {
    authID: string
}

class AuthController {
  public async login (req: Request, res: Response): Promise<Response> {
    try {
      req.body.email = req.body.email.toLowerCase()
      const user = await User.findOne({ authID: req.body.authID })
      const userJWT = { authID: user.authID }
      const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
      user.authID = null
      res.json({ user, accessToken })
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

  public async register (req: Request, res: Response): Promise<Response> {
    try {
      req.body.email = req.body.email.toLowerCase()
      const user = await User.create(req.body)
      const userJWT = { authID: user.authID }
      const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
      user.authID = null
      return res.json({ user, accessToken })
    } catch (error) {
      res.statusCode = 400
      return res.json(error)
    }
  }

  public async validateUser (req: Request, res: Response, next: Function): Promise<Response> {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
      const userJWT = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as UserJWT
      const user = await User.findOne({ authID: userJWT.authID })

      if (user != null) {
        req.headers.id = user.id
        req.headers.role = user.role

        next()
      }
    } catch (error) {
      return res.sendStatus(403)
    }
  }

  public async validateAdmin (req: Request, res: Response, next: Function): Promise<Response> {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
      const userJWT = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as UserJWT
      const user = await User.findOne({ authID: userJWT.authID })

      if (user != null && user.role === roles.admin) {
        req.headers.id = user.id
        req.headers.role = user.role

        next()
      }
    } catch (error) {
      return res.sendStatus(403)
    }
  }

  public async validateTeacher (req: Request, res: Response, next: Function): Promise<Response> {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
      const userJWT = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as UserJWT
      const user = await User.findOne({ authID: userJWT.authID })

      if (user != null && user.role === roles.teacher) {
        req.headers.id = user.id
        req.headers.role = user.role

        next()
      }
    } catch (error) {
      return res.sendStatus(403)
    }
  }

  public async validateTeacherAndStudent (req: Request, res: Response, next: Function): Promise<Response> {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
      const userJWT = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as UserJWT
      const user = await User.findOne({ authID: userJWT.authID })

      if (user != null && ((user.role === roles.teacher) || (user.role === roles.student))) {
        req.headers.id = user.id
        req.headers.role = user.role

        next()
      }
    } catch (error) {
      return res.sendStatus(403)
    }
  }
}

export default new AuthController()
