<template>
    <div class="affiliates">
        <AffiliatesCode />
        <AffiliatesStats />
        <AffiliatesReferred />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AffiliatesCode from '@/components/affiliates/AffiliatesCode';
    import AffiliatesStats from '@/components/affiliates/AffiliatesStats';
    import AffiliatesReferred from '@/components/affiliates/AffiliatesReferred';

    export default {
        name: 'Affiliates',
        metaInfo: {
            title: 'Affiliates - RBXBandit.com'
        },
        components: {
            AffiliatesCode,
            AffiliatesStats,
            AffiliatesReferred
        },
        methods: {
            ...mapActions(['affiliatesGetDataSocket']),
        },
        computed: {
            ...mapGetters(['affiliatesData'])
        },
        created() {
            if(this.affiliatesData.loading === false) {
                const data = {};
                this.affiliatesGetDataSocket(data);
            }
        }
    }
</script>

<style scoped>
    .affiliates {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 65px 10px 45px 10px;
    }

    @media only screen and (max-width: 1150px) {

        .affiliates {
            padding: 25px 10px 45px 10px;
        }

    }
</style>
