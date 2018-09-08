import React, { Component } from 'react'

import ReactNoUiSlider from 'react-nouislider'

export default class App extends Component {
  render () {
    const range = { min: [0], max: [100] };
    return (
      <div>
        <ReactNoUiSlider
        start={[20, 80]}
        range={range}
        padding={12}
        onStart={() => console.log('start')}
        onSlide={() => console.log('slide')}
        onUpdate={() => console.log('update')}
        onChange={() => console.log('change')}
        onSet={() => console.log('set')}
        onEnd={() => console.log('end')}
        />
      </div>
    )
  }
}
