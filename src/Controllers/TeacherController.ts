import { Request, Response } from 'express'

import Teacher from '../Schemas/Teacher'

class TeacherController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const teachers = await Teacher.find()

      const publicTeachersInfo = teachers.map(teacher => {
        const teach = teacher.toObject()
        delete teach.favorites
        delete teach.authID
        delete teach.siape
        return teach
      })

      return res.json(publicTeachersInfo)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getById (req: Request, res: Response): Promise<Response> {
    try {
      const teacher = await (await Teacher.findById(req.params.id)).toObject()

      delete teacher.favorites
      delete teacher.authID
      delete teacher.siape

      return res.json(teacher)
    } catch (error) {
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      if (req.body.authID || req.body.id || req.body._id) {
        return res.sendStatus(400)
      }

      await Teacher.findOneAndUpdate({ _id: req.headers.id }, req.body)
      return res.sendStatus(200)
    } catch (error) {
      return res.sendStatus(403)
    }
  }
}

export default new TeacherController()
