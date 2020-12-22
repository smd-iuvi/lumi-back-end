import { Request, Response } from 'express'

import Comment from '../Schemas/Comment'

class CommentController {
  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const course = await Comment.findById(req.params.id)

      if (course.userId.toString() !== req.headers.id.toString()) {
        return res.sendStatus(401)
      } else {
        const course = await Comment.findOneAndDelete({ _id: req.params.id })
        return res.json(course)
      }
    } catch (error) {
      return res.json(error)
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      if (req.body.text === '') {
        return res.sendStatus(400)
      }

      const comment = await Comment.findOne({ _id: req.params.id })

      if (comment.userId.toString() !== req.headers.id.toString()) {
        return res.sendStatus(403)
      } else {
        const newComment = await Comment.findByIdAndUpdate(req.params.id, req.body)
        return res.json(newComment)
      }
    } catch (error) {
      res.statusCode = 500
      return res.json(error)
    }
  }

  public async getByID (req: Request, res: Response): Promise<Response> {
    try {
      const course = await Comment.findById(req.params.id)
      return res.json(course)
    } catch (error) {
      return res.sendStatus(404)
    }
  }
}

export default new CommentController()
