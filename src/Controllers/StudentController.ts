import { Request, Response } from 'express'

import Student from '../Schemas/Student'

class StudentController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const students = await Student.find()
      return res.json(students)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const student = await Student.create(req.body)
      return res.json(student)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new StudentController()
