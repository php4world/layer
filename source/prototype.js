Element.prototype.one = function(eventType, callback) {
    this.addEventListener(eventType, function fn(e) {
        e.target.removeEventListener(e.type, fn);
        return callback(e);
    });
};
