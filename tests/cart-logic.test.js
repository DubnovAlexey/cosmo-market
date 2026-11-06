import {describe, expect, it} from 'vitest'
import CartLogic from '../js/cart-logic.js'

const shirt = {id: 'shirt', name: 'Space shirt', price: '19.99'}
const boots = {id: 'boots', name: 'Moon boots', price: 119}

describe('CartLogic', () => {
    it('adds a new good with count 1 and does not change the original array', () => {
        const empty = []
        const cart = CartLogic.add(empty, shirt)
        expect(cart).toEqual([{...shirt, count: 1}])
        expect(empty).toEqual([])
    })

    it('adding the same good again increases its count', () => {
        const cart = CartLogic.add(CartLogic.add([], shirt), shirt)
        expect(cart).toHaveLength(1)
        expect(cart[0].count).toBe(2)
    })

    it('minus removes the line when the count reaches zero', () => {
        let cart = CartLogic.add(CartLogic.add([], shirt), boots)
        cart = CartLogic.minus(cart, 'shirt')
        expect(cart.map(item => item.id)).toEqual(['boots'])
    })

    it('plus and remove work by id', () => {
        let cart = CartLogic.add(CartLogic.add([], shirt), boots)
        cart = CartLogic.plus(cart, 'boots')
        expect(cart.find(item => item.id === 'boots').count).toBe(2)
        cart = CartLogic.remove(cart, 'boots')
        expect(cart.map(item => item.id)).toEqual(['shirt'])
    })

    it('counts pieces and totals in cents without rounding errors', () => {
        let cart = CartLogic.add([], shirt)
        cart = CartLogic.plus(cart, 'shirt')          // 2 x 19.99
        cart = CartLogic.add(cart, boots)             // 1 x 119
        expect(CartLogic.count(cart)).toBe(3)
        expect(CartLogic.totalCents(cart)).toBe(15898) // 39.98 + 119.00
        expect(CartLogic.lineCents({price: '0.1', count: 3})).toBe(30)
    })

    it('uses storage keys with the project prefix', () => {
        expect(CartLogic.KEYS.cart).toBe('cosmo-market:cart')
        expect(CartLogic.KEYS.goods).toBe('cosmo-market:goods')
    })
})

// Повреждённые/старые значения localStorage не должны ломать витрину и сумму.
describe('CartLogic storage recovery', () => {
    it('normalizes legacy numeric strings and discards invalid rows', () => {
        const cart = CartLogic.restore([null, {id:'a',name:'A',price:'1.5',count:'2'}, {id:'b',name:'B',price:'bad',count:1}, {id:'c',name:'C',price:5,count:-1}])
        expect(cart).toHaveLength(1)
        expect(CartLogic.count(cart)).toBe(2)
        expect(CartLogic.totalCents(cart)).toBe(300)
    })
    it('rejects a non-array saved value', () => { expect(CartLogic.restore({count:3})).toEqual([]) })
})

// Browser scripts are evaluated with controlled storage/transport: no network or orders.
import vm from 'node:vm'
import {readFileSync} from 'node:fs'

// BEGIN catalogFixture: minimal browser boundary for real navigation/search scripts.
function catalogFixture({path = 'goods.html', cache = null, denyStorage = false, fetcher} = {}) {
    class Element {
        constructor(tag = 'div') { this.tagName = tag; this.children = []; this.dataset = {}; this.events = {}; this.attributes = {}; this.value = ''; this.textContent = ''; this.className = '' }
        append(...nodes) { this.children.push(...nodes) }
        appendChild(node) { this.append(node) }
        replaceChildren(...nodes) { this.children = nodes }
        setAttribute(name, value) { this.attributes[name] = value }
        addEventListener(name, fn) { this.events[name] = fn }
        fire(name, extra = {}) { return this.events[name]?.({preventDefault() {}, ...extra}) }
    }
    const list = new Element(), input = new Element('input'), button = new Element('button'), more = new Element('a')
    const womens = new Element('a'); womens.textContent = 'Womens'; womens.dataset.field = 'gender'
    const nodes = {'.long-goods-list': list, '.search-block > input': input, '.search-block > button': button, '.more': more}
    const location = new URL(path, 'https://example.test/cosmo-market/')
    let calls = 0
    const storage = new Map(cache === null ? [] : [[CartLogic.KEYS.goods, cache]])
    const context = vm.createContext({URL, URLSearchParams, CartLogic, formatPrice: value => '$' + value,
        document: {querySelector: selector => nodes[selector] || null, querySelectorAll: () => [womens], createElement: tag => new Element(tag)},
        localStorage: {getItem(key) { if (denyStorage) throw new Error('SecurityError'); return storage.get(key) ?? null },
            setItem(key, value) { if (denyStorage) throw new Error('SecurityError'); storage.set(key, value) }},
        fetch: async (...args) => { calls++; return fetcher ? fetcher(...args) : {ok: true, json: async () => catalog} },
        window: {location, history: {replaceState(_data, _unused, url) { location.href = url }}}
    })
    vm.runInContext(readFileSync(new URL('../js/search.js', import.meta.url), 'utf8'), context)
    vm.runInContext(readFileSync(new URL('../js/getGoods.js', import.meta.url), 'utf8'), context)
    return {context, list, input, button, more, womens, location, storage, calls: () => calls,
        show: filter => vm.runInContext('marketCatalog.show(' + JSON.stringify(filter) + ')', context)}
}
// END catalogFixture

