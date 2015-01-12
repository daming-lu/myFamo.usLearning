/**
 * Created by damingl on 1/12/15.
 */
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var Lightbox = require('famous/views/Lightbox');

    var ButtonBar = require('views/ButtonBar');

    function AppView() {
        View.apply(this, arguments);

        this._layout;
        this.headers = [];
        this.content = [];

        _createLayout.call(this);
        _createHeaders.call(this);
        _createButtonBar.call(this);
        _createContent.call(this);

        this.buttonBar.on('stateChange', function(index) {
            //this.headerLightbox.show(this.content[index]);
            this.contentLightbox.show(this.content[index]);

        }.bind(this));

        this.buttonBar.selectState(1);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        headerSize: 44,
        footerSize: 60
    };

    function _createLayout() {
        this._layout = new HeaderFooterLayout({
                headerSize: this.options.headerSize,
                footerSize: this.options.footerSize
            }
        );
        this.add(this._layout);
        this.headerLightbox = new Lightbox();
        this.contentLightbox = new Lightbox();

        this._layout.header.add(this.headerLightbox);
        this._layout.content.add(this.contentLightbox);
    }

    function _createHeaders() {
        var background = new Surface({
                properties: {
                    backgroundColor : "#3be"
                }
            }
        );
        this._layout.header.add(background);
    }

    function _createButtonBar() {
        this.buttonBar = new ButtonBar();

        this._layout.footer.add(this.buttonBar);
    }

    function _createContent() {
        for (var i = 0; i < 3; i++) {
            var surface = new Surface({
                content: i + '',
                properties: {
                    backgroundColor: 'hsl(' + (i * 360 / 3) + ', 100%, 50%)'
                }
            });

            this.content.push(surface);
        }
    }

    module.exports = AppView;
});
