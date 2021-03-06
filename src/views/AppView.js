/**
 * Created by damingl on 1/12/15.
 */
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var Lightbox = require('famous/views/Lightbox');

    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');

    var ButtonBar = require('views/ButtonBar');
    var FeedView = require('views/FeedView');
    var TweetData = require('data/TweetData');
    var ProfileView = require('views/ProfileView');


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
            this.headerLightbox.show(this.headers[index]);
            this.contentLightbox.show(this.content[index]);
        }.bind(this));
        this.buttonBar.selectState({index:1});
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        headerSize: undefined,
        footerSize: undefined,
        sections: undefined,
        transitions: undefined
    };

    function _createLayout() {
        this._layout = new HeaderFooterLayout({
                headerSize: this.options.headerSize,
                footerSize: this.options.footerSize
            }
        );
        this.add(this._layout);
        this.headerLightbox = new Lightbox(this.options.transitions.header);
        this.contentLightbox = new Lightbox(this.options.transitions.content);

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
        console.log('this.options.sections');
        console.log(this.options.sections);
        for (var i = 0; i < this.options.sections.length; i++) {
            var title = new Surface({
                content: this.options.sections[i].title,
                properties: {
                    color: 'white',
                    fontSize: '20px',
                    textAlign: 'center',
                    lineHeight: this.options.headerSize + 'px'
                }
            });

            this.headers.push(title);
            console.log('this.headers');
            console.log(title);

        }
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
                    //backgroundColor: 'red'
                }
            });

            this.content.push(surface);
        }
        this.content[0] = new FeedView({
            tweetData: TweetData
        });
        this.content[1] = new ProfileView();

    }

    module.exports = AppView;
});
