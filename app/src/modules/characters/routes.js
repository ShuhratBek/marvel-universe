import { Router } from 'express'
import CharactersController from './controller'

const router = Router()

router.route('/')
  /** GET /characters - Get list of characters */
  .get((...args) => CharactersController.find(...args))
  /** POST /characters - Create character */
  .post((...args) => CharactersController.create(...args))

router.route('/:id')
  /** PUT /characters/:id - Update character */
  .put((...args) => CharactersController.update(...args))
  /** GET /characters/:id - Get character */
  .get((...args) => CharactersController.findById(...args))
  /** DELETE /characters/:id - Remove character */
  .delete((...args) => CharactersController.remove(...args))

export default router
