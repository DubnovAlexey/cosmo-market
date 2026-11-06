// Чистые функции корзины: получают массив товаров и возвращают новый, ничего не читают и не пишут сами.
// Их проверяют тесты (tests/cart-logic.test.js), а cart.js только сохраняет результат и рисует.
const CartLogic = {
    // Ключи localStorage с префиксом магазина: на dubnovalexey.github.io все проекты делят одно хранилище
    KEYS: {
        cart: 'cosmo-market:cart',
        goods: 'cosmo-market:goods'
    },

    // Восстановление старого/повреждённого хранилища: только валидные строки корзины.
    restore(value) {
        if (!Array.isArray(value)) return []
        return value.filter(item => item && (typeof item.id === 'string' || typeof item.id === 'number') &&
            typeof item.name === 'string' && Number.isFinite(Number(item.price)) && Number(item.price) >= 0 &&
            Number.isSafeInteger(Number(item.count)) && Number(item.count) > 0)
            .map(item => ({...item, count: Number(item.count)}))
    },

    // Добавить товар: если он уже в корзине — +1 к количеству, иначе новая строка с количеством 1
    add(cart, good) {
        if (cart.some(item => item.id === good.id)) {
            return CartLogic.plus(cart, good.id)
        }
        return [...cart, {...good, count: 1}]
    },

    plus(cart, id) {
        return cart.map(item => (item.id === id ? {...item, count: item.count + 1} : item))
    },

    // Минус: при нуле строка исчезает из корзины
    minus(cart, id) {
        return cart
            .map(item => (item.id === id ? {...item, count: item.count - 1} : item))
            .filter(item => item.count > 0)
    },

    remove(cart, id) {
        return cart.filter(item => item.id !== id)
    },

    // Сколько штук всего — для счётчика на кнопке корзины
    count(cart) {
        return cart.reduce((sum, item) => sum + item.count, 0)
    },

    // Стоимость строки в центах: так не накапливаются ошибки округления (0.1 + 0.2)
    lineCents(item) {
        return Math.round(Number(item.price) * 100) * Number(item.count)
    },

    totalCents(cart) {
        return cart.reduce((sum, item) => sum + CartLogic.lineCents(item), 0)
    }
}

// В браузере это обычный скрипт, а тесты в Node подключают его как модуль
if (typeof module !== 'undefined') {
    module.exports = CartLogic
}
