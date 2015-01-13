define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');

    function ButtonView() {
        View.apply(this, arguments);

        _createButton.call(this);

        this.buttonSurface.on('click', function() {
            var params = {
                index: this.options.index,
                param2: "2"
            };
            this._eventOutput.emit('buttonClick', params);
        }.bind(this));
    }

    ButtonView.prototype = Object.create(View.prototype);
    ButtonView.prototype.constructor = ButtonView;

    ButtonView.DEFAULT_OPTIONS = {
        index: undefined,
        iconUrl: undefined,
        label: undefined,
        dummy: undefined
    };

    function _createButton() {
        console.log('_createButton this.options');
        console.log(this.options);

        this.buttonModifier = new Modifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });

        this.buttonSurface = new Surface({
            size: [true, true],
            content: '<img src="' + this.options.iconUrl + '" width="20"><p>' + this.options.label + '</p>',
            classes: ['button']
        });

        this.add(this.buttonModifier).add(this.buttonSurface);
    }

    module.exports = ButtonView;
});
