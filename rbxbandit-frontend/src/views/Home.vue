<template>
    <div class="home">
        <div class="home-banner">

            <HomeBannerUser />
            <HomeBannerNews />

        </div>
        <div class="home-featured">
            <div class="featured-title">FEATURED</div>
            <div class="featured-content">

                <HomeFeaturedLink game="battles" />
                <HomeFeaturedLink game="crash" />
                <HomeFeaturedLink game="roll" />
                <HomeFeaturedLink game="duels" />

            </div>
        </div>
        <div class="home-games">
            <div class="games-title">ALL GAMES</div>
            <div class="games-content">

                <HomeGameElement game="cases" />
                <HomeGameElement game="blackjack" />
                <HomeGameElement game="mines" />
                <HomeGameElement game="towers" />
                <HomePlaceholderElement />
                <HomePlaceholderElement />
                <HomePlaceholderElement />

            </div>
        </div>

        <Bets />
    </div>
</template>

<script>
    import Bets from '@/components/bets/Bets';
    import HomeBannerUser from '@/components/home/HomeBannerUser';
    import HomeBannerNews from '@/components/home/HomeBannerNews'
    import HomeFeaturedLink from '@/components/home/HomeFeaturedLink';
    import HomeGameElement from '@/components/home/HomeGameElement';
    import HomePlaceholderElement from '@/components/home/HomePlaceholderElement';

    export default {
        name: 'Home',
        metaInfo: {
            title: 'RBXBandit: The Innovative Roblox Gambling Site'
        },
        components: {
            Bets,
            HomeBannerUser,
            HomeBannerNews,
            HomeFeaturedLink,
            HomeGameElement,
            HomePlaceholderElement,
        }
    }
</script>

<style scoped>
    .home {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 45px 10px;
    }

    .home .home-banner {
        width: 1250px;
        display: flex;
        flex-wrap: wrap;
    }

    .home .home-featured,
    .home .home-games {
        width: 1250px;
        position: relative;
        padding: 70px 0;
    }

    .home .home-featured {
        margin-top: 55px;
    }

    .home .home-games {
        padding: 65px 0 40px 0;
    }

    .home .home-featured::before,
    .home .home-games::before {
        
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(90deg, rgba(2, 25, 44, 0) 0%, #e70404 50%, rgba(2, 25, 44, 0) 100%);
        z-index: -1;
    }

    .home .home-games::before {
        background: linear-gradient(90deg, rgba(2, 25, 44, 0) 0%, #e70404 50%, rgba(2, 25, 44, 0) 100%);
    }

    .home .home-games::after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(90deg, rgba(2, 25, 44, 0) 0%, #cf0202 50%, rgba(2, 25, 44, 0) 100%);
    }

    .home .featured-title,
    .home .games-title {
        width: 205px;
        height: 43px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Rubik';
        font-size: 24px;
        font-weight: 900;
        color: #ffffff;
    }

    .home .featured-title::before,
    .home .games-title::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(255deg, rgb(49, 10, 10) -25%, rgb(170, 22, 22) 100%);
        border-radius: 10px;
        z-index: -1;
    }

    .home .games-title::before {
        background: linear-gradient(255deg, rgb(49, 10, 10) -25%, rgb(170, 22, 22) 100%);
    }

    .home .featured-content,
    .home .games-content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    @media only screen and (max-width: 1600px) {

        .home .home-banner,
        .home .home-featured,
        .home .home-games {
            width: 100%;
        }

    }

    @media only screen and (max-width: 950px) {

        .home {
            padding: 25px 10px 443px 10px;
        }

    }
</style>
