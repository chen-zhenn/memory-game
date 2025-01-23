<script>

export default {
    name: "display-performance",
}

</script>

<template>
    <aside class="display -performance">

        <section class="display-section">
            <div class="counter">
                <div class="counter-time">[ mm:ss ]</div>
            </div>
        </section>

        <section class="display-section">
            <div class="progress">
                <div class="progress-bar -circle">[ progress ]</div>
            </div>
        </section>

    </aside>
</template>

<style scoped lang="sass">

.display

  &.-performance
    display: flex
    position: relative
    height: 100%
    text-align: center
    justify-content: space-around
    align-items: center

</style>