<script>

export default {
    name: "canvas",
    props: {
        formView: {
            type: Boolean,
            required: true,
            default: true,
        }
    }
}

</script>

<template>
    <aside class="canvas  card">

        <div class="card-container">

            <div class="card-form" v-if="formView">
                <slot name="canvas-form"></slot>
            </div>

            <slot name="canvas-grid"></slot>
        </div>
  >
    </aside>
</template>

<style scoped lang="sass">

.canvas
  
  &.card
    position: relative
    display: flex
    flex-flow: column
    justify-content: center
    width: 60%
    height: 100%

    &-grid
        height: 100%

    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 80%
      height: 100%
      transform: translate3d(50px, 0, 0)
      background-color: rgba(243, 180, 60, 95)

.card

    &-container
        position: relative
        width: 100%
        height: 80%
        padding: 1rem
        z-index: 999

    &-form
        height: 100%

</style>