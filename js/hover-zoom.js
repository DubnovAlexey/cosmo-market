// ФАЙЛ: js/hover-zoom.js. НАЗНАЧЕНИЕ: фото товара под мышью увеличивается по-настоящему — целиком, примерно в 2,5 раза
// (широкое — в 3), поверх соседних карточек и в пределах окна; растёт из своего места и туда же уходит.
// РАЗДЕЛЫ: 1. Какие картинки; 2. Размер и место; 3. Показ и скрытие; 4. Запуск.
// Правило владельца (14.11.2026): картинки стоят в небольших окошках, поэтому при наведении они должны серьёзно
// увеличиваться, а не чуть-чуть дёргаться. Только для настоящей мыши: у пальца нет наведения, на телефоне всё как было.
// Копия не ловит мышь, поэтому кнопка «в корзину» и всё остальное под ней работают как раньше.
// «Уменьшить движение»: крупное фото появляется сразу, без анимации.

// НАЧАЛО ФУНКЦИИ createHoverZoom
const hoverZoom = (() => {
    // 1. Какие картинки
    const PICTURES = '.goods-image' // фото в карточках товаров (главная и каталог)
    const TALL = 2.5 // портрет и квадрат
    const WIDE = 3 // широкое фото (шире 4:3) растёт сильнее
    const MARGIN = 14 // отступ от края окна

    // 2. Размер и место
    // НАЧАЛО ФУНКЦИИ shownRect
    // Где на экране видно само фото: у .goods-image object-fit: contain, и квадратный снимок в широкой рамке
    // занимает только её середину — увеличиваем то, что видно, а не пустые поля
    const shownRect = (rect, ratio, fit) => {
        if (fit !== 'contain') return rect
        const width = Math.min(rect.width, rect.height * ratio)
        const height = width / ratio
        return {left: rect.left + (rect.width - width) / 2, top: rect.top + (rect.height - height) / 2, width, height}
    }
    // КОНЕЦ ФУНКЦИИ shownRect

    // НАЧАЛО ФУНКЦИИ peekBox
    // Где стоит крупная копия: k × ширина фото, целиком в своих пропорциях, ужатая до окна,
    // по центру над своим фото и сдвинутая внутрь полей окна
    const peekBox = (rect, ratio, view) => {
        const k = ratio > 4 / 3 ? WIDE : TALL
        let width = rect.width * k
        let height = width / ratio
        const fit = Math.min(1, (view.width - MARGIN * 2) / width, (view.height - MARGIN * 2) / height)
        width *= fit
        height *= fit
        const clamp = (value, size, limit) => Math.min(Math.max(value, MARGIN), limit - size - MARGIN)
        return {
            left: clamp(rect.left + rect.width / 2 - width / 2, width, view.width),
            top: clamp(rect.top + rect.height / 2 - height / 2, height, view.height),
            width,
            height
        }
    }
    // КОНЕЦ ФУНКЦИИ peekBox

    // 3. Показ и скрытие
    // НАЧАЛО ФУНКЦИИ init
    const init = () => {
        const mouse = window.matchMedia('(hover: hover) and (pointer: fine)')
        const still = window.matchMedia('(prefers-reduced-motion: reduce)')
        let current = null // { img, peek, from }
        let timer = 0

        const close = instant => {
            clearTimeout(timer)
            if (!current) return
            const {peek, from} = current
            current = null
            if (instant || still.matches) {
                peek.remove()
                return
            }
            peek.style.transform = from // уходит туда же, откуда выросла
            peek.style.opacity = '0'
            peek.addEventListener('transitionend', () => peek.remove(), {once: true})
            setTimeout(() => peek.remove(), 400) // на случай, если анимация не дошла
        }

        const open = img => {
            if (current && current.img === img) return
            close(true)
            if (!img.naturalWidth) return // фото ещё не загрузилось
            const ratio = img.naturalWidth / img.naturalHeight
            const rect = shownRect(img.getBoundingClientRect(), ratio, getComputedStyle(img).objectFit)
            if (rect.width < 24) return
            const box = peekBox(rect, ratio, {width: window.innerWidth, height: window.innerHeight})
            const peek = document.createElement('div')
            peek.className = 'zoom-peek'
            peek.setAttribute('aria-hidden', 'true')
            Object.assign(peek.style, {left: `${box.left}px`, top: `${box.top}px`, width: `${box.width}px`, height: `${box.height}px`})
            const copy = document.createElement('img')
            copy.alt = ''
            copy.src = img.currentSrc || img.src
            peek.append(copy)
            // Растёт из своего места: старт — там, где видно маленькое фото
            const from = `translate(${rect.left - box.left}px, ${rect.top - box.top}px) scale(${rect.width / box.width}, ${rect.height / box.height})`
            if (!still.matches) {
                peek.style.transform = from
                peek.style.opacity = '0.4'
            }
            document.body.append(peek)
            current = {img, peek, from}
            if (!still.matches) {
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    peek.style.transform = 'none'
                    peek.style.opacity = '1'
                }))
            }
        }

        // Карточки каталога появляются после загрузки — поэтому слушаем весь документ
        document.addEventListener('pointerover', event => {
            if (!mouse.matches || event.pointerType !== 'mouse') return
            const img = event.target.closest && event.target.closest(PICTURES)
            if (!img) return
            clearTimeout(timer)
            timer = setTimeout(() => open(img), 140) // мышь просто пролетела мимо — не мигаем
        })
        document.addEventListener('pointerout', event => {
            const img = event.target.closest && event.target.closest(PICTURES)
            if (!img || img.contains(event.relatedTarget)) return
            clearTimeout(timer)
            if (current && current.img === img) close(false)
        })
        window.addEventListener('scroll', () => close(true), {passive: true})
        window.addEventListener('resize', () => close(true))
        window.addEventListener('pagehide', () => close(true))
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') close(true)
        })
        document.addEventListener('click', () => close(true), true)
    }
    // КОНЕЦ ФУНКЦИИ init

    return {shownRect, peekBox, init}
})()
// КОНЕЦ ФУНКЦИИ createHoverZoom

// 4. Запуск. В браузере это обычный скрипт, а тесты в Node подключают его как модуль
if (typeof module !== 'undefined') {
    module.exports = hoverZoom
} else {
    hoverZoom.init()
}
