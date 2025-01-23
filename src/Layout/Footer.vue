<script>

export default {
    name: "bl-footer",
}

</script>

<template>
    <footer class="bl-footer">
        <slot></slot>
    </footer>
</template>

<style scoped lang="sass">

.bl

  &-footer
    overflow: hidden
    position: absolute
    right: -10px
    bottom: -20px
    width: 70%
    height: 10%
    margin-left: auto
    color: rgba(255, 255, 255, 1)
    border-radius: 90px 60px 0 0
    background-color: rgba(16, 11, 10, 1)
    z-index: 999

</style>