import { Request, Response } from 'express'

import Genre from '../Schemas/Genre'
import Video from '../Schemas/Video'

class GenreController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const genres = await Genre.find()
      return res.json(genres)
    } catch (error) {
      return res.json(error)
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const genre = await Genre.create(req.body)
      return res.json(genre)
    } catch (error) {
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const genre = await Genre.findOneAndUpdate({ _id: req.params.id }, req.body)
      return res.json(genre)
    } catch (error) {
      return res.json(error)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const genre = await Genre.findByIdAndDelete({ _id: req.params.id })
      return res.json(genre)
    } catch (error) {
      return res.json(error)
    }
  }

  public async getVideos (req: Request, res: Response): Promise<Response> {
    try {
      const videos = await Video.find({ genre: req.params.id })
      return res.json(videos)
    } catch (error) {
      res.statusCode = 404
      return res.json(error)
    }
  }
}

export default new GenreController()
