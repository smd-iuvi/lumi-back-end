import { Request, Response } from 'express'

import Tag from '../Schemas/Tag'
import Video from '../Schemas/Video'

class TagController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const tags = await Tag.find()
      return res.json(tags)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const tag = await Tag.create(req.body)
      return res.json(tag)
    } catch (error) {
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const tag = await Tag.findOneAndUpdate({ _id: req.params.id }, req.body)
      return res.json(tag)
    } catch (error) {
      return res.json(error)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const tag = await Tag.findByIdAndDelete({ _id: req.params.id })
      return res.json(tag)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getVideos (req: Request, res: Response): Promise<Response> {
    try {
      const videos = await Video.find({ tags: req.params.id })
      return res.json(videos)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new TagController()
