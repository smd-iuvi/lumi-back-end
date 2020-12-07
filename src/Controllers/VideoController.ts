import { Request, Response } from 'express'

import Video, { VideoInterface } from '../Schemas/Video'
import Comment from '../Schemas/Comment'

import Applause from '../Schemas/Applause'

import User from '../Schemas/User'

class VideoController {
  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (req.query.title || req.query.ownerName) {
        const videos = await this.getByQuery(req.query)
        return res.json(videos)
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

  public create = async (req: Request, res: Response): Promise<Response> => {
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

  public getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const video = await Video.findOne({ _id: req.params.id })
        .populate({ path: 'owner', select: 'firstName lastName photoUrl email' })
      return res.json(video)
    } catch (error) {
      return res.json(error)
    }
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (req.body.owner || req.body.id || req.body._id || req.body.comments) {
        return res.sendStatus(400)
      }

      const video = await Video.findOne({ _id: req.params.id })

      if (video.owner.toString() !== req.headers.id.toString()) {
        return res.sendStatus(403)
      } else {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body)
        return res.json(video)
      }
    } catch (error) {
      res.statusCode = 404
      return res.json({ error })
    }
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const video = await Video.findOne({ _id: req.params.id })

      if (video.owner.toString() !== req.headers.id.toString()) {
        return res.sendStatus(403)
      } else {
        await Video.findByIdAndDelete(req.params.id)
        return res.sendStatus(200)
      }
    } catch (error) {
      res.statusCode = 404
      return res.json({ error })
    }
  }

  public getCourse = async (req: Request, res: Response): Promise<Response> => {
    try {
      const video = await Video.findOne({ _id: req.params.id }).populate('course')
      return res.json(video.course || [])
    } catch (error) {
      return res.json(error)
    }
  }

  public getGenre = async (req: Request, res: Response): Promise<Response> => {
    try {
      const video = await Video.findOne({ _id: req.params.id }).populate('genre')
      return res.json(video.genre)
    } catch (error) {
      return res.json(error)
    }
  }

  public getOwner = async (req: Request, res: Response): Promise<Response> => {
    try {
      const video = await Video.findOne({ _id: req.params.id }).populate('owner')
      return res.json(video.owner)
    } catch (error) {
      return res.json(error)
    }
  }

  public getTags = async (req: Request, res: Response): Promise<Response> => {
    try {
      const video = await Video.findOne({ _id: req.params.id }).populate('tags')
      return res.json(video.tags || [])
    } catch (error) {
      return res.json(error)
    }
  }

  public getComments = async (req: Request, res: Response): Promise<Response> => {
    try {
      const comments = await Comment.find({ videoId: req.params.id })
      return res.json(comments)
    } catch (error) {
      return res.json(error)
    }
  }

  public pushComment = async (req: Request, res: Response): Promise<Response> => {
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

  public favoriteToggle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const video = await Video.findById(req.params.id)

      if (video == null) return res.sendStatus(404)
      if (req.headers.id == null) return res.sendStatus(403)

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
    } catch (error) {
      return res.json(error)
    }
  }

  public pushApplauses = async (req: Request, res: Response): Promise<Response> => {
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
        applause.count += applause.count < 50 ? req.body.count : 0
      }

      await applause.save()

      return res.json(applause)
    } catch (error) {
      return res.json(error)
    }
  }

  public getApplauses = async (req: Request, res: Response): Promise<Response> => {
    try {
      const video = await Video.findOne({ _id: req.params.id })

      if (video == null) {
        return res.sendStatus(404)
      }

      const applauses = await Applause.find({ videoID: req.params.id })
      const countObject = {
        count: 0
      }

      applauses.forEach(applause => {
        countObject.count += applause.count
      })

      return res.json(countObject)
    } catch (error) {
      return res.json(error)
    }
  }

  private getByQuery = async (query): Promise<VideoInterface[]> => {
    const videos = await Video.find()
      .populate('genre')
      .populate({ path: 'owner', select: 'firstName lastName photoUrl email' })

    let filteredVideos: VideoInterface[] = videos

    if (query.title) {
      filteredVideos = filteredVideos.filter(video => video.title.toLowerCase().includes(query.title.toLowerCase()))
    }

    if (query.ownerName) {
      filteredVideos = filteredVideos.filter(video => {
        return video.owner.firstName.toLowerCase().includes(query.ownerName.toLowerCase())
      })
    }

    return filteredVideos
  }
}

export default new VideoController()
