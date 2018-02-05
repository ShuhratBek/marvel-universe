// Load .env settings into process.env
// Will fail silently if no .env file present.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// Load our own defaults which will grab from process.env
const defaults = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/marvel',
    debug: process.env.MONGOOSE_DEBUG || false
  },
  logger: {
    level: 'info',
    format: 'tiny'
  }
}

// Load environment-specific settings
let config = {};

try {
  // The environment file might not exist
  config = require(`./${defaults.env}`);
  config = config || {};
} catch (err) {
  config = {};
}

export default Object.assign(defaults, config)
