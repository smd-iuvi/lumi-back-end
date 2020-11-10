import { Request, Response } from 'express'

import Event from '../Schemas/Event'
import Video from '../Schemas/Video'
import Course from '../Schemas/Course'
import Teacher from '../Schemas/Teacher'

import roles from '../roles'

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
      if (req.body.teacher !== req.headers.id) {
        return res.sendStatus(403)
      }
      const event = await Event.create(req.body)
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

      const teacher = await Teacher.findById(req.headers.id)
      const event = await Event.findOne({ _id: req.params.id })

      if (event.teacher.toString() !== teacher.id.toString()) {
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
      const teacher = await Teacher.findById(req.headers.id)
      const event = await Event.findOne({ _id: req.params.id })

      if (event.teacher.toString() !== teacher.id.toString()) {
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

      if (event.teacher.id === req.headers.id.toString() || video.owner.id === req.headers.id.toString()) {
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
      const event = await Event.findOne({ _id: req.params.id }).populate('course')
      return res.json(event.course ?? [])
    } catch (error) {
      return res.json(error)
    }
  }

  public async updateCourse (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id }).populate('course')
      const course = await Course.findById(req.params.coureId)

      if (event.teacher.id === req.headers.id.toString()) {
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
      const event = await (await Event.findOne({ _id: req.params.id }).populate('teacher')).toObject()
      delete event.teacher.authID
      delete event.teacher.favorites
      return res.json(event.teacher ?? [])
    } catch (error) {
      return res.json(error)
    }
  }

}

export default new EventController()
