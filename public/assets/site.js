(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('[data-header]');
  var burger = document.querySelector('[data-burger]');
  var menu = document.getElementById('menu');

  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 24); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('open', open);
      header.classList.toggle('menu-open', open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) burger.click();
    });
  }

  var targets = document.querySelectorAll('[data-reveal], [data-words]');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (t) { t.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduce && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        co.unobserve(en.target);
        var el = en.target, end = +el.getAttribute('data-count'), t0 = null;
        function step(t) {
          if (t0 === null) t0 = t;
          var p = Math.min((t - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e);
          if (p < 1) requestAnimationFrame(step);
        }
        el.textContent = '0'; requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }
})();
