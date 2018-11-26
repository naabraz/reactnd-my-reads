import React from 'react'
import sinon from 'sinon'
import { mount } from './enzyme'

import Shelf from '../Shelf'

describe('List Shelves component test', () => {
  let wrapper
  let books = [{id: '123', imageLinks: {thumbnail: 'img.com'}, title: 'Star Wars', authors: ['George Lucas']}]

  beforeEach(() => {
    const title = 'Reading'
    const changeShelfBook = () => sinon.stub()
    const options = []

    wrapper = mount(<Shelf books={books} options={options} changeShelfBook={changeShelfBook} title={title} />)
  })

  it('renders Shelf component', () => {
    expect(wrapper.find('.bookshelf')).toBeDefined()
  })

  it('renders Shelf title', () => {
    const shelfTitle = <h2 className="bookshelf-title">Reading</h2>

    expect(wrapper.contains(shelfTitle)).toBeTruthy()
  })

  it('renders Shelf books list', () => {
    expect(wrapper.find('.books-grid')).toHaveLength(books.length)
  })
})