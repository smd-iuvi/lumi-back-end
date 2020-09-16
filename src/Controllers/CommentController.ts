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
}

export default new CommentController()
