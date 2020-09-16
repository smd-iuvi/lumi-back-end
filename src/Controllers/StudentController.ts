import { Request, Response } from 'express'

import Student from '../Schemas/Student'

class StudentController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const students = await Student.find()
      const publicStudentsInfo = students.map(student => {
        const stud = student.toObject()
        delete stud.favorites
        delete stud.authID
        delete stud.registrationNumber
        return stud
      })
      return res.json(publicStudentsInfo)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getById (req: Request, res: Response): Promise<Response> {
    try {
      const student = await (await Student.findById(req.params.id)).toObject()

      delete student.favorites
      delete student.authID
      delete student.registrationNumber

      return res.json(student)
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      if (req.body.authID || req.body.id || req.body._id || req.body.authID === '' || req.body.id === '' || req.body._id === '') {
        return res.sendStatus(400)
      }

      await Student.findOneAndUpdate({ _id: req.headers.id }, req.body)
      return res.sendStatus(200)
    } catch (error) {
      return res.sendStatus(403)
    }
  }
}

export default new StudentController()
