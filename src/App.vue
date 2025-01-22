<script>
export default {
  data() {
    return {
      player: [],
      cardList : [],
      ranking: [],
    }
  }
}
</script>

<template>

  <div class="bl-wrap">

    <div class="bl-board">

      <header class="bl-header">
        Header
      </header>
      
      <aside class="canvas  card">
        <div class="card-container">
          <div class="card-grid">
            <article class="card-grid__item" v-for="card in cardList">

              <figure class="card-grid__image -back">
                <img :src="card.image.back" alt="Card Image">
              </figure>

              <figure class="card-grid__image -front">
                <img src="./assets/db-front.png" alt="Card Image">
              </figure>

            </article>
          </div>
        </div>
      </aside>

      <main class="bl-content">
        <header>
          <h3>Jogo da memória</h3>
        </header>
      </main>

      <footer class="bl-footer">
        Footer
      </footer>
    </div>

  </div>

</template>

<style scoped lang="sass">

.bl

  &-wrap
    position: relative
    display: flex
    width: 100%
    height: 100vh
    background-color: rgba(16, 11, 10, 1)

  &-board
    position: relative
    display: flex
    flex-wrap: wrap
    width: 94%
    height: 90%
    margin: auto
    background-color: rgba(229, 225, 201, 1)
    background-color: rgba(222, 221, 212, 1)
    border-radius: 30px

    &:before,
    &:after
      content: ''
      position: absolute
      background-color: rgba(16, 11, 10, 1)

    &:before
      top: 0px
      left: 50%
      width: 40%
      height: 8%
      margin-left: -20%
      border-radius: 0px 0px 100px 100px
      z-index: 999

    &:after
      bottom: -20px
      right: -10px
      width: 70%
      height: 10%
      border-radius: 90px 60px 0 0

  &-header,
  &-footer
    z-index: 999

  &-header
    position: absolute
    left: 50%
    width: 40%
    margin-left: -20%
    color: rgba(255, 255, 255, 1)
 
  &-content
    flex-grow: 1
    align-content: center

  &-footer
    width: 70%
    margin-left: auto
    color: rgba(255, 255, 255, 1)

.canvas
  
  &.card
    position: relative
    display: flex
    flex-flow: column
    justify-content: center
    width: 60%
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
    z-index: 99

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
