<script>

const { 
  VITE_LOCAL_API,
  VITE_PUBLIC_API, 
} = import.meta.env

import Header from './Layout/Header.vue'
import Content from './Layout/Content.vue'
import Footer from './Layout/Footer.vue'

import DisplayPerformance from './components/DisplayPerformance.vue'
import DisplayRanking from './components/DisplayRanking.vue'
import CardGrid from './components/CardGrid.vue'
import FormMain from './components/Form.vue'
import Canvas from './components/Canvas.vue'

export default {
  components: {
    Header,
    Content,
    Footer,
    DisplayPerformance,
    DisplayRanking,
    CardGrid,
    FormMain,
    Canvas,
  },
  data() {
    return {
      players: [],
      cardList : [],
      playerData: null, 
      status: 'waiting',
      attempts: 0,
      score: 0,
      time: 0,
    }
  },
  computed: {
    ranking() {
      return this.players
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    },
    viewGame() {
      return (this.status !== 'waiting' && this.status !== 'loading') ? true : false   
    }
  },
  methods: {
    handleChangeStatusGame(status) {
      this.loadPlayersData()
      if(!this.cardList.length) {
        this.status = 'aborted'
        return
      }

      this.status = status

    },
    handleRoundTime(time) {
      this.time = time
    },
    handleAttempCount() {
      this.attempts = this.attempts + 1 
    },
    handleScoreCount() {
      this.score = this.score + 1
      if(this.score < 10) return
      this.status = 'finished'
    },
    handlePlayerData(data) {
      this.playerData = data
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
              ?.map((character, index) => 
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
  watch: {
    status(newStatus, oldStatus) {
      if(newStatus === "finished") {
        //
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

      <Header>
        <display-performance 
          :game-status="status"
          :score="score"
          @round-time="handleRoundTime" 
          v-if="viewGame" 
        />
      </Header>
      
      <Canvas :form-view="!viewGame">
        <template v-slot:canvas-form>
          <form-main 
            @player-data="handlePlayerData"
            @player-registered="handleChangeStatusGame('ready')" 
          />
        </template>

        <template v-slot:canvas-grid>
          <card-grid 
            :cardList="cardList"
            :game-status="status" 
            @attempt-count="handleAttempCount"
            @score-count="handleScoreCount" 
            v-if="viewGame" 
          />
        </template>
      </Canvas>

      <Content 
        :actionView="viewGame"
        :game-status="status" 
        @start-game="handleChangeStatusGame"
        @pause-game="handleChangeStatusGame"
        @restart-game="handleChangeStatusGame"
        @end-game="handleChangeStatusGame" 
      />

      <Footer>
          <display-ranking 
            :ranking="ranking" 
            v-if="viewGame" 
          />
      </Footer>

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

</style>
