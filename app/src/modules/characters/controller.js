/**
 * Characters Controller
 * @module Characters
 */

import httpStatus from 'http-status'
import Controller from '../../common/controller'
import Facade from './facade'

class CharactersController extends Controller {
  constructor(facade) {
    super(facade)
  }

  /**
   * Find {Characters}
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async find(req, res, next) {
    req.query.page = +req.query.page || 1
    req.query.limit = +req.query.limit || 20
    try {
      const data = await this.facade.find(req.query)
      const total = await this.facade.count(this.facade.lastFind)
      res.status(httpStatus.OK).json({
        limit: req.query.limit,
        total,
        page: req.query.page,
        pages: Math.ceil(total / req.query.limit),
        data
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new CharactersController(Facade)
