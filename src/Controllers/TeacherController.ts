import { Request, Response } from 'express'

import Teacher from '../Schemas/Teacher'

class TeacherController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const teachers = await Teacher.find()
      return res.json(teachers)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const teacher = await Teacher.create(req.body)
      return res.json(teacher)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new TeacherController()
