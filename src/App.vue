<script>

import { defineAsyncComponent } from 'vue'

const { 
  VITE_LOCAL_API,
  VITE_PUBLIC_API, 
} = import.meta.env

import Header from './Layout/Header.vue'
import Content from './Layout/Content.vue'
import Footer from './Layout/Footer.vue'

import Canvas from './components/Canvas.vue'

export default {
  components: {
    Header,
    Content,
    Footer,
    DisplayPerformance: defineAsyncComponent(() => import('./components/DisplayPerformance.vue')),
    DisplayRanking: defineAsyncComponent(() => import('./components/DisplayRanking.vue')),
    CardGrid: defineAsyncComponent(() => import('./components/CardGrid.vue')),
    FormMain: defineAsyncComponent(() => import('./components/Form.vue')),
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
      attemptsRatio: 0,
      timeRatio: 0,
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
    handleChangeStatusGame(status, player) {

      if(player) this.loadPlayersData()

      if(!this.cardList.length) {
        this.status = 'aborted'
        return
      }

      this.status = status

    },
    handleRoundTime(time) {
      this.time = time
      this.handleTimesRatio()
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
    handleAttemptsRatio() {
      const totalAmountPairs = 10
      const attemptsRatio = this.attempts / totalAmountPairs
      this.attemptsRatio = attemptsRatio
    },
    handleTimesRatio() {
      const totalAmountPairs = 10
      const [minutes, seconds] = this.time
        .split(':')
        .map(Number)
      const totalSeconds = (minutes * 60) + seconds
      const timeRatio = totalSeconds / totalAmountPairs
      this.timeRatio = timeRatio
    },
    handleScoreTotal() {
      const PA = 0.7
      const PT = 0.3
      const scoreTotal = Math.floor(((this.attemptsRatio * PA) + (this.timeRatio * PT)) * 10)
      this.score = scoreTotal 
      this.updatePlayerData()
    },
    resetRoundData() {
      this.attempts = 0
      this.score = 0
      this.time = 0
      this.attemptsRatio = 0
      this.timeRatio = 0
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
        }  
    },
    async updatePlayerData() {
      if(!this.playerData) 
        return this.resetRoundData()

      try {
        const response = await fetch(`${VITE_LOCAL_API}/players/${this.playerData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: this.score,
            })
        })

        if(response.ok || response.status === 200) {
          this.loadPlayersData()
          this.resetRoundData()
        
        } else {
         //
        }
      } catch (error) {
        //
      }

    },
  },
  watch: {

    timeRatio(newTimeRatio) {
      if(!newTimeRatio || !this.attemptsRatio) return
      this.handleScoreTotal()
    },

    status(newStatus, oldStatus) {
      if(newStatus === "finished") {
        this.handleAttemptsRatio()
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
            @player-registered="handleChangeStatusGame" 
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
