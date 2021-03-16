import Highway from '@dogstudio/highway'
import ScrollManager from '../utils/ScrollManager'
import anime from 'animejs'
import store from '../utils/store'
import { easing, duration } from '../constants/anime'
import Navbar from '../animations/Navbar'
import breakpoints from '../constants/breakpoints'

class ProjectTransition extends Highway.Transition {
    in({ from, to, done }) {
        to.classList.add('view-in')
        const targets = to.querySelectorAll('.js-transition-fade')
        targets.forEach((el) => (el.style.opacity = 0))

        anime({
            targets,
            duration,
            easing,
            opacity: [0, 1],
            complete: () => {
                if (from) from.remove()
                to.classList.remove('view-in')
                if (done) done()
            },
        })
    }

    out({ trigger, done, from }) {
        trigger.parentNode.classList.add('is-clicked')

        const $filters = from.querySelector('div')
        const $picture = trigger.querySelector('picture')

        const filtersRect = $filters.getBoundingClientRect()
        const pictureRect = $picture.getBoundingClientRect()

        const parentWidth = filtersRect.width
        const parentLeft = filtersRect.left

        const padding = parseInt(window.getComputedStyle($filters).paddingLeft)
        $picture.style.zIndex = '49'
        const offset = Navbar.height + 40 // 80px (nav height) + 40px (margin)

        const cover = { width: parentWidth * 0.5 - padding, height: store.windowHeight - offset }

        if (trigger.dataset.featured === 'true') {
            cover.width = store.windowWidth
        } else if ($picture.classList.contains('is-picture-landscape')) {
            cover.height = cover.width * 0.75
        } else if ($picture.classList.contains('is-picture-square')) {
            cover.height = cover.width
        }

        let x = -pictureRect.left
        if (trigger.dataset.featured === 'false' && breakpoints.isDesktop()) {
            x += padding + parentLeft
        }

        if (breakpoints.isTouch()) {
            cover.width = store.windowWidth
            cover.height = store.windowHeight - offset

            if ($picture.classList.contains('is-picture-landscape') && trigger.dataset.featured != 'true') {
                cover.height = cover.width * 0.75
            }
        }

        let y = ScrollManager.scroll + pictureRect.top - Navbar.height
        if (breakpoints.isTouch()) {
            y = ScrollManager.scroll + pictureRect.top - filtersRect.height
        }

        const timeline = anime.timeline({
            easing,
            duration: duration,
            autoplay: false,
            complete: () => {
                if (done) {
                    done()
                }
            },
        })

        const animations = [
            {
                targets: $picture,
                translateX: [0, x],
                translateY: [0, -y],
                translateZ: 1,
                height: cover.height,
                width: cover.width,
            },
            {
                targets: '.js-transition-fade:not(.is-clicked), .js-transition-fade.is-clicked h3',
                opacity: [1, 0],
                duration: duration * 0.5,
            },
        ]

        animations.map((anim) => timeline.add(anim, 0))
        ScrollManager.scrollTo({ y: 0 })
        timeline.play()
    }
}

export default ProjectTransition
