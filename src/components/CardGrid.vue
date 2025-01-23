<script>
export default {
  name: "card-grid",
  props: {
    cardList: {
      type: Array,
      required: false,
      default: [],
    }
  },
}
</script>

<template>
  <div 
    class="card-grid"
  >

    <article 
      class="card-grid__item" 
      v-for="card in cardList" 
      @click="handleCardFlip"
    >

      <figure class="card-grid__image -back">
        <img :src="card.image.back" alt="Card Image">
      </figure>

      <figure class="card-grid__image -front">
        <img src="../assets/db-front.png" alt="Card Image">
      </figure>

    </article>
  </div>
</template>

<style scoped lang="sass">

.card

  &-grid
    display: grid
    grid-template-columns: repeat(5, 1fr)
    grid-gap: 1.75rem
    height: 100%
    perspective: 1000px

    &__item
      display: flex
      position: relative
      justify-content: center
      align-items: center
      background-color: rgba(255,255, 255, 1)
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)
      transform: scale(1)
      transform-style: preserve-3d
      transition: transform .5s
      cursor: pointer

      &.-flip
        transform: scale(1) rotateY(180deg)

    &__image
      position: absolute
      display: flex
      margin: unset
      padding: .5rem
      backface-visibility: hidden
      transition: transform .33s ease-in-out

      &.-front

      &.-back
        transform: rotateY(180deg) scale(1)

        &:hover
          transform: rotateY(180deg) scale(1.1)

</style>