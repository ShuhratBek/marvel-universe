import httpStatus from 'http-status'

export default class Controller {
  constructor(facade) {
    this.facade = facade
  }

  /**
   * Create {Entity}
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async create(req, res, next) {
    try {
      res.status(httpStatus.CREATED).json(await this.facade.create(req.body))
    } catch (err) {
      next(err)
    }
  }

  /**
   * Find {Entity}
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async find(req, res, next) {
    try {
      res.status(httpStatus.OK).json(await this.facade.find(req.query))
    } catch (err) {
      next(err)
    }
  }

  /**
   * Find One {Entity}
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async findOne(req, res, next) {
    try {
      res.sendStatus(httpStatus.OK).json(await this.facade.findOne(req.query))
    } catch (err) {
      next(err)
    }
  }

  /**
   * Find by Is {Entity}
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async findById(req, res, next) {
    try {
      const data = await this.facade.findById(req.params.id)
      if (!data) return res.sendStatus(httpStatus.NOT_FOUND)
      res.status(httpStatus.OK).json(data)
    } catch(err) {
      next(err)
    }
  }

  /**
   * Update {Entity}
   * @param req
   * @param res
   * @param next
   * @returns {Promise<*>}
   */
  async update(req, res, next) {
    try {
      const results = await this.facade.update({_id: req.params.id}, req.body)
      if (results.n < 1) {
        return res.sendStatus(httpStatus.NOT_FOUND)
      }
      if (results.nModified < 1) {
        return res.sendStatus(httpStatus.NOT_MODIFIED)
      }
      const data = await this.facade.findById(req.params.id)
      if (!data) return res.sendStatus(httpStatus.NOT_FOUND)
      res.status(httpStatus.OK).json(data)
    } catch(err) {
      next(err)
    }
  }

  /**
   * Remove {Entity}
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async remove(req, res, next) {
    try {
      const data = await this.facade.remove({_id: req.params.id})
      if (!data) res.sendStatus(httpStatus.OK)
      res.status(httpStatus.OK).json(data)
    } catch(err) {
      next(err)
    }
  }
}
