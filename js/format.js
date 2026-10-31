// Форматтер цен: «$119», «$5.99»
const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
})

// Принимает число или строку, возвращает отформатированную цену
const formatPrice = (value) => priceFormatter.format(Number(value))
