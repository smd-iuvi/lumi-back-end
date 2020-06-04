import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../Schemas/User'
import Teacher from '../Schemas/Teacher'
import Student from '../Schemas/Student'

interface UserJWT {
    authID: string
}

class AuthController {
  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findOne({ authID: req.body.authID })
      //   user.authID = null

      console.log(user)

      const userJWT = { authID: user.authID }
      const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
      user.authID = null
      res.json({ user, accessToken })
    } catch (error) {
      res.statusCode = 404
      console.log(error)
      return res.json(error)
    }
  }

  public async teacherLogin (req: Request, res: Response): Promise<Response> {
    try {
      const user = await Teacher.findOne({ authID: req.body.authID })
      const userJWT = { authID: user.authID }
      const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
      user.authID = null
      res.json({ user, accessToken })
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

  public async teacherRegister (req: Request, res: Response): Promise<Response> {
    try {
      const user = await Teacher.create(req.body)
      const userJWT = { authID: user.authID }
      const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
      user.authID = null
      return res.json({ user, accessToken })
    } catch (error) {
      console.log(error)
      res.statusCode = 400
      return res.json(error)
    }
  }

  public async register (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.create(req.body)
      user.authID = null

      const userJWT = { authID: user.authID }
      const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
      return res.json({ user, accessToken })
    } catch (error) {
      console.log(error)
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
      req.headers.id = user.id
      next()
    } catch (error) {
      return res.sendStatus(403)
    }
  }

  public async validateTeacher (req: Request, res: Response, next: Function): Promise<Response> {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as UserJWT
      const teacher = await Teacher.findOne({ authID: user.authID })
      req.headers.id = teacher.id
      next()
    } catch (error) {
      console.log(error)
      return res.sendStatus(403)
    }
  }

  public async validateStudent (req: Request, res: Response, next: Function): Promise<Response> {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as UserJWT
      const student = await Student.findOne({ authID: user.authID })
      req.headers.id = student.id
      next()
    } catch (error) {
      return res.sendStatus(403)
    }
  }
}

export default new AuthController()
