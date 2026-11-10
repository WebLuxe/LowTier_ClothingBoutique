# WebLuxe High Fashion Boutique: Starter demo

The entry tier of the WebLuxe clothing-shop demos: a clean, fast catalogue in white and marigold.
Live: https://webluxe.github.io/LowTier_ClothingBoutique/

All pieces, prices, photos, names, addresses and opening hours are examples. In demo mode the WhatsApp and call buttons show a popup instead of contacting anyone.

## Pages
- `index.html`: home with categories, new pieces and how to shop
- `shop.html`: every piece, with search, categories and price sort (`shop.html?cat=saree`)
- `product.html?id=…`: one piece with its photos and an "Ask on WhatsApp" button
- `contact.html`: boutiques, opening hours and a booking form that opens WhatsApp

## Files
| File | What it does |
|---|---|
| `tools/pages.py` | Writes the four pages from one header and footer: `python tools/pages.py` |
| `app.js` | Everything the pages do; shop name and WhatsApp number at the top |
| `style.css` | All styles |
| `data.js` | Products and announcements (written by the owner panel in `/admin`) |
| `demo/` | Demo mode, demo label and "Compare packages" |

Photos are Unsplash stock. Website built by [WebLuxe](https://webluxe.github.io/WebLuxe/).
