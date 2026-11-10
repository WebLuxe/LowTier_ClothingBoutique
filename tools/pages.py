"""Writes the Starter pages from one header and footer:  python tools/pages.py"""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parents[1]
NAME = 'WebLuxe High Fashion Boutique'
WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 16.4a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.7.7.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.4Zm4.1-5.5c-.2-.1-1.3-.7-1.5-.7s-.4-.1-.5.1-.6.7-.7.9-.3.2-.5 0a6 6 0 0 1-3-2.6c-.2-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2 4.6 4.6 0 0 0 1 2.4 10.6 10.6 0 0 0 4 3.6c1.5.6 2.1.7 2.8.6a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.2-.2-.2-.4-.3Z"/></svg>'
PHONE = '<span class="ph-num">Your phone number</span>'
LOGO = '<a class="logo" href="index.html" aria-label="WebLuxe High Fashion Boutique, home"><i>W</i><span>WebLuxe<small>High Fashion Boutique</small></span></a>'
ICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23d98a0b'/%3E"
        "%3Ctext x='32' y='44' font-size='34' text-anchor='middle' fill='white' font-family='Georgia'%3EW%3C/text%3E%3C/svg%3E")
LOADER = '<div class="loader" aria-hidden="true"><div><span class="mark">W</span><p>WEBLUXE</p></div></div>'


def page(slug, title, desc, body, loader=False):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="{ICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="demo/demo.css">
<link rel="stylesheet" href="demo/tiers.css">
</head>
<body data-page="{slug}">
{LOADER if loader else ''}
<div class="notice" role="status"><span></span></div>
<header class="hdr"><div class="wrap">
  {LOGO}
  <nav class="nav" aria-label="Main"><a href="index.html">Home</a><a href="shop.html">Shop</a><a href="contact.html">Visit us</a></nav>
  <a class="btn wa" href="#" data-wa="" target="_blank" rel="noopener" aria-label="WhatsApp us">{WA_ICON}<span>WhatsApp</span></a>
</div></header>
<main>
{body}
</main>
<footer class="foot"><div class="wrap">
  <div class="cols">
    <div>{LOGO}<p>Sarees, bridal and party lehengas, anarkalis and sherwanis for every celebration in Mauritius.</p></div>
    <div><h4>Shop</h4><ul><li><a href="shop.html?cat=bridal">Bridal lehengas</a></li><li><a href="shop.html?cat=saree">Sarees</a></li><li><a href="shop.html?cat=gown">Suits &amp; anarkalis</a></li><li><a href="shop.html?cat=groom">Groom &amp; men</a></li></ul></div>
    <div><h4>Visit</h4><ul><li>Royal Road, Rose Hill</li><li>Coastal Road, Grand Baie</li><li><a href="#" data-wa="" target="_blank" rel="noopener">WhatsApp us</a></li><li><a href="tel:">{PHONE}</a></li></ul></div>
  </div>
  <p class="demo-note">This is a demo website made by WebLuxe. All pieces, prices, photos, names, addresses and opening hours are examples, and the WhatsApp and call buttons do not contact anyone.</p>
  <div class="base"><span>&copy; <span data-year>2026</span> {NAME}</span><span><a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a> · <a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a> · Website built by <a class="credit" href="https://webluxe.github.io/WebLuxe/" target="_blank" rel="noopener">WebLuxe</a></span></div>
