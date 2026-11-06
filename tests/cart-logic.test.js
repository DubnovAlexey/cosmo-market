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
