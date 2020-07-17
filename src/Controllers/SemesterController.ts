import { Request, Response } from 'express'

import Semester from '../Schemas/Semester'
import Video from '../Schemas/Video'

class SemesterController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const semesters = await Semester.find()
      return res.json(semesters)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const semester = await Semester.create(req.body)
      return res.json(semester)
    } catch (error) {
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const semester = await Semester.findOneAndUpdate({ _id: req.params.id }, req.body)
      return res.json(semester)
    } catch (error) {
      return res.json(error)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const semester = await Semester.findByIdAndDelete({ _id: req.params.id })
      return res.json(semester)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getVideos (req: Request, res: Response): Promise<Response> {
    try {
      const videos = await Video.find({ semester: req.params.id })
      return res.json(videos)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new SemesterController()
