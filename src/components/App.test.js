import React from 'react'
import sinon from 'sinon'
import { mount } from '../config/enzyme'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'

import * as BooksAPI from '../api/BooksAPI'

import App from './App'

describe('App component test', () => {
  let wrapper

  beforeEach(() => {
    BooksAPI.getAll = jest.fn().mockImplementation(() => Promise.resolve([ {title: 'Star Wars'}, {title: 'Kotlin'} ]))
    BooksAPI.update = jest.fn().mockImplementation(() => Promise.resolve(true))

    wrapper = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ).setState({ books: [] })
  })

  it('renders List Shelves component', () => {
    expect(wrapper.find('.list-books')).toBeDefined()
  })

  it('should render Search component when search route', () => {
    wrapper = mount(
      <BrowserRouter>
        <MemoryRouter initialEntries={[ '/search' ]}>
          <App />
        </MemoryRouter>
      </BrowserRouter>
    )

    expect(wrapper.find('.search-books')).toBeDefined()
  })

  it('changeshelfbook should work', () => {
    const changeShelfBook = sinon.spy(App.prototype, 'changeShelfBook')

    changeShelfBook('Want To Read', { title: 'Star Wars' })
    expect(wrapper.find('.search-books')).toBeDefined()
  })
})