import React from 'react'
import sinon from 'sinon'
import { mount } from './enzyme'
import { Route, BrowserRouter } from 'react-router-dom'

import ListShelves from '../ListShelves'

describe('List Shelves component test', () => {
  let wrapper

  beforeEach(() => {
    const books = [{id: '123'}, {id: '123'}]
    const changeShelfBook = () => sinon.stub()

    wrapper = mount(
      <BrowserRouter>
        <Route exact path='/' render={() => (<ListShelves books={books} changeShelfBook={changeShelfBook} />)}/>
      </BrowserRouter>
    )
  })

  it('renders List Shelves component', () => {

    expect(wrapper.find('.list-books')).toBeDefined()
  })

  it('List Shelves should render a title', () => {
    const title = <div className="list-books-title"><h1>MyReads</h1></div>

    expect(wrapper.contains(title)).toBeTruthy()
  })
})