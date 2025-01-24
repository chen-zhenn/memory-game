<script>

export default {
    name: "display-performance",
    props: {
        gameStatus: {
            type: String,
            required: true,
            default: "ready",
        },
        score: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    data() {
        return {
            counter: 0,
            timer: null,
        }
    },
    watch: {
        gameStatus(newStatus, oldStatus) {
            
            if (newStatus === "active") {
                this.startCounter()
            }
            if (newStatus === "paused") {
                this.pauseCounter()
            }
            if (newStatus === "finished") {
                this.resetCounter()
            }
        },
    },
    computed: {
        formattedTime() {
            const minutes = String(Math.floor(this.counter / 60)).padStart(2, '0')
            const seconds = String((this.counter % 60)).padStart(2, '0')
            const time = `${minutes}:${seconds}`
            return time
        },
        formattedProgress() {
            const totalAmountPairs = 10
            const progress = (this.score / totalAmountPairs) * 100
            return `${progress}%`
        },
    },
    methods: {
        startCounter() {
            if (!this.timer) {
                this.timer = setInterval(() => {
                    this.counter++;
                }, 1000)
            }
        },
        pauseCounter() {
            clearInterval(this.timer)
            this.timer = null
        },
        resetCounter() {
            const totalTime = this.formattedTime
            this.$emit("round-time", totalTime)
            this.pauseCounter()
            this.counter = 0
        },
    },
    beforeDestroy() {
        this.pauseCounter()
    },
}

</script>

<template>
    <aside class="display -performance">

        <section class="display-section">
            <div class="counter">
                <div class="display-item  counter-time">
                    <span class="display-item__label  counter-label">Tempo</span>
                    <span class="counter-value">{{ formattedTime }}</span>
                </div>
            </div>
        </section>

        <section class="display-section">
            <div class="progress">
                <div class="display-item  progress-bar -circle">
                    <span class="display-item__label  progress-label">Progresso</span>
                    <span class="progress-value">{{ formattedProgress }}</span>
                </div>
            </div>
        </section>

    </aside>
</template>

<style scoped lang="sass">

.display

    &-item
        display: flex
        flex-flow: column

        &__label
            font-weight: 600
            color: rgba(243, 180, 60, 95)

    &.-performance
        display: flex
        position: relative
        height: 100%
        text-align: center
        justify-content: space-around
        align-items: center
        
</style>