const treatNoThumb = (books) => {
  books.map((books) => {
    return !books.imageLinks ? Object.assign(books, { imageLinks: { thumbnail: '' } }) : Object.assign({}, books)
  })
}

const treatNoAuthor = (books) => {
  books.map((books) => {
    return !books.authors ? Object.assign(books, { authors: [] }) : Object.assign({}, books)
  })
}

module.exports = {treatNoAuthor, treatNoThumb}