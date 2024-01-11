/*! Heat.js v0.5.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function u(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = v.empty;
    U(a);
    V(a);
    W(a);
  }
  function U(a) {
    N(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
    if (a.showTitle || a.showYearSelector || a.showRefreshButton) {
      var c = l("div", "year");
      a.element.appendChild(c);
      if (a.showTitle) {
        var b = l("div", "title");
        b.innerHTML = a.titleText;
        c.appendChild(b);
      }
      a.showRefreshButton && (b = l("button", "refresh"), b.innerHTML = e.refreshButtonText, c.appendChild(b), b.onclick = function() {
        u(a);
        w(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = l("button", "back"), b.innerHTML = e.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        u(a);
        w(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = l("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = l("button", "next"), b.innerHTML = e.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        u(a);
        w(a.onNextYear, a.currentView.year);
      });
    }
  }
  function V(a) {
    var c = l("div", "map");
    a.element.appendChild(c);
    var b = a.currentView.year, k = !1;
    if (a.showDayNames) {
      var g = l("div", "days");
      c.appendChild(g);
      for (var f = 0; 7 > f; f++) {
        if (-1 < a.daysToShow.indexOf(f + 1)) {
          var m = l("div", "day-name");
          m.innerHTML = e.dayNames[f];
          g.appendChild(m);
        }
      }
    }
    g = l("div", "months");
    c.appendChild(g);
    c = a.mapRangeColors.sort(function(X, Y) {
      return Y.range - X.range;
    });
    for (f = 0; 12 > f; f++) {
      if (-1 < a.monthsToShow.indexOf(f + 1)) {
        m = l("div", "month");
        g.appendChild(m);
        var n = l("div", "month-name");
        n.innerHTML = e.monthNames[f];
        m.appendChild(n);
        n = l("div", "day-columns");
        m.appendChild(n);
        var p = (new Date(b, f + 1, 0)).getDate(), x = l("div", "day-column"), d = !1;
        n.appendChild(x);
        var y = O(new Date(b, f, 1)), q = 1;
        p += y;
        for (var z = 0; z < p; z++) {
          if (z >= y) {
            d = !0;
          } else {
            var Z = l("div", "day-disabled");
            x.appendChild(Z);
          }
          d && (-1 < a.daysToShow.indexOf(q) && aa(a, x, z - y, f, b, c), 0 === (z + 1) % 7 && (x = l("div", "day-column"), n.appendChild(x), q = 0));
          q++;
        }
        0 < y && r(E) && !a.showMonthDayGaps && k && (m.style.marginLeft = -E + "px");
        k = !0;
      }
    }
  }
  function aa(a, c, b, k, g, f) {
    var m = b + 1;
    b = l("div", "day");
    var n = new Date(g, k, m);
    k = h[a.element.id][J(n)];
    b.title = ba(a.dayToolTipText, n);
    c.appendChild(b);
    b.onclick = function() {
      w(a.onDayClick, n);
    };
    c = a.mapRangeColors.length;
    g = null;
    for (m = 0; m < c; m++) {
      var p = f[m];
      if (k >= p.minimum) {
        g = p;
      } else {
        break;
      }
    }
    r(g) && P(a, g.id) && (b.className += v.space + g.cssClassName);
    r(E) || a.showMonthDayGaps || (f = Q(b, "margin-left"), c = Q(b, "margin-right"), E = b.offsetWidth + parseInt(f, 10) + parseInt(c, 10));
  }
  function W(a) {
    if (a.showGuide) {
      var c = l("div", "guide");
      a.element.appendChild(c);
      var b = l("div", "less-text");
      b.innerHTML = e.lessText;
      c.appendChild(b);
      b = l("div", "days");
      c.appendChild(b);
      for (var k = a.mapRangeColors.sort(function(m, n) {
        return n.range - m.range;
      }), g = k.length, f = 0; f < g; f++) {
        ca(a, b, k[f]);
      }
      a = l("div", "more-text");
      a.innerHTML = e.moreText;
      c.appendChild(a);
    }
  }
  function ca(a, c, b) {
    var k = l("div");
    k.title = b.tooltipText;
    c.appendChild(k);
    P(a, b.id) ? k.className = "day " + b.cssClassName : k.className = "day";
    k.onclick = function() {
      a.currentView.colorsVisible.hasOwnProperty(b.id) || (a.currentView.colorsVisible[b.id] = !0);
      k.className = a.currentView.colorsVisible[b.id] ? "day" : "day " + b.cssClassName;
      a.currentView.colorsVisible[b.id] = !a.currentView.colorsVisible[b.id];
      u(a);
    };
  }
  function P(a, c) {
    return !a.currentView.colorsVisible.hasOwnProperty(c) || a.currentView.colorsVisible[c];
  }
  function O(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function ba(a, c) {
    var b = a, k = O(c);
    b = b.replace("{dddd}", e.dayNames[k]);
    b = b.replace("{dd}", R(c.getDate()));
    b = b.replace("{d}", c.getDate());
    k = b.replace;
    var g = c.getDate(), f = e.thText;
    if (31 === g || 21 === g || 1 === g) {
      f = e.stText;
    } else if (22 === g || 2 === g) {
      f = e.ndText;
    } else if (23 === g || 3 === g) {
      f = e.rdText;
    }
    b = k.call(b, "{o}", f);
    b = b.replace("{mmmm}", e.monthNames[c.getMonth()]);
    b = b.replace("{mm}", R(c.getMonth() + 1));
    b = b.replace("{m}", c.getMonth() + 1);
    b = b.replace("{yyyy}", c.getFullYear());
    b = b.replace("{yyy}", c.getFullYear().toString().substring(1));
    b = b.replace("{yy}", c.getFullYear().toString().substring(2));
    return b = b.replace("{y}", parseInt(c.getFullYear().toString().substring(2)).toString());
  }
  function r(a) {
    return null !== a && void 0 !== a && a !== v.empty;
  }
  function F(a) {
    return r(a) && "object" === typeof a;
  }
  function G(a) {
    return r(a) && "boolean" === typeof a;
  }
  function C(a) {
    return r(a) && "string" === typeof a;
  }
  function K(a) {
    return r(a) && "function" === typeof a;
  }
  function N(a) {
    return r(a) && "number" === typeof a;
  }
  function L(a) {
    return F(a) && a instanceof Array;
  }
  function l(a, c) {
    var b = a.toLowerCase();
    var k = "text" === b;
    M.hasOwnProperty(b) || (M[b] = k ? D.createTextNode(v.empty) : D.createElement(b));
    b = M[b].cloneNode(!1);
    r(c) && (b.className = c);
    return b;
  }
  function Q(a, c) {
    var b = null;
    H.getComputedStyle ? b = document.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (b = a.currentStyle[c]);
    return b;
  }
  function w(a) {
    K(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function t(a, c) {
    return C(a) ? a : c;
  }
  function A(a, c) {
    return G(a) ? a : c;
  }
  function B(a, c) {
    return K(a) ? a : c;
  }
  function da(a) {
    var c = !0, b = null;
    try {
      C(a) && (b = JSON.parse(a));
    } catch (k) {
      try {
        b = eval("(" + a + ")"), K(b) && (b = b());
      } catch (g) {
        e.safeMode || (console.error("Errors in object: " + k.message + ", " + g.message), c = !1), b = null;
      }
    }
    return {parsed:c, result:b};
  }
  function S() {
    for (var a = [], c = 0; 32 > c; c++) {
      8 !== c && 12 !== c && 16 !== c && 20 !== c || a.push("-");
      var b = Math.floor(16 * Math.random()).toString(16);
      a.push(b);
    }
    return a.join(v.empty);
  }
  function R(a) {
    a = a.toString();
    return 1 === a.length ? "0" + a : a;
  }
  function J(a) {
    return a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate();
  }
  function T() {
    e.safeMode = A(e.safeMode, !0);
    var a = e, c = e.domElementTypes, b = ["*"];
    C(c) ? (c = c.split(v.space), 0 === c.length && (c = b)) : c = L(c) ? c : b;
    a.domElementTypes = c;
    e.stText = t(e.stText, "st");
    e.ndText = t(e.ndText, "nd");
    e.rdText = t(e.rdText, "rd");
    e.thText = t(e.thText, "th");
    e.backButtonText = t(e.backButtonText, "Back");
    e.nextButtonText = t(e.nextButtonText, "Next");
    e.refreshButtonText = t(e.refreshButtonText, "Refresh");
    e.lessText = t(e.lessText, "Less");
    e.moreText = t(e.moreText, "More");
    I(e.monthNames, 12) && (e.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    I(e.dayNames, 7) && (e.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function I(a, c) {
    c = N(c) ? c : 1;
    return !L(a) || a.length < c;
  }
  var D = null, H = null, e = {}, v = {empty:"", space:" "}, M = {}, E = null, h = {};
  this.addDate = function(a, c, b) {
    h.hasOwnProperty(a) && (b = G(b) ? b : !0, c = J(c), h[a].hasOwnProperty(c) || (h[a][c] = 0), h[a][c]++, b && u(h[a].options));
    return this;
  };
  this.removeDate = function(a, c, b) {
    h.hasOwnProperty(a) && (c = J(c), h[a].hasOwnProperty(c) && (b = G(b) ? b : !0, h[a][c]--, b && u(h[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (h.hasOwnProperty(a)) {
      c = G(c) ? c : !0;
      var b = h[a].options;
      h[a] = {};
      h[a].options = b;
      c && u(h[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    h.hasOwnProperty(a) && (a = h[a].options, u(a), w(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var c = h[a].options;
        u(c);
        w(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.destroyAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var c = h[a].options;
        c.element.innerHTML = v.empty;
        c.element.className = v.empty;
        w(c.onDestroy, c.element);
      }
    }
    h = {};
    return this;
  };
  this.destroy = function(a) {
    if (h.hasOwnProperty(a)) {
      var c = h[a].options;
      c.element.innerHTML = v.empty;
      c.element.className = v.empty;
      w(c.onDestroy, c.element);
      delete h[a];
    }
    return this;
  };
  this.setConfiguration = function(a) {
    e = F(a) ? a : {};
    T();
    return this;
  };
  this.getVersion = function() {
    return "0.5.0";
  };
  (function(a, c) {
    D = a;
    H = c;
    T();
    D.addEventListener("DOMContentLoaded", function() {
      for (var b = e.domElementTypes, k = b.length, g = 0; g < k; g++) {
        var f = D.getElementsByTagName(b[g]);
        f = [].slice.call(f);
        for (var m = f.length, n = 0; n < m; n++) {
          var p = f[n], x = !0;
          if (r(p) && p.hasAttribute("data-heat-options")) {
            var d = p.getAttribute("data-heat-options");
            if (C(d)) {
              if (d = da(d), d.parsed && F(d.result)) {
                d = d.result;
                d = F(d) ? d : {};
                d.showDayNames = A(d.showDayNames, !0);
                d.showGuide = A(d.showGuide, !0);
                d.showTitle = A(d.showTitle, !0);
                d.showYearSelector = A(d.showYearSelector, !0);
                d.showMonthDayGaps = A(d.showMonthDayGaps, !0);
                d.showRefreshButton = A(d.showRefreshButton, !1);
                I(d.monthsToShow) && (d.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                I(d.daysToShow) && (d.daysToShow = [1, 2, 3, 4, 5, 6, 7]);
                var y = d;
                var q = d.mapRangeColors;
                var z = [{minimum:10, cssClassName:"day-color-1", tooltipText:"Day Color 1"}, {minimum:15, cssClassName:"day-color-2", tooltipText:"Day Color 2"}, {minimum:20, cssClassName:"day-color-3", tooltipText:"Day Color 3"}, {minimum:25, cssClassName:"day-color-4", tooltipText:"Day Color 4"}];
                q = L(q) ? q : z;
                y.mapRangeColors = q;
                y = d.mapRangeColors.length;
                for (q = 0; q < y; q++) {
                  C(d.mapRangeColors[q].id) || (d.mapRangeColors[q].id = S());
                }
                d.titleText = t(d.titleText, "Heat.js");
                d.dayToolTipText = t(d.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                d.onDayClick = B(d.onDayClick, null);
                d.onBackYear = B(d.onBackYear, null);
                d.onNextYear = B(d.onNextYear, null);
                d.onRefresh = B(d.onRefresh, null);
                d.onBeforeRender = B(d.onBeforeRender, null);
                d.onRenderComplete = B(d.onRenderComplete, null);
                d.onDestroy = B(d.onDestroy, null);
                d.element = p;
                d.currentView = {};
                d.currentView.colorsVisible = {};
                w(d.onBeforeRender, p);
                C(p.id) || (p.id = S());
                p.removeAttribute("data-heat-options");
                h[p.id] = {options:d};
                u(d);
                w(d.onRenderComplete, p);
              } else {
                e.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), x = !1);
              }
            } else {
              e.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), x = !1);
            }
          }
          if (!x) {
            break;
          }
        }
      }
    });
    r(H.$heat) || (H.$heat = this);
  })(document, window);
})();