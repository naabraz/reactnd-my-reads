import React from 'react'
import sinon from 'sinon'
import { mount, shallow } from './enzyme'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'

import * as BooksAPI from '../../api/BooksAPI'
import Search from '../Search'

describe('Search component test', () => {
  let wrapper

  beforeEach(() => {
    const books = [{id: '123'}, {id: '123'}]
    const changeShelfBook = () => sinon.stub()

    wrapper = mount(
      <BrowserRouter>
        <Route exact path='/' render={() => (<Search books={books} changeShelfBook={changeShelfBook} />)}/>
      </BrowserRouter>
    ).setState({query: ''})
  })

  it('should render Search component', () => {
    expect(wrapper.find('div.search-books').length).toBe(1)
  })

  it('should render Link component to close search', () => {
    expect(wrapper.find(Link).length).toBe(1)
    expect(wrapper.find('[to="/"]').length).toBe(1)
  })

  it('should search books', () => {
    const mockResult = [{
      allowAnonLogging: false,
      authors: ["Clay Farris Naff"],
      averageRating: 2,
      canonicalVolumeLink: "https://books.google.com/books/about/Astronomy.html?hl=&id=0gNAAQAAIAAJ",
      categories: ["Juvenile Nonfiction"],
      description: "A collection of essays which present the history of astronomy.",
      id: "0gNAAQAAIAAJ",
      imageLinks: {smallThumbnail: "img", thumbnail: "img"},
      title: "Astronomy"
    }]

    BooksAPI.search = jest.fn().mockImplementationOnce(() => Promise.resolve(mockResult))

    const handleChange = sinon.spy(Search.prototype, 'handleChange')
    const event = { target: { name: 'search-input', value: 'Star Wars' } }

    const books = [{id: '123'}, {id: '123'}]
    const changeShelfBook = () => sinon.stub()
    wrapper = shallow(<Search books={books} changeShelfBook={changeShelfBook} />)

    wrapper.find(DebounceInput).simulate('change', event)

    expect(handleChange.calledOnce).toEqual(true)
  })
})
