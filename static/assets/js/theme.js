/*
 * Runs before the page paints so a saved dark/light choice never flashes.
 * Default: follow the operating system. A saved choice ("light"/"dark")
 * lives in localStorage under "iw:theme". If storage is blocked, the
 * site simply follows the system setting.
 */
(function () {
  try {
    // Stored as JSON by site.js, e.g. "dark" with quotes.
    var saved = JSON.parse(localStorage.getItem('iw:theme') || 'null');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) { /* storage unavailable: use system theme */ }
})();
