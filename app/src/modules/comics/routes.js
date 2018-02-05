import { Router } from 'express'
import Controller from './controller'

const router = Router()

router.route('/')
  .get((...args) => Controller.getAll(...args))

router.route('/:id')
  .get((...args) => Controller.getById(...args))

router.route('/search')
  .get((...args) => Controller.search(...args))

export default router
