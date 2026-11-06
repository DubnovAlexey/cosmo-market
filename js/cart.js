const cart = function () {
    const cartBtn = document.querySelector(".button-cart")
    const cart = document.getElementById(`modal-cart`)
    const closeBtn = cart.querySelector(".modal-close")
    const cartTable = document.querySelector('.cart-table__goods')
    const modalForm = document.querySelector('.modal-form')
    const cartCount = document.querySelector('.cart-count')
    const cartTotal = document.querySelector('.card-table__total')

    // Корзина хранится в localStorage; расчёты — в чистых функциях CartLogic (js/cart-logic.js)
    let volatileCart = null // При недоступном хранилище корзина работает до закрытия страницы.
    const loadCart = () => {
        if (volatileCart !== null) return volatileCart
        try {
            const saved = JSON.parse(localStorage.getItem(CartLogic.KEYS.cart))
            return CartLogic.restore(saved)
        } catch {
            return []
        }
    }

    const saveCart = (cartArray) => {
        try { localStorage.setItem(CartLogic.KEYS.cart, JSON.stringify(cartArray)); volatileCart = null }
        catch { volatileCart = cartArray }
    }

    const updateCartCount = () => {
        const totalCount = CartLogic.count(loadCart())
        if (cartCount) {
            cartCount.textContent = totalCount > 0 ? totalCount : ''
        }
    }

    // Изменить корзину, сохранить и перерисовать
    const changeCart = (change) => {
        const newCart = change(loadCart())
        saveCart(newCart)
        renderCartGoods(newCart)
    }

    const deleteCartItem = (id) => changeCart(cartArray => CartLogic.remove(cartArray, id))
    const plusCartItem = (id) => changeCart(cartArray => CartLogic.plus(cartArray, id))
    const minusCartItem = (id) => changeCart(cartArray => CartLogic.minus(cartArray, id))


    const addToCart = async (id) => {
        // Сначала ищем товар в последнем загруженном списке. На главной этого списка ещё нет,
        // поэтому тогда берём товар из полного каталога.
        let goods = []
        try { const saved = JSON.parse(localStorage.getItem(CartLogic.KEYS.goods)); if (Array.isArray(saved)) goods = saved }
        catch { /* Повреждённый кэш не мешает загрузить исходный каталог. */ }
        let clikedGood = goods.find(good => good && String(good.id) === String(id))
        if (!clikedGood) {
            const response = await fetch('./db/db.json')
            if (!response.ok) throw new Error('Каталог недоступен')
            const catalog = await response.json()
            clikedGood = catalog.find(good => String(good.id) === String(id))
        }
        if (!clikedGood) {
            return
        }

        saveCart(CartLogic.add(loadCart(), clikedGood))
        // Счётчик на кнопке корзины обновляем сразу, а не только после перезагрузки страницы
        updateCartCount()
    }

    // Ячейка таблицы: текст — через textContent, кнопка — по классу
    const cell = (text, buttonClass) => {
        const td = document.createElement('td')
        if (buttonClass) {
            const button = document.createElement('button')
            button.className = buttonClass
            button.textContent = text
            td.append(button)
        } else {
            td.textContent = text
        }
        return td
    }

    const renderCartGoods = (goods) => {
        cartTable.replaceChildren()
        // Плюс, минус и удаление перерисовывают корзину через эту функцию, поэтому счётчик обновляем здесь
        updateCartCount()

        if (cartTotal) {
            cartTotal.textContent = formatPrice(CartLogic.totalCents(goods) / 100)
        }

        goods.forEach(good => {
            const tr = document.createElement('tr')
            tr.append(
                cell(good.name),
                cell(formatPrice(good.price)),
                cell('-', 'cart-btn-minus'),
                cell(good.count),
                cell('+', 'cart-btn-plus'),
                cell(formatPrice(CartLogic.lineCents(good) / 100)),
                cell('x', 'cart-btn-delete')
            )
            cartTable.append(tr)

            tr.addEventListener('click', (e) => {

                if (e.target.classList.contains('cart-btn-minus')) {
                    minusCartItem(good.id)

                } else if (e.target.classList.contains('cart-btn-plus')) {
                    plusCartItem(good.id)

                } else if (e.target.classList.contains('cart-btn-delete')) {
                    deleteCartItem(good.id)
                }
            })
        })
    }

    // Демо-магазин не имеет сервера заказов: персональные поля никуда не передаются.
    const sendForm = () => {
        if (!modalForm.reportValidity()) return
        if (!loadCart().length) { alert('Добавьте товары в корзину.'); return }
        alert('Демонстрационный заказ проверен. Данные никуда не отправлены; корзина сохранена.')
    }

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault()
        sendForm()
    })



    cartBtn.addEventListener("click", function () {
        renderCartGoods(loadCart())
        cart.style.display = `flex`
    })

    closeBtn.addEventListener("click", function () {
        cart.style.display = ``
    })

    cart.addEventListener('click', (event) => {
        if (!event.target.closest('.modal') && event.target.classList.contains('overlay')) {
            cart.style.display = ''
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cart.style.display = ''
        }
    })

    // Кнопки «в корзину» есть и на главной, и в каталоге, поэтому слушаем клики на всём документе
    document.addEventListener('click', (event) => {
        const buttonToCart = event.target.closest('.add-to-cart')
        if (buttonToCart) {
            addToCart(buttonToCart.dataset.id).catch(() => alert('Не удалось загрузить товар. Попробуйте ещё раз.'))
        }
    })
    updateCartCount()

}

cart()
