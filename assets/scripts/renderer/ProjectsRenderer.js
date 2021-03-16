import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import breakpoints from '../constants/breakpoints'
import Map from '../animations/Map'
import { easing, duration } from '../constants/anime'
import anime from 'animejs'

const IS_VIEW_ACTIVE_CLASS = 'is-view-active'
const IS_ACTIVE_CLASS = 'is-active'
const IS_HOVER_CLASS = 'is-hover'

class ProjectsRenderer extends Highway.Renderer {
    onLeaveCompleted() {}

    onLeave() {
        Images.lazy.destroy()
    }
    onEnterCompleted() {
        this.isFirstLoad = true

        Images.lazyload()
        this.init()
        this.bind()
        this.switchView('grid')

        this.isFirstLoad = false
    }

    init() {
        const $view = this.wrap
        const views = ['grid', 'list', 'map']

        this.activeView = views[0]
        this.activeFilters = {}
        this.views = {}

        views.map((slug) => {
            this.views[slug] = {
                $trigger: $view.querySelector(`.js-projects-viewSwitcher[data-slug="${slug}"]`),
                $el: $view.querySelector(`.js-projects-${slug}`),
                isActive: false,
                slug: slug,
                wasLoadOnce: false,
            }

            this.views[slug].$itemsWrapper = this.views[slug].$el.querySelector(`.js-projects-${slug}-wrapper`)
            this.views[slug].$items = this.views[slug].$el.querySelectorAll(`.js-projects-${slug}-item`)
        })

        this.mobile = {
            $trigger: $view.querySelector('.js-filters-menuTrigger'),
            $menu: $view.querySelector('.js-filters-menu'),
        }

        this.$filters = {
            agency: $view.querySelectorAll('.js-filter-agency'),
            category: $view.querySelectorAll('.js-filter-category'),
        }

        this.$sorters = {
            year: $view.querySelector('.js-projects-sortByYear'),
        }
    }

    bind() {
        for (let slug in this.views) {
            const view = this.views[slug]
            view.$trigger.addEventListener('click', () => this.switchView(view.slug))
        }

        this.views.list.$items.forEach((item) => {
            item.addEventListener('mouseenter', () => this.onItemEnter(item))
            item.addEventListener('mouseleave', () => this.onItemLeave(item))
            item.addEventListener('click', () => this.onItemClick(item))
        })

        for (let slug in this.$filters) {
            const filters = this.$filters[slug]
            filters.forEach((filter) => filter.addEventListener('click', () => this.onFilterClick(filter, slug)))
        }

        // toggle mobile filter menu
        this.mobile.$trigger.addEventListener('click', () => {
            if (this.mobile.$menu.classList.contains(IS_ACTIVE_CLASS)) {
                this.mobile.$menu.classList.remove(IS_ACTIVE_CLASS)
                this.mobile.$trigger.classList.remove(IS_ACTIVE_CLASS)
            } else {
                this.mobile.$menu.classList.add(IS_ACTIVE_CLASS)
                this.mobile.$trigger.classList.add(IS_ACTIVE_CLASS)
            }
        })

        this.$sorters.year.addEventListener('click', () => this.sortByYear())
    }

    onItemEnter(item) {
        if (!this.views.list.$el.classList.contains(IS_ACTIVE_CLASS) && breakpoints.isDesktop()) {
            item.classList.add(IS_HOVER_CLASS)
            this.views.list.$el.classList.add(IS_HOVER_CLASS)
        }
    }

    onItemLeave(item) {
        if (
            !item.classList.contains(IS_ACTIVE_CLASS) &&
            !this.views.list.$el.classList.contains(IS_ACTIVE_CLASS) &&
            breakpoints.isDesktop()
        ) {
            item.classList.remove(IS_HOVER_CLASS)
            this.views.list.$el.classList.remove(IS_HOVER_CLASS)
        }
    }

    onItemClick(item) {
        if (item.classList.contains(IS_ACTIVE_CLASS)) {
            this.toggleListItem(item, false)
            this.views.list.$el.classList.remove(IS_ACTIVE_CLASS)
            item.classList.remove(IS_ACTIVE_CLASS, IS_HOVER_CLASS)
        } else {
            this.views.list.$items.forEach((i) => {
                if (i.classList.contains(IS_ACTIVE_CLASS)) {
                    this.toggleListItem(i, false)
                    i.classList.remove(IS_ACTIVE_CLASS, IS_HOVER_CLASS)
                }
            })

            this.toggleListItem(item)
            item.classList.add(IS_ACTIVE_CLASS, IS_HOVER_CLASS)
        }
    }

    toggleListItem(item, isOpen) {
        if (typeof isOpen === 'undefined') isOpen = true

        let height = []
        const timeline = anime.timeline({ autoplay: false })

        if (breakpoints.isDesktop()) {
            const $more = item.querySelector('.js-projects-list-more')
            const moreContent = $more.querySelector('div')

            height = [0, moreContent.offsetHeight]
            if (!isOpen) {
                height = [moreContent.offsetHeight, 0]
            }

            timeline.add({ targets: $more, duration, easing, height }, 0)
        } else {
            let totalHeigth = 0
            const $main = item.querySelector('.js-projects-list-content')
            const mainContent = $main.querySelectorAll('.js-projects-list-content-height ')
            mainContent.forEach((el) => (totalHeigth += el.offsetHeight))

            let height = [75, totalHeigth]
            if (!isOpen) {
                height = [totalHeigth, 75]
            }

            timeline.add({ targets: $main, duration, easing, height }, 0)
        }

        timeline.play()
    }

