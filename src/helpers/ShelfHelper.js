const getShelfOptions = ['currentlyReading', 'read', 'wantToRead']

const getOptionName = (option) => {
  return {
    'currentlyReading': 'Currently Reading',
    'read': 'Read',
    'wantToRead': 'Want To Read'
  }[option]
}

const getCurrentShelf = (searchResult, shelfBooks) => {
  return shelfBooks.map((shelfBooks) => {
    return searchResult.map((searchBooks) => {
      return shelfBooks.id === searchBooks.id ? Object.assign(searchBooks, {shelf: shelfBooks.shelf}) : Object.assign({}, searchBooks)
    })
  })
}

module.exports = { getShelfOptions, getOptionName, getCurrentShelf }
