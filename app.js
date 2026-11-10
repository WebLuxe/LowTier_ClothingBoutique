/* =============================================================================
   WebLuxe Starter: everything the pages do.
   Shop details are in SHOP below; products and announcements are in data.js
   (edited from /admin).
   ============================================================================= */
(() => {
    'use strict';
    const SHOP = {
        name: 'WebLuxe High Fashion Boutique',
        whatsapp: ''          // the shop's WhatsApp number, international format, no + or spaces
    };
    const CATS = [
        { key: 'bridal', label: 'Bridal lehengas', img: '1617633150878-7df1d12a9a57' },
        { key: 'saree', label: 'Sarees', img: '1742287724816-4a8a1cc7ad5c' },
        { key: 'gown', label: 'Suits & anarkalis', img: '1743229995546-2922b49e7d1e' },
        { key: 'groom', label: 'Groom & men', img: '1610047402714-307d99a677db' }
    ];
    const CAT = Object.fromEntries(CATS.map(c => [c.key, c.label]));

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const rs = n => 'Rs ' + Math.round(n).toLocaleString('en-US');
    const isId = v => v && !/^(https?:|data:)|[\/.]/.test(v);
    const IMG = (v, w = 600) => !v ? '' : isId(v) ? `https://images.unsplash.com/photo-${v}?auto=format&fit=crop&w=${w}&q=72` : v;
    const pic = (v, sizes, alt = '', eager = false) =>
        `<img src="${IMG(v, 600)}"${isId(v) ? ` srcset="${[300, 450, 650, 900].map(w => `${IMG(v, w)} ${w}w`).join(', ')}" sizes="${sizes}"` : ''} alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
    const wa = text => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;

    const DATA = window.SITE_DATA || { products: [], announcements: [] };
    const PRODUCTS = (DATA.products || []).filter(p => !p.hidden && p.name && p.img)
        .map(p => ({ id: String(p.id), name: p.name, cat: p.category, price: Number(p.price) || 0, img: p.img, img2: p.hover && p.hover !== p.img ? p.hover : '', tag: p.tag || '' }));
    const byId = id => PRODUCTS.find(p => p.id === String(id));
    const PAGE = document.body.dataset.page;
    const params = new URLSearchParams(location.search);

    /* ---------- loading screen: once per visit */
    const loader = $('.loader');
    if (loader) {
        let seen = false;
        try { seen = sessionStorage.getItem('st_seen'); sessionStorage.setItem('st_seen', '1'); } catch (e) { /* */ }
        if (seen) loader.remove();
        else addEventListener('load', () => setTimeout(() => loader.classList.add('done'), 500));
        setTimeout(() => loader.classList.add('done'), 3000);
    }

    /* ---------- announcements */
    const notice = $('.notice span');
    const ann = (DATA.announcements || []).filter(Boolean);
    if (notice && ann.length) {
        let i = 0;
        notice.textContent = ann[0];
        if (ann.length > 1) setInterval(() => {
            notice.style.opacity = 0;
            setTimeout(() => { i = (i + 1) % ann.length; notice.textContent = ann[i]; notice.style.opacity = 1; }, 400);
        }, 4500);
    } else if (notice) notice.parentElement.remove();

    /* ---------- toast */
    function toast(msg) {
        const t = $('.toast');
        t.textContent = msg;
        t.classList.add('on');
        clearTimeout(toast.t);
        toast.t = setTimeout(() => t.classList.remove('on'), 2600);
    }

    /* ---------- reveal on scroll */
    function reveal() {
        const els = $$('.rv:not(.in)');
        if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));
        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' });
        els.forEach(e => io.observe(e));
    }

    /* ---------- product card */
    const card = (p, i = 0) => `<article class="pc rv" style="transition-delay:${(i % 4) * 60}ms">
        <a class="ph" href="product.html?id=${p.id}">${pic(p.img, '(max-width:640px) 50vw, (max-width:980px) 33vw, 25vw', p.name)}${p.tag ? `<span class="tag${/new/i.test(p.tag) ? ' new' : ''}">${esc(p.tag)}</span>` : ''}</a>
        <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3>
        <p class="cat-l">${esc(CAT[p.cat] || '')}</p>
        <p class="price">${rs(p.price)}</p>
    </article>`;

    /* ---------- home */
    if (PAGE === 'home') {
        $('#cats').innerHTML = CATS.map(c => `<a class="cat rv" href="shop.html?cat=${c.key}">${pic(c.img, '(max-width:760px) 30vw, 15vw', c.label)}${esc(c.label)}<span>${PRODUCTS.filter(p => p.cat === c.key).length} pieces</span></a>`).join('');
        $('#newin').innerHTML = PRODUCTS.slice(0, 8).map(card).join('');
        $('#count').textContent = PRODUCTS.length;
    }

    /* ---------- shop */
    if (PAGE === 'shop') {
        let cat = CAT[params.get('cat')] ? params.get('cat') : 'all';
        const q = $('#q'), sort = $('#sort'), grid = $('#grid'), info = $('#info'), empty = $('#empty');
        q.value = params.get('q') || '';
        $('#chips').innerHTML = [['all', 'All'], ...CATS.map(c => [c.key, c.label])].map(([k, l]) => `<button class="chip" data-k="${k}" aria-pressed="${k === cat}">${esc(l)}</button>`).join('');
        function draw() {
            const term = q.value.trim().toLowerCase();
            let list = PRODUCTS.filter(p => (cat === 'all' || p.cat === cat) && (!term || (p.name + ' ' + (CAT[p.cat] || '')).toLowerCase().includes(term)));
            if (sort.value === 'low') list.sort((a, b) => a.price - b.price);
            if (sort.value === 'high') list.sort((a, b) => b.price - a.price);
            grid.innerHTML = list.map(card).join('');
            info.textContent = `${list.length} ${list.length === 1 ? 'piece' : 'pieces'}`;
            empty.hidden = list.length > 0;
            $('#title').textContent = cat === 'all' ? 'The collection' : CAT[cat];
            const u = new URL(location.href);
            cat === 'all' ? u.searchParams.delete('cat') : u.searchParams.set('cat', cat);
            term ? u.searchParams.set('q', term) : u.searchParams.delete('q');
            history.replaceState(null, '', u);
            reveal();
        }
        $('#chips').addEventListener('click', e => {
            const c = e.target.closest('.chip');
            if (!c) return;
            cat = c.dataset.k;
            $$('.chip').forEach(x => x.setAttribute('aria-pressed', x === c));
            draw();
        });
        let t;
        q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(draw, 150); });
        sort.addEventListener('change', draw);
        $('#reset').addEventListener('click', () => { q.value = ''; cat = 'all'; $$('.chip').forEach(x => x.setAttribute('aria-pressed', x.dataset.k === 'all')); draw(); });
        draw();
    }

    /* ---------- one piece */
    if (PAGE === 'product') {
        const p = byId(params.get('id')) || PRODUCTS[0];
        document.title = `${p.name} | ${SHOP.name}`;
        $('#crumbCat').textContent = CAT[p.cat] || 'Shop';
        $('#crumbCat').href = `shop.html?cat=${p.cat}`;
        $('#crumbName').textContent = p.name;
        $('#name').textContent = p.name;
        $('#price').textContent = rs(p.price);
        $('#meta').textContent = CAT[p.cat] || '';
        const shots = [p.img, p.img2].filter(Boolean);
        const main = $('#main');
        const show = i => {
            main.innerHTML = pic(shots[i], '(max-width:760px) 100vw, 50vw', p.name, true);
            $$('.thumbs button').forEach((b, j) => b.setAttribute('aria-current', i === j));
        };
        $('#thumbs').innerHTML = shots.length > 1 ? shots.map((s, i) => `<button aria-label="Photo ${i + 1}">${pic(s, '80px')}</button>`).join('') : '';
        $$('.thumbs button').forEach((b, i) => b.addEventListener('click', () => show(i)));
        show(0);
        $('#ask').href = wa(`Hello ${SHOP.name}, is the ${p.name} (${rs(p.price)}) available? Could you tell me the sizes and colours?`);
        const rel = [...PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id), ...PRODUCTS.filter(x => x.cat !== p.cat)].slice(0, 4);
        $('#related').innerHTML = rel.map(card).join('');
    }

    /* ---------- contact */
    if (PAGE === 'contact') {
        const f = $('#book');
        f.elements.date.min = new Date().toISOString().slice(0, 10);
        f.addEventListener('submit', e => {
            e.preventDefault();
            const v = k => f.elements[k].value.trim();
            if (!v('name')) { f.elements.name.focus(); toast('Please tell us your name'); return; }
            const lines = [`Hello ${SHOP.name}, I would like to visit.`, '', `Name: ${v('name')}`, `Boutique: ${v('shop')}`];
            if (v('date')) lines.push(`Day: ${new Date(v('date') + 'T12:00').toDateString()}`);
            lines.push(`Looking for: ${v('want')}`);
            if (v('msg')) lines.push('', v('msg'));
            window.open(wa(lines.join('\n')), '_blank', 'noopener');
        });
    }

    $$('[data-wa]').forEach(a => { a.href = wa(a.dataset.wa || `Hello ${SHOP.name}!`); });
    $$('[data-year]').forEach(e => { e.textContent = new Date().getFullYear(); });
    const here = { home: 'index.html', shop: 'shop.html', contact: 'contact.html' }[PAGE === 'product' ? 'shop' : PAGE];
    $$('.nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === here));
    reveal();
})();
