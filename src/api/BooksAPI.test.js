import '../config/enzyme'

jest.mock('./BooksAPI')

const BooksAPI = require('../api/BooksAPI')

describe('Books API test', () => {

  it('should get book details', () => {
    const book = {title: 'Star Wars'}

    return BooksAPI.get(2).then(data => {
      expect(data).not.toBe(null)
    })
  })

})