    onFilterClick(filter, slug) {
        if (slug === 'category') {
            this.$filters.category.forEach((f) => f.classList.remove(IS_ACTIVE_CLASS))
            filter.classList.add(IS_ACTIVE_CLASS)
        } else if (filter.classList.contains(IS_ACTIVE_CLASS)) {
            filter.classList.remove(IS_ACTIVE_CLASS)
        } else {
            filter.classList.add(IS_ACTIVE_CLASS)
        }

        if (breakpoints.isTouch()) {
            this.mobile.$menu.classList.remove(IS_ACTIVE_CLASS)
            this.mobile.$trigger.classList.remove(IS_ACTIVE_CLASS)
        }

        this.filterItems()
    }

    switchView(slug) {
        const oldView = this.activeView
        this.activeView = slug
        const view = this.views[slug]

        for (let slug in this.views) {
            const v = this.views[slug]
            v.$trigger.classList.remove(IS_ACTIVE_CLASS)
            v.$el.classList.remove(IS_VIEW_ACTIVE_CLASS)
        }

        view.$trigger.classList.add(IS_ACTIVE_CLASS)
        view.$el.classList.add(IS_VIEW_ACTIVE_CLASS)

        view.isActive = true

        if (slug === 'map') {
            if (!view.wasLoadOnce) {
                view.map = new Map(view)
            } else {
                view.map.flyToCenter()
            }
        }

        view.wasLoadOnce = true
        this.onLeaveView(oldView)
        this.filterItems()
    }

    onLeaveView(view) {
        if (view === 'list') {
            this.views.list.$items.forEach((item) => {
                this.toggleListItem(item, false)
                item.classList.remove(IS_ACTIVE_CLASS, IS_HOVER_CLASS)
            })
        }
    }

    getActiveFilters() {
        const activeFilters = {}

        for (let slug in this.$filters) {
            const filters = this.$filters[slug]
            activeFilters[slug] = []

            filters.forEach((filter) => {
                if (filter.classList.contains(IS_ACTIVE_CLASS)) {
                    activeFilters[slug].push(filter.dataset.slug)
                }
            })
        }

        return activeFilters
    }

    filterItems() {
        this.activeFilters = this.getActiveFilters()

        const view = this.views[this.activeView]

        view.$el.classList.remove(IS_HOVER_CLASS, IS_ACTIVE_CLASS)

        view.$items.forEach((el) => {
            el.classList.remove(IS_HOVER_CLASS, IS_ACTIVE_CLASS)
            el.show = false

            const category = el.dataset.category.split(',')
            if (this.activeFilters.category[0] == 'all' || category.includes(this.activeFilters.category[0])) {
                el.show = true
            }

            const agencies = el.dataset.agency.split(',')
            let hasActivatedCategory = false
            for (let i = 0; i < agencies.length; i++) {
                const agency = agencies[i]
                if (this.activeFilters.agency.indexOf(agency) != -1) {
                    hasActivatedCategory = true
                    break
                }
            }

            if (!hasActivatedCategory) {
                el.show = false
            }
        })

        this.animateFilters(view)
    }

    animateFilters(view) {
        const animations = []
        const timeline = anime.timeline({ autoplay: false, easing, duration })

        const show = []

        view.$items.forEach((el) => {
            const child = el.querySelector('div')
            let height = 0

            if (this.activeView === 'list') {
                this.views.list.$el.classList.remove(IS_ACTIVE_CLASS)

                if (el.show) {
                    height = child.offsetHeight
                }

                el.classList.remove(IS_ACTIVE_CLASS, IS_HOVER_CLASS)
                animations.push({ targets: el.querySelector('.js-unthis.toggleListItem-height'), height: 0 })

                animations.push({
                    targets: el,
                    height,
                    complete: () => {
                        if (el.show) el.style = ''
                    },
                })
            }
            // grid style
            else if (this.activeView === 'grid') {
                if (el.show) show.push(el)
            } else if (this.activeView === 'map') {
                if (el.show) {
                    el.classList.remove('is-hidden')
                } else {
                    el.classList.add('is-hidden')
                }
            }
        })

        if (this.activeView === 'grid') {
            let startAt = duration * 0.75

            if (this.isFirstLoad) {
                startAt = 0
            } else {
                timeline.add(
                    {
                        targets: view.$items,
                        scaleX: 0,
                        scaleY: 0,
                        scaleZ: 1,
                    },
                    0,
                )
            }

            if (show.length) {
                timeline.add(
                    {
                        begin: () => {
                            view.$items.forEach((el) => {
                                if (el.show) {
                                    el.style.width = ''
                                    el.style.height = ''
                                } else {
                                    anime.set(el, { height: 0, width: 0 })
                                }
                            })
                        },
                        targets: show,
                        scaleX: [0, 1],
                        scaleY: [0, 1],
                        scaleZ: 1,
                        delay: anime.stagger(100),
                    },
                    startAt,
                )
            }
        }

        animations.map((ani) => timeline.add(ani, 0))
        timeline.play()
    }

    sortByYear() {
        const shouldSortByYear = this.$sorters.year.classList.contains(IS_ACTIVE_CLASS)
        const view = this.views[this.activeView]
        const arr = []

        if (shouldSortByYear) {
            this.$sorters.year.classList.remove(IS_ACTIVE_CLASS)
            view.$items.forEach((item) => arr.push({ value: parseInt(item.dataset.index), item }))
            arr.sort((a, b) => a.value - b.value)
        } else {
            this.$sorters.year.classList.add(IS_ACTIVE_CLASS)
            view.$items.forEach((item) => arr.push({ value: parseInt(item.dataset.year), item }))
            arr.sort((a, b) => b.value - a.value)
        }

        if (view.$itemsWrapper) {
            view.$itemsWrapper.innerHTML = null
            arr.map((data) => view.$itemsWrapper.appendChild(data.item))
        }
    }
}

export default ProjectsRenderer
