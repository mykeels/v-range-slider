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
// you probably need to import built-in style
import 'v-range-slider/dist/v-range-slider.css'

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

### Overwrite Default Styles

v-range-slider is built with Sass for its styling. If you want to customize v-range-slider styles, you can easily do that by configuring Sass variables. Available variables can be seen in [the component file](src/RangeSlider.vue).

Example of making the slider knob larger:

```sass
// set the variable of the knob size
$knob-size: 30px;

// import the built-in v-range-slider style
@import '~v-range-slider/dist/v-range-slider.scss';
```

## License

MIT
