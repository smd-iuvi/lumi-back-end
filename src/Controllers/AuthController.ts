import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../Schemas/User'
import Teacher from '../Schemas/Teacher'

class AuthController {
  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findOne({ authID: req.body.authID })
      //   user.authID = null

      console.log(user)

      const userJWT = { authID: user.authID }
      const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
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
      user.authID = null
      const userJWT = { authID: user.authID }
      const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
      res.json({ user, accessToken })
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

  public async teacherRegister (req: Request, res: Response): Promise<Response> {
    try {
      const user = await Teacher.create(req.body)
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

  public async validate (token: string): Promise<boolean> {
    return true
  }
}

export default new AuthController()
