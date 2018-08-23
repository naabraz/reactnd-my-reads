import * as BooksAPI from './BooksAPI'

const changeShelfBook = (shelf, book) => {
  BooksAPI.update(book, shelf).then(() => this.componentDidMount())
}

module.exports = { changeShelfBook }