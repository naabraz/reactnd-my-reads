import React from 'react'
import sinon from 'sinon'
import { mount } from './enzyme'
import { Route, BrowserRouter } from 'react-router-dom'

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
    )
  })
})
