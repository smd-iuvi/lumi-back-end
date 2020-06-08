import { Request, Response } from 'express'

import Video from '../Schemas/Video'

import Roles from '../roles'
import Teacher from '../Schemas/Teacher'
import Student from '../Schemas/Student'

class VideoController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const videos = await Video.find()
        .populate('genre')
        .populate({ path: 'owner', select: 'firstName lastName photoUrl email' })
      return res.json(videos)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      if (req.body.owner !== req.headers.id) {
        return res.sendStatus(400)
      }
      const video = await Video.create(req.body)
      return res.json(video)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getById (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.id })
        .populate({ path: 'owner', select: 'firstName lastName photoUrl email' })
      return res.json(video)
    } catch (error) {
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      if (req.body.owner || req.body.id || req.body._id || req.body.comments) {
        return res.sendStatus(400)
      }

      if (req.headers.role === Roles.teacher) {
        const teacher = await Teacher.findById(req.headers.id)
        const video = await Video.findOne({ _id: req.params.id })

        if (video.owner.toString() !== teacher.id.toString()) {
          return res.sendStatus(403)
        } else {
          const video = await Video.findByIdAndUpdate(req.params.id, req.body)
          return res.json(video)
        }
      } else if (req.headers.role === Roles.student) {
        const student = await Student.findById(req.headers.id)
        const video = await Video.findOne({ _id: req.params.id })

        if (video.owner.toString() !== student.id.toString()) {
          return res.sendStatus(403)
        } else {
          const video = await Video.findByIdAndUpdate(req.params.id, req.body)
          return res.json(video)
        }
      }
    } catch (error) {
      return res.json(error)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      if (req.headers.role === Roles.teacher) {
        const teacher = await Teacher.findById(req.headers.id)
        const video = await Video.findOne({ _id: req.params.id })

        if (video.owner.toString() !== teacher.id.toString()) {
          return res.sendStatus(403)
        } else {
          const video = await Video.findByIdAndDelete(req.params.id)
          return res.json(video)
        }
      } else if (req.headers.role === Roles.student) {
        const student = await Student.findById(req.headers.id)
        const video = await Video.findOne({ _id: req.params.id })

        if (video.owner.toString() !== student.id.toString()) {
          return res.sendStatus(403)
        } else {
          const video = await Video.findByIdAndDelete(req.params.id)
          return res.json(video)
        }
      }
    } catch (error) {
      return res.json(error)
    }
  }

  public async getCourse (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.id }).populate('course')
      return res.json(video.course || [])
    } catch (error) {
      return res.json(error)
    }
  }

  public async getGenre (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.id }).populate('genre')
      return res.json(video.genre)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getOwner (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.id }).populate('owner')
      return res.json(video.owner)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getTags (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.id }).populate('tags')
      return res.json(video.tags || [])
    } catch (error) {
      return res.json(error)
    }
  }

  public async getComments (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.id }).populate('comments')
      return res.json(video.comments)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new VideoController()
