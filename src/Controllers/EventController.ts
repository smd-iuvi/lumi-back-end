import { Request, Response } from 'express'

import Event from '../Schemas/Event'

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
      const event = await Event.create(req.body)
      return res.json(event)
    } catch (error) {
      return res.json(error)
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
      const event = await Event.findOneAndUpdate({ _id: req.params.id }, req.body)
      return res.json(event)
    } catch (error) {
      return res.json(error)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOneAndDelete({ _id: req.params.id })
      return res.json(event)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getVideos (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id }).populate('videos')
      return res.json(event.videos ?? [])
    } catch (error) {
      return res.json(error)
    }
  }

  public async deleteVideo (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id })
      await event.removeVideo(req.params.videoId)
    } catch (error) {
      return res.json(error)
    }
  }

  public async addVideo (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id }).populate('videos')
      await event.addVideo(req.params.videoId)
      return res.json(event.videos ?? [])
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
      await event.updateCourse(
        req.params.coureId,
        event
      )
      return res.json(event.course ?? [])
    } catch (error) {
      return res.json(error)
    }
  }

  public async getTeacher (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id }).populate('teacher')
      return res.json(event.teacher ?? [])
    } catch (error) {
      return res.json(error)
    }
  }

  public async updateTeacher (req: Request, res: Response): Promise<Response> {
    try {
      const event = await Event.findOne({ _id: req.params.id }).populate('teacher')
      await event.updateTeacher(req.params.teacherId, event)

      return res.json(event.teacher ?? [])
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new EventController()
