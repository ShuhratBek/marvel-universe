export default class Facade {
  constructor(Schema) {
    this.Schema = Schema
  }

  /**
   * Create
   * @param body
   */
  create(body) {
    const schema = new this.Schema(body)
    return schema.save()
  }

  /**
   * Count
   * @param args
   * @returns {Promise|*|RegExpExecArray}
   */
  count(...args) {
    return this.Schema
      .find(...args)
      .count()
      .exec()
  }

  /**
   * Find
   * @param args
   * @returns {Promise|*|RegExpExecArray}
   */
  find(...args) {
    return this.Schema
      .find(...args)
      .exec()
  }

  /**
   * Find one
   * @param args
   * @returns {Promise}
   */
  findOne(...args) {
    return this.Schema
      .findOne(...args)
      .exec()
  }

  /**
   * Find by Id
   * @param args
   * @returns {Promise}
   */
  findById(...args) {
    return this.Schema
      .findById(...args)
      .exec()
  }

  /**
   * Update
   * @param args
   * @returns {Promise|*|RegExpExecArray}
   */
  update(...args) {
    return this.Schema
      .update(...args)
      .exec()
  }

  /**
   * Remove
   * @param args
   * @returns {Promise|*|RegExpExecArray}
   */
  remove(...args) {
    return this.Schema
      .remove(...args)
      .exec()
  }
}
