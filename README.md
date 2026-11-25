# Fake Store
A React shopping site: browse products, add to cart and check out. Product data comes from the public Fake Store API (fakestoreapi.com).

**Live demo:** https://fakestore-app.vercel.app (open in-app links from the home page; the host does not rewrite deep URLs)

**Stack:** React 18, React Router 6, SweetAlert2, CSS.

**Features**
- Product listing with category filter
- Register page
- Cart with item list and quantities
- Checkout page and a 404 page

**Run locally**
```bash
npm install
npm start
```
Opens at http://localhost:3000.

Note: the checkout payment call needs a maktapp merchant token (not included in this repo), so the payment step will not complete as-is.
