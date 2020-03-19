import { Request, Response } from 'express'

import Genre from '../Schemas/Genre'

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
}

export default new GenreController()
