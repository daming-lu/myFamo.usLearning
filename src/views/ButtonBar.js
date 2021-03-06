define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var GridLayout = require('famous/views/GridLayout');
    var ButtonView = require('views/ButtonView');

    function ButtonBar() {
        View.apply(this, arguments);

        this._layout;
        this._buttons = [];
        this._state;

        _createLayout.call(this);
        _createButtons.call(this);

        this._eventInput.on('buttonClick', this.selectState.bind(this));

    }

    ButtonBar.prototype = Object.create(View.prototype);
    ButtonBar.prototype.constructor = ButtonBar;

    ButtonBar.DEFAULT_OPTIONS = {
        buttons: [
            {
                label: 'Home',
                iconUrl: 'content/images/home.svg'
            },
            {
                label: 'Profile',
                iconUrl: 'content/images/user.svg'
            },
            {
                label: 'Messages',
                iconUrl: 'content/images/messages.svg'
            }
        ]
    };

    function _createLayout() {
        this._layout = new GridLayout({
            dimensions: [this.options.buttons.length, 1]
        });

        this.add(this._layout);
    }

    function _createButtons() {
        for (var i = 0; i < this.options.buttons.length; i++) {
            var buttonInfo = this.options.buttons[i];
            buttonInfo.index = i;
            buttonInfo.dummy = i*10;
            var button = new ButtonView(buttonInfo);


            this._buttons.push(button);
            //button.on('click', this.selectState.bind(this, i));
            this.subscribe(button);

        }
        this._layout.sequenceFrom(this._buttons);
    }

    ButtonBar.prototype.selectState = function(param) {
        console.log('param');
        console.log(param);
        index = param.index;
        if (index === this._state) return;
        this._eventOutput.emit('stateChange', index);

        if (this._state !== undefined) {
            this._buttons[this._state].toggle();
        }
        this._state = index;
        this._buttons[index].toggle();
    };

    module.exports = ButtonBar;
});
