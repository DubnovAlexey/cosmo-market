# Cosmo Market

**English** · [עברית](README.he.md) · [Русский](README.ru.md)

A small online store written in plain JavaScript. It has a product catalog with categories and search, a shopping cart that survives a page reload, and an order form.

**Live demo:** https://dubnovalexey.github.io/cosmo-market/

![Cosmo Market home page](docs/screenshot.jpg)

## Features

- The catalog is loaded from `db/db.json` with the Fetch API.
- A category menu (Womens, Mens, Clothing, Accessories, Shoes, All) and a **View All** button.
- Search by product name.
- Shopping cart: add items, change the quantity, remove items. The cart is stored in `localStorage`, so it survives a page reload.
- The total price and the counter on the cart button update immediately.
- An order form with name and phone. The order is sent to a test API (JSONPlaceholder). After sending, the form and the cart are cleared.
- A responsive layout based on the Bootstrap grid.

## Tech stack

HTML5 · CSS3 · JavaScript (ES2015+) · Fetch API · localStorage · Bootstrap Grid · GitHub Pages

## What I practised

- Rendering a catalog from data with array methods: `filter`, `find`, `map`, `reduce`.
- Keeping state between two pages with `localStorage`.
- Sending form data with `fetch` (POST) and handling the response.
- Event handling and DOM updates without frameworks.

## Run locally

The catalog is loaded with `fetch`, so open the page through a local web server, not as a file:

- in IntelliJ IDEA or WebStorm: right-click `index.html` → **Open In** → **Browser**;
- or in a terminal: run `npx serve .` and open the address it prints.

## Roadmap

- Make the slider on the home page work (connect Swiper).
- A product details window and sorting by price.
- Validation of the name and phone fields.
- The interface in four languages: English, Hebrew (right to left), Russian and Spanish.

## Credits

- The layout is based on a training template from a JavaScript course. The JavaScript logic is my own work.
- Product data and photos are demo content from the course materials, used for learning purposes only.
- Fonts: Lato and Roboto Slab (Google Fonts).
