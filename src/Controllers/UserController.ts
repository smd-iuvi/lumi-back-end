import { Request, Response } from 'express'

import User from '../Schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find()
      return res.json(users)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.create(req.body)
      return res.json(user)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new UserController()
