(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * TODO: Reflect if has errors -> handle initialValue event
 * TODO: Save changes
 */

require('edyson');

let edyson, errorStatus;

const init = () => {
  edyson = document.getElementById('config');
  errorStatus = document.getElementById('error-status');

  document.getElementById('editable').addEventListener('change', onEditChange);
  document.getElementById('indentation').addEventListener('change', onIndentation);
  document.getElementById('indentation').addEventListener('keyup', onIndentation);
  document.getElementById('save').addEventListener('click', onSaveChanges);

  edyson.addEventListener('error', onError);
  edyson.addEventListener('initialValue', onInitialValue);
  edyson.addEventListener('change', onChange);

  edyson.json = jsonConfig;
};

const onSaveChanges = () => {
  edyson.save();
};

const onIndentation = function() {
  edyson.indentation = this.value;
};

const onInitialValue = () => {
  errorStatus.textContent = '✅';
};

const onEditChange = function() {
  edyson.editable = this.checked;
};

const onError = (e) => {
  errorStatus.textContent = '❌';
};

const onChange = (e) => {
  const json = e.detail;

  errorStatus.textContent = '✅';
  console.log('onChange', json);
};

document.addEventListener('DOMContentLoaded', init);
},{"edyson":2}],2:[function(require,module,exports){
/**
 * TODO: Handle styles
 */

class Edyson extends HTMLPreElement {
  attachedCallback() {
    this.editable = this.getAttribute('editable') || true;
    this.indentation = this.getAttribute('indentation') || 2;
    this.contentEditable = this.editable;
    this._json = null;
    this.initialValue = '';
    this.currentValue = null;
    this.addEvents();
  }

  addEvents() {
    const onKeydown = this.onKeydown.bind(this);
    const onKeydownDelayed = () => setTimeout(onKeydown, 10);

    this.addEventListener('keydown', onKeydownDelayed);
  }

  serialize(json) {
    return JSON.stringify(json, null, this.indentation);
  }

  clear() {
    this.json = '';
  }

  onKeydown() {
    const currentValue = this.textContent;
    const isInitialValue = currentValue === this.initialValue;
    const valueHasChanged = this.currentValue !== currentValue;

    this.currentValue = currentValue;

    if (isInitialValue) {
      this.removeAttr('errored');
      return;
    }

    if (!valueHasChanged) return;

    try {
      const json = JSON.parse(currentValue);

      this.removeAttr('errored');
      this.triggerEvent('change', {json});
    } catch (e) {
      this.setAttr('errored', true);
      this.triggerEvent('error');
    }
  }
  
  triggerEvent(eventName, options) {
    const event = new CustomEvent(eventName, {detail: options});

    this.dispatchEvent(event);
  }

  setAttr(attrName, value) {
    !this.hasAttribute(attrName) && this.setAttribute(attrName, value);
  }

  removeAttr(attrName) {
    this.hasAttribute(attrName) && this.removeAttribute(attrName);
  }

  get json() {
    return this._json;
  }

  set json(data) {
    if (typeof data !== 'object') {
      throw new Error(`json needs to be an object, received ${typeof data}`);
    }

    const jsonText = this.serialize(data);

    this._json = data;
    this.textContent = this.initialValue = jsonText;
  }

  get editable() {
    return this.contentEditable;
  }

  set editable(editable) {
    this.contentEditable = editable;
  }
}

document.registerElement('edy-son', {
  prototype: Edyson.prototype,
  extends: 'pre'
});

module.exports = Edyson;
},{}]},{},[1]);
