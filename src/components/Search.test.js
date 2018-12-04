import React from 'react'
import sinon from 'sinon'
import { mount, shallow } from '../config/enzyme'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'

import * as BooksAPI from '../api/BooksAPI'
import Search from './Search'

describe('Search component test', () => {
  let wrapper
  let books = [{id: '123'}, {id: '123'}]
  let changeShelfBook = () => sinon.stub()

  beforeEach(() => {
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

  it('should search books when an input query exists', () => {
    const mockResult = [{
      authors: ['Clay Farris Naff'],
      categories: ['Juvenile Nonfiction'],
      description: 'A collection of essays which present the history of astronomy.',
      id: '0gNAAQAAIAAJ',
      imageLinks: {smallThumbnail: 'img', thumbnail: 'img'},
      title: 'Astronomy'
    }]

    const handleChange = sinon.spy(Search.prototype, 'handleChange')
    const event = { target: { value: 'Star Wars' } }

    BooksAPI.search = jest.fn().mockImplementationOnce(() => Promise.resolve(mockResult))
    wrapper = shallow(<Search books={books} changeShelfBook={changeShelfBook} />)
    wrapper.find(DebounceInput).simulate('change', event)

    expect(handleChange.calledOnce).toEqual(true)
    expect(BooksAPI.search).toBeCalledWith('Star Wars')
  })

  it('should not search when input value doesnt exists', () => {
    const event = { target: { value: '' } }
    const clearSearch = sinon.spy(Search.prototype, 'clearSearch')
    
    wrapper = shallow(<Search books={books} changeShelfBook={changeShelfBook} />)
    wrapper.find(DebounceInput).simulate('change', event)

    expect(clearSearch.calledOnce).toEqual(true)
  })

  it('should show empty result when theres an error trying to search', () => {
    const event = { target: { value: 'Kotlin' } }
    
    wrapper = shallow(<Search books={books} changeShelfBook={changeShelfBook} />)
    BooksAPI.search = jest.fn().mockImplementationOnce(() => Promise.resolve({ error: 'T' }))
    wrapper.find(DebounceInput).simulate('change', event)

    expect(BooksAPI.search).toBeCalledWith('Kotlin')
  })
})
