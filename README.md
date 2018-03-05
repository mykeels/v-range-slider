# v-range-slider

Simple slider component of Vue.js

## Features

- Compatible with native `input[type="range"]` behavior
- `input`, `change` event support
- Touch device support

## Requirements

Vue >= 2.0

## Installation

```bash
npm install --save v-range-slider
```

## Usage

### Basic Usage

Import the v-range-slider component and use it in your components, such as:

```html
<template>
  <range-slider
    min="10"
    max="1000"
    step="10"
    v-model="sliderValue">
  </range-slider>
</template>

<script>
import RangeSlider from 'v-range-slider'

export default {
  data () {
    return {
      sliderValue: 50
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style>
/* in case you need to import the built-in styles */
@import '~v-range-slider/dist/v-range-slider.css';
</style>
```

### Available props

- `name` - name of the slider input.
- `value` - current value of the slider.
- `disabled` - if true, the slider value cannot be updated.
- `min` - minimum value of the slider.
- `max` - maximum value of the slider.
- `step` - granularity of the slider value. e.g. if this is 3, the slider value will be 3, 6, 9, ...
- `no-calibration` - turn off calibration
- `calibration-count` - determines how steps to split calibration into e.g. a min of 0 and max of 10 with a calibration count of 5 will use display `0, 2, 4, 6, 8, 10`
- `no-popover` - turn off popover functionality

### Available slots:

- `knob` - slot for replacing knob
- `popover` - slot for replacing popover

## License

MIT
