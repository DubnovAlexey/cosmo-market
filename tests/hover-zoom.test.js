// Фото товара под мышью растёт по-настоящему (правило владельца, 14.11.2026): портрет и квадрат ≈ 2,5×,
// широкое ≈ 3×, целиком и внутри окна. Проверяем расчёт места из js/hover-zoom.js.
import {describe, expect, it} from 'vitest'
import hoverZoom from '../js/hover-zoom.js'

const view = {width: 1366, height: 900}

describe('hoverZoom.peekBox', () => {
    it('квадратное фото в середине экрана растёт в 2,5 раза и встаёт по центру своего фото', () => {
        const rect = {left: 600, top: 300, width: 190, height: 190}
        const box = hoverZoom.peekBox(rect, 1, view)
        expect(box.width).toBeCloseTo(475)
        expect(box.height).toBeCloseTo(475)
        expect(box.left + box.width / 2).toBeCloseTo(rect.left + rect.width / 2)
    })

    it('широкое фото растёт сильнее — в 3 раза, пропорции сохранены', () => {
        const box = hoverZoom.peekBox({left: 500, top: 300, width: 200, height: 125}, 1.6, view)
        expect(box.width).toBeCloseTo(600)
        expect(box.width / box.height).toBeCloseTo(1.6)
    })

    it('у края окна копия сдвигается внутрь и всё равно заметно крупнее', () => {
        const rect = {left: 1150, top: 720, width: 190, height: 170}
        const box = hoverZoom.peekBox(rect, 1, view)
        expect(box.left + box.width).toBeLessThanOrEqual(view.width - 14 + 1e-9)
        expect(box.top + box.height).toBeLessThanOrEqual(view.height - 14 + 1e-9)
        expect(box.width).toBeGreaterThan(rect.width * 2)
    })

    it('на узком окне копия не вылезает за экран', () => {
        const box = hoverZoom.peekBox({left: 20, top: 200, width: 300, height: 300}, 1, {width: 390, height: 844})
        expect(box.width).toBeLessThanOrEqual(390 - 28 + 1e-9)
    })
})

describe('hoverZoom.shownRect', () => {
    it('квадратное фото в широкой рамке с object-fit: contain — увеличиваем видимую середину, а не поля', () => {
        const shown = hoverZoom.shownRect({left: 100, top: 50, width: 255, height: 190}, 1, 'contain')
        expect(shown).toEqual({left: 132.5, top: 50, width: 190, height: 190})
    })

    it('без contain видимая часть — вся рамка', () => {
        const rect = {left: 0, top: 0, width: 300, height: 200}
        expect(hoverZoom.shownRect(rect, 1, 'cover')).toBe(rect)
    })
})
