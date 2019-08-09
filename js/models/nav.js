export class Nav {
    constructor(elem, handlers={}) {
        this.selected = null;

        this._elem = elem;
        elem.onclick = this.onClick.bind(this);

        Object.entries(handlers).forEach(([key, handler]) => this[key] = handler);
    }

    onClick(event) {
        let action = event.target.dataset.load;

        if (this.selected == action) return;
        this.selected = action;

        if (action) {
            this[action](event.target);
        }
    }
}