/* WebLuxe High Fashion Boutique: Starter demo (Low tier).
   One page: the pieces from data.js in a filterable grid, each with a WhatsApp button. */
(() => {
    'use strict';
    const SHOP = { name: 'WebLuxe High Fashion Boutique', whatsapp: '' };   // whatsapp: international format, no + or spaces
    const CATS = [
        { key: 'all', label: 'All' },
        { key: 'bridal', label: 'Bridal lehengas', one: 'Bridal lehenga' },
        { key: 'saree', label: 'Sarees', one: 'Saree' },
        { key: 'gown', label: 'Suits & anarkalis', one: 'Suit' },
        { key: 'groom', label: 'Groom & men', one: "Men's wear" }
    ];
    const CAT = Object.fromEntries(CATS.map(c => [c.key, c]));
    const $ = s => document.querySelector(s);
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const rs = n => 'Rs ' + Math.round(n).toLocaleString('en-US');
    const isId = v => /^\d{10,}-[0-9a-f]{6,}$/.test(v || '');
    const IMG = (v, w = 600) => !v ? '' : isId(v) ? `https://images.unsplash.com/photo-${v}?auto=format&fit=crop&w=${w}&q=72` : v;
    const SRCSET = v => !isId(v) ? '' : ` srcset="${[300, 450, 650].map(w => `${IMG(v, w)} ${w}w`).join(', ')}" sizes="(max-width:640px) 50vw, 25vw"`;
    const wa = t => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(t)}`;
    const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z"/></svg>';

    const ALL = ((window.SITE_DATA || {}).products || []).filter(p => !p.hidden && CAT[p.category]).map(p => ({ ...p, price: Number(p.price) || 0 }));
    // "All" mixes the categories so the first rows are not all one kind of piece
    const MIXED = (() => { const lists = CATS.slice(1).map(c => ALL.filter(p => p.category === c.key)), out = []; for (let i = 0; lists.some(l => l[i]); i++) lists.forEach(l => l[i] && out.push(l[i])); return out; })();
    const inCat = k => k === 'all' ? MIXED : ALL.filter(p => p.category === k);

    /* WhatsApp buttons written in the page */
    document.querySelectorAll('[data-wa]').forEach(a => { a.href = wa(a.dataset.wa); });

    /* hero + categories */
    $('#factCount').textContent = ALL.length;
    const hero = inCat('bridal')[0] || ALL[0];
    if (hero) $('#heroPh').innerHTML = `<img src="${IMG(hero.img, 900)}" srcset="${IMG(hero.img, 500)} 500w, ${IMG(hero.img, 900)} 900w" sizes="(max-width:860px) 90vw, 40vw" alt="${esc(hero.name)}" fetchpriority="high">
        <div class="hero-tag"><small>New this week</small><b>${esc(hero.name)}</b><span>${rs(hero.price)}</span></div>`;
    $('#cats').innerHTML = CATS.slice(1).map(c => {
        const p = inCat(c.key)[1] || inCat(c.key)[0];
        return `<a class="cat" href="#collection" data-cat="${c.key}">${p ? `<img src="${IMG(p.img, 400)}" alt="" loading="lazy" decoding="async">` : ''}<span><b>${esc(c.label)}</b><small>${inCat(c.key).length} pieces</small></span></a>`;
    }).join('');

    /* collection */
    const STEP = 12;
    let cat = 'all', shown = STEP;
    const card = p => `<article class="card">
        <button class="ph" data-zoom="${esc(p.img)}" data-name="${esc(p.name)}" aria-label="See ${esc(p.name)} bigger"><img src="${IMG(p.img)}"${SRCSET(p.img)} alt="${esc(p.name)}" loading="lazy" decoding="async">${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ''}</button>
        <div class="bd"><small>${esc(CAT[p.category].one)}</small><h3>${esc(p.name)}</h3><p class="pr">${rs(p.price)}</p>
        <a class="btn btn-wa btn-sm" href="${wa(`Hello ${SHOP.name}, is the ${p.name} (${rs(p.price)}) available?`)}">${WA_ICON}Ask on WhatsApp</a></div></article>`;
    function render() {
        const list = inCat(cat);
        $('#grid').innerHTML = list.slice(0, shown).map(card).join('');
        $('#moreBtn').hidden = list.length <= shown;
        $('#pills').innerHTML = CATS.map(c => `<button role="tab" aria-selected="${c.key === cat}" data-k="${c.key}">${esc(c.label)} <span>${inCat(c.key).length}</span></button>`).join('');
    }
    const pick = k => { cat = k; shown = STEP; render(); };
    $('#pills').addEventListener('click', e => { const b = e.target.closest('button'); if (b) pick(b.dataset.k); });
    $('#cats').addEventListener('click', e => { const a = e.target.closest('[data-cat]'); if (a) pick(a.dataset.cat); });
    $('#moreBtn').addEventListener('click', () => { shown += STEP; render(); });
    render();

    /* bigger photo */
    const lb = $('#lb'), lbImg = lb.querySelector('img'), lbCap = lb.querySelector('figcaption');
    let back;
    $('#grid').addEventListener('click', e => {
        const b = e.target.closest('[data-zoom]'); if (!b) return;
        back = b; lbImg.src = IMG(b.dataset.zoom, 1200); lbImg.alt = b.dataset.name; lbCap.textContent = b.dataset.name;
        lb.hidden = false; document.body.style.overflow = 'hidden'; lb.querySelector('.lb-x').focus();
    });
    const shut = () => { lb.hidden = true; document.body.style.overflow = ''; back?.focus(); };
    lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lb-x')) shut(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) shut(); });

    /* phone menu */
    const burger = $('.burger'), nav = $('#nav');
    burger.addEventListener('click', () => { const on = nav.classList.toggle('on'); burger.setAttribute('aria-expanded', on); });
    nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('on'); burger.setAttribute('aria-expanded', 'false'); } });
})();
