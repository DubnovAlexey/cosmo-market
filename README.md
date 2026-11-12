<!--suppress MarkdownUnresolvedFileReference -->

# Cosmo Market

[English](#english) · [Русский](#russian) · [עברית](#hebrew) · [Español](#spanish) · [Français](#french)

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

---

<a name="spanish"></a>

## Español

Una pequeña tienda en línea en JavaScript puro. Tiene un catálogo de productos con categorías y búsqueda, un carrito que se conserva al recargar la página y un formulario de pedido.

**Demo:** https://dubnovalexey.github.io/cosmo-market/

### Recorrido rápido

Abra el catálogo, elija una categoría o use la búsqueda, añada un producto y vaya al carrito. Cambie la cantidad y recargue la página para comprobar que se guarda. El pedido es una demostración local que no envía nada.

![Página principal de Cosmo Market](docs/screenshot.jpg)

### Funciones

- El catálogo se carga desde `db/db.json` con la Fetch API.
- Menú de categorías (Womens, Mens, Clothing, Accessories, Shoes, All) y botón **View All**.
- Búsqueda por nombre de producto.
- Carrito: añadir, cambiar la cantidad, quitar. El carrito se guarda en `localStorage` y no desaparece al recargar la página.
- El total y el contador del botón del carrito se actualizan al instante.
- Formulario de pedido con nombre y teléfono obligatorios. Es una demo local: los datos personales no se envían a ningún sitio y el carrito se conserva.
- Maquetación adaptable con la rejilla de Bootstrap.

### Tecnologías

HTML5 · CSS3 · JavaScript (ES2015+) · Fetch API · localStorage · Bootstrap Grid · GitHub Pages

### Decisiones técnicas

- Catálogo generado a partir de datos con métodos de arrays: `filter`, `find`, `map`, `reduce`.
- Estado compartido entre dos páginas mediante `localStorage`.
- Validación del pedido de demostración sin enviar datos personales a un servicio de pruebas externo.
- Gestión de eventos y actualización del DOM sin frameworks.

### Cómo ejecutarlo

El catálogo se carga con `fetch`, así que la página debe abrirse mediante un servidor local, no como archivo:

- en IntelliJ IDEA o WebStorm: clic derecho en `index.html` → **Open In** → **Browser**;
- o en la terminal: ejecutar `npx serve .` y abrir la dirección que muestre.

### Pruebas

Las reglas del carrito son funciones puras en `js/cart-logic.js` (añadir, más, menos, quitar, número de unidades, sumas en céntimos). Las comprueban las pruebas unitarias `tests/cart-logic.test.js`:

```bash
npm install
npm test
```

GitHub Actions ejecuta las mismas pruebas en cada push (`.github/workflows/test.yml`). El sitio en sí sigue sin necesitar compilación.

### Planes

Los puntos siguientes son planes, no funciones implementadas.

- **Visual:** mejorar los estados de catálogo vacío y de carga y la uniformidad de las fotos; al traducir la tienda, añadir nombres de idioma en texto y maquetación RTL.
- **Ingeniería:** separar el estado del catálogo del renderizado del DOM, ampliar las comprobaciones de errores de almacenamiento y de API y definir el contrato del servidor de pedidos antes de conectarlo.
- **Funciones:** añadir la ficha del producto y la ordenación por precio, y después activar el carrusel de la portada; los pedidos reales son una etapa aparte con servidor.

### Agradecimientos

- La maqueta se basa en una plantilla de prácticas de un curso de JavaScript. La lógica en JavaScript la escribí yo.
- Los datos y las fotos de los productos son material de demostración del curso y se usan solo con fines de estudio.
- Fuentes: Lato y Roboto Slab (Google Fonts).

---

<a name="french"></a>

## Français

Une petite boutique en ligne en JavaScript pur. Elle comprend un catalogue de produits avec catégories et recherche, un panier conservé après le rechargement de la page et un formulaire de commande.

**Démo :** https://dubnovalexey.github.io/cosmo-market/

### Visite rapide

Ouvrez le catalogue, choisissez une catégorie ou lancez une recherche, ajoutez un produit et allez au panier. Changez la quantité et rechargez la page pour vérifier la sauvegarde. La commande est une démonstration locale qui n'envoie rien.

![Page d'accueil de Cosmo Market](docs/screenshot.jpg)

### Fonctions

- Le catalogue se charge depuis `db/db.json` avec la Fetch API.
- Menu des catégories (Womens, Mens, Clothing, Accessories, Shoes, All) et bouton **View All**.
- Recherche par nom de produit.
- Panier : ajouter, changer la quantité, supprimer. Le panier est gardé dans `localStorage` et ne disparaît pas au rechargement de la page.
- Le total et le compteur du bouton du panier se mettent à jour immédiatement.
- Formulaire de commande avec nom et téléphone obligatoires. C'est une démo locale : les données personnelles ne partent nulle part, le panier est conservé.
- Mise en page adaptative sur la grille Bootstrap.

### Technologies

HTML5 · CSS3 · JavaScript (ES2015+) · Fetch API · localStorage · Bootstrap Grid · GitHub Pages

### Choix techniques

- Catalogue rendu à partir des données avec les méthodes de tableaux : `filter`, `find`, `map`, `reduce`.
- État partagé entre deux pages via `localStorage`.
- Validation de la commande de démonstration sans transmettre de données personnelles à un service de test externe.
- Gestion des événements et mise à jour du DOM sans framework.

### Lancer le projet

Le catalogue se charge avec `fetch` : il faut donc ouvrir la page via un serveur local, et non comme un fichier :

- dans IntelliJ IDEA ou WebStorm : clic droit sur `index.html` → **Open In** → **Browser** ;
- ou dans le terminal : lancer `npx serve .` et ouvrir l'adresse qu'il affiche.

### Tests

Les règles du panier sont des fonctions pures dans `js/cart-logic.js` (ajouter, plus, moins, supprimer, nombre d'articles, sommes en centimes). Elles sont vérifiées par les tests unitaires `tests/cart-logic.test.js` :

```bash
npm install
npm test
```

GitHub Actions lance les mêmes tests à chaque push (`.github/workflows/test.yml`). Le site lui-même n'a toujours pas besoin de compilation.

### Projets

Les points suivants sont des projets, pas des fonctions réalisées.

- **Visuel :** améliorer les états de catalogue vide et de chargement et l'homogénéité des photos ; lors de la traduction de la boutique, ajouter des noms de langue en texte et la mise en page RTL.
- **Ingénierie :** séparer l'état du catalogue du rendu DOM, étendre les vérifications d'erreurs de stockage et d'API et définir le contrat du serveur de commandes avant de le brancher.
- **Fonctions :** ajouter la fiche produit et le tri par prix, puis activer le carrousel de l'accueil ; les vraies commandes sont une étape serveur à part.

### Remerciements

- La mise en page s'appuie sur une maquette d'exercice d'un cours de JavaScript. La logique JavaScript est de moi.
- Les données et les photos des produits sont des supports de démonstration du cours, utilisés uniquement à des fins d'apprentissage.
- Polices : Lato et Roboto Slab (Google Fonts).
