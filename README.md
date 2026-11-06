# Cosmo Market

[English](#english) · [Русский](#russian) · [עברית](#hebrew)

<a name="english"></a>

## English

A small online store written in plain JavaScript. It has a product catalog with categories and search, a shopping cart that survives a page reload, and an order form.

**Live demo:** https://dubnovalexey.github.io/cosmo-market/

### Try it in a minute

Open the catalog, use a category or search, add a product and open the cart. Change its quantity and reload to check persistence. Checkout is a local demonstration and does not send an order.

![Cosmo Market home page](docs/screenshot.jpg)

### Features

- The catalog is loaded from `db/db.json` with the Fetch API.
- A category menu (Womens, Mens, Clothing, Accessories, Shoes, All) and a **View All** button.
- Search by product name.
- Shopping cart: add items, change the quantity, remove items. The cart is stored in `localStorage`, so it survives a page reload.
- The total price and the counter on the cart button update immediately.
- An order form with required name and phone fields. This is a local demonstration: personal data is not transmitted and the cart remains available.
- A responsive layout based on the Bootstrap grid.

### Tech stack

HTML5 · CSS3 · JavaScript (ES2015+) · Fetch API · localStorage · Bootstrap Grid · GitHub Pages

### Engineering focus

- Rendering a catalog from data with array methods: `filter`, `find`, `map`, `reduce`.
- Keeping state between two pages with `localStorage`.
- Validating a demonstration order without transmitting personal fields to a third-party test service.
- Event handling and DOM updates without frameworks.

### Run locally

The catalog is loaded with `fetch`, so open the page through a local web server, not as a file:

- in IntelliJ IDEA or WebStorm: right-click `index.html` → **Open In** → **Browser**;
- or in a terminal: run `npx serve .` and open the address it prints.

### Tests

The cart rules live in pure functions in `js/cart-logic.js` (add, plus, minus, remove, piece count, totals in cents). They are covered by unit tests in `tests/cart-logic.test.js`:

```bash
npm install
npm test
```

GitHub Actions runs the same tests on every push (`.github/workflows/test.yml`). The site itself still needs no build step.

### Roadmap

The following items are planned, not implemented.

- **Visual:** improve empty/loading states and product image consistency; add text-labelled language choices with RTL layout when translations are introduced.
- **Engineering:** separate catalog state and DOM rendering, extend storage/API error tests and define an order-backend contract before connecting one.
- **Functionality:** add product details and price sorting, then activate the home slider; real ordering is a separate backend stage.

### Credits

- The layout is based on a training template from a JavaScript course. The JavaScript logic is my own work.
- Product data and photos are demo content from the course materials, used for learning purposes only.
- Fonts: Lato and Roboto Slab (Google Fonts).

---

<a name="russian"></a>

## Русский

Небольшой интернет-магазин на чистом JavaScript. В нём есть каталог товаров с категориями и поиском, корзина, которая сохраняется после перезагрузки страницы, и форма заказа.

**Демо:** https://dubnovalexey.github.io/cosmo-market/

### Короткий сценарий просмотра

Откройте каталог, выберите категорию или поиск, добавьте товар и перейдите в корзину. Измените количество и перезагрузите страницу для проверки сохранения. Оформление — локальная демонстрация без отправки заказа.

![Главная страница Cosmo Market](docs/screenshot.jpg)

### Возможности

- Каталог загружается из `db/db.json` через Fetch API.
- Меню категорий (Womens, Mens, Clothing, Accessories, Shoes, All) и кнопка **View All**.
- Поиск по названию товара.
- Корзина: добавление, изменение количества, удаление. Корзина хранится в `localStorage` и не пропадает при перезагрузке страницы.
- Итоговая сумма и счётчик на кнопке корзины обновляются сразу.
- Форма заказа с обязательными полями имени и телефона. Это локальное демо: персональные данные никуда не отправляются, корзина сохраняется.
- Адаптивная вёрстка на сетке Bootstrap.

### Технологии

HTML5 · CSS3 · JavaScript (ES2015+) · Fetch API · localStorage · Bootstrap Grid · GitHub Pages

### Инженерные решения

- Вывод каталога из данных с помощью методов массивов: `filter`, `find`, `map`, `reduce`.
- Хранение состояния между двумя страницами через `localStorage`.
- Проверку демонстрационного заказа без передачи персональных данных стороннему тестовому сервису.
- Обработку событий и обновление DOM без фреймворков.

### Как запустить

Каталог загружается через `fetch`, поэтому страницу нужно открывать через локальный сервер, а не как файл:

- в IntelliJ IDEA или WebStorm: правый клик по `index.html` → **Open In** → **Browser**;
- или в терминале: выполнить `npx serve .` и открыть адрес, который он покажет.

### Тесты

Правила корзины — чистые функции в `js/cart-logic.js` (добавить, плюс, минус, удалить, число штук, суммы в центах). Их проверяют юнит-тесты `tests/cart-logic.test.js`:

```bash
npm install
npm test
```

GitHub Actions запускает те же тесты при каждом пуше (`.github/workflows/test.yml`). Самому сайту сборка по-прежнему не нужна.

### Планы

Следующие пункты — планы, а не реализованные функции.

- **Визуал:** улучшить состояния пустого каталога/загрузки и единообразие фотографий; при переводе добавить текстовые названия языков и RTL-вёрстку.
- **Инженерия:** разделить состояние каталога и DOM-рендер, расширить проверки ошибок хранилища/API и определить контракт сервера заказов до его подключения.
- **Функции:** добавить подробности товара и сортировку по цене, затем запустить слайдер главной; настоящие заказы — отдельный серверный этап.

### Благодарности

- Вёрстка основана на учебном макете курса по JavaScript. Логика на JavaScript написана мной.
- Данные и фотографии товаров — демонстрационные материалы курса, используются только в учебных целях.
- Шрифты: Lato и Roboto Slab (Google Fonts).

---

<a name="hebrew"></a>

<div dir="rtl">

## עברית

חנות מקוונת קטנה שנכתבה ב-JavaScript טהור. יש בה קטלוג מוצרים עם קטגוריות וחיפוש, עגלת קניות שנשמרת גם אחרי רענון הדף, וטופס הזמנה.

**הדגמה חיה:** https://dubnovalexey.github.io/cosmo-market/

### הדגמה קצרה

פתחו את הקטלוג, בחרו קטגוריה או חיפוש, הוסיפו מוצר ופתחו את העגלה. שנו כמות ורעננו כדי לבדוק שמירה. התשלום הוא הדגמה מקומית ואינו שולח הזמנה.

![דף הבית של Cosmo Market](docs/screenshot.jpg)

### יכולות

- הקטלוג נטען מהקובץ `db/db.json` באמצעות Fetch API.
- תפריט קטגוריות (Womens, Mens, Clothing, Accessories, Shoes, All) וכפתור **View All**.
- חיפוש לפי שם המוצר.
- עגלת קניות: הוספת מוצרים, שינוי כמות והסרה. העגלה נשמרת ב-`localStorage`, ולכן אינה נמחקת ברענון הדף.
- הסכום הכולל והמונה על כפתור העגלה מתעדכנים מיד.
- טופס הדגמה עם שדות חובה לשם ולטלפון. הנתונים אינם נשלחים לשירות חיצוני ועגלת הקניות נשמרת.
- פריסה רספונסיבית המבוססת על הרשת של Bootstrap.

### טכנולוגיות

HTML5 · CSS3 · JavaScript (ES2015+) · Fetch API · localStorage · Bootstrap Grid · GitHub Pages

### היבטים הנדסיים

- הצגת קטלוג מתוך נתונים בעזרת מתודות של מערכים: `filter`, `find`, `map`, `reduce`.
- שמירת מצב בין שני דפים בעזרת `localStorage`.
- אימות טופס הדגמה בלי לשלוח פרטים אישיים לשירות בדיקה חיצוני.
- טיפול באירועים ועדכון ה-DOM ללא פריימוורקים.

### הרצה מקומית

הקטלוג נטען עם `fetch`, ולכן יש לפתוח את הדף דרך שרת מקומי ולא כקובץ:

- ב-IntelliJ IDEA או ב-WebStorm: לחיצה ימנית על `index.html` ← **Open In** ← **Browser**;
- או בטרמינל: להריץ `npx serve .` ולפתוח את הכתובת שמופיעה.

### בדיקות

חוקי העגלה הם פונקציות טהורות ב-`js/cart-logic.js`, והם נבדקים בבדיקות יחידה ב-`tests/cart-logic.test.js` (`npm install`, ואז `npm test`). GitHub Actions מריץ אותן בכל push.

### תוכניות להמשך

הפריטים הבאים מתוכננים ואינם ממומשים עדיין.

- **עיצוב:** לשפר מצבי טעינה/קטלוג ריק ואחידות תמונות; בעת הוספת תרגומים להשתמש בשמות שפות כטקסט ובפריסת RTL.
- **הנדסה:** להפריד בין מצב הקטלוג לרינדור DOM, להרחיב בדיקות שגיאות אחסון/API ולהגדיר חוזה לשרת הזמנות לפני חיבורו.
- **פונקציונליות:** להוסיף פרטי מוצר ומיון לפי מחיר, ובהמשך להפעיל את הסליידר הראשי; הזמנות אמיתיות הן שלב שרת נפרד.

### קרדיטים

- העיצוב מבוסס על תבנית לימודית מקורס JavaScript. לוגיקת ה-JavaScript נכתבה על ידי.
- נתוני המוצרים והתמונות הם תוכן הדגמה מחומרי הקורס ומשמשים למטרות לימוד בלבד.
- גופנים: Lato ו-Roboto Slab (Google Fonts).

</div>
