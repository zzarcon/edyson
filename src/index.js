/**
 * TODO: Handle styles
 */

class Jsonedy extends HTMLPreElement {
  attachedCallback() {
    this.editable = this.getAttribute('editable') || true;
    this.contentEditable = this.editable;
    this._json = null;
    this.isErrored = false;
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
    return JSON.stringify(json, null, 2);
  }

  clear() {
    this.json = '';
  }

  onKeydown() {
    const currentValue = this.textContent;
    const hasValueChanged = this.currentValue !== currentValue && currentValue !== this.initialValue;

    if (!hasValueChanged) return;

    this.currentValue = currentValue;

    try {
      const json = JSON.parse(currentValue);

      this.triggerEvent('change', {json});
    } catch (e) {
      //TODO: add attribute to reflect the 'error' status
      this.isErrored = true;
      this.triggerEvent('error');
    }
  }
  
  triggerEvent(eventName, options) {
    const event = new CustomEvent(eventName, {detail: options});

    this.dispatchEvent(event);
  }

  get json() {
    return this._json;
  }

  set json(data) {
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

document.registerElement('json-edy', {
  prototype: Jsonedy.prototype,
  extends: 'pre'
});

module.exports = Jsonedy;