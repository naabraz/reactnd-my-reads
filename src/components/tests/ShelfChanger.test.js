import React from 'react'
import sinon from 'sinon'
import { shallow } from './enzyme'

import ShelfChanger from '../ShelfChanger'

describe('List Shelves component test', () => {
  let wrapper
  let book = {id: '123', imageLinks: {thumbnail: 'img.com'}, shelf: 'Want To Read', title: 'Star Wars', authors: ['George Lucas']}
  const changeShelfBook = () => sinon.stub()
  const addToShelf = () => sinon.stub()

  beforeEach(() => {
    Object.defineProperty(window.location, 'pathname', {
      writable: true,
      value: '/search'
    })

    wrapper = shallow(<ShelfChanger book={book} addToShelf={addToShelf} changeShelfBook={changeShelfBook} />)
  })

  it('renders Shelf component', () => {
    expect(wrapper.find('.book-shelf-changer')).toBeDefined()
  })

  it('should render select with value as book shelf', () => {
    expect(wrapper.find('select[value="Want To Read"]')).toHaveLength(1)
  })

  it('should render select with move as value when is not search', () => {
    delete(book).shelf

    Object.defineProperty(window.location, 'pathname', {
      writable: true,
      value: '/'
    })

    wrapper = shallow(<ShelfChanger book={book} addToShelf={addToShelf} changeShelfBook={changeShelfBook} />)

    expect(wrapper.find('select[value="move"]')).toHaveLength(1)
  })

  it('should render select with move as value when is a search', () => {
    delete(book).shelf

    Object.defineProperty(window.location, 'pathname', {
      writable: true,
      value: '/search'
    })

    wrapper = shallow(<ShelfChanger book={book} addToShelf={addToShelf} changeShelfBook={changeShelfBook} />)

    expect(wrapper.find('select[value="none"]')).toHaveLength(1)
  })

})