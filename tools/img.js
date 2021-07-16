function Atlas() {
    this.initialize.apply(this, arguments);
}

Atlas.prototype.initialize = function (url) {
    this._baseTxeture = PIXI.Texture.from(url);
    this._splitRow = 1;
    this._splitCol = 1;
    this._url = url;
    this._imgs = [];
}

Atlas.prototype.setSplitRowAndCol = function (row, col) {
    this._splitRow = row || 1;
    this._splitCol = col || 1;
}

Atlas.prototype.split = function () {
    const splitWidth = this._baseTxeture.width / this._splitCol;
    const splitHeight = this._baseTxeture.height / this._splitRow;

    for (let i = 0; i < this._splitRow; i++) {
        for (let j = 0; j < this._splitCol; j++) {
            let clipRect = new PIXI.Rectangle(j * splitWidth, i * splitHeight, splitWidth, splitHeight);
            this._baseTxeture.frame = clipRect;
            this._imgs.push(this._baseTxeture.clone());
        }
    }
}
