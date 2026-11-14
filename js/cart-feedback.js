// Отклик корзины (14.11, жалоба владельца «при нажатии не формируется корзина»): корзина работала, но этого
// не было видно — шапка с кнопкой корзины не закреплена, и при нажатии цены внизу страницы счётчик менялся
// где-то за краем экрана. Теперь после добавления:
//   • кнопка цены на 1,4 с пишет «✓ Added» и зеленеет;
//   • внизу всплывает строка «<товар> added to cart» с кнопкой «Open cart» (и читается экранным чтецом);
//   • пока кнопка корзины в шапке за экраном, в правом нижнем углу висит своя кнопка корзины со счётчиком.
// cart.js после успешного добавления посылает событие «cosmo-market:added» с товаром и нажатой кнопкой.
const cartFeedback = function () {
    const headerCart = document.querySelector('.button-cart')
    const counter = document.querySelector('.cart-count')
    if (!headerCart) return

    // Плавающая кнопка корзины: тот же вид, что в шапке; нажатие — то же, что нажатие кнопки в шапке
    const float = document.createElement('button')
    float.type = 'button'
    float.className = 'button cart-float'
    float.setAttribute('aria-label', 'Open cart')
    const icon = document.createElement('img')
    icon.className = 'button-icon'
    icon.src = 'img/cart.svg'
    icon.alt = ''
    const floatCount = document.createElement('span')
    floatCount.className = 'cart-float__count'
    float.append(icon, floatCount)
    float.addEventListener('click', () => headerCart.click())
    document.body.append(float)

    let headerVisible = true
    const syncFloat = () => {
        const count = counter ? counter.textContent.trim() : ''
        floatCount.textContent = count
        float.classList.toggle('is-shown', !headerVisible && count !== '')
    }
    new IntersectionObserver(([entry]) => { headerVisible = entry.isIntersecting; syncFloat() }).observe(headerCart)
    if (counter) new MutationObserver(syncFloat).observe(counter, { childList: true, characterData: true, subtree: true })

    // Строка внизу экрана
    const toast = document.createElement('div')
    toast.className = 'cart-toast'
    toast.setAttribute('role', 'status')
    toast.setAttribute('aria-live', 'polite')
    const toastText = document.createElement('span')
    toastText.className = 'cart-toast__text'
    const open = document.createElement('button')
    open.type = 'button'
    open.className = 'button'
    open.textContent = 'Open cart'
    open.addEventListener('click', () => { hideToast(); headerCart.click() })
    toast.append(toastText, open)
    document.body.append(toast)
    let toastTimer = 0
    const hideToast = () => { clearTimeout(toastTimer); toast.classList.remove('is-shown') }

    document.addEventListener('cosmo-market:added', (event) => {
        const { good, button } = event.detail || {}
        toastText.textContent = `${good && good.name ? good.name : 'Item'} added to cart`
        toast.classList.add('is-shown')
        clearTimeout(toastTimer)
        toastTimer = setTimeout(hideToast, 3800)

        if (button) {
            const price = button.querySelector('.button-price')
            if (price && !button.classList.contains('is-added')) {
                const before = price.textContent
                price.textContent = '✓ Added'
                button.classList.add('is-added')
                setTimeout(() => { price.textContent = before; button.classList.remove('is-added') }, 1400)
            }
        }
        float.classList.remove('is-bumped')
        void float.offsetWidth // перезапуск анимации «подпрыгнуть»
        float.classList.add('is-bumped')
    })
    syncFloat()
}

cartFeedback()
