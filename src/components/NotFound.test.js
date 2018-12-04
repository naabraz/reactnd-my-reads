import React from 'react'
import { shallow } from '../config/enzyme'

import NotFound from './NotFound'

describe('Not Found test', () => {

  it('renders not found component', () => {
    const wrapper = shallow(<NotFound />)

    expect(wrapper.find('.not-found')).toBeDefined()
  })

  it('renders message when route not found', () => {
    const wrapper = shallow(<NotFound />)

    expect(wrapper.contains(<h1>404 Not Found :(</h1>)).toBeTruthy()
  })
})