const cart = function () {
    const cartBtn = document.querySelector(".button-cart")
    const cart = document.getElementById(`modal-cart`)
    const closeBtn = cart.querySelector(".modal-close")
    const goodsContainer = document.querySelector('.long-goods-list')
    const cartTable = document.querySelector('.cart-table__goods')
    const modalForm = document.querySelector('.modal-form')
    const cartCount = document.querySelector('.cart-count')
    const cartTotal = document.querySelector('.card-table__total')

    const updateCartCount = () => {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []
        const totalCount = cartArray.reduce((sum, item) => sum + item.count, 0)
        if (cartCount) {
            cartCount.textContent = totalCount > 0 ? totalCount : ''
        }
    }

    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.filter(good => {
            return good.id !== id
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map((good) => {
            if (good.id === id) {
                good.count++
            }
            return good
        })

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map((good) => {
            if (good.id === id) {
                if (good.count > 0) {
                    good.count--
                }
            }
            return good
        }).filter(good => good.count > 0)

        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }


    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods'))
        const clikedGood = goods.find(good => good.id === id)
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        if (cart.some(good => good.id === clikedGood.id)) {
            cart.map((good) => {
                if (good.id === clikedGood.id) {
                    good.count++
                }
                return good
            })

        } else {
            clikedGood.count = 1
            cart.push(clikedGood)
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        // Счётчик на кнопке корзины обновляем сразу, а не только после перезагрузки страницы
        updateCartCount()
    }

    const renderCartGoods = (goods) => {
        cartTable.innerHTML = ''
        // Плюс, минус и удаление перерисовывают корзину через эту функцию, поэтому счётчик обновляем здесь
        updateCartCount()

        const totalPrice = goods.reduce((sum, good) => {
            return sum + (+good.price * +good.count)
        }, 0)

        if (cartTotal) {
            cartTotal.textContent = totalPrice + '$'
        }

        goods.forEach(good => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
               <td>${good.name}</td>
                <td>${good.price}</td>
                <td>
                    <button class="cart-btn-minus">-</button>
                </td>
                <td>${good.count}</td>
                <td>
                    <button class=" cart-btn-plus">+</button>
                </td>
                <td>${+good.price * +good.count}</td>
                <td>
                    <button class="cart-btn-delete">x</button>
                </td>
              `
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
        if (cartTotal) {
            cartTotal.textContent = totalPrice + '$'
        }
    }

    const sendForm = () => {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

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
            localStorage.removeItem('cart')
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
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []
        renderCartGoods(cartArray)
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

    if (goodsContainer) {
        goodsContainer.addEventListener("click", (event) => {
            if (event.target.closest('.add-to-cart')) {
                const buttonToCart = event.target.closest('.add-to-cart')
                const goodId = buttonToCart.dataset.id

                addToCart(goodId)
            }
        })
    }
    updateCartCount()

}

cart()