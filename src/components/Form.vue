<script>

const { 
  VITE_LOCAL_API, 
} = import.meta.env

export default {
    name: "form-main",
    data() {
        return {
            userEmail: '',
            userName: '',
            notValidEmail: false,
            notValidName: false,
        }
    },
    methods: {
        async handleSubmitUserData(event) {

            if (this.userName && this.userEmail) {
                await this.addPlayer()
            } else {
                this.notValidEmail = true
                this.notValidName = true
            }
        },
        async addPlayer() {
            try {
                const response = await fetch(`${VITE_LOCAL_API}/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.userName,
                    email: this.userEmail,
                    score: 0,
                })
            })

            if(response.ok || response.status === 201) {
                this.notValidEmail = false
                this.notValidName = false
                this.userEmail = ''
                this.userName = ''
                this.$emit("registered-player")
            } 
            } catch (error) {
                //
                console.log('=> error: ', error)
            }

        },
    }
}

</script>

<template>
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
</template>

<style scoped lang="sass">

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