<script>
export default {
  data() {
    return {
      player: [{
        id: 1, name: 'Player 1', score: 40
      }, {
        id: 2, name: 'Player 2', score: 20
      }, {
        id: 3, name: 'Player 3', score: 30
      }],
      cardList : [],
      status: 'loading',
      attempts: 0
    }
  },
  computed: {
    ranking() {
      return this.player.sort((a, b) => b.score - a.score)
    },
  },
  methods: {
    handleCardFlip(event) {}
  }
}
</script>

<template>

  <div class="bl-wrap">

    <div class="bl-board">

      <header class="bl-header">

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
        
      </header>
      
      <aside class="canvas  card">
        <div class="card-container">
          <div class="card-grid">
            <article 
              class="card-grid__item" 
              v-for="card in cardList"
              @click="handleCardFlip"
            >

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

      <main class="bl-content  content">
        
        <section class="content-section">
          
          <header class="content-section__header">
            <hgroup>
              <h1>Jogo da Memória</h1>
              <h2>Bem Vindo Jogo da memória!</h2>
            </hgroup>
          </header>

          <p class="content-section__description">
            Prepare-se para desafiar sua memória com os lendários guerreiros de Dragon Ball!
            Mostre que sua concentração está no nível de um Super Saiyajin.
          </p>
        </section>

        <section class="content-section">

          <div class="content-section__action">
            <div class="button">
              <i class="button-icon"></i>
              <span class="button-label">Iniciar</span>
            </div>
          </div>

        </section>

      </main>

      <footer class="bl-footer">
        
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
    overflow: hidden
    position: absolute
    z-index: 999

  &-header
    left: 50%
    width: 40%
    height: 8%
    margin-left: -20%
    color: rgba(255, 255, 255, 1)
    border-radius: 0px 0px 100px 100px
 
  &-content
    flex-grow: 1
    align-content: center
    max-width: 40%

  &-footer
    right: -10px
    bottom: -20px
    width: 70%
    height: 10%
    margin-left: auto
    color: rgba(255, 255, 255, 1)
    border-radius: 90px 60px 0 0

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

.content

  &-section

    &__action
      width: 300px
      margin: 0 auto

.display

  &.-performance,
  &.-ranking
    display: flex
    height: 100%

  &.-performance
    position: relative
    text-align: center
    justify-content: space-around
    align-items: center

.ranking

  &-container
    width: 100%

  &-list
    list-style-type: none
    display: flex
    justify-content: space-around
    width: 100%
    color: rgba(255,255, 255, 1)

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
