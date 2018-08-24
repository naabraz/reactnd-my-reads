const getShelfOptions = ['currentlyReading', 'read', 'wantToRead']

const getOptionName = (option) => {
  return {
    'currentlyReading': 'Currently Reading',
    'read': 'Read',
    'wantToRead': 'Want To Read'
  }[option]
}

module.exports = { getShelfOptions, getOptionName }
