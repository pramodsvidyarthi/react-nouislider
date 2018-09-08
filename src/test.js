import React from 'react'
import { render, cleanup } from 'react-testing-library'
import ReactNoUiSlider from './'

describe('ReactNoUiSlider', () => {
  afterEach(cleanup)

  it('is truthy', () => {
    expect(ReactNoUiSlider).toBeTruthy()
  })

  it('a slider is created using nouislider', () => {
    const range = { min: [40], max: [50] }
    const { container } = render(<ReactNoUiSlider start={40} range={range} />)
    expect(container.querySelector('.noUi-target')).toBeTruthy()
  })
})
