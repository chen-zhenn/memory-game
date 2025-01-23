<script>
export default {
    name: "display-ranking",
    props: {
        ranking: {
        type: Array,
        required: false,
        default: [],
    }
  },
}
</script>

<template>
    <aside class="display -ranking ranking">
        <div class="ranking-container">
            <ul class="ranking-list">
                <li 
                    class="ranking-list__item" 
                    v-for="player in ranking"
                >
                    <span>{{ player.name }} | </span>
                    <span>{{ player.score }} pontos</span>
                </li>
            </ul>
        </div>
    </aside>
</template>

<style scoped lang="sass">

.display

  &.-ranking
    display: flex
    height: 100%

.ranking

    &-container
        width: 100%

    &-list
        list-style-type: none
        display: flex
        justify-content: space-around
        width: 100%
        color: rgba(255,255, 255, 1)
        transform: translate3d(0, 10px, 0)

</style>