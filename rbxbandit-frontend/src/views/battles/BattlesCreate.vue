<template>
    <div class="battles-create">
        <BattlesCreateFilters />

        <div class="create-select">
            <button v-on:click="modalsSetShow('BattlesSelect')" class="button-add">
                <div class="button-inner">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5858 4.42169H12V7.6506H7.5858V12H4.4142V7.6506H0V4.42169H4.4142V0H7.5858V4.42169Z" />
                    </svg>
                </div>
            </button>

            <BattlesBoxElement v-for="box of battlesGetBoxes" v-bind:key="box._id" v-bind:box="box" />
        </div>

        <BattlesCreateFooter />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import IconCursedGradient from '@/components/icons/IconCursedGradient';
    import IconTerminalGradient from '@/components/icons/IconTerminalGradient';
    import BattlesCreateFilters from '@/components/battles/BattlesCreateFilters';
    import BattlesCreateFooter from '@/components/battles/BattlesCreateFooter';
    import BattlesBoxElement from '@/components/battles/BattlesBoxElement';

    export default {
        name: 'BattlesCreate',
        components: {
            IconCursedGradient,
            IconTerminalGradient,
            BattlesCreateFilters,
            BattlesCreateFooter,
            BattlesBoxElement
        },
        methods: {
            ...mapActions([
                'modalsSetShow',
                'battlesResetFilter'
            ])
        },
        computed: {
            ...mapGetters([
                'battlesSelected'
            ]),
            battlesGetBoxes() {
                let boxes = [];

                for(const box of this.battlesSelected) {
                    if(boxes.some((element) => element._id === box._id) === false) { boxes.push(box); }
                }

                boxes.sort(function(a, b) { return b.amount - a.amount; });

                return boxes;
            }
        },
        beforeRouteLeave(to, from, next) {
            this.battlesResetFilter();
            next();
        }
    }
</script>

<style scoped>
    .battles-create {
        width: 100%;
    }

    .battles-create .create-filter {

    }

    .battles-create .create-select {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        padding: 20px 20px 12px 20px;
        background: #171717;
        border-radius: 10px;
        border: 1px solid hsla(0, 0%, 93%, 0.15);
        backdrop-filter: blur(2.5px);
    }

    .battles-create .create-select button.button-add {
        width: calc(16.66% - 6.66px);
        height: 260px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        margin-right: 8px;
        border-radius: 10px;
        background: #1f1f1f;
        border:2.5px solid hsla(0,0%,100%,.2);
    }

    .battles-create .create-select button.button-add .button-inner {
        width: 46px;
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: linear-gradient(223deg, rgba(27, 27, 27, 0.35) 0%, rgba(41, 41, 41, 0.1) 100%, rgba(31, 31, 31, 0.35) 100%);
        border: 1px solid #2c2c2c;
    }

    .battles-create .create-select button.button-add .button-inner svg {
        fill: #89898a;
        transition: fill 0.3s ease;
    }

    .battles-create .create-select button.button-add:hover .button-inner svg {
        fill: #ffffff;
    }

    @media only screen and (max-width: 1100px) {

        .battles-create .create-select button.button-add {
            width: calc(20% - 6.4px);
        }

    }

    @media only screen and (max-width: 950px) {

        .battles-create .create-select {
            padding: 10px 10px 2px 10px;
        }

        .battles-create .create-select button.button-add {
            width: calc(25% - 6px);
        }

    }

    @media only screen and (max-width: 750px) {

        .battles-create .create-select button.button-add {
            width: calc(33.33% - 5.33px);
        }

    }

    @media only screen and (max-width: 550px) {

        .battles-create .create-select button.button-add {
            width: calc(50% - 4px);
        }

    }
</style>