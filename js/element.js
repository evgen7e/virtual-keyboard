class Element {
    constructor(name, className, parent) {
        this.name = name;
        this.className = className;
        this.parent = parent;
    }
  
    addElement() {
        const element = document.createElement(this.name);
        element.className = this.className;
        this.parent.append(element);
        return element;
    }
  
    setContent(text) {
        const element = this.addElement();
        element.textContent = text;
        return element;
    }
}
export default Element;