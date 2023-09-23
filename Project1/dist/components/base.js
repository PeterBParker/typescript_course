// Component Base Class
export class Component {
    constructor(templateId, hostElementId, insertLoc, newElementId) {
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertLoc);
    }
    attach(insertLoc) {
        this.hostEl.insertAdjacentElement(insertLoc, this.element);
    }
}
