<script>

export default {
    name: "bl-header",
}

</script>

<template>
    <header class="bl-header">
        <slot></slot>
    </header>
</template>

<style scoped lang="sass">

.bl

  &-header
    overflow: hidden
    position: absolute
    top: 0
    left: 50%
    width: 40%
    height: 8%
    margin-left: -20%
    color: rgba(255, 255, 255, 1)
    border-radius: 0px 0px 100px 100px
    background-color: rgba(16, 11, 10, 1)
    transform: translate3d(0, -10px, 0)
    z-index: 999

</style>