const catalog = [
    {id: 'one', name: 'Space shirt', img: 'shirt.jpg', price: 20, category: 'Clothing', gender: 'Womens', description: 'Soft fabric'},
    {id: 'two', name: 'Moon boots', img: 'boots.jpg', price: 50, category: 'Shoes', gender: 'Mens', description: 'For walking'}
]
const settleCatalog = () => new Promise(resolve => setImmediate(resolve))
const catalogTitle = fixture => fixture.list.children[0]?.children[0]?.children.find(node => node.tagName === 'h3')?.textContent

describe('Catalog navigation and storage boundaries', () => {
    it('loads the full catalog when goods.html opens directly with no cache', async () => {
        const fixture = catalogFixture()
        await settleCatalog()
        expect(fixture.calls()).toBe(1)
        expect(fixture.list.children).toHaveLength(2)
        expect(catalogTitle(fixture)).toBe('Space shirt')
    })

    it('recovers malformed caches and remains usable when storage is denied', async () => {
        for (const options of [{cache: '{broken'}, {cache: '{"not":"an array"}'}, {denyStorage: true}]) {
            const fixture = catalogFixture(options)
            await settleCatalog()
            expect(fixture.list.children).toHaveLength(2)
            await fixture.show({field: 'category', value: 'Shoes'})
            expect(fixture.list.children).toHaveLength(1)
            expect(catalogTitle(fixture)).toBe('Moon boots')
        }
    })

    it('retains valid legacy filtered caches and represents an empty saved result clearly', async () => {
        const saved = catalogFixture({cache: JSON.stringify([catalog[1]])})
        const empty = catalogFixture({cache: '[]'})
        await settleCatalog()
        expect(saved.calls()).toBe(0)
        expect(catalogTitle(saved)).toBe('Moon boots')
        expect(empty.calls()).toBe(0)
        expect(empty.list.children[0].textContent).toContain('No products found')
    })

    it('uses URLs to retain category/search navigation from Home when storage is denied', () => {
        const category = catalogFixture({path: 'index.html', denyStorage: true})
        category.womens.fire('click')
        expect(category.location.pathname).toBe('/cosmo-market/goods.html')
        expect(category.location.searchParams.get('field')).toBe('gender')
        expect(category.location.searchParams.get('value')).toBe('Womens')
        const search = catalogFixture({path: 'index.html', denyStorage: true})
        search.input.value = 'Moon boots'
        search.input.fire('keydown', {key: 'Enter'})
        expect(search.location.searchParams.get('search')).toBe('Moon boots')
    })

    it('applies a direct search URL and ignores a stale response from an earlier selection', async () => {
        const resolves = []
        const fixture = catalogFixture({path: 'goods.html?search=shirt', fetcher: () => new Promise(resolve => resolves.push(resolve))})
        await settleCatalog()
        const latest = fixture.show({search: 'boots'})
        await settleCatalog()
        resolves[1]({ok: true, json: async () => catalog})
        await latest
        resolves[0]({ok: true, json: async () => catalog})
        await settleCatalog()
        expect(catalogTitle(fixture)).toBe('Moon boots')
        expect(fixture.location.searchParams.get('search')).toBe('boots')
    })

    it('offers retry after an HTTP failure and renders cached text without executing markup', async () => {
        let attempt = 0
        const fixture = catalogFixture({fetcher: async () => ++attempt === 1 ? {ok: false} : {ok: true, json: async () => catalog}})
        await settleCatalog()
        expect(fixture.list.children[0].textContent).toContain('could not be loaded')
        const retry = fixture.list.children.find(node => node.tagName === 'button')
        retry.fire('click')
        await settleCatalog()
        expect(fixture.list.children).toHaveLength(2)
        const text = '<img src=x onerror="throw 1">'
        const cached = catalogFixture({cache: JSON.stringify([{...catalog[0], name: text}])})
        await settleCatalog()
        expect(catalogTitle(cached)).toBe(text)
        expect(cached.list.children[0].children[0].children.find(node => node.tagName === 'h3').children).toHaveLength(0)
    })
})
