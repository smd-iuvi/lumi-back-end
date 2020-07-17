import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../Schemas/User'
import Teacher from '../Schemas/Teacher'
import Student from '../Schemas/Student'

import Roles from '../roles'

interface UserJWT {
    authID: string
}

class AuthController {
  public async teacherLogin (req: Request, res: Response): Promise<Response> {
    try {
      req.body.email = req.body.email.toLowerCase()
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
      req.body.email = req.body.email.toLowerCase()

      const student = await Student.findOne({ authID: req.body.authID })
      const studentEmail = await Student.findOne({ email: req.body.email })
      const user = await User.findOne({ authID: req.body.authID })
      const userEmail = await User.findOne({ email: req.body.email })

      if (user == null && student == null && studentEmail == null && userEmail == null) {
        const user = await Teacher.create(req.body)
        const userJWT = { authID: user.authID }
        const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
        user.authID = null
        return res.json({ user, accessToken })
      } else {
        throw Error('Auth ID must be unique')
      }
    } catch (error) {
      res.statusCode = 400
      return res.json(error)
    }
  }

  public async studentLogin (req: Request, res: Response): Promise<Response> {
    try {
      req.body.email = req.body.email.toLowerCase()
      const user = await Student.findOne({ authID: req.body.authID })
      console.log(user)
      if (user.email === req.body.email) {
        const userJWT = { authID: user.authID }
        const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
        user.authID = null
        res.json({ user, accessToken })
      } else {
        return res.sendStatus(403)
      }
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

  public async studentRegister (req: Request, res: Response): Promise<Response> {
    try {
      req.body.email = req.body.email.toLowerCase()

      const teacher = await Teacher.findOne({ authID: req.body.authID })
      const teacherEmail = await Teacher.findOne({ email: req.body.email })
      const user = await User.findOne({ authID: req.body.authID })
      const userEmail = await User.findOne({ email: req.body.email })

      if (user == null && teacher == null && teacherEmail == null && userEmail == null) {
        const user = await Student.create(req.body)
        const userJWT = { authID: user.authID }
        const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET)
        user.authID = null
        return res.json({ user, accessToken })
      } else {
        throw Error('Auth ID must be unique')
      }
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
      const student = await Student.findOne({ authID: userJWT.authID })

      if (student != null) {
        req.headers.id = student.id
        req.headers.role = Roles.student
      } else {
        const teacher = await Teacher.findOne({ authID: userJWT.authID })

        if (teacher != null) {
          req.headers.id = teacher.id
          req.headers.role = Roles.teacher
        } else {
          const user = await User.findOne({ authID: userJWT.authID })

          if (user != null) {
            req.headers.id = user.id
            req.headers.role = Roles.user
          }
        }
      }
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
      req.headers.role = Roles.teacher
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
      req.headers.role = Roles.student
      next()
    } catch (error) {
      console.log(error)
      return res.sendStatus(403)
    }
  }

  public async validateStudentTeacher (req: Request, res: Response, next: Function): Promise<Response> {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as UserJWT
      const student = await Student.findOne({ authID: user.authID })

      if (student == null) {
        const teacher = await Teacher.findOne({ authID: user.authID })
        req.headers.id = teacher.id
        req.headers.role = Roles.teacher
      } else {
        req.headers.id = student.id
        req.headers.role = Roles.student
      }

      next()
    } catch (error) {
      return res.sendStatus(403)
    }
  }
}

export default new AuthController()
