const treatNoThumb = (books) => {
  books.map((books) => {
    return !books.imageLinks ? Object.assign(books, 
      { imageLinks: { thumbnail: 'http://via.placeholder.com/128x193?text=No%20Cover' } }) : Object.assign({}, books)
  })
}

const treatNoAuthor = (books) => {
  books.map((books) => {
    return !books.authors ? Object.assign(books, { authors: [] }) : Object.assign({}, books)
  })
}

const getCurrentShelf = (searchResult, shelfBooks) => {
  return shelfBooks.map((shelfBooks) => {
    return searchResult.map((searchBooks) => {
      return shelfBooks.id === searchBooks.id ? Object.assign(searchBooks, {shelf: shelfBooks.shelf}) : Object.assign({}, searchBooks)
    })
  })
}

module.exports = { treatNoAuthor, treatNoThumb, getCurrentShelf }