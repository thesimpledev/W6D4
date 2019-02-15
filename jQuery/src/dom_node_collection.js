function DOMNodeCollection(htmlElements) {
  this.he = htmlElements;
}

DOMNodeCollection.prototype.html = function(string) {
  if (string !== undefined) {
    for (let i = 0; i < this.he.length; i++) {
      this.he[i].innerHTML = string;
    }
  } else {
    return this.he[0].innerHTML;
  }
}

DOMNodeCollection.prototype.empty = function() {
  this.html("");
}

DOMNodeCollection.prototype.append = function(elements) {
  for (let i = 0; i < this.he.length; i++) {
    if (elements instanceof HTMLElement === true) {
      this.he[i].innerHTML += elements.outerHTML;
    } else if (elements instanceof DOMNodeCollection){
      for(let j=0; j<elements.he.length; j++) {
        this.he[i].innerHTML += elements.he[j].outerHTML;
      }
    } else {
      this.he[i].innerHTML += elements;
    }
  }  
}

DOMNodeCollection.prototype.addClass = function(className){
  for(let i = 0; i < this.he.length; i++) {
    this.he[i].classList.add(className);
  }
}

DOMNodeCollection.prototype.removeClass = function (className) {
  for (let i = 0; i < this.he.length; i++) {
    this.he[i].classList.remove(className);
  }
}

DOMNodeCollection.prototype.attr = function(attr, value) {
  if(value === undefined){
    return this.he[0].attributes[attr];
  } else {
    for(let i = 0; i < this.he.length; i++) {
      this.he[i].setAttribute(attr, value);
    }
  }
}

DOMNodeCollection.prototype.children = function() {
  let childrenNodes = [];
  for (let i = 0; i < this.he.length; i++) {
    childrenNodes.push(this.he[i].children);
  }
  return new DOMNodeCollection(childrenNodes);
}

DOMNodeCollection.prototype.parent = function() {
  let parentNodes = [];
  for (let i = 0; i < this.he.length; i++) {
    let currentParent = this.he[i].parentNode;
    if(parentNodes.includes(currentParent) === false){
      parentNodes.push(currentParent);
    }
  }
  return new DOMNodeCollection(parentNodes);
}


DOMNodeCollection.prototype.find = function(string) {
  let foundNodes = [];
  for (let i = 0; i < this.he.length; i++) {
    let nodes = this.he[i].querySelectorAll(string);
    for (let j = 0; j < nodes.length; j++) {
      if (foundNodes.includes(nodes[j]) === false) {
        foundNodes.push(nodes[j]);
      }
    }
  }
  return new DOMNodeCollection(foundNodes);
}

DOMNodeCollection.prototype.remove = function() {
  for( let i = 0; i < this.he.length ; i++){
    this.he[i].outerHTML = "";
  }
}


module.exports = DOMNodeCollection;