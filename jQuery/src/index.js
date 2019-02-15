const DOMNodeCollection = require('./dom_node_collection');

function $l(arg) {
  if (arg instanceof HTMLElement === true) {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof Function === true) {
    document.addEventListener("DOMContentLoaded", arg);
  } else {
    return new DOMNodeCollection(document.querySelectorAll(arg));
  }
}

window.$l = $l ;

