var pixelate = false;
var Ember = /** @class */ (function () {
    function Ember(colors, app, pixelate) {
        var _this = this;
        if (pixelate === void 0) { pixelate = false; }
        this.emberBlobs = [];
        this.embers = new PIXI.Container();
        if (pixelate) {
            this.embers.filters = [new PIXI.filters.PixelateFilter()];
        }
        colors.map(function (color) {
            var circle = new PIXI.Graphics();
            circle.lineStyle(0);
            circle.beginFill(color, 1);
            circle.drawCircle(0, 0, 10);
            circle.endFill();
            _this.emberBlobs.push(app.renderer.generateTexture(circle));
        });
        setInterval(function () {
            _this.addEmber();
        }, 300);
    }
    Ember.prototype.stoke = function () {
        var amount = 40 + Math.round(Math.random() * 20);
        for (var i = 0; i < amount; i++) {
            this.addEmber();
        }
    };
    Ember.prototype.makeBlob = function () {
        var texture = this.emberBlobs[Math.floor(Math.random() * this.emberBlobs.length)];
        var blob = new PIXI.Sprite(texture);
        blob.anchor.set(0.5);
        var scaleScale = Math.random();
        blob.scale.set(0.4 * scaleScale, .5 * scaleScale);
        return blob;
    };
    Ember.prototype.addEmber = function () {
        var _this = this;
        var time = this.time * (0.3 + (Math.random() * 0.6));
        var blob = this.makeBlob();
        this.embers.addChild(blob);
        var bezier = [
            {
                x: (Math.random() * 100) - 50,
                y: -100
            },
            {
                x: Math.random() * 200 - 100,
                y: -100 + Math.random() * -20
            },
            {
                x: Math.random() * 200 - 100,
                y: -100 + (Math.random() * -50)
            },
            {
                x: Math.random() * 200 - 100,
                y: -200 + (Math.random() * -50)
            },
            {
                x: Math.random() * 300 - 150,
                y: -250 + (Math.random() * -100)
            },
            { x: Math.random() * 500 - 250,
                y: -500 + (Math.random() * -150)
            }
        ];
        TweenMax.to(blob, time / 2, { delay: time / 2, ease: Power1.easeOut, alpha: 0 });
        TweenMax.to(blob.position, time, {
            ease: Power1.easeOut,
            bezier: bezier,
            onComplete: function () {
                _this.embers.removeChild(blob);
                blob = null;
            }
        });
    };
    Object.defineProperty(Ember.prototype, "time", {
        get: function () {
            return 2 + Math.random() * 1.5;
        },
        enumerable: false,
        configurable: true
    });
    return Ember;
}());
var Fire = /** @class */ (function () {
    function Fire(color, app, pixelate) {
        var _this = this;
        if (pixelate === void 0) { pixelate = false; }
        this.flame = new PIXI.Container();
        this.cutout = new PIXI.Container();
        this.fire = new PIXI.Container();
        this.flame.addChild(this.fire);
        this.flame.addChild(this.cutout);
        this.fire.alpha = 0.7;
        var circle = new PIXI.Graphics();
        circle.lineStyle(0);
        circle.beginFill(color, 1);
        circle.drawCircle(0, 0, 65);
        circle.endFill();
        this.fireBlob = app.renderer.generateTexture(circle);
        var cutoutCircle = new PIXI.Graphics();
        cutoutCircle.lineStyle(0);
        cutoutCircle.drawCircle(0, 0, 40);
        cutoutCircle.endFill();
        this.cutoutBlob = app.renderer.generateTexture(cutoutCircle);
        var filters = {
            bloom: new PIXI.filters.AdvancedBloomFilter(0.45, 0.5, 0.5),
            pixel: pixelate ? new PIXI.filters.PixelateFilter() : new PIXI.filters.VoidFilter(),
            void: new PIXI.filters.VoidFilter()
        };
        this.flame.filters = [filters.bloom, filters.pixel, filters.void];
        this.flame.filters[this.flame.filters.length - 1].blendMode = PIXI.BLEND_MODES.SCREEN;
        setInterval(function () {
            _this.addFlame();
            _this.addCutout(Math.random() > .5 ? true : false);
        }, 50);
    }
    Fire.prototype.makeBlob = function (texture) {
        var blob = new PIXI.Sprite(texture);
        blob.anchor.set(0.5);
        return blob;
    };
    Fire.prototype.addCutout = function (left) {
        var _this = this;
        var time = this.time * (0.7 + (Math.random() * 0.2));
        var blob = this.makeBlob(this.cutoutBlob);
        this.cutout.addChild(blob);
        var scale = [
            1,
            0.75 + (Math.random() * 1)
        ];
        blob.position.x = (130 + (Math.random() * 50)) * (left ? -1 : 1);
        var targetX = (5 + (Math.random() * 60)) * (left ? -1 : 1);
        blob.scale.set(scale[0]);
        TweenMax.to(blob, time, { ease: Power1.easeIn, pixi: { x: targetX, y: -270, scaleX: scale[1], scaleY: scale[1] }, onComplete: function () {
                _this.cutout.removeChild(blob);
                blob = null;
            } });
    };
    Fire.prototype.addFlame = function () {
        var _this = this;
        var time = this.time;
        var blob = this.makeBlob(this.fireBlob);
        this.fire.addChild(blob);
        var scale = [
            1.2 + Math.random(),
            0.5 + Math.random()
        ];
        var bezier = [
            {
                x: 0,
                y: 0
            },
            {
                x: Math.random() * 100 - 50,
                y: Math.random() * -20
            },
            {
                x: Math.random() * 100 - 50,
                y: Math.random() * -50 + -50
            },
            { x: 0,
                y: -150 + Math.random() * -100
            }
        ];
        blob.scale.set(scale[0]);
        TweenMax.to(blob, time, { ease: Power1.easeIn, bezier: bezier, ease: Power0.easeOut });
        TweenMax.to(blob, time, { pixi: { scaleX: scale[1], scaleY: scale[1] }, onComplete: function () {
                _this.fire.removeChild(blob);
                blob = null;
            } });
    };
    Object.defineProperty(Fire.prototype, "time", {
        get: function () {
            return 1 + Math.random() * .4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fire.prototype, "y", {
        set: function (y) { this.flame.position.y = y; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Fire.prototype, "x", {
        set: function (x) { this.flame.position.x = x; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Fire.prototype, "scale", {
        set: function (s) { this.flame.scale.set(s); },
        enumerable: false,
        configurable: true
    });
    ;
    return Fire;
}());
var Stage = /** @class */ (function () {
    function Stage(canvas, pixelate) {
        var _this = this;
        if (pixelate === void 0) { pixelate = false; }
        this.flames = [];
        this.onResize = function () {
            this.app.renderer.resize(260, 500);
            this.stage.position.x = 260 / 2;
            this.stage.position.y = 500 * 0.75;
        };
        this.add = function (element, container) {
            if (container === void 0) { container = this.stage; }
            container.addChild(element);
        };
        this.remove = function (element, container) {
            if (container === void 0) { container = this.stage; }
            container.removeChild(element);
        };
        this.app = new PIXI.Application(300, 300, { antialias: true, backgroundColor: 0x000000, transparent: true });
        canvas.appendChild(this.app.view);
        this.stage = new PIXI.Container();
        this.flamesContainer = new PIXI.Container();
        this.add(this.stage, this.app.stage);
        this.add(this.flamesContainer);
        this.flamesContainer.scale.set(0.75);
        var flames = [
            { color: 0xE23B00, scale: 1, offset: -30 },
            { color: 0xFE8200, scale: 1, offset: -10 },
            { color: 0xFBE416, scale: 0.9, offset: 10 },
            { color: 0xFDFDB4, scale: 0.7, offset: 30 }
        ];
        var ember = new Ember([0xFE9C00, 0xFEA600, 0xE27100], this.app, pixelate);
        this.add(ember.embers, this.flamesContainer);
        flames.map(function (settings) {
            var fire = new Fire(settings.color, _this.app, pixelate);
            _this.flames.push(fire);
            fire.y = settings.offset;
            fire.scale = settings.scale;
            fire.flame.pivot.set(0, 10);
            _this.add(fire.flame, _this.flamesContainer);
        });
        this.onResize();
        var f = this.flames.map(function (fire) { return fire.flame; });
        f.pop();
        this.stokeAnimation = new TimelineMax();
        this.stokeAnimation.to(f, 0.3, { ease: Power2.easeOut, pixi: { scaleY: 1.2, scaleX: 1.15 } });
        this.stokeAnimation.to(f, 1.4, { ease: Bounce.easeOut, pixi: { scaleY: 1, scaleX: 1 } });
        this.stokeAnimation.stop();
        window.addEventListener('resize', function (e) { _this.onResize(); });
        window.addEventListener('click', function (e) {
            ember.stoke();
            _this.stokeAnimation.restart();
        });
    }
    return Stage;
}());
var stage = new Stage(document.getElementById('canvas'), pixelate, 'transparent');