</div></footer>
<div class="toast" role="status" aria-live="polite"></div>
<script src="data.js"></script>
<script>window.WL_DEMO = {{ admin: 'admin/' }};</script>
<script src="demo/demo.js"></script>
<script src="demo/tiers.js"></script>
<script src="app.js"></script>
</body>
</html>
'''


def ph(id_, w):
    return f'https://images.unsplash.com/photo-{id_}?auto=format&fit=crop&w={w}&q=72'


def himg(id_, alt, sizes, eager=False):
    s = ', '.join(f'{ph(id_, w)} {w}w' for w in (300, 450, 650, 900))
    load = ' fetchpriority="high"' if eager else ' loading="lazy"'
    return f'<img src="{ph(id_, 650)}" srcset="{s}" sizes="{sizes}" alt="{alt}"{load} decoding="async">'


HOME = f'''<section class="wrap hero">
  <div>
    <span class="kicker">✦ New wedding season pieces every week</span>
    <h1>Indian wear for <em>every</em> celebration</h1>
    <p>Bridal lehengas, silk sarees, suits and sherwanis, chosen with care and ready to try on in our boutiques in Rose Hill and Grand Baie.</p>
    <div class="row"><a class="btn acc" href="shop.html">Shop the collection</a><a class="btn line" href="contact.html">Visit a boutique</a></div>
    <div class="stats"><div><b id="count">40</b><span>pieces in store</span></div><div><b>2</b><span>boutiques</span></div><div><b>7</b><span>days a week</span></div></div>
  </div>
  <div class="collage">
    {himg('1617633150878-7df1d12a9a57', 'Bride in a red and gold lehenga', '(max-width:760px) 50vw, 25vw', True)}
    {himg('1597897569252-9df44c7de0db', 'Woman in a marigold silk saree', '(max-width:760px) 50vw, 25vw', True)}
    {himg('1681717055630-c62333c22fec', 'Groom in an ivory sherwani', '(max-width:760px) 50vw, 25vw')}
  </div>
</section>
<section class="sec"><div class="wrap">
  <div class="head"><div><h2>Shop by category</h2><p>From the bride to the whole family.</p></div><a class="more" href="shop.html">See all</a></div>
  <div class="cats" id="cats"></div>
</div></section>
<section class="sec soft"><div class="wrap">
  <div class="head"><div><h2>New in store</h2><p>Limited pieces. Ask us on WhatsApp for sizes and colours.</p></div><a class="more" href="shop.html">Shop all</a></div>
  <div class="grid" id="newin"></div>
</div></section>
<section class="sec"><div class="wrap">
  <div class="head"><div><h2>How to shop with us</h2></div></div>
  <div class="steps">
    <div class="step rv"><b>1</b><h3>Browse</h3><p>Find the pieces you love here, any time of day.</p></div>
    <div class="step rv"><b>2</b><h3>Message us</h3><p>One tap sends us the piece on WhatsApp. We reply with sizes and colours.</p></div>
    <div class="step rv"><b>3</b><h3>Try it on</h3><p>Come to the boutique to try it, get it fitted and take it home.</p></div>
  </div>
  <div class="row" style="justify-content:center;margin-top:34px"><a class="btn wa" href="#" data-wa="" target="_blank" rel="noopener">{WA_ICON} Message us on WhatsApp</a></div>
</div></section>'''

SHOPP = '''<div class="wrap page-head"><p class="crumb"><a href="index.html">Home</a> / Shop</p><h1 id="title">The collection</h1><p>Search, filter by category or sort by price.</p></div>
<div class="tools"><div class="wrap">
  <label class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg><span class="sr">Search</span><input id="q" type="search" placeholder="Search saree, lehenga, sherwani…" autocomplete="off"></label>
  <select id="sort" class="sel" aria-label="Sort"><option value="">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
  <div class="chips" id="chips"></div>
</div></div>
<div class="wrap"><p id="info" class="crumb" style="margin-bottom:14px"></p><div class="grid" id="grid"></div>
  <div class="empty" id="empty" hidden><p>Nothing matches that search.</p><button class="btn line" id="reset">Show everything</button></div>
