import { Request, Response } from 'express'

import Video from '../Schemas/Video'
import Comment from '../Schemas/Comment'

import Applause from '../Schemas/Applause'
import Roles from '../roles'
import Teacher from '../Schemas/Teacher'
import Student from '../Schemas/Student'
import User from '../Schemas/User'

class VideoController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      if (req.query.title) {
        const videos = await Video.find()
          .populate('genre')
          .populate({ path: 'owner', select: 'firstName lastName photoUrl email' })
        const filteredVideos = videos.filter(video => {
          return video.title.toLowerCase().includes(req.query.title)
        })
        return res.json(filteredVideos)
      } else {
        const videos = await Video.find()
          .populate('genre')
          .populate({ path: 'owner', select: 'firstName lastName photoUrl email' })

        return res.json(videos)
      }
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
      res.statusCode = 404
      return res.json({ error })
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
          await Video.findByIdAndDelete(req.params.id)
          return res.sendStatus(200)
        }
      } else if (req.headers.role === Roles.student) {
        const student = await Student.findById(req.headers.id)
        const video = await Video.findOne({ _id: req.params.id })

        if (video.owner.toString() !== student.id.toString()) {
          return res.sendStatus(403)
        } else {
          await Video.findByIdAndDelete(req.params.id)
          return res.sendStatus(200)
        }
      }
    } catch (error) {
      res.statusCode = 404
      return res.json({ error })
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
      const comments = await Comment.find({ videoId: req.params.id })
      return res.json(comments)
    } catch (error) {
      return res.json(error)
    }
  }

  public async pushComment (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findOne({ _id: req.params.id })

      if (video == null) {
        return res.sendStatus(404)
      }

      if (req.headers.id == null) {
        return res.sendStatus(403)
      }

      const comment = await Comment.create({
        userId: req.headers.id,
        videoId: req.params.id,
        text: req.body.text
      })

      await video.comments.push(comment)

      await video.save

      return res.json(comment)
    } catch (error) {
      return res.json(error)
    }
  }

  public async favoriteToggle (req: Request, res: Response): Promise<Response> {
    try {
      const video = await Video.findById(req.params.id)

      if (video == null) return res.sendStatus(404)
      if (req.headers.id == null) return res.sendStatus(403)

      if (req.headers.role === Roles.user) {
        const user = await User.findById(req.headers.id)

        const favoritesEqualToVideo = user.favorites.filter(v => {
          return `${v}` === req.params.id
        })

        if (favoritesEqualToVideo.length > 0) {
          const newUserFavorites = await user.favorites.filter(v => `${v}` !== req.params.id)
          user.favorites = newUserFavorites
        } else {
          const newUserFavorites = [...user.favorites, video]
          user.favorites = newUserFavorites
        }

        await user.save()
        console.log(user.favorites)
        return res.json(user)
      } else if (req.headers.role === Roles.teacher) {
        const user = await Teacher.findById(req.headers.id)

        const favoritesEqualToVideo = user.favorites.filter(v => {
          return `${v}` === req.params.id
        })

        if (favoritesEqualToVideo.length > 0) {
          const newUserFavorites = await user.favorites.filter(v => `${v}` !== req.params.id)
          user.favorites = newUserFavorites
        } else {
          const newUserFavorites = [...user.favorites, video]
          user.favorites = newUserFavorites
        }

        await user.save()
        return res.json(user.favorites)
      } else {
        const user = await Student.findById(req.headers.id)

        const favoritesEqualToVideo = user.favorites.filter(v => {
          return `${v}` === req.params.id
        })

        if (favoritesEqualToVideo.length > 0) {
          const newUserFavorites = await user.favorites.filter(v => `${v}` !== req.params.id)
          user.favorites = newUserFavorites
        } else {
          const newUserFavorites = [...user.favorites, video]
          user.favorites = newUserFavorites
        }

        await user.save()
        return res.json(user.favorites)
      }
    } catch (error) {
      return res.json(error)
    }
  }

  public async pushApplauses (req: Request, res: Response): Promise<Response> {
    try {
      if (req.headers.id == null) {
        return res.sendStatus(403)
      }

      const video = await Video.findOne({ _id: req.params.id })

      if (video == null) {
        return res.sendStatus(404)
      }

      const applause = await Applause.findOne({ videoID: req.params.id, userID: req.headers.id })

      if (applause == null) {
        const applause = await Applause.create({
          userID: req.headers.id,
          videoID: video.id,
          count: req.body.count
        })

        return res.json(applause)
      } else {
        applause.count = req.body.count < 50 ? req.body.count : 50
      }

      return res.json(applause)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default new VideoController()
