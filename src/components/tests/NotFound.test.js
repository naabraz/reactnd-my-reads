import React from 'react'
import { shallow } from './enzyme'

import NotFound from '../NotFound'

describe('Not Found test', () => {

  it('renders not found component', () => {
    const wrapper = shallow(<NotFound />)

    expect(wrapper.find('.not-found')).toBeDefined()
  })
})