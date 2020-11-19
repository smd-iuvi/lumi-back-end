import { Request, Response } from 'express'

import Event from '../Schemas/Event'
import Video from '../Schemas/Video'
import Course from '../Schemas/Course'

import roles from '../roles'
import User from '../Schemas/User'

class EventController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const events = await Event.find()
      return res.json(events)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const eventBody = {
        name: req.body.name,
        date: req.body.date,
        teacher: req.headers.id
      }

      const event = await Event.create(eventBody)

      return res.json(event)
    } catch (error) {
      return res.sendStatus(400)
    }
  }

  public async getById (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id })
      return res.json(event)
    } catch (error) {
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      if (req.body.teacher || req.body.id || req.body._id || req.body.teacher === '' || req.body.id === '' || req.body._id === '') {
        return res.sendStatus(400)
      }

      const event = await Event.findOne({ _id: req.params.id })

      if (event.teacher.toString() !== req.headers.id.toString()) {
        return res.sendStatus(403)
      } else {
        const newEvent = await Event.findByIdAndUpdate(req.params.id, req.body)
        return res.json(newEvent)
      }
    } catch (error) {
      return res.json(error)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id })

      if (event.teacher.toString() !== req.headers.id.toString()) {
        return res.sendStatus(403)
      } else {
        await Event.findOneAndDelete({ _id: req.params.id })
      }

      return res.json(event)
    } catch (error) {
      return res.sendStatus(404)
    }
  }

  public async getVideos (req: Request, res: Response): Promise<Response> {
    try {
      const videos = await Video.find({ event: req.params.id })
      return res.json(videos)
    } catch (error) {
      res.statusCode = 404
      return res.json({ error })
    }
  }

  public async deleteVideo (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.videoId })
      const event = await Event.findById(req.params.id)

      if (event.teacher.id === req.headers.id.toString() || video.owner.id === req.headers.id.toString()) {
        video.event = null
        await video.save()
        const videos = await Video.find({ event: req.params.id })
        return res.json(videos)
      } else {
        return res.sendStatus(403)
      }

    } catch (error) {
      return res.json(error)
    }
  }

  public async addVideo (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.videoId })
      const event = await Event.findById(req.params.id)

      console.log(event.teacher.id.toString())
      console.log(req.headers.id.toString())

      if (event.teacher.toString() === req.headers.id.toString() || video.owner.id === req.headers.id.toString()) {
        video.event = event
        await video.save()
        const videos = await Video.find({ event: req.params.id })
        return res.json(videos)
      } else {
        return res.sendStatus(403)
      }

    } catch (error) {
      return res.json(error)
    }
  }

  public async getCourse (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id })
      const course = await Course.findById(event.course)
      return res.json(course)
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

  public async updateCourse (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id }).populate('course')
      const course = await Course.findById(req.params.courseId)

      if (event.teacher.toString() === req.headers.id.toString()) {
        event.course = course
        await event.save()
        return res.json(event.course)
      } else {
        return res.sendStatus(403)
      }

    } catch (error) {
      return res.json(error)
    }
  }

  public async getTeacher (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id })
      const teacher = await User.findById(event.teacher)
      delete event.teacher.authID
      delete event.teacher.favorites
      return res.json(teacher ?? [])
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }

}

export default new EventController()
