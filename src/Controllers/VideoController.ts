import { Request, Response } from 'express'

import Video, { VideoInterface } from '../Schemas/Video'
import Genre from '../Schemas/Genre'
import Course from '../Schemas/Course'
import Student from '../Schemas/Student'
import Comment from '../Schemas/Comment'

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
      const video = await Video.create(req.body)

      await this.pushToOtherModels(req, video)

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
      const video = await Video.findOneAndUpdate({ _id: req.params.id }, req.body)
      return res.json(video)
    } catch (error) {
      return res.json(error)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOneAndDelete({ _id: req.params.id })
      return res.json(video)
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

  public async pushComment (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.id })

      const comment = await Comment.create({
        ...req.body,
        videoId: req.params.id
      })

      video.comments.push(comment._id)

      await video.save()

      return res.json(video.comments)
    } catch (error) {
      return res.json(error)
    }
  }

  private async pushToOtherModels (req: Request, video: VideoInterface): Promise<void> {
    await this.pushToGenre(req, video)
    await this.pushToStudent(req, video)
    await this.pushToCourse(req, video)
    await this.pushToEvent(req, video)
  }

  private async pushToGenre (req: Request, video: VideoInterface): Promise<void> {
    const genre = await Genre.findById(req.body.genre)
    genre.videos.push(video._id)
    await genre.save()
  }

  private async pushToStudent (req: Request, video: VideoInterface): Promise<void> {
    const student = await Student.findById(req.body.owner)
    student.videos.push(video._id)
    await student.save()
  }

  private async pushToCourse (req: Request, video: VideoInterface): Promise<void> {
    if (req.body.course) {
      const course = await Course.findById(req.body.course)
      course.videos.push(video._id)
      await course.save()
    }
  }

  private async pushToEvent (req: Request, video: VideoInterface): Promise<void> {
    if (req.body.event) {
      const event = await Course.findById(req.body.event)
      event.videos.push(video._id)
      await event.save()
    }
  }
}

export default new VideoController()
