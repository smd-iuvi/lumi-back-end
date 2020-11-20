import { Request, Response } from 'express'
import roles from '../roles'
import Comment from '../Schemas/Comment'
import Event from '../Schemas/Event'

import User from '../Schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      let users = []
      console.log(req.query.role)
      if (req.query.role) {
        if (req.query.role === roles.admin) {
          return res.sendStatus(403)
        }

        users = await User.find({ role: req.query.role })
      } else {
        users = await User.find()
      }

      const publicUsersInfo = users.map(u => {
        const user = u.toObject()
        delete user.favorites
        delete user.authID
        delete user.registrationNumber
        return user
      })

      return res.json(publicUsersInfo)
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

  public async getMe (req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.headers.id)
      const user = await (await User.findById(req.headers.id)).toObject()

      delete user.favorites
      delete user.authID
      delete user.siape

      return res.json(user)
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

  public async getById (req: Request, res: Response): Promise<Response> {
    try {
      const user = await (await User.findById(req.params.id)).toObject()

      delete user.favorites
      delete user.authID
      delete user.siape

      return res.json(user)
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      if (req.body.authID || req.body.id || req.body._id) {
        return res.sendStatus(400)
      }

      await User.findOneAndUpdate({ _id: req.headers.id }, req.body)
      return res.sendStatus(200)
    } catch (error) {
      return res.sendStatus(403)
    }
  }

  public async getComments (req: Request, res: Response): Promise<Response> {
    try {
      const comments = await Comment.find({ userId: req.params.id })
      return res.json(comments)
    } catch (error) {
      return res.sendStatus(404)
    }
  }

  public async getEvents (req: Request, res: Response): Promise<Response> {
    try {
      const comments = await Event.find({ teacher: req.params.id })
      return res.json(comments)
    } catch (error) {
      return res.sendStatus(404)
    }
  }

  // public async getEvents(re)
}

export default new UserController()
