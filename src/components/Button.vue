<script>

export default {
    name: "button",
    props: {
        label: {
            type: String,
            required: true,
        }
    }
}

</script>

<template>
    <div class="button">
        <i class="button-icon"></i>
        <span class="button-label">Iniciar</span>
    </div>
</template>

<style scoped lang="sass">

.button
  position: relative
  display: flex
  justify-content: center
  padding: 1rem
  border-radius: 33px
  color: rgba(255,255, 255, 1) 
  background-color: rgba(16, 11, 10, 1)
  cursor: pointer

  &-label
    color: inherit
    font-weight: 600
    text-transform: uppercase

</style>