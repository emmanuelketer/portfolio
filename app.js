(function () {
  var root = document.documentElement;
  root.classList.add("js");

  // Theme toggle
  var toggle = document.getElementById("theme-toggle");
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  toggle.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Mobile menu
  var menu = document.getElementById("menu");
  var menuBtn = document.getElementById("menu-toggle");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", function () {
    setMenu(!menu.classList.contains("open"));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Highlight active nav link
  var links = {};
  menu.querySelectorAll("a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = links[en.target.id];
        if (link) link.classList.toggle("active", en.isIntersecting);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  // Typewriter
  var typer = document.getElementById("typer");
  if (typer) {
    var words = typer.getAttribute("data-words").split("|");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      typer.textContent = words.join(" · ");
    } else {
      var w = 0, c = 0, deleting = false;
      (function tick() {
        var word = words[w];
        c += deleting ? -1 : 1;
        typer.textContent = word.slice(0, c);
        var delay = deleting ? 45 : 90;
        if (!deleting && c === word.length) { deleting = true; delay = 1400; }
        else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
        setTimeout(tick, delay);
      })();
    }
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
