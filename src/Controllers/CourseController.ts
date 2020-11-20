import { Request, Response } from 'express'

import Course from '../Schemas/Course'
import Video from '../Schemas/Video'
import Event from '../Schemas/Event'

class CourseController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const courses = await Course.find()
      return res.json(courses)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getCourse (req: Request, res: Response): Promise<Response> {
    try {
      const courses = await Course.findById(req.params.id)
      return res.json(courses)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const course = await Course.create(req.body)
      return res.json(course)
    } catch (error) {
      res.statusCode = 500
      return res.json(error)
    }
  }

  public async getById (req: Request, res: Response): Promise<Response> {
    try {
      const course = await Course.findOne({ _id: req.params.id })
      return res.json(course)
    } catch (error) {
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const course = await Course.findOneAndUpdate({ _id: req.params.id }, req.body)
      return res.json(course)
    } catch (error) {
      return res.json(error)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const course = await Course.findOneAndDelete({ _id: req.params.id })
      return res.json(course)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getVideos (req: Request, res: Response): Promise<Response> {
    try {
      const videos = await Video.find({ course: req.params.id })
      return res.json(videos)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getEvents (req: Request, res: Response): Promise<Response> {
    try {
      const events = await Event.find({ course: req.params.id })
      return res.json(events)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new CourseController()
