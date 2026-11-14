// Слайдер на главной (14.11). Стили Swiper подключены (css/swiper-bundle.min.css даёт раскладку: ряд слайдов
// во всю ширину, лишнее скрыто), а сам скрипт Swiper на страницу не подключался — стрелки ничего не делали.
// Это нашёл живой обход Кузницы. Свой маленький слайдер вместо библиотеки: стрелки, по кругу, перелистывание
// пальцем на телефоне, стрелки клавиатуры; неактивные слайды выключены для клавиатуры и чтеца (inert),
// чтобы их невидимые кнопки «Shop now» не нажимались вслепую.
const slider = function () {
    const root = document.querySelector('.slider.swiper-container')
    if (!root) return
    const wrapper = root.querySelector('.swiper-wrapper')
    const slides = [...root.querySelectorAll('.swiper-slide')]
    if (!wrapper || slides.length < 2) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    let index = 0

    root.setAttribute('aria-roledescription', 'carousel')
    slides.forEach((slide, i) => {
        slide.setAttribute('aria-roledescription', 'slide')
        slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`)
    })

    const go = (next) => {
        index = (next + slides.length) % slides.length
        wrapper.style.transitionDuration = still.matches ? '0ms' : '600ms'
        wrapper.style.transform = `translate3d(${-index * 100}%, 0, 0)`
        slides.forEach((slide, i) => {
            const active = i === index
            slide.inert = !active
            slide.setAttribute('aria-hidden', String(!active))
        })
    }

    root.querySelector('.slider-button-prev')?.addEventListener('click', () => go(index - 1))
    root.querySelector('.slider-button-next')?.addEventListener('click', () => go(index + 1))
    root.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') go(index - 1)
        else if (event.key === 'ArrowRight') go(index + 1)
    })

    // Палец: провёл влево — следующий слайд, вправо — предыдущий; вертикальная прокрутка страницы не мешает
    root.style.touchAction = 'pan-y'
    let startX = null
    root.addEventListener('pointerdown', (event) => { if (event.pointerType !== 'mouse') startX = event.clientX })
    root.addEventListener('pointerup', (event) => {
        if (startX === null) return
        const dx = event.clientX - startX
        startX = null
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
    })
    root.addEventListener('pointercancel', () => { startX = null })

    go(0)
}

slider()
