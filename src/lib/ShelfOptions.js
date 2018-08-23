const getShelfOptions = (books) => books.map((book) => book.shelf).filter((elem, pos, arr) => arr.indexOf(elem) === pos)

const getOptionName = (option) => {
  return {
    'currentlyReading': 'Currently Reading',
    'read': 'Read',
    'wantToRead': 'Want To Read'
  }[option]
}

module.exports = { getShelfOptions, getOptionName }
