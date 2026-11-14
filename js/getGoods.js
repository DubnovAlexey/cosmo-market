// ФАЙЛ: js/getGoods.js. НАЗНАЧЕНИЕ: каталог, URL-фильтры и безопасное восстановление данных.
// РАЗДЕЛЫ: 1. Проверка/хранение; 2. Карточки и состояния; 3. Загрузка/навигация.
// Публичный marketCatalog.show используется search.js после загрузки defer-скриптов.

// НАЧАЛО ФУНКЦИИ createMarketCatalog
const marketCatalog = (() => {
    const container = document.querySelector('.long-goods-list')
    const isCatalogPage = () => window.location.pathname.endsWith('/goods.html')
    let requestId = 0

    // НАЧАЛО ФУНКЦИИ validGoods
    const validGoods = value => Array.isArray(value) && value.every(good => good &&
        (typeof good.id === 'string' || typeof good.id === 'number') && typeof good.name === 'string' &&
        typeof good.img === 'string' && Number.isFinite(Number(good.price)) && Number(good.price) >= 0)
    // КОНЕЦ ФУНКЦИИ validGoods

    // НАЧАЛО ФУНКЦИИ readCache
    const readCache = () => {
        try {
            const raw = localStorage.getItem(CartLogic.KEYS.goods)
            if (raw === null) return null
            const value = JSON.parse(raw)
            return validGoods(value) ? value : null
        } catch { return null }
    }
    // КОНЕЦ ФУНКЦИИ readCache

    // НАЧАЛО ФУНКЦИИ saveCache
    const saveCache = goods => {
        try { localStorage.setItem(CartLogic.KEYS.goods, JSON.stringify(goods)) }
        catch { /* URL хранит выбранный фильтр, текущая страница работает без storage. */ }
    }
    // КОНЕЦ ФУНКЦИИ saveCache

    // НАЧАЛО ФУНКЦИИ message
    const message = (text, retry) => {
        if (!container) return
        container.replaceChildren()
        container.setAttribute('aria-live', 'polite')
        const status = document.createElement('p')
        status.className = 'catalog-status col-12'
        status.textContent = text
        container.append(status)
        if (retry) {
            const button = document.createElement('button')
            button.type = 'button'
            button.className = 'button catalog-retry'
            button.textContent = 'Try again'
            button.addEventListener('click', retry)
            container.append(button)
        }
    }
    // КОНЕЦ ФУНКЦИИ message

    // НАЧАЛО ФУНКЦИИ renderGoods
    const renderGoods = goods => {
        if (!container) return
        if (!goods.length) { message('No products found. Try another category or search.'); return }
        container.replaceChildren()
        container.setAttribute('aria-live', 'polite')
        for (const good of goods) {
            const block = document.createElement('div')
            block.className = 'col-lg-3 col-sm-6'
            const card = document.createElement('div')
            card.className = 'goods-card'
            const label = document.createElement('span')
            label.className = 'label' + (good.label ? '' : ' d-none')
            label.textContent = good.label || ''
            const image = document.createElement('img')
            image.src = 'db/' + good.img
            image.alt = good.name
            image.className = 'goods-image'
            const title = document.createElement('h3')
            title.className = 'goods-title'
            title.textContent = good.name
            const description = document.createElement('p')
            description.className = 'goods-description'
            description.textContent = good.description || ''
            const button = document.createElement('button')
            button.type = 'button'
            button.className = 'button goods-card-btn add-to-cart'
            button.dataset.id = good.id
            const price = document.createElement('span')
            price.className = 'button-price'
            price.textContent = formatPrice(good.price)
            button.append(price)
            card.append(label, image, title, description, button)
            block.append(card)
            container.append(block)
        }
    }
    // КОНЕЦ ФУНКЦИИ renderGoods

    // НАЧАЛО ФУНКЦИИ readFilter
    const readFilter = () => {
        const params = new URLSearchParams(window.location.search)
        if (params.has('search')) return {search: params.get('search')}
        const field = params.get('field')
        return ['gender', 'category'].includes(field) ? {field, value: params.get('value') || ''} : {}
    }
    // КОНЕЦ ФУНКЦИИ readFilter

    // НАЧАЛО ФУНКЦИИ load
    const load = async (filter, useCache = false) => {
        const job = ++requestId
        const cached = useCache ? readCache() : null
        if (cached !== null) { renderGoods(cached); return }
        message('Loading products…')
        try {
            const response = await fetch('./db/db.json')
            if (!response.ok) throw new Error('Catalog request failed')
            const data = await response.json()
            if (!validGoods(data)) throw new Error('Invalid catalog')
            if (job !== requestId) return
            const goods = Object.hasOwn(filter, 'search')
                ? data.filter(good => good.name.toLowerCase().includes(filter.search.toLowerCase()))
                : filter.field ? data.filter(good => good[filter.field] === filter.value) : data
            saveCache(goods)
            renderGoods(goods)
        } catch {
            if (job === requestId) message('Products could not be loaded. Please try again.', () => load(filter))
        }
    }
    // КОНЕЦ ФУНКЦИИ load

    // НАЧАЛО ФУНКЦИИ show
    const show = (filter = {}) => {
        const url = new URL('goods.html', window.location.href)
        if (Object.hasOwn(filter, 'search')) url.searchParams.set('search', filter.search)
        else if (['gender', 'category'].includes(filter.field)) {
            url.searchParams.set('field', filter.field)
            url.searchParams.set('value', filter.value)
        }
        if (!isCatalogPage()) { window.location.href = url.href; return }
        window.history.replaceState(null, '', url.href)
        return load(filter)
    }
    // КОНЕЦ ФУНКЦИИ show

    for (const link of document.querySelectorAll('.navigation-link')) {
        link.addEventListener('click', event => {
            event.preventDefault()
            const field = link.dataset.field
            show(field ? {field, value: link.textContent.trim()} : {})
        })
    }
    const more = document.querySelector('.more')
    if (more) more.addEventListener('click', event => { event.preventDefault(); show() })
    // «View all» в карточках скидок ведёт в каталог своей категории (14.11: кнопки были без обработчика —
    // нашёл живой обход Кузницы)
    for (const button of document.querySelectorAll('[data-catalog-field]')) {
        const {catalogField: field, catalogValue: value} = button.dataset || {}
        if (!field || !value) continue // только кнопки с категорией: обработчик не цепляется к чужим элементам
        button.addEventListener('click', () => show({field, value}))
    }
    if (isCatalogPage()) {
        const filter = readFilter()
        load(filter, Object.keys(filter).length === 0)
    }
    return {show}
})()
// КОНЕЦ ФУНКЦИИ createMarketCatalog
