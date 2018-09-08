import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'

import { isOfTypeNumberOrArrayWithLength } from './proptypes-helpers'
import constants, { EMPTY_STRING } from './constants'
import { omit, noop, capitalize } from './utils'

/**
  todo add the below props
  snap, animate, animationDuration, behaviour, ariaFormat, format, cssPrefix, cssClasses
**/

// todo test the slider for all the props

// todo destroy on unmount

export default class ReactNoUiSlider extends Component {
  sliderRef = createRef()

  static ALTERED_PROPS = ['orientation', 'direction'];

  static EVENTS = ['start', 'slide', 'update', 'change', 'set', 'end']

  static omitAlteredProps = (props) => omit(props, ReactNoUiSlider.ALTERED_PROPS)

  static propTypes = {
    className: PropTypes.string,
    margin: PropTypes.number,
    limit: PropTypes.number,
    step: PropTypes.number,
    rtl: PropTypes.bool,
    vertical: PropTypes.bool,
    disabled: PropTypes.bool,
    onStart: PropTypes.func,
    onSlide: PropTypes.func,
    onUpdate: PropTypes.func,
    onChange: PropTypes.func,
    onSet: PropTypes.func,
    onEnd: PropTypes.func,
    padding: isOfTypeNumberOrArrayWithLength(2),
    start: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]).isRequired,
    connect: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.bool)]),
    tooltips: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.func])),
      PropTypes.bool,
      PropTypes.func
    ]),
    range: PropTypes.shape({
      min: PropTypes.arrayOf(PropTypes.number),
      max: PropTypes.arrayOf(PropTypes.number)
    }).isRequired
  }

  static defaultProps = {
    className: EMPTY_STRING,
    padding: 0,
    rtl: false,
    vertical: false,
    disabled: false,
    connect: false,
    onStart: noop,
    onSlide: noop,
    onUpdate: noop,
    onChange: noop,
    onSet: noop,
    onEnd: noop
  }

  componentDidMount() {
    this.createSlider()
  }

  componentDidUpdate(prevProps, prevState) {
    // todo get the diff or props and if the diff contains
    // 'margin', 'limit', 'step',  'range', 'pips', 'animate' and 'snap'
    // then update the nouislider else destroy and recreate the slider
    // currently recreating the slider on any prop change.
    this.destroy()
    this.createSlider()
  }

  createSlider = () => {
    const { current: el } = this.sliderRef
    this.slider = noUiSlider.create(el, this.getSliderOptions())
    this.bindSliderEvents()
    this.toggleSlider()
  }

  bindSliderEvents = () => {
    const events = ReactNoUiSlider.EVENTS
    events.forEach(event => this.slider.on(event, this.props[`on${capitalize(event)}`]))
  }

  destroySlider = () => {
    this.slider.destroy()
  }

  getSliderOptions = () => {
    const { rtl, vertical, ...remainingProps } = this.props
    return {
      orientation: vertical ? constants.VERTICAL : constants.HORIZONTAL,
      direction: rtl ? constants.RTL : constants.LTR,
      ...ReactNoUiSlider.omitAlteredProps(remainingProps)
    }
  }

  toggleSlider = () => {
    // todo accept array also as disabled and disbale only those handles.
    const { disabled } = this.props
    const { current: el } = this.sliderRef
    const handles = el.querySelectorAll('.noUi-origin')
    if (disabled) return handles.forEach(function(el) { el.setAttribute('disabled', true) })
    handles.forEach(function(el) { el.removeAttribute('disabled') })
  }

  render() {
    const { className } = this.props
    return <div ref={this.sliderRef} className={`${className} my-slider`} />
  }
}
