import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Flickity from 'flickity'

import { easing, duration } from '../constants/anime'
import anime from 'animejs'
import store from '../utils/store'

class HomeRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onLeave() {
        Images.lazy.destroy()
    }
    onEnterCompleted() {
        Images.lazyload()

        const $view = this.wrap
        this.$loading = $view.querySelector('.js-loading')
        this.$loading.addEventListener('click', this.loadMore.bind(this))

        this.$slider = $view.querySelector('.js-home-cover')
        this.$articles = this.wrap.querySelectorAll('.js-home-post')

        new Flickity(this.$slider, {
            cellAlign: 'center',
            contain: true,
            freeScroll: false,
            prevNextButtons: false,
            pageDots: false,
            autoPlay: true,
        })

        this.$articles.forEach((article) => {
            this.bindArticle(article)
        })
    }

    bindArticle(article) {
        const cover = article.querySelector('.js-home-post-cover')
        const text = article.querySelectorAll('.js-home-post-fade')

        const timeline = anime.timeline({ autoplay: false, duration, easing })
        timeline.add({ targets: cover, scaleZ: 1, scaleX: [0, 1], scaleY: [0, 1] }, 0)
        timeline.add({ targets: text, opacity: [0, 1] }, 0)
        const offset = -store.offsetHeight * 0.5

        const observer = new IntersectionObserver(
            (changes) => {
                const [{ isIntersecting }] = changes
                if (isIntersecting) {
                    timeline.play()
                    observer.unobserve(article)
                }
            },
            { thresholds: `${offset}px 0px ${offset}px 0px` },
        )

        observer.observe(article)
    }

    loadMore() {
        const count = this.$articles.length

        let a = 0
        for (let i = 0; i < count; i++) {
            const el = this.$articles[i]

            if (el.classList.contains('is-hidden')) {
                el.classList.remove('is-hidden')
                a++
            }

            if (a >= window.homePostsCount) {
                break
            }
        }

        const hasMore = this.wrap.querySelectorAll('.js-home-post.is-hidden')
        if (!hasMore.length) this.$loading.remove()
    }
}

export default HomeRenderer
