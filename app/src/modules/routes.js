import { Router } from 'express'

import characters from './characters/routes'
import comics from './comics/routes'
// import user from './user/routes'
// import auth from './auth/routes'

const router = Router()

router.route('/').get((req, res) => {
  res.json({
    message: 'Welcome to Demo'
  })
})

router.use('/characters', characters)
router.use('/comics', comics)
// router.use('/user', user)
// router.use('/auth', auth)

export default router
