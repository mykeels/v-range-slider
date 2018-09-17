/*!
 * v-range-slider v0.0.8
 * https://github.com/mykeels/v-range-slider
 *
 * @license
 * Copyright (c) 2016-2018 mykeels
 * Released under the MIT license
 * https://github.com/mykeels/v-range-slider/blob/master/LICENSE
 */
'use strict';

/* global window, document */

var DocumentEventHelper = {
  created: function created() {
    if (typeof document === 'undefined') return;
    forEachListener(this, function (key, listener) {
      on(document, key, listener);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof document === 'undefined') return;
    forEachListener(this, function (key, listener) {
      off(document, key, listener);
    });
  }
};

var isBrowser = typeof window !== 'undefined';

var hasPassive = isBrowser && function () {
  var supported = false;

  try {
    var desc = {
      get: function get() {
        supported = true;
      }
    };
    var opts = Object.defineProperty({}, 'passive', desc);

    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
  } catch (e) {
    supported = false;
  }

  return supported;
}();

function forEachListener(vm, f) {
  var events = vm.$options.events;
  Object.keys(events).forEach(function (key) {
    f(key, function (event) {
      return events[key].call(vm, event);
    });
  });
}

function on(el, name, fn) {
  var options = hasPassive ? { passive: false } : undefined;
  el.addEventListener(name, fn, options);
}

function off(el, name, fn) {
  var options = hasPassive ? { passive: false } : undefined;
  el.removeEventListener(name, fn, options);
}

function relativeMouseOffset(offset, base) {
  var bounds = base.getBoundingClientRect();
  return {
    left: offset.clientX - bounds.left,
    top: offset.clientY - bounds.top
  };
}

function round(value, min, max, step) {
  if (value <= min) {
    return min;
  }

  var roundedMax = Math.floor((max - min) / step) * step + min;
  if (value >= roundedMax) {
    return roundedMax;
  }

  var normalize = (value - min) / step;
  var decimal = Math.floor(normalize);
  var fraction = normalize - decimal;

  if (fraction === 0) return value;

  if (fraction < 0.5) {
    return step * decimal + min;
  } else {
    return step * (decimal + 1) + min;
  }
}

var DragHelper = {
  mixins: [DocumentEventHelper],

  props: {
    targetSelector: String,
    disabled: Boolean
  },

  data: function data() {
    return {
      isDrag: false
    };
  },


  watch: {
    target: 'bindTarget'
  },

  mounted: function mounted() {
    this.bindTarget();
  },


  events: {
    mousedown: function mousedown(event) {
      return this.dragStart(event, this.offsetByMouse);
    },
    mousemove: function mousemove(event) {
      return this.dragMove(event, this.offsetByMouse);
    },
    mouseup: function mouseup(event) {
      return this.dragEnd(event, this.offsetByMouse);
    },
    touchstart: function touchstart(event) {
      return this.dragStart(event, this.offsetByTouch);
    },
    touchmove: function touchmove(event) {
      return this.dragMove(event, this.offsetByTouch);
    },
    touchend: function touchend(event) {
      return this.dragEnd(event, this.offsetByTouch);
    },
    touchcancel: function touchcancel(event) {
      return this.dragEnd(event, this.offsetByTouch);
    }
  },

  methods: {
    bindTarget: function bindTarget() {
      this.target = this.$el.querySelector(this.targetSelector) || this.$el;
    },
    offsetByMouse: function offsetByMouse(event) {
      return relativeMouseOffset(event, this.$el);
    },
    offsetByTouch: function offsetByTouch(event) {
      var touch = event.touches.length === 0 ? event.changedTouches[0] : event.touches[0];
      return relativeMouseOffset(touch, this.$el);
    },
    dragStart: function dragStart(event, f) {
      if (this.disabled || this.target !== event.target) return;
      event.preventDefault();
      this.isDrag = true;
      this.$emit('dragstart', event, f(event), this.target);
    },
    dragMove: function dragMove(event, f) {
      if (!this.isDrag) return;
      event.preventDefault();
      this.$emit('drag', event, f(event), this.target);
    },
    dragEnd: function dragEnd(event, f) {
      if (!this.isDrag) return;
      event.preventDefault();
      this.isDrag = false;
      this.$emit('dragend', event, f(event), this.target);
    }
  },

  render: function render() {
    return this.$slots.default && this.$slots.default[0];
  }
};

var popover = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "popover-container bottom", style: { 'margin-left': _vm.marginLeft + 'px' }, attrs: { "id": "popover-default" } }, [_c('div', [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  props: {
    'percentValue': Number
  },
  computed: {
    marginLeft: function marginLeft() {
      return this.percentValue <= 6 ? this.percentValue / 6 * -30 : Math.min(-30, -30 - Math.floor((this.percentValue - 75 || 0) / 25 * 120));
    }
  }
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var RangeSlider = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { ref: "elem", staticClass: "range-slider", class: { disabled: _vm.disabled }, on: { "mousedown": _vm.shiftKnob } }, [_c('drag-helper', { attrs: { "target-selector": ".range-slider-knob", "disabled": _vm.disabled }, on: { "drag": _vm.drag, "dragend": _vm.dragEnd } }, [_c('span', { ref: "inner", staticClass: "range-slider-inner" }, [_c('input', { staticClass: "range-slider-hidden", attrs: { "type": "text", "name": _vm.name, "disabled": _vm.disabled }, domProps: { "value": _vm.actualValue } }), _vm._v(" "), _c('span', { staticClass: "range-slider-rail" }), _vm._v(" "), _c('span', { staticClass: "range-slider-fill", style: { width: _vm.valuePercent + '%' } }), _vm._v(" "), _c('span', { staticClass: "range-slider-knob", style: { left: _vm.valuePercent + '%' } }, [_vm._t("knob", null, { value: _vm.actualValue, min: _vm._min, max: _vm._max }), _vm._v(" "), !_vm.noPopover ? _c('popover', { attrs: { "percent-value": _vm.valuePercent } }, [_vm._t("popover", [_c('h4', [_vm._v(_vm._s(_vm.actualValue))])], { value: _vm.actualValue, min: _vm._min, max: _vm._max })], 2) : _vm._e()], 2), _vm._v(" "), !_vm.noCalibration ? _c('span', { staticClass: "range-slider-calibration" }, _vm._l(_vm.calibrationOffsets, function (offset) {
      return _c('span', { key: offset, staticClass: "calibration-item", style: { left: offset + '%' } }, [_c('div', [_vm._v("|")]), _vm._v(" "), _c('span', { staticClass: "calibration-knob" }, [_vm._v(_vm._s((offset / 100 * (_vm._max - _vm._min) + _vm._min).toLocaleString('en')))])]);
    })) : _vm._e()])])], 1);
  }, staticRenderFns: [],
  props: {
    name: String,
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      default: 100
    },
    step: {
      type: [String, Number],
      default: 1
    },
    noPopover: {
      type: Boolean,
      default: false
    },
    noCalibration: {
      type: Boolean,
      default: false
    },
    calibrationCount: {
      type: Number,
      default: 10
    }
  },

  data: function data() {
    return {
      actualValue: null
    };
  },
  created: function created() {
    var min = this._min,
        max = this._max;

    var defaultValue = Number(this.value);

    if (this.value == null || isNaN(defaultValue)) {
      if (min > max) {
        defaultValue = min;
      } else {
        defaultValue = (min + max) / 2;
      }
    }

    this.actualValue = this.round(defaultValue);
  },


  computed: {
    _min: function _min() {
      return Number(this.min);
    },
    _max: function _max() {
      return Number(this.max);
    },
    _step: function _step() {
      return Number(this.step);
    },
    valuePercent: function valuePercent() {
      return (this.actualValue - this._min) / (this._max - this._min) * 100;
    },
    calibrationOffsets: function calibrationOffsets() {
      var _this = this;

      //this can definitely be improved
      return [0].concat(toConsumableArray('0'.repeat(this.calibrationCount).split('').map(function (c, i) {
        return i + 1;
      }))).map(function (i) {
        return i / _this.calibrationCount * 100;
      });
    }
  },

  watch: {
    value: function value(newValue) {
      var value = Number(newValue);
      if (newValue != null && !isNaN(value)) {
        this.actualValue = this.round(value);
      }
    },
    min: function min() {
      this.actualValue = this.round(this.actualValue);
    },
    max: function max() {
      this.actualValue = this.round(this.actualValue);
    }
  },

  methods: {
    drag: function drag(event, offset) {
      var offsetWidth = this.$refs.inner.offsetWidth;

      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth));
      this.emitEvent(this.actualValue);
    },
    dragEnd: function dragEnd(event, offset) {
      var offsetWidth = this.$refs.inner.offsetWidth;

      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth));
      this.emitEvent(this.actualValue, true);
    },
    emitEvent: function emitEvent(value, isDragEnd) {
      this.$emit('input', value);
      if (isDragEnd) {
        this.$emit('change', value);
      }
    },
    valueFromBounds: function valueFromBounds(point, width) {
      return point / width * (this._max - this._min) + this._min;
    },
    round: function round$$1(value) {
      return round(value, this._min, this._max, this._step);
    },
    shiftKnob: function shiftKnob(e) {

      if (['range-slider', 'range-slider-inner', 'range-slider-fill', 'range-slider-rail'].some(function (c) {
        return e.path[0].classList.contains(c);
      })) {
        var x = e.pageX - this.$refs.elem.offsetLeft;

        var percent = Math.floor(x / this.$refs.elem.offsetWidth * 100);

        this.actualValue = this.round(percent / 100 * (this._max - this._min) + this._min);

        this.emitEvent(this.actualValue, true);

        console.log(e);
      }
    }
  },

  components: {
    DragHelper: DragHelper,
    popover: popover
  },

  mounted: function mounted() {}
};

module.exports = RangeSlider;
