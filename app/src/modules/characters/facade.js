import Facade from '../../common/facade'
import Repository from './repository'

/**
 * Characters Facade
 */
class CharactersFacade extends Facade {

  constructor(Schema) {
    super(Schema)
    this.lastFind = {}
  }

  /**
   * Find {Characters}
   * @param query
   * @returns {Promise|*|RegExpExecArray}
   */
  find(query) {
    const search = query.search || ''
    const field = query.field || ''
    const gender = query.gender || ''
    const page = +query.page || 1
    const limit = +query.limit || 20
    const offset = (query.page - 1) * limit || 0
    const reality = query.reality || ''
    const find = {}
    let defaultSort = { 'name' : 1 }
    let projectFields = {}

    if (field) {
      // For a real name, we search both 'wiki.real_name' and 'wiki.alias'
      if (field === 'wiki.real_name') {
        find['$or'] = [
          {
            'wiki.real_name': {
              '$regex': search,
              '$options': 'i'
            }
          },
          {
            'wiki.alias': {
              '$regex': search,
              '$options': 'i'
            }
          }
        ]
      } else {
        find[field] = {
          '$regex' : search,
          '$options' : 'i'
        }
      }
    } else {
      // This builds a MongoDB full text search using the text index.
      find['$text'] = { '$search' : search }
      projectFields = { 'score': {'$meta': 'textScore'} }
      defaultSort = {'score': {'$meta':'textScore'}}
    }

    if (gender) {
      find['gender'] = gender
    }

    if (reality) {
      find['wiki.universe'] = reality
    }

    this.lastFind = find

    return this.Schema.find(find, projectFields)
      .sort(defaultSort)
      .skip(offset)
      .limit(limit)
      .exec()
  }
}

export default new CharactersFacade(Repository)
