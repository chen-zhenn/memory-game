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
  data() {
    return {
      flippedCards: [],
      foundPairIds: []
    }
  },
  methods: {
    handleCardFlip(event, card){
      const target = event.currentTarget 
      const id = card.id
      const index = target.dataset.index
      const foundPair = this.foundPairIds.find(pair => pair.id === id)
      const cardFlipped = target.classList.contains('-flip') 

      if (foundPair || cardFlipped) return

      target.classList.add('-flip')

      if(this.flippedCards.length === 1) {
        const baseCard = this.flippedCards[0]
        const doubleCard = card

        this.$emit("attempt-count")

        if(baseCard.id === doubleCard.id) {
          this.flippedCards = []
          this.foundPairIds.push(baseCard.id)
          this.$emit("score-count")
          if(this.foundPairIds.length === 10) 
            setTimeout(() => this.resetCards(), 1000)
          return
          
        } else {
          const $currentCardElem = document.querySelector(`[data-index="${index}"]`)
          const $doubleCardElem = document.querySelector(`[data-index="${baseCard.index}"]`)
          this.flippedCards = []

          setTimeout(() => {
            $currentCardElem.classList.remove('-flip')
            $doubleCardElem.classList.remove('-flip')
          }, 1000)

          return
        }

      }

      this.flippedCards.push({ id, index })
    },
    resetCards() {
      const $cards = Array.from(document.querySelectorAll('.card-grid__item'))
      $cards.forEach(card => card.classList.remove('-flip'))
      this.flippedCards = []
      this.foundPairIds = []
    },
  },

}
</script>

<template>
  <div 
    class="card-grid"
  >

    <article 
      class="card-grid__item" 
      v-for="(card, index) in cardList"
      :key="index + 1"
      :data-index="index + 1"
      @click.stop="handleCardFlip($event, card)"
    >

      <figure class="card-grid__figure -back">
        <img 
          class="card-grid__image" 
          :src="card.image.back" 
        >
      </figure>

      <figure class="card-grid__figure -front">
        <img 
          class="card-grid__image" 
          src="../assets/db-front.png"
        >
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

    &__figure
      position: absolute
      display: flex
      margin: unset
      padding: .5rem
      backface-visibility: hidden
      transition: transform .33s ease-in-out

      &.-front

      &.-back
        max-height: 190px
        transform: rotateY(180deg) scale(1)

        &:hover
          transform: rotateY(180deg) scale(1.1)

    &__image
      object-fit: contain

</style>