function createDiv(html = "") {
  let el = document.createElement("div");
  el.innerHTML = html;
  
  document.body.appendChild(el);
  return el;
}

function createButton(label = "") {
  let el = document.createElement("button");
  el.innerHTML = label;
  
  document.body.appendChild(el);
  return el;
}

function createInput(value = "") {
  let el = document.createElement("input");
  el.value = value;
  
  document.body.appendChild(el);
  return el;
}

function html(el, content) {
  el.innerHTML = content;
}

function style(el, a, b) {
  if (typeof a === "object") {
    for (let i in a) {
      el.style[i] = a[i];
    }
  } else {
    el.style[a] = b;
  }
}

function position(el, x, y) {
  el.style.position = "absolute";
  
  el.style.left = x + "px";
  el.style.top = y + "px";
}

function addClass(el, c) {
  el.classList.add(c);
}

function removeClass(el, c) {
  el.classList.remove(c);
}

function toggleClass(el, c) {
  el.classList.toggle(c);
}

function show(el) {
  el.style.display = "";
}

function hide(el) {
  el.style.display = "none";
}

function value(el, v) {
  if (v === undefined) return el.value;
  el.value = v;
}

function onClick(el, fn) {
  el.addEventListener("click", fn);
}

function onInput(el, fn) {
  el.addEventListener("input", fn);
}

function onKeyDown(fn) {
  window.addEventListener("keydown", fn);
}

function onMouseDown(fn) {
  window.addEventListener("mousedown", fn);
}

function remove(el) {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

async function delay(ms = 100) {
  return new Promise(r => setTimeout(r, ms));
}