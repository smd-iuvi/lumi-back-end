import { Request, Response } from 'express'

import User from '../Schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find()

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
}

export default new UserController()
