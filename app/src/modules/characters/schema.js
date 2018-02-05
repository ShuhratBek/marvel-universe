/**
 * Characters schema
 * @module Characters
 */

import mongoose from 'mongoose'
// import mongoosePaginate from 'mongoose-paginate'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  modified: Date,
  resourceURI: String,
  urls: [
    {
      type: {
        type: String
      },
      url: String
    }
  ],
  thumbnail: {
    path: String,
    extension: String
  },
  comics: {
    available: Number,
    returned: Number,
    collectionURI: String,
    items: [
      {
        id: Number,
        resourceURI: String,
        name: String
      }
    ]
  },
  stories: {
    available: Number,
    returned: Number,
    collectionURI: String,
    items: [
      {
        resourceURI: String,
        name: String,
        type: String
      }
    ]
  },
  events: {
    available: Number,
    returned: Number,
    collectionURI: String,
    items: [
      {
        resourceURI: String,
        name: String
      }
    ]
  },
  series: {
    available: Number,
    returned: Number,
    collectionURI: String,
    items: [
      {
        resourceURI: String,
        name: String
      }
    ]
  }
},
{
  collection: 'characters'
})

schema.index({'$**': 'text'})
// schema.plugin(mongoosePaginate)

export default schema
