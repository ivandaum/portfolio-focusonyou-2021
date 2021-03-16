import Highway from '@dogstudio/highway'
import Images from '../binders/Images'

import Modal from '../animations/Modal'
import anime from 'animejs'
import { easing, duration } from '../constants/anime'
import breakpoints from '../constants/breakpoints'

import Fade from '../binders/Fade'

class DefaultRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onLeave() {
        Images.lazy.destroy()
    }

    onEnterCompleted() {
        Images.lazyload()
        const $view = this.wrap

        const manager = new Modal($view)

        if (breakpoints.isDesktop()) {
            manager.$triggers.forEach((trigger) =>
                trigger.addEventListener('click', () => {
                    const id = trigger.dataset.target
                    const modal = manager.getModalById(id)

                    if (trigger.classList.contains('is-active')) {
                        const height = modal.querySelector('.js-modal-content').offsetHeight

                        anime({ targets: modal, duration, easing, height })
                    } else {
                        anime({ targets: modal, duration, easing, height: 0 })
                    }
                }),
            )
        }

        Fade.bind()
    }
}

export default DefaultRenderer
