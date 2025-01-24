<script>

import Button from '../components/Button.vue'

export default {
    name: "bl-content",
    props: {
        actionView: {
            type: Boolean,
            required: true,
            default: false,
        },
        gameStatus: {
            type: String,
            required: true,
            default: "ready",
        },
    },
    components: {
        Button, 
    },
    data() {
        return {
            title: 'Jogo da Memória',
            description: 'Prepare-se para desafiar sua memória com os lendários guerreiros de Dragon Ball! Mostre que sua concentração está no nível de um Super Saiyajin.',
            secondaryMessage: 'Seja Bem Vindo!',
            buttonLabel: 'Jogar'
        }
    },
    watch: {
        gameStatus(newStatus, oldStatus) {
            if (newStatus === "ready") {
                this.title = 'Jogo da Memória'
                this.description = 'Prepare-se para desafiar sua memória com os lendários guerreiros de Dragon Ball! Mostre que sua concentração está no nível de um Super Saiyajin.'
                this.secondaryMessage = 'Seja Bem Vindo!'
                this.buttonLabel = "Jogar"
            }
            if (newStatus === "active") this.buttonLabel = "Pausar"
            if (newStatus === "paused") this.buttonLabel = "Continuar"
            if (newStatus === "finished") {
                this.title = 'Parabéns, você venceu!'
                this.description = 'Você conseguiu memorizar todas as cartas. Quer tentar novamente e superar seu tempo anterior?'
                this.secondaryMessage = 'Ótimo trabalho!'
                this.buttonLabel = "Reiniciar"
            }
        },
    },
    methods: {
        handleControllerGame(){
            if(this.gameStatus === "ready") 
                this.$emit("start-game", "active")
            if(this.gameStatus === "active") 
                this.$emit("pause-game", "paused")
            if(this.gameStatus === "paused") 
                this.$emit("restart-game", "active")
            if(this.gameStatus === "finished") 
                this.$emit("end-game", "ready")
        },
    },
}

</script>

<template>
    <main class="bl-content  content">

        <section class="content-section">

            <header class="content-section__header">
                <hgroup>
                    <h1>{{ title }}</h1>
                    <h2>{{ secondaryMessage }}</h2>
                </hgroup>
            </header>

            <p class="content-section__description">
                {{ description }}
            </p>
        </section>

        <section class="content-section">

            <div 
                class="content-section__action" 
                v-if="actionView"
            >
                <Button 
                    :label="buttonLabel"
                    :warn="this.gameStatus === 'paused' || this.gameStatus === 'finished'" 
                    @click="handleControllerGame" 
                />
                
            </div>

        </section>

    </main>
</template>

<style scoped lang="sass">

.bl

  &-content
    flex-grow: 1
    align-content: center
    max-width: 40%

.content

  &-section

    &__action
      width: 300px
      margin: 0 auto

</style>