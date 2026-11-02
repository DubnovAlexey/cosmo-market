const cart = function () {
    const cartBtn = document.querySelector(".button-cart")
    const cart = document.getElementById(`modal-cart`)
    const closeBtn = cart.querySelector(".modal-close")
    const cartTable = document.querySelector('.cart-table__goods')
    const modalForm = document.querySelector('.modal-form')
    const cartCount = document.querySelector('.cart-count')
    const cartTotal = document.querySelector('.card-table__total')

    // Корзина хранится в localStorage; расчёты — в чистых функциях CartLogic (js/cart-logic.js)
    const loadCart = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(CartLogic.KEYS.cart))
            return Array.isArray(saved) ? saved : []
        } catch {
            return []
        }
    }

    const saveCart = (cartArray) => {
        localStorage.setItem(CartLogic.KEYS.cart, JSON.stringify(cartArray))
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
        const goods = JSON.parse(localStorage.getItem(CartLogic.KEYS.goods)) || []
        let clikedGood = goods.find(good => good.id === id)
        if (!clikedGood) {
            const response = await fetch('./db/db.json')
            const catalog = await response.json()
            clikedGood = catalog.find(good => good.id === id)
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

    const sendForm = () => {
        const cartArray = loadCart()

        const nameInput = modalForm.querySelector('[name="nameCustomer"]')
        const phoneInput = modalForm.querySelector('[name="phoneCustomer"]')

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                cart: cartArray,
                name: nameInput ? nameInput.value.trim() : '',
                phone: phoneInput ? phoneInput.value.trim() : ''
            })
        }).then(() => {
            modalForm.reset()
            localStorage.removeItem(CartLogic.KEYS.cart)
            updateCartCount()
            cart.style.display = ``
            alert('Спасибо за заказ!')
        })
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
            addToCart(buttonToCart.dataset.id)
        }
    })
    updateCartCount()

}

cart()
