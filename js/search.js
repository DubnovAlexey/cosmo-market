// ФАЙЛ: js/search.js. НАЗНАЧЕНИЕ: общий запуск поиска кнопкой и Enter.
// Каталог, навигация, URL-фильтр и ошибки принадлежат marketCatalog в getGoods.js.

// НАЧАЛО ФУНКЦИИ search
const search = () => {
    const input = document.querySelector('.search-block > input')
    const button = document.querySelector('.search-block > button')
    if (!input || !button) return
    // НАЧАЛО ФУНКЦИИ submitSearch
    const submitSearch = () => marketCatalog.show({search: input.value.trim()})
    // КОНЕЦ ФУНКЦИИ submitSearch
    button.addEventListener('click', submitSearch)
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') { event.preventDefault(); submitSearch() }
    })
}
// КОНЕЦ ФУНКЦИИ search
search()
