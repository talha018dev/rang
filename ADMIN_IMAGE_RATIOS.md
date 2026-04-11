# API image aspect ratios (by section)

This guide lists **only placements where the image URL comes from the backend** (homepage payload, site settings, product/category/tag/brand APIs, cart, orders, etc.). It does **not** cover static assets bundled in the app (for example default hero fallbacks, marquee-only banners, or fixed marketing art unless that art is also served from an API URL).

**Aspect ratio** is **width : height**. With `object-fit: cover`, the image is cropped to the frame; with `contain`, the full image may letterbox.

**Pixel examples** beside each ratio (e.g. “same frame as 1920×800” or “e.g. 820×1000”) are **illustrative export sizes** that match that ratio—they are not strict minimums or maximums.

---

## Home page

### Hero carousel

- **Source:** Homepage API — main banner image URLs.
- **Ratio:** **12 : 5** (same frame as 1920×800).

### Welcome popup

- **Source:** Settings API — popup desktop and mobile image URLs (when set); may fall back to other homepage data if unset.
- **Ratio:** No fixed ratio — full-bleed in the modal with **cover** cropping. Match your design mockup (e.g. 1200×1600 or 1080×1350 if you need a concrete starting point).

### New Arrivals

- **Source:** Homepage API — products in the **New Arrival / New Arrivals** section (product images).
- **Ratio:** **17 : 25** (e.g. 680×1000) — portrait tiles in the carousel.

### Explore Rang Bangladesh

- **Source:** Homepage API — **Explore Rang Bangladesh** dynamic section (one image per tile).
- **Ratio:** Depends on tile position in the grid:
  - First row, wide tile: **1.73 : 1** (e.g. 1730×1000)
  - First row, square tile: **1 : 1** (e.g. 1000×1000)
  - Second row tiles: **41 : 50** (e.g. 820×1000)
  - On small screens, some tiles switch to **2.63 : 1** (e.g. 2630×1000) or **22 : 25** (e.g. 880×1000) — use the desktop ratios if you only upload one asset per slot.

### Shop by Category

- **Source:** Homepage API — **Shop by Category** dynamic section.
- **Ratio:** Per slot (order matters in the layout):
  - **1 : 1** (e.g. 1000×1000), **1.73 : 1** (e.g. 1730×1000), and **41 : 50** (e.g. 820×1000) on desktop; on narrow screens the layout uses **22 : 25** (e.g. 880×1000), **1.73 : 1** (e.g. 1730×1000), and **2 : 1** (e.g. 2000×1000) in places — align uploads with the slot order in admin.

### Timeless Six Yards

- **Source:** Homepage API — products in the **Timeless Six Yards** section.
- **Ratio:** **17 : 25** (e.g. 680×1000) and **73 : 100** (e.g. 730×1000) depending on tile (see how the slot appears on the home page).

### Shop by Brand

- **Source:** Brands API — brand logo image per brand; **plus** product images from the API for the featured product grid.
- **Ratio:** Brand logos **1 : 1** (e.g. 1000×1000); featured product tiles follow the **Sale Offer** / large-tile patterns (tall portrait blocks, typically **~17 : 25** (e.g. 680×1000) to **~41 : 50** (e.g. 820×1000) depending on the cell).

### Shop by Theme

- **Source:** Homepage API — **Shop by Theme** dynamic section (theme tile images).
- **Ratio:** **17 : 25** (e.g. 680×1000) and **73 : 100** (e.g. 730×1000) (carousel / grid styling).

### Sale Offer

- **Source:** Homepage API — products in the **Sale Offer** section.
- **Ratio:** Large hero-style product tile and smaller tiles — **17 : 25** (e.g. 680×1000) and **1 : 1** (e.g. 1000×1000) style cells in the block (portrait-heavy).

### Deals of the Month

- **Source:** Homepage API — products in the **Deals of the Month** section (carousel product cards). The countdown card background is a **static** file in the app, not an admin upload.
- **Ratio:** Carousel product images **17 : 25** (e.g. 680×1000).

### Why Rang Bangladesh?

- **Source:** Homepage API — **Why Rang** dynamic section. The UI renders **video** files from the URLs returned by the API (not still photos).
- **Ratio:** Video frames are shown in **~2.22 : 1** (e.g. 2220×1000) (wide) and **~10 : 13** (e.g. 1000×1300) (tall) slots. Export video to match these frames, or use letterboxing-aware composition.

---

## Products listing pages

Applies to category, tag, and similar product listing screens (filters + product grid). **Product card images** always come from the product API.

### Listing hero (category / tag)

- **Source:** Category or tag **cover** image from the API when configured.
- **Ratio:** **13 : 4** (e.g. 1300×400) — wide banner.

### Listing hero (campaign)

- **Source:** Currently the campaign page does not bind a hero image from the API in the client; if your backend adds a campaign cover later, the same **13 : 4** (e.g. 1300×400) frame is used elsewhere for listing heroes.

### Product grid (all listing types)

- **Source:** Product API — main product image per card.
- **Ratio:** **41 : 50** (e.g. 820×1000) — portrait cards.

### Brand listing page

- **Source:** Product API — grid only (no hero image from API in the current layout).
- **Ratio:** **41 : 50** (e.g. 820×1000) for product cards.

---

## Product details page

All from **product / variant APIs**.

| Placement | Ratio / behavior |
|-----------|------------------|
| Main gallery image | **No fixed ratio** — max-height frame, **contain** (e.g. export **1600×2000** or any portrait; full product stays visible). |
| Thumbnail strip | **1 : 1** (e.g. 1000×1000) |
| Frequently bought together | **2 : 3** (e.g. 800×1200) |
| Related products | **41 : 50** (e.g. 820×1000) |

---

## Cart, checkout, and search

| Section | Source | Ratio |
|---------|--------|--------|
| **Cart** — line items | Product image URL | **1 : 1** (e.g. 120×120 or 1000×1000 source; square thumb, cover) |
| **Checkout** — line items | Product image URL | **1 : 1** (e.g. 80×80 or 1000×1000 source; square thumb, cover) |
| **Search** — dropdown results | Product image URL | **1 : 1** (e.g. 50×50 or 1000×1000 source; small square) |

---

## Wishlist

| Section | Source | Ratio |
|---------|--------|--------|
| **Wishlist** page | Product image URL | Fixed height, full width; **cover** — no single ratio (e.g. a **4 : 3** or **41 : 50** source both work; composition centered). |
| **Profile — wishlist** | Product image URL | Fixed height, full width; **cover** — same idea as the wishlist page (**41 : 50** e.g. 820×1000 often looks balanced). |

---

## Orders

| Section | Source | Ratio |
|---------|--------|--------|
| **Order invoice** — line items | Product image URL | **80 : 98** (e.g. 800×980) (≈ **40 : 49**, close to **41 : 50** e.g. 820×1000) |

---

## One upload for product photos

The **same** product image URL is reused across grids, PDP, cart, search, wishlist, and invoices. **Prioritize** looking good at **~41 : 50** (e.g. 820×1000) for listing cards; **1 : 1** (e.g. 1000×1000) thumbs and small squares will crop—keep important detail in the center.

---

## Caveats

- **Homepage dynamic sections** are ordered in the API; **slot index** (first tile vs second row) determines which aspect ratio applies—match each admin field to the correct tile in the layout.
- **Responsive layouts** swap some ratios on mobile; when in doubt, prefer the **desktop** ratios above or upload separate mobile assets if your admin supports them.
- **Why Rang** uses **video** URLs, not static hero images.
