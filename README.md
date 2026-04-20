# Paradise Nursery

**Project Name: Paradise Nursery Shopping Application**

Paradise Nursery is a front-end React shopping application for an online houseplant store. Users can browse a curated collection of houseplants, add them to a shopping cart, and manage their order before checkout.

## Project Features

- **Landing Page** — Full background image, company name "Paradise Nursery", about us paragraph, and a "Get Started" button linking to the product listing page
- **Product Listing Page** — 18 unique houseplants across 3 categories (Air Purifying, Low Maintenance, Fragrant), each with thumbnail, name, and price. Add to Cart button disables after adding and updates the cart icon count.
- **Shopping Cart Page** — Displays all cart items with thumbnail, name, unit price, and subtotal. Includes increase/decrease quantity buttons, delete button, total cost, continue shopping button, and checkout button.
- **Navbar** — Appears on both Product Listing and Cart pages with navigation links to Home, Plants, and Cart. Displays a live cart item count badge.
- **Redux State Management** — Cart state managed via Redux Toolkit (CartSlice) with addItem, removeItem, and updateQuantity reducers.

## Tech Stack

- React 19
- Vite
- Redux Toolkit + React-Redux
- React Router DOM v6
- Lucide React (icons)

## Project Structure

```
src/
├── App.jsx                    # Landing page + routing
├── App.css                    # All styles including background image
├── components/
│   ├── AboutUs.jsx            # Company description
│   ├── Navbar.jsx             # Navigation with cart badge
│   ├── ProductList.jsx        # Product listing page
│   └── CartItem.jsx           # Shopping cart page
└── store/
    ├── CartSlice.jsx          # Redux slice
    └── store.js               # Redux store
```

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

Deployed via GitHub Pages at: https://tirthvaghela.github.io/Paradise_Nursery/
