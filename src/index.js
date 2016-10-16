/**
 * TODO: Handle styles
 */

class Edyson extends HTMLPreElement {
  attachedCallback() {
    console.log('attachedCallback');
    this.editable = this.getAttribute('editable') || true;
    this.contentEditable = this.editable;
    this._json = null;
    this._indentation = null
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

      this._json = json;
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

  save() {
    if (this.hasAttribute('errored')) {
      throw new Error(`You can't save an errored json`);
    }

    this.initialValue = this.serialize(this._json);
  }

  get indentation() {
    return this._indentation || this.getAttribute('indentation') || 2;
  }

  set indentation(value) {
    this._indentation = value;
    //Triggers serialization with the new indentation
    this.json = this._json;
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