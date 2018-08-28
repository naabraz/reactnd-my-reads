const noThumb = (books) => {
  books.map((books) => {
    return !books.imageLinks ? Object.assign(books, 
      { imageLinks: { thumbnail: 'http://via.placeholder.com/128x193?text=No%20Cover' } }) : Object.assign({}, books)
  })
}

const noAuthor = (books) => {
  books.map((books) => {
    return !books.authors ? Object.assign(books, { authors: [] }) : Object.assign({}, books)
  })
}

module.exports = { noThumb, noAuthor }