"use strict";

const fs = require("fs");


class JsonDatabase {
    constructor({file_path, autoCommit}) {
        this.file_path = file_path;

        if (typeof autoCommit === "number") {
            this.autoCommit = autoCommit >= 0 ? autoCommit : 0;
        } else if (autoCommit === true) {
            this.autoCommit === 1;
        } else {
            this.autoCommit = 0;
        }
        this.data = {};
        this.transactions = 0;
    }

    read() {
        const rawContent = fs.readFileSync(this.file_path);
        this.data = JSON.parse(rawContent);
    }

    get(board) {
        return this.data[board.toString()];
    }

    update(board, values) {
        this.data[board.toString()] = values;
        this.transactions++;
        if (this.shouldCommit()) {
            this.commit();
        }
    }

    shouldCommit() {
        return this.autoCommit > 0 && this.transactions % this.autoCommit === 0;
    }

    commit() {
        const strdata = JSON.stringify(this.data, null, 0);
        fs.writeFile(this.file_path, strdata, (err) => {if (err) throw err;});
    }

    exists(board) {
        return this.data[board.toString()] === undefined;
    }

    size() {
        return Object.keys(this.data).length;
    }
}

module.exports = JsonDatabase;