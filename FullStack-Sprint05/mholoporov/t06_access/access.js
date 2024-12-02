class Access {
    #mark_LXXXV;

    get mark_LXXXV() {
        if (this.#mark_LXXXV === undefined) {
            return undefined;
        } else if (this.#mark_LXXXV === 'null') {
            return null;
        }
        return this.#mark_LXXXV;
    }

    set mark_LXXXV(value) {
        this.#mark_LXXXV = value;
    }
}

module.exports = Access;