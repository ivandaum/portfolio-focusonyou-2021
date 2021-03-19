import anime from 'animejs'
import { easing, duration } from '../constants/anime'

const menuIsOpen = 'menuIsOpen'

const Navbar = {
  $content: null,
  $btn: null,

  init({ btn, content }) {
    this.$content = content
    this.$btn = btn
    this.$links = this.$content.querySelectorAll('a')

    this.menus = []
    const menus = this.$content.querySelectorAll('.js-navbar-categories, .js-navbar-menu')
    menus.forEach((menu) =>
      this.menus.push({
        menu,
        items: menu.querySelectorAll('li'),
      }),
    )

    this.$btn.addEventListener('click', this.toggleMenu.bind(this))
    this.$links.forEach((link) => link.addEventListener('click', () => this.close()))
  },

  update({ location }) {
    const href = location.href

    const isActive = 'is-active'

    this.$links.forEach((link) => {
      if (link.classList.contains(isActive)) {
        link.classList.remove(isActive)
      }

      if (link.href === href) {
        link.classList.add(isActive)
      }
    })
  },

  toggleMenu() {
    if (document.body.classList.contains(menuIsOpen)) {
      this.close()
    } else {
      this.open()
    }
  },

  close() {
    document.body.classList.remove(menuIsOpen)
  },

  open() {
    document.body.classList.add(menuIsOpen)
    const timeline = anime.timeline({ autoplay: false, easing, duration })

    this.menus.map((menu) => {
      timeline.add(
        {
          targets: menu.items,
          scaleY: [2, 1],
          opacity: [0, 1],
          translateY: ['0.4em', '0'],
          delay: anime.stagger(30),
        },
        0,
      )
    })

    setTimeout(() => timeline.play(), 10)
  },
}

export default Navbar
