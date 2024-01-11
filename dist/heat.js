/*! Heat.js v0.3.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function u(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = y.empty;
    S(a);
    T(a);
    U(a);
  }
  function S(a) {
    N(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
    if (a.showTitle || a.showYearSelector || a.showRefreshButton) {
      var c = h("div", "year");
      a.element.appendChild(c);
      if (a.showTitle) {
        var b = h("div", "title");
        b.innerHTML = a.titleText;
        c.appendChild(b);
      }
      a.showRefreshButton && (b = h("button", "refresh"), b.innerHTML = e.refreshButtonText, c.appendChild(b), b.onclick = function() {
        u(a);
        w(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = h("button", "back"), b.innerHTML = e.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        u(a);
        w(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = h("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = h("button", "next"), b.innerHTML = e.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        u(a);
        w(a.onNextYear, a.currentView.year);
      });
    }
  }
  function T(a) {
    var c = h("div", "map");
    a.element.appendChild(c);
    var b = a.currentView.year;
    if (a.showDayNames) {
      var k = h("div", "days");
      c.appendChild(k);
      for (var f = 0; 7 > f; f++) {
        if (-1 < a.daysToShow.indexOf(f + 1)) {
          var g = h("div", "day-name");
          g.innerHTML = e.dayNames[f];
          k.appendChild(g);
        }
      }
    }
    k = h("div", "months");
    c.appendChild(k);
    c = e.mapRangeColors.sort(function(V, W) {
      return W.range - V.range;
    });
    for (f = 0; 12 > f; f++) {
      if (-1 < a.monthsToShow.indexOf(f + 1)) {
        g = h("div", "month");
        k.appendChild(g);
        var n = h("div", "month-name");
        n.innerHTML = e.monthNames[f];
        g.appendChild(n);
        n = h("div", "day-columns");
        g.appendChild(n);
        var p = (new Date(b, f + 1, 0)).getDate(), m = h("div", "day-column"), z = !1;
        n.appendChild(m);
        var d = O(new Date(b, f, 1)), v = 1;
        p += d;
        for (var q = 0; q < p; q++) {
          if (q >= d) {
            z = !0;
          } else {
            var I = h("div", "day-disabled");
            m.appendChild(I);
          }
          z && (-1 < a.daysToShow.indexOf(v) && X(a, m, q - d, f, b, c), 0 === (q + 1) % 7 && (m = h("div", "day-column"), n.appendChild(m), v = 0));
          v++;
        }
        0 < d && t(D) && !a.showMonthDayGaps && (g.style.marginLeft = -D + "px");
      }
    }
  }
  function X(a, c, b, k, f, g) {
    var n = b + 1;
    b = h("div", "day");
    var p = new Date(f, k, n);
    k = l[a.element.id][J(p)];
    b.title = Y(a.dayToolTipText, p);
    c.appendChild(b);
    b.onclick = function() {
      w(a.onDayClick, p);
    };
    c = e.mapRangeColors.length;
    for (f = 0; f < c; f++) {
      if (n = g[f], k >= n.minimum) {
        b.className += y.space + n.cssClassName;
        break;
      }
    }
    t(D) || a.showMonthDayGaps || (g = P(b, "margin-left"), c = P(b, "margin-right"), D = b.offsetWidth + parseInt(g, 10) + parseInt(c, 10));
  }
  function U(a) {
    if (a.showGuide) {
      var c = h("div", "guide");
      a.element.appendChild(c);
      a = h("div", "less-text");
      a.innerHTML = e.lessText;
      c.appendChild(a);
      a = h("div", "days");
      c.appendChild(a);
      for (var b = e.mapRangeColors.sort(function(n, p) {
        return p.range - n.range;
      }), k = b.length, f = 0; f < k; f++) {
        var g = h("div", "day " + b[f].cssClassName);
        a.appendChild(g);
      }
      a = h("div", "more-text");
      a.innerHTML = e.moreText;
      c.appendChild(a);
    }
  }
  function O(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function Y(a, c) {
    var b = a, k = O(c);
    b = b.replace("{dddd}", e.dayNames[k]);
    b = b.replace("{dd}", Q(c.getDate()));
    b = b.replace("{d}", c.getDate());
    k = b.replace;
    var f = c.getDate(), g = e.thText;
    if (31 === f || 21 === f || 1 === f) {
      g = e.stText;
    } else if (22 === f || 2 === f) {
      g = e.ndText;
    } else if (23 === f || 3 === f) {
      g = e.rdText;
    }
    b = k.call(b, "{o}", g);
    b = b.replace("{mmmm}", e.monthNames[c.getMonth()]);
    b = b.replace("{mm}", Q(c.getMonth() + 1));
    b = b.replace("{m}", c.getMonth() + 1);
    b = b.replace("{yyyy}", c.getFullYear());
    b = b.replace("{yyy}", c.getFullYear().toString().substring(1));
    b = b.replace("{yy}", c.getFullYear().toString().substring(2));
    return b = b.replace("{y}", parseInt(c.getFullYear().toString().substring(2)).toString());
  }
  function t(a) {
    return null !== a && void 0 !== a && a !== y.empty;
  }
  function E(a) {
    return t(a) && "object" === typeof a;
  }
  function F(a) {
    return t(a) && "boolean" === typeof a;
  }
  function B(a) {
    return t(a) && "string" === typeof a;
  }
  function K(a) {
    return t(a) && "function" === typeof a;
  }
  function N(a) {
    return t(a) && "number" === typeof a;
  }
  function L(a) {
    return E(a) && a instanceof Array;
  }
  function h(a, c) {
    var b = a.toLowerCase();
    var k = "text" === b;
    M.hasOwnProperty(b) || (M[b] = k ? C.createTextNode(y.empty) : C.createElement(b));
    b = M[b].cloneNode(!1);
    t(c) && (b.className = c);
    return b;
  }
  function P(a, c) {
    var b = null;
    G.getComputedStyle ? b = document.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (b = a.currentStyle[c]);
    return b;
  }
  function w(a) {
    K(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function r(a, c) {
    return B(a) ? a : c;
  }
  function x(a, c) {
    return F(a) ? a : c;
  }
  function A(a, c) {
    return K(a) ? a : c;
  }
  function Z(a) {
    var c = !0, b = null;
    try {
      B(a) && (b = JSON.parse(a));
    } catch (k) {
      try {
        b = eval("(" + a + ")"), K(b) && (b = b());
      } catch (f) {
        e.safeMode || (console.error("Errors in object: " + k.message + ", " + f.message), c = !1), b = null;
      }
    }
    return {parsed:c, result:b};
  }
  function Q(a) {
    a = a.toString();
    return 1 === a.length ? "0" + a : a;
  }
  function J(a) {
    return a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate();
  }
  function R() {
    e.safeMode = x(e.safeMode, !0);
    var a = e, c = e.domElementTypes, b = ["*"];
    B(c) ? (c = c.split(y.space), 0 === c.length && (c = b)) : c = L(c) ? c : b;
    a.domElementTypes = c;
    a = e;
    b = e.mapRangeColors;
    c = [{minimum:10, cssClassName:"day-color-1"}, {minimum:15, cssClassName:"day-color-2"}, {minimum:20, cssClassName:"day-color-3"}, {minimum:25, cssClassName:"day-color-4"}];
    b = L(b) ? b : c;
    a.mapRangeColors = b;
    e.stText = r(e.stText, "st");
    e.ndText = r(e.ndText, "nd");
    e.rdText = r(e.rdText, "rd");
    e.thText = r(e.thText, "th");
    e.backButtonText = r(e.backButtonText, "Back");
    e.nextButtonText = r(e.nextButtonText, "Next");
    e.refreshButtonText = r(e.refreshButtonText, "Refresh");
    e.lessText = r(e.lessText, "Less");
    e.moreText = r(e.moreText, "More");
    H(e.monthNames, 12) && (e.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    H(e.dayNames, 7) && (e.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function H(a, c) {
    c = N(c) ? c : 1;
    return !L(a) || a.length < c;
  }
  var C = null, G = null, e = {}, y = {empty:"", space:" "}, M = {}, D = null, l = {};
  this.addDate = function(a, c, b) {
    l.hasOwnProperty(a) && (b = F(b) ? b : !0, c = J(c), l[a].hasOwnProperty(c) || (l[a][c] = 0), l[a][c]++, b && u(l[a].options));
    return this;
  };
  this.removeDate = function(a, c, b) {
    l.hasOwnProperty(a) && (c = J(c), l[a].hasOwnProperty(c) && (b = F(b) ? b : !0, l[a][c]--, b && u(l[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (l.hasOwnProperty(a)) {
      c = F(c) ? c : !0;
      var b = l[a].options;
      l[a] = {};
      l[a].options = b;
      c && u(l[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    l.hasOwnProperty(a) && (a = l[a].options, u(a), w(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in l) {
      if (l.hasOwnProperty(a)) {
        var c = l[a].options;
        u(c);
        w(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.setConfiguration = function(a) {
    e = E(a) ? a : {};
    R();
    return this;
  };
  this.getVersion = function() {
    return "0.3.0";
  };
  (function(a, c) {
    C = a;
    G = c;
    R();
    C.addEventListener("DOMContentLoaded", function() {
      for (var b = e.domElementTypes, k = b.length, f = 0; f < k; f++) {
        var g = C.getElementsByTagName(b[f]);
        g = [].slice.call(g);
        for (var n = g.length, p = 0; p < n; p++) {
          var m = g[p], z = !0;
          if (t(m) && m.hasAttribute("data-heat-options")) {
            var d = m.getAttribute("data-heat-options");
            if (B(d)) {
              if (d = Z(d), d.parsed && E(d.result)) {
                d = d.result;
                d = E(d) ? d : {};
                d.showDayNames = x(d.showDayNames, !0);
                d.showGuide = x(d.showGuide, !0);
                d.showTitle = x(d.showTitle, !0);
                d.showYearSelector = x(d.showYearSelector, !0);
                d.showMonthDayGaps = x(d.showMonthDayGaps, !0);
                d.showRefreshButton = x(d.showRefreshButton, !1);
                H(d.monthsToShow) && (d.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                H(d.daysToShow) && (d.daysToShow = [1, 2, 3, 4, 5, 6, 7]);
                d.titleText = r(d.titleText, "Heat.js");
                d.dayToolTipText = r(d.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                d.onDayClick = A(d.onDayClick, null);
                d.onBackYear = A(d.onBackYear, null);
                d.onNextYear = A(d.onNextYear, null);
                d.onRefresh = A(d.onRefresh, null);
                d.onBeforeRender = A(d.onBeforeRender, null);
                d.onRenderComplete = A(d.onRenderComplete, null);
                d.element = m;
                d.currentView = {};
                w(d.onBeforeRender, m);
                if (!B(m.id)) {
                  var v = [];
                  for (var q = 0; 32 > q; q++) {
                    8 !== q && 12 !== q && 16 !== q && 20 !== q || v.push("-");
                    var I = Math.floor(16 * Math.random()).toString(16);
                    v.push(I);
                  }
                  v = v.join(y.empty);
                  m.id = v;
                }
                m.removeAttribute("data-heat-options");
                l[m.id] = {options:d};
                u(d);
                w(d.onRenderComplete, m);
              } else {
                e.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), z = !1);
              }
            } else {
              e.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), z = !1);
            }
          }
          if (!z) {
            break;
          }
        }
      }
    });
    t(G.$heat) || (G.$heat = this);
  })(document, window);
})();