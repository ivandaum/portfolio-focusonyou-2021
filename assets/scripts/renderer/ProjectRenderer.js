import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Flickity from 'flickity'
import Modal from '../animations/Modal'
import breakpoints from '../constants/breakpoints'

const IS_ACTIVE_CLASS = 'is-active'
class ProjectRenderer extends Highway.Renderer {
    onLeaveCompleted() {
        if (this.slider) {
            this.$slider.classList.add('is-flex-desktop')
            this.slider.destroy()
        }
    }

    onLeave() {
        Images.lazy.destroy()
        document.removeEventListener('keydown', this.onKeyPress)
    }
    onEnterCompleted() {
        Images.lazyload()

        const $view = this.wrap

        new Modal($view)

        this.$slider = $view.querySelector('.js-project-slider')
        this.$triggers = $view.querySelectorAll('.js-vizualiser-trigger')
        this.$images = $view.querySelectorAll('.js-vizualiser-item')

        this.currentIndex = 0

        if (this.$images.length > 0 && breakpoints.isDesktop()) {
            this.$slider.classList.remove('is-flex-desktop')

            this.slider = new Flickity(this.$slider, {
                cellAlign: 'center',
                contain: true,
                freeScroll: true,
                prevNextButtons: false,
                pageDots: false,
                accessibility: false,
            })

            this.initGalery()
            document.addEventListener('keydown', this.onKeyPress.bind(this))

            this.$left = $view.querySelector('.js-vizualiser-left')
            this.$right = $view.querySelector('.js-vizualiser-right')

            this.$left.addEventListener('click', () => this.prev())
            this.$right.addEventListener('click', () => this.next())
        }
    }

    next() {
        this.currentIndex++
        if (this.currentIndex >= this.$triggers.length) {
            this.currentIndex = 0
        }

        this.selectImage(this.currentIndex)
    }

    prev() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.$triggers.length - 1
        }

        this.selectImage(this.currentIndex)
    }

    onKeyPress(e) {
        const key = e.keyCode

        // right
        if (key === 39) {
            this.next()
        }
        // left
        else if (key === 37) {
            this.prev()
        }
    }

    selectImage(index) {
        const trigger = this.$triggers[index]
        const id = this.$triggers[index].dataset.id

        this.slider.select(index)

        this.$images.forEach((image) => {
            if (image.dataset.id == id) {
                image.classList.add(IS_ACTIVE_CLASS)
            } else {
                image.classList.remove(IS_ACTIVE_CLASS)
            }
        })

        this.$triggers.forEach((trigger) => trigger.classList.remove(IS_ACTIVE_CLASS))
        trigger.classList.add(IS_ACTIVE_CLASS)
    }

    initGalery() {
        this.slider.on('staticClick', (event, pointer, cellElement, cellIndex) => {
            this.currentIndex = cellIndex
            this.selectImage(cellIndex)
        })

        this.selectImage(0)
    }
}

export default ProjectRenderer
