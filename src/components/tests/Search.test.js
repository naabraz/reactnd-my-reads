import React from 'react'
import sinon from 'sinon'
import { mount } from './enzyme'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'

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

  it('should render Search component', () => {
    expect(wrapper.find('div.search-books').length).toBe(1)
  })

  it('should render Link component to close search', () => {
    expect(wrapper.find(Link).length).toBe(1)
    expect(wrapper.find('[to="/"]').length).toBe(1)
  })

  it('should search books', () => {
    const spy = jest.spyOn(Search.prototype, 'searchBooks')

    wrapper.setState({query: ''})
    expect(wrapper.find(DebounceInput).simulate('change', { target: { value: 'Star Wars' }}))
    //expect(wrapper.state('query')).toEqual('Star Wars')
    spy('Star Wars')
    expect(spy).toBeCalledWith('Star Wars')
  })
})
