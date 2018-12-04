import React from 'react'
import sinon from 'sinon'
import { mount } from '../config/enzyme'

import Book from './Book'

describe('Book component test', () => {
  let wrapper
  let book = {id: '123', title: 'Star Wars', imageLinks: {thumbnail: 'img.com'}, authors: ['George Lucas']}

  beforeEach(() => {
    const changeShelfBook = () => sinon.stub()
    const addShelf = () => sinon.stub()

    wrapper = mount(<Book book={book} changeShelfBook={changeShelfBook} addShelf={addShelf} />)
  })

  it('renders Book component', () => {
    expect(wrapper.find('.book')).toBeDefined()
  })

  it('renders Book thumbnail', () => {
    const thumbnail = <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>

    expect(wrapper.contains(thumbnail)).toBeTruthy()
  })
})