</div>'''

PRODUCT = f'''<div class="wrap page-head" style="padding-bottom:16px"><p class="crumb"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <a id="crumbCat" href="shop.html"></a> / <span id="crumbName"></span></p></div>
<section class="wrap pd">
  <div><div class="main" id="main"></div><div class="thumbs" id="thumbs"></div></div>
  <div>
    <p class="meta" id="meta"></p>
    <h1 id="name"></h1>
    <p class="price" id="price"></p>
    <p class="ex-note">Example price and photo for this demo.</p>
    <ul><li>Sizes and colours confirmed with you on WhatsApp</li><li>Try it on and get it fitted in our boutiques</li><li>Each piece is checked in store before you take it home</li></ul>
    <div class="row"><a class="btn wa" id="ask" href="#" target="_blank" rel="noopener">{WA_ICON} Ask about this piece</a><a class="btn line" href="contact.html">Visit a boutique</a></div>
  </div>
</section>
<section class="sec soft"><div class="wrap"><div class="head"><div><h2>You may also like</h2></div><a class="more" href="shop.html">Shop all</a></div><div class="grid" id="related"></div></div></section>'''

HOURS = '<dl class="hours"><dt>Mon to Sat</dt><dd>9:00 to 18:00</dd><dt>Sunday</dt><dd>9:00 to 13:00</dd></dl>'
MAPS = 'https://www.google.com/maps/search/?api=1&query='
CONTACT = f'''<div class="wrap page-head"><p class="crumb"><a href="index.html">Home</a> / Visit us</p><h1>Visit us</h1><p>Two boutiques in Mauritius. Message us before you come and we will have your sizes ready.</p></div>
<section class="wrap" style="padding-top:18px">
  <div class="shops">
    <article class="shop rv"><h2>Royal Road, Rose Hill</h2><p>Our first boutique, with the full bridal collection.</p>{HOURS}
      <div class="row"><a class="btn line" href="{MAPS}Rose+Hill+Mauritius" target="_blank" rel="noopener">Directions</a><a class="btn" href="tel:">Call</a></div></article>
    <article class="shop rv"><h2>Coastal Road, Grand Baie</h2><p>Our newest boutique, a short walk from the beach.</p>{HOURS}
      <div class="row"><a class="btn line" href="{MAPS}Grand+Baie+Mauritius" target="_blank" rel="noopener">Directions</a><a class="btn" href="tel:">Call</a></div></article>
  </div>
  <p style="margin-top:18px;color:var(--mid)">Phone: <a href="tel:">{PHONE}</a></p>
</section>
<section class="sec"><div class="wrap">
  <div class="head"><div><h2>Book a visit</h2><p>Fill this in and WhatsApp opens with your message ready to send.</p></div></div>
  <form class="form" id="book" novalidate>
    <label>Your name<input name="name" autocomplete="name" required></label>
    <label>Boutique<select name="shop"><option>Royal Road, Rose Hill</option><option>Coastal Road, Grand Baie</option></select></label>
    <label>Day<input name="date" type="date"></label>
    <label>Looking for<select name="want"><option>A bridal lehenga</option><option>A saree</option><option>A suit or anarkali</option><option>A sherwani or kurta</option></select></label>
    <label class="full">Anything else<textarea name="msg" placeholder="Colours you love, the date of the function, your budget…"></textarea></label>
    <button class="btn wa full" type="submit">{WA_ICON} Send on WhatsApp</button>
  </form>
</div></section>'''

PAGES = (
    ('index.html', 'home', f'{NAME} | Indian wear in Mauritius', 'Bridal lehengas, sarees, anarkalis and sherwanis in Rose Hill and Grand Baie, Mauritius.', HOME, True),
    ('shop.html', 'shop', f'Shop | {NAME}', 'Every piece in store, with search, categories and prices.', SHOPP, False),
    ('product.html', 'product', f'Piece | {NAME}', 'Photos, price and WhatsApp ordering.', PRODUCT, False),
    ('contact.html', 'contact', f'Visit us | {NAME}', 'Our boutiques in Rose Hill and Grand Baie, opening hours and booking.', CONTACT, False),
)
for f, slug, title, desc, body, loader in PAGES:
    (ROOT / f).write_text(page(slug, title, desc, body, loader), encoding='utf8')
    print('wrote', f)
