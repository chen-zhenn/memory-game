<script>

import Button from '../components/Button.vue'

export default {
    name: "bl-content",
    props: {
        actionView: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    components: {
        Button, 
    },
}

</script>

<template>
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

            <div class="content-section__action" v-if="actionView">
                <Button  label="Iniciar" />
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