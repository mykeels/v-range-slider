<template>
    <div id="popover-default" class="popover-container bottom" :style="{ 'margin-left': `${marginLeft}px` }">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
      props: {
        'percentValue': Number
      },
      computed: {
        marginLeft () {
          return this.percentValue <= 6 ? (this.percentValue / 6 * -30) : Math.min(-30, -30 - Math.floor(((this.percentValue - 75) || 0) / 25 * 140))
        }
      }
    }
</script>

<style>
    .popover-container {
        margin-top: 30px;
        width: 180px;
        margin-left: -30px;
        border: 1px solid #21fb92;
        padding: 5px;
        background: white;
    }

    .popover-container::before {
        content: "";
        width: 0px;
        height: 0px;
        border: 0.8em solid transparent;
        position: absolute;
        pointer-events: none;
    }

    .popover-container.bottom::before {
        left: -20%;
        top: 7px;
        border-bottom: 10px solid #21fb92;
    }

    .popover {
        position: relative;
    }
</style>