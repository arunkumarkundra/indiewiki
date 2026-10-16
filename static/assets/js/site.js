/*
 * IndieWiki site script. Loaded with "defer" on every page.
 *
 * Everything here is progressive enhancement: pages work without it, and
 * nothing is ever sent to a server. Features, in order:
 *   1. Helpers and toast messages
 *   2. Theme toggle
 *   3. Mobile navigation drawer
 *   4. Search (header box, search page)
 *   5. Checklists (save ticks in this browser, copy as Markdown, print)
 *   6. Copy buttons on code blocks
 *   7. Share button
 *   8. "On this page" highlighting
 *   9. Contact address (assembled here so scrapers do not see it)
 */
(function () {
  'use strict';

  /* 1. Helpers ---------------------------------------------------------- */
  var root = document.documentElement;
  var BASE = root.getAttribute('data-base') || '';

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $all(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }

  /** Read/write localStorage without crashing when it is blocked (private mode, strict settings). */
  var store = {
    get: function (key, fallback) {
      try { var v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; }
    },
    remove: function (key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } }
  };

  /** Site path for the current page, without the base prefix. */
  function pagePath() {
    var p = location.pathname;
    if (BASE && p.indexOf(BASE) === 0) p = p.slice(BASE.length) || '/';
    return p;
  }

  var toastTimer;
  /** Show a short status message. It is also read out by screen readers. */
  function toast(message) {
    var el = $('[data-toast]');
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; el.textContent = ''; }, 2600);
  }

  /** Copy text to the clipboard, with a fallback for older browsers. */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.className = 'visually-hidden';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy') ? resolve() : reject(new Error('copy failed')); } catch (e) { reject(e); }
      document.body.removeChild(area);
    });
  }

  /* 2. Theme toggle -------------------------------------------------------- */
  var themeBtn = $('[data-theme-toggle]');
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function effectiveTheme() {
    var set = root.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return darkQuery && darkQuery.matches ? 'dark' : 'light';
  }
  function syncThemeButton() {
    if (!themeBtn) return;
    var dark = effectiveTheme() === 'dark';
    themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    // Keep the icon in step even when the theme comes from the system setting.
    root.setAttribute('data-theme', effectiveTheme());
  }
  if (themeBtn) {
    syncThemeButton();
    themeBtn.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store.set('iw:theme', next);
      syncThemeButton();
    });
    if (darkQuery && darkQuery.addEventListener) {
      darkQuery.addEventListener('change', function () {
        if (store.get('iw:theme', null) === null) { root.removeAttribute('data-theme'); syncThemeButton(); }
      });
    }
  }

  /* 3. Mobile navigation drawer --------------------------------------------- */
  var nav = $('[data-nav]');
  var navToggle = $('.nav-toggle');
  var scrim = $('[data-nav-scrim]');

  function focusables(scope) {
    return $all('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', scope)
      .filter(function (el) { return el.offsetParent !== null; });
  }
  function openNav() {
    if (!nav) return;
    nav.classList.add('is-open');
    if (scrim) scrim.hidden = false;
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var current = $('a[aria-current="page"]', nav) || focusables(nav)[0];
    if (current) current.focus();
  }
  function closeNav(returnFocus) {
    if (!nav || !nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    if (scrim) scrim.hidden = true;
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (returnFocus) navToggle.focus();
  }
  if (nav && navToggle) {
    navToggle.addEventListener('click', openNav);
    $all('[data-nav-close]').forEach(function (b) { b.addEventListener('click', function () { closeNav(true); }); });
    if (scrim) scrim.addEventListener('click', function () { closeNav(true); });
    nav.addEventListener('keydown', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (e.key === 'Escape') { closeNav(true); return; }
      if (e.key !== 'Tab') return;
      var items = focusables(nav);
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) closeNav(false); });
  }

  /* 4. Search ------------------------------------------------------------------ */
  var STOP = { the: 1, a: 1, an: 1, to: 1, of: 1, for: 1, in: 1, on: 1, and: 1, or: 1, how: 1, what: 1, is: 1, my: 1, i: 1, do: 1, with: 1, can: 1, me: 1, your: 1, should: 1, which: 1, best: 1 };
  var indexPromise = null;

  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
  }
  function tokenize(q) {
    var words = norm(q).split(/[^a-z0-9.+]+/).filter(function (w) { return w && !STOP[w] && (w.length > 1 || /\d/.test(w)); });
    // Light stemming: "payments" also finds "payment".
    return words.slice(0, 8).map(function (w) { return w.length > 4 ? w.replace(/(ies|es|s)$/, function (m) { return m === 'ies' ? 'y' : ''; }) : w; });
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(BASE + '/search-index.json', { credentials: 'same-origin' })
        .then(function (r) { if (!r.ok) throw new Error('index ' + r.status); return r.json(); })
        .then(function (data) {
          return data.entries.map(function (e) {
            e._t = norm(e.t); e._d = norm(e.d); e._h = norm(e.h); e._g = norm(e.g); e._x = norm(e.x); e._s = norm(e.s);
            return e;
          });
        })
        .catch(function (err) { indexPromise = null; throw err; });
    }
    return indexPromise;
  }

  /** Score one entry. Returns 0 when a required word is missing. */
  function scoreEntry(e, words, phrase, requireAll) {
    var total = 0;
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      var start = new RegExp('(^|[^a-z0-9])' + escapeRe(w));
      var s = 0;
      if (start.test(e._t)) s += 12; else if (e._t.indexOf(w) !== -1) s += 7;
      if (start.test(e._g)) s += 6;
      if (start.test(e._h)) s += 5;
      if (start.test(e._d)) s += 4;
      if (start.test(e._s)) s += 2;
      if (start.test(e._x)) s += 1 + Math.min(2, (e._x.split(w).length - 2));
      if (!s && requireAll) return 0;
      total += s;
    }
    if (phrase && e._t.indexOf(phrase) !== -1) total += 15;
    if (e.k === 'Checklist' || e.k === 'Guide') total += 1;
    return total;
  }

  function search(entries, query) {
    var words = tokenize(query);
    if (!words.length) return [];
    var phrase = norm(query).trim();
    var run = function (requireAll) {
      var out = [];
      for (var i = 0; i < entries.length; i++) {
        var sc = scoreEntry(entries[i], words, phrase, requireAll);
        if (sc > 0) out.push({ e: entries[i], s: sc });
      }
      return out.sort(function (a, b) { return b.s - a.s || a.e.t.localeCompare(b.e.t); });
    };
    var results = run(true);
    if (!results.length && words.length > 1) results = run(false);
    return results.map(function (r) { return r.e; });
  }

  /** Append text to a node, wrapping the searched words in <mark>. Never uses innerHTML. */
  function appendHighlighted(node, text, words) {
    if (!words.length) { node.appendChild(document.createTextNode(text)); return; }
    var re = new RegExp('(' + words.map(escapeRe).join('|') + ')', 'gi');
    var normText = norm(text);
    var last = 0;
    var m;
    // Match on the normalised copy (same length for Latin text) and slice the original.
    while ((m = re.exec(normText)) !== null) {
      if (m.index > last) node.appendChild(document.createTextNode(text.slice(last, m.index)));
      var mark = document.createElement('mark');
      mark.textContent = text.slice(m.index, m.index + m[0].length);
      node.appendChild(mark);
      last = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++;
    }
    if (last < text.length) node.appendChild(document.createTextNode(text.slice(last)));
  }

  function snippet(e, words) {
    var text = e.d;
    var body = e.x || '';
    var lower = norm(body);
    for (var i = 0; i < words.length; i++) {
      var at = lower.indexOf(words[i]);
      if (at !== -1 && norm(e.d).indexOf(words[i]) === -1) {
        var from = Math.max(0, at - 60);
        text = (from > 0 ? '…' : '') + body.slice(from, from + 170).trim() + '…';
        break;
      }
    }
    return text;
  }

  function resultLink(e, words, cls) {
    var a = document.createElement('a');
    a.href = BASE + e.u;
    if (cls) a.className = cls;
    var title = document.createElement('span');
    title.className = 'result__title';
    appendHighlighted(title, e.t, words);
    var where = document.createElement('span');
    where.className = 'result__where';
    where.textContent = e.k + ' in ' + e.s;
    var text = document.createElement('span');
    text.className = 'result__text';
    appendHighlighted(text, snippet(e, words), words);
    a.appendChild(title);
    a.appendChild(where);
    a.appendChild(text);
    return a;
  }

  // Header search box with a drop-down of the top results.
  var form = $('[data-search]');
  if (form) {
    var input = $('[data-search-input]', form);
    var panel = $('[data-search-panel]', form);
    var list = $('[data-search-results]', form);
    var status = $('[data-search-status]', form);
    var timer;
    var quietFocus = false; // true while we move focus back to the box ourselves

    var hidePanel = function () { panel.hidden = true; };
    var render = function () {
      var q = input.value.trim();
      if (q.length < 2) { hidePanel(); return; }
      loadIndex().then(function (entries) {
        if (input.value.trim() !== q) return;
        var words = tokenize(q);
        var results = search(entries, q);
        list.textContent = '';
        status.textContent = results.length
          ? (results.length === 1 ? '1 result' : results.length + ' results') + '. Use the arrow keys to move through them.'
          : 'Nothing matches "' + q + '". Try fewer or different words.';
        results.slice(0, 7).forEach(function (e) {
          var li = document.createElement('li');
          li.appendChild(resultLink(e, words));
          list.appendChild(li);
        });
        if (results.length > 7) {
          var li = document.createElement('li');
          var more = document.createElement('a');
          more.className = 'search__more';
          more.href = BASE + '/search/?q=' + encodeURIComponent(q);
          more.textContent = 'See all ' + results.length + ' results';
          li.appendChild(more);
          list.appendChild(li);
        }
        panel.hidden = false;
      }).catch(function () {
        status.textContent = 'Search could not load. Check your connection and try again.';
        list.textContent = '';
        panel.hidden = false;
      });
    };

    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(render, 90); });
    input.addEventListener('focus', function () {
      loadIndex().catch(function () {});
      if (quietFocus) { quietFocus = false; return; }
      if (input.value.trim().length >= 2) render();
    });
    form.addEventListener('keydown', function (e) {
      var links = $all('a', list);
      var i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' && !panel.hidden && links.length) {
        e.preventDefault();
        links[Math.min(i + 1, links.length - 1)].focus();
      } else if (e.key === 'ArrowUp' && !panel.hidden) {
        e.preventDefault();
        if (i <= 0) { quietFocus = true; input.focus(); } else links[i - 1].focus();
      } else if (e.key === 'Escape') {
        hidePanel();
        if (document.activeElement !== input) { quietFocus = true; input.focus(); }
      }
    });
    document.addEventListener('click', function (e) { if (!form.contains(e.target)) hidePanel(); });
    form.addEventListener('focusout', function () {
      setTimeout(function () { if (!form.contains(document.activeElement)) hidePanel(); }, 0);
    });

    // "/" or Ctrl/Cmd+K jumps to search from anywhere (not while typing elsewhere).
    document.addEventListener('keydown', function (e) {
      var t = e.target;
      var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K'))) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  // Full search results page (/search/?q=...).
  var pageForm = $('[data-search-page]');
  if (pageForm) {
    var pageInput = $('input', pageForm);
    var pageStatus = $('[data-search-page-status]');
    var pageList = $('[data-search-page-results]');
    var runPage = function (q) {
      pageInput.value = q;
      pageList.textContent = '';
      if (q.trim().length < 2) { pageStatus.textContent = 'Type at least two letters.'; return; }
      pageStatus.textContent = 'Searching…';
      loadIndex().then(function (entries) {
        var words = tokenize(q);
        var results = search(entries, q).slice(0, 60);
        pageStatus.textContent = results.length
          ? (results.length === 1 ? '1 result' : results.length + ' results') + ' for "' + q + '".'
          : 'Nothing matches "' + q + '". Try fewer words, or browse the Toolbox and Checklists.';
        results.forEach(function (e) {
          var li = document.createElement('li');
          li.appendChild(resultLink(e, words, 'result'));
          pageList.appendChild(li);
        });
        document.title = 'Search: ' + q + ' | IndieWiki';
      }).catch(function () { pageStatus.textContent = 'Search could not load. Check your connection and reload the page.'; });
    };
    pageForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = pageInput.value.trim();
      history.replaceState(null, '', BASE + '/search/?q=' + encodeURIComponent(q));
      runPage(q);
    });
    var initial = new URLSearchParams(location.search).get('q') || '';
    if (initial) runPage(initial.slice(0, 80)); else pageInput.focus();
  }

  /* 5. Checklists --------------------------------------------------------------- */
  var bar = $('[data-checklist]');
  var CHECK_PREFIX = 'iw:check:';

  if (bar) {
    var key = CHECK_PREFIX + pagePath();
    var boxes = $all('.check__box');
    var total = boxes.length;
    var countEl = $('[data-checklist-count]', bar);
    var progress = $('[data-checklist-progress]', bar);
    var saved = store.get(key, []);
    var wasComplete = false;

    var update = function (announce) {
      var done = boxes.filter(function (b) { return b.checked; });
      countEl.textContent = String(done.length);
      progress.value = done.length;
      progress.textContent = done.length + ' of ' + total;
      boxes.forEach(function (b) { b.closest('li').classList.toggle('is-done', b.checked); });
      var complete = done.length === total && total > 0;
      bar.classList.toggle('is-complete', complete);
      if (complete && !wasComplete && announce) toast('All ' + total + ' checks done. Nice work.');
      wasComplete = complete;
      return done.map(function (b) { return b.id; });
    };

    boxes.forEach(function (b) { b.checked = saved.indexOf(b.id) !== -1; });
    update(false);

    document.addEventListener('change', function (e) {
      if (!e.target.classList || !e.target.classList.contains('check__box')) return;
      var ids = update(true);
      if (!store.set(key, ids)) toast('Your browser is blocking storage, so ticks will not be saved.');
    });
    // Clicking anywhere on an item (except a link) toggles it.
    $all('li.check').forEach(function (li) {
      li.addEventListener('click', function (e) {
        if (e.target.closest('a') || e.target.classList.contains('check__box')) return;
        var box = $('.check__box', li);
        if (!box || window.getSelection().toString()) return;
        box.checked = !box.checked;
        box.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });

    $('[data-checklist-reset]', bar).addEventListener('click', function () {
      if (!window.confirm('Clear every tick on this checklist?')) return;
      boxes.forEach(function (b) { b.checked = false; });
      store.remove(key);
      update(false);
      toast('Checklist cleared.');
    });
    $('[data-checklist-print]', bar).addEventListener('click', function () { window.print(); });
    $('[data-checklist-copy]', bar).addEventListener('click', function () {
      var title = ($('h1') || {}).textContent || document.title;
      var lines = ['# ' + title.trim(), ''];
      $all('.prose h2, .prose h3, .prose li.check').forEach(function (el) {
        if (el.tagName === 'H2' || el.tagName === 'H3') {
          var text = el.textContent.replace(/Link to this section#?$/, '').replace(/#$/, '').trim();
          lines.push('', (el.tagName === 'H2' ? '## ' : '### ') + text, '');
        } else {
          var box = $('.check__box', el);
          var label = $('.check__label', el);
          lines.push('- [' + (box && box.checked ? 'x' : ' ') + '] ' + (label ? label.textContent : el.textContent).replace(/\s+/g, ' ').trim());
        }
      });
      lines.push('', 'Source: ' + location.href.split('#')[0]);
      copyText(lines.join('\n').replace(/\n{3,}/g, '\n\n')).then(
        function () { toast('Checklist copied as Markdown.'); },
        function () { toast('Copy did not work. Select the text and copy it instead.'); }
      );
    });
  }

  // Progress badges on the home page and the Checklists page.
  $all('[data-progress-for]').forEach(function (el) {
    var ids = store.get(CHECK_PREFIX + el.getAttribute('data-progress-for'), []);
    var tot = Number(el.getAttribute('data-total')) || 0;
    if (ids.length) {
      el.textContent = Math.min(ids.length, tot) + ' of ' + tot + ' done';
      el.classList.add('has-progress');
    }
  });

  /* 6. Copy buttons on code blocks ---------------------------------------------- */
  $all('.code-block').forEach(function (block) {
    var code = $('code', block);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-code';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.addEventListener('click', function () {
      copyText(code.textContent).then(function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1800);
      }, function () { toast('Copy did not work. Select the text and copy it instead.'); });
    });
    block.appendChild(btn);
  });

  /* 7. Share --------------------------------------------------------------------- */
  $all('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = location.href.split('#')[0];
      var title = btn.getAttribute('data-title') || document.title;
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () { /* user closed the sheet */ });
      } else {
        copyText(url).then(function () { toast('Link copied.'); }, function () { toast('Copy did not work. Copy the address bar instead.'); });
      }
    });
  });

  /* 8. "On this page" highlighting ----------------------------------------------- */
  var tocLinks = $all('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var headings = $all('.prose h2[id], .prose h3[id]').filter(function (h) { return byId[h.id]; });
    var setActive = function (id) {
      tocLinks.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
      if (byId[id]) { byId[id].classList.add('is-active'); byId[id].setAttribute('aria-current', 'location'); }
    };
    var observer = new IntersectionObserver(function () {
      var current = null;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top < 140) current = headings[i].id; else break;
      }
      setActive(current || (headings[0] && headings[0].id));
    }, { rootMargin: '0px 0px -60% 0px', threshold: [0, 1] });
    headings.forEach(function (h) { observer.observe(h); });
  }

  /* 9. Contact address ------------------------------------------------------------- */
  $all('[data-email]').forEach(function (el) {
    try {
      var address = atob(el.getAttribute('data-email')).split('').reverse().join('');
      if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(address)) return;
      el.setAttribute('href', 'mailto:' + address);
      if (el.hasAttribute('data-email-show')) el.textContent = address;
    } catch (e) { /* keep the fallback link */ }
  });
})();
