<script>

const { 
  VITE_LOCAL_API,
  VITE_PUBLIC_API, 
} = import.meta.env

export default {
  data() {
    return {
      players: [],
      cardList : [],
      userEmail: '',
      userName: '',
      notValidEmail: false,
      notValidName: false,
      status: 'waiting',
      attempts: 0
    }
  },
  computed: {
    ranking() {
      return this.players
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    },
    viewGame() {
      return this.status !== 'waiting' && this.status !== 'loading' ? true : false   
    }
  },
  methods: {
    handleCardFlip(event) {},
    handleSubmitUserData(event) {

      if(this.userName && this.userEmail) {
        this.players.push({ name: this.userName, score: 0 })
        this.status = 'ready'
        this.notValidEmail = false
        this.notValidName = false
        this.userEmail = ''
        this.userName = ''
      } else {
        this.notValidEmail = true
        this.notValidName = true
      }
    },
    shuffleDataList(list) {
      const data = list
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      return data
    },
    async loadPlayersData() {
      try {
          const data = await fetch(`${VITE_LOCAL_API}/players`)
          const players = await data.json()
          this.players = players
        } catch (error) {
          //
          console.log('=> errors: ', error)
        }
    },
    async loadCardsData() {
      try {
          const data  = await fetch(`${VITE_PUBLIC_API}/characters?limit=10`)
          const characterCards = await data.json()
          if(characterCards && !!characterCards?.items?.length) {
            const cardDataList = characterCards?.items
              ?.map(character => 
                ({ 
                  id: character?.id, 
                  title: character?.name, 
                  image: { front: './assets/db-front.png', back: character?.image }, 
                })
              )
              const duplicateDataList = [...cardDataList, ...cardDataList]
              const cardList = this.shuffleDataList(duplicateDataList)
              this.cardList = cardList
          }
        } catch (error) {
          //
          console.log('=> errors: ', error)
        }  
    },
  },
  mounted() {
    this.loadPlayersData()
    this.loadCardsData()
  }
}
</script>

<template>

  <div class="bl-wrap">

    <div class="bl-board">

      <header class="bl-header">

        <aside 
          class="display -performance" 
          v-if="viewGame"
        >

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

          <div 
            class="card-form" 
            v-if="!viewGame"
          >
            <form class="form" @submit.prevent="handleSubmitUserData">

              <fieldset class="form__group">
                
                <legend class="form__legend">
                  Entre com seus dados antes de iniciar o jogo
                </legend>
                
                <div class="form__control">
                  <label 
                  for="email" 
                  class="form__label"
                  >
                    Digite seu email
                  </label>
                  <input 
                    type="text" 
                    name="email" 
                    class="form__input"
                    :class="{ invalid: notValidEmail }"
                    placeholder="exemplo@email.com"
                    v-model.trim="userEmail" 
                  />
                  <p 
                    class="form__input_message" 
                    v-if="notValidEmail"
                  >
                    Preencha o campos com email válido
                  </p>
                </div>

                <div class="form__control">
                  <label 
                  for="name" 
                  class="form__label"
                  >
                    Digite seu nome
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    class="form__input"
                    :class="{ invalid: notValidName }"
                    placeholder="John Doe"
                    v-model.trim="userName" 
                  />

                  <p 
                      class="form__input_message" 
                      v-if="notValidName"
                  >
                      Preencha o campo com nome válido
                  </p>
                </div>

                <button class="form__button">
                  Enviar
                </button>

              </fieldset>
              
            </form>
          </div>
          
          <div 
            class="card-grid" 
            v-if="viewGame"
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
              <h2>Seja Bem Vindo!</h2>
            </hgroup>
          </header>

          <p class="content-section__description">
            Prepare-se para desafiar sua memória com os lendários guerreiros de Dragon Ball!
            Mostre que sua concentração está no nível de um Super Saiyajin.
          </p>
        </section>

        <section class="content-section">

          <div 
            class="content-section__action" 
            v-if="viewGame"
          >
            <div class="button">
              <i class="button-icon"></i>
              <span class="button-label">Iniciar</span>
            </div>
          </div>

        </section>

      </main>

      <footer class="bl-footer">
        
        <aside 
          class="display -ranking ranking" 
          v-if="viewGame"
        >
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
    // padding: 1rem
    z-index: 99

  &-form
    height: 100%

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
    transform: translate3d(0, 10px, 0)

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

.form
  position: relative
  display: flex
  flex-flow: column
  width: 80%
  height: 100%
  justify-content: center
  transform: translate3d(50px, 0, 0) 

  &__group
    display: flex
    flex-wrap: wrap
    gap: 1rem
    border: none

  &__legend
    margin-bottom: 3rem
    font-size: 1.5rem
    font-weight: 600
    color: rgba(16, 11, 10, 1)

  &__control
    text-align: left
    width: 100%

  &__label
    font-weight: 600
    transform: translate3d(0, 10px, 0)

  &__input
    width: 100%
    padding: .75rem
    font-size: 1rem
    border: none
    outline: none

    &.invalid
      border: 2px solid rgba(252, 54, 72, 1)

    &_message
      margin: unset
      font-weight: 600
      font-size: .85rem
      color: rgba(252, 54, 72, 1)

  &__button
    position: relative
    display: flex
    justify-content: center
    width: 100%
    padding: .75rem
    border-radius: 33px
    border: none
    outline: none
    font-weight: 600
    text-transform: uppercase 
    color: rgba(255,255, 255, 1)
    background-color: rgba(16, 11, 10, 1)
    cursor: pointer

</style>
