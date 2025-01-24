<script>

export default {
    name: "button",
    props: {
        label: {
            type: String,
            required: true,
            default: 'Iniciar'
        },
        warn: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
}

</script>

<template>
    <div 
        class="button"
        :class="{ '-warn': warn }" 
    >
        <i class="button-icon"></i>
        <span class="button-label">{{ label }}</span>
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

    &.-warn
        background-color: rgba(252, 54, 72, 1)
</style>