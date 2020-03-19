import { Request, Response } from 'express'

import Video from '../Schemas/Video'

class VideoController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const videos = await Video.find()
      return res.json(videos)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.create(req.body)
      return res.json(video)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new VideoController()
