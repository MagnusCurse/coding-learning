import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/.store/ev-emitter@2.1.2/node_modules/ev-emitter/ev-emitter.js
var require_ev_emitter = __commonJS({
  "node_modules/.store/ev-emitter@2.1.2/node_modules/ev-emitter/ev-emitter.js"(exports, module) {
    (function(global, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory();
      } else {
        global.EvEmitter = factory();
      }
    })(typeof window != "undefined" ? window : exports, function() {
      function EvEmitter() {
      }
      let proto = EvEmitter.prototype;
      proto.on = function(eventName, listener) {
        if (!eventName || !listener) return this;
        let events = this._events = this._events || {};
        let listeners = events[eventName] = events[eventName] || [];
        if (!listeners.includes(listener)) {
          listeners.push(listener);
        }
        return this;
      };
      proto.once = function(eventName, listener) {
        if (!eventName || !listener) return this;
        this.on(eventName, listener);
        let onceEvents = this._onceEvents = this._onceEvents || {};
        let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        onceListeners[listener] = true;
        return this;
      };
      proto.off = function(eventName, listener) {
        let listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return this;
        let index = listeners.indexOf(listener);
        if (index != -1) {
          listeners.splice(index, 1);
        }
        return this;
      };
      proto.emitEvent = function(eventName, args) {
        let listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return this;
        listeners = listeners.slice(0);
        args = args || [];
        let onceListeners = this._onceEvents && this._onceEvents[eventName];
        for (let listener of listeners) {
          let isOnce = onceListeners && onceListeners[listener];
          if (isOnce) {
            this.off(eventName, listener);
            delete onceListeners[listener];
          }
          listener.apply(this, args);
        }
        return this;
      };
      proto.allOff = function() {
        delete this._events;
        delete this._onceEvents;
        return this;
      };
      return EvEmitter;
    });
  }
});

// node_modules/.store/get-size@3.0.0/node_modules/get-size/get-size.js
var require_get_size = __commonJS({
  "node_modules/.store/get-size@3.0.0/node_modules/get-size/get-size.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory();
      } else {
        window2.getSize = factory();
      }
    })(window, function factory() {
      function getStyleSize(value) {
        let num = parseFloat(value);
        let isValid = value.indexOf("%") == -1 && !isNaN(num);
        return isValid && num;
      }
      let measurements = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth"
      ];
      let measurementsLength = measurements.length;
      function getZeroSize() {
        let size = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        };
        measurements.forEach((measurement) => {
          size[measurement] = 0;
        });
        return size;
      }
      function getSize(elem) {
        if (typeof elem == "string") elem = document.querySelector(elem);
        let isElement = elem && typeof elem == "object" && elem.nodeType;
        if (!isElement) return;
        let style = getComputedStyle(elem);
        if (style.display == "none") return getZeroSize();
        let size = {};
        size.width = elem.offsetWidth;
        size.height = elem.offsetHeight;
        let isBorderBox = size.isBorderBox = style.boxSizing == "border-box";
        measurements.forEach((measurement) => {
          let value = style[measurement];
          let num = parseFloat(value);
          size[measurement] = !isNaN(num) ? num : 0;
        });
        let paddingWidth = size.paddingLeft + size.paddingRight;
        let paddingHeight = size.paddingTop + size.paddingBottom;
        let marginWidth = size.marginLeft + size.marginRight;
        let marginHeight = size.marginTop + size.marginBottom;
        let borderWidth = size.borderLeftWidth + size.borderRightWidth;
        let borderHeight = size.borderTopWidth + size.borderBottomWidth;
        let styleWidth = getStyleSize(style.width);
        if (styleWidth !== false) {
          size.width = styleWidth + // add padding and border unless it's already including it
          (isBorderBox ? 0 : paddingWidth + borderWidth);
        }
        let styleHeight = getStyleSize(style.height);
        if (styleHeight !== false) {
          size.height = styleHeight + // add padding and border unless it's already including it
          (isBorderBox ? 0 : paddingHeight + borderHeight);
        }
        size.innerWidth = size.width - (paddingWidth + borderWidth);
        size.innerHeight = size.height - (paddingHeight + borderHeight);
        size.outerWidth = size.width + marginWidth;
        size.outerHeight = size.height + marginHeight;
        return size;
      }
      return getSize;
    });
  }
});

// node_modules/.store/fizzy-ui-utils@3.0.0/node_modules/fizzy-ui-utils/utils.js
var require_utils = __commonJS({
  "node_modules/.store/fizzy-ui-utils@3.0.0/node_modules/fizzy-ui-utils/utils.js"(exports, module) {
    (function(global, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(global);
      } else {
        global.fizzyUIUtils = factory(global);
      }
    })(exports, function factory(global) {
      let utils = {};
      utils.extend = function(a, b) {
        return Object.assign(a, b);
      };
      utils.modulo = function(num, div) {
        return (num % div + div) % div;
      };
      utils.makeArray = function(obj) {
        if (Array.isArray(obj)) return obj;
        if (obj === null || obj === void 0) return [];
        let isArrayLike = typeof obj == "object" && typeof obj.length == "number";
        if (isArrayLike) return [...obj];
        return [obj];
      };
      utils.removeFrom = function(ary, obj) {
        let index = ary.indexOf(obj);
        if (index != -1) {
          ary.splice(index, 1);
        }
      };
      utils.getParent = function(elem, selector) {
        while (elem.parentNode && elem != document.body) {
          elem = elem.parentNode;
          if (elem.matches(selector)) return elem;
        }
      };
      utils.getQueryElement = function(elem) {
        if (typeof elem == "string") {
          return document.querySelector(elem);
        }
        return elem;
      };
      utils.handleEvent = function(event) {
        let method = "on" + event.type;
        if (this[method]) {
          this[method](event);
        }
      };
      utils.filterFindElements = function(elems, selector) {
        elems = utils.makeArray(elems);
        return elems.filter((elem) => elem instanceof HTMLElement).reduce((ffElems, elem) => {
          if (!selector) {
            ffElems.push(elem);
            return ffElems;
          }
          if (elem.matches(selector)) {
            ffElems.push(elem);
          }
          let childElems = elem.querySelectorAll(selector);
          ffElems = ffElems.concat(...childElems);
          return ffElems;
        }, []);
      };
      utils.debounceMethod = function(_class, methodName, threshold) {
        threshold = threshold || 100;
        let method = _class.prototype[methodName];
        let timeoutName = methodName + "Timeout";
        _class.prototype[methodName] = function() {
          clearTimeout(this[timeoutName]);
          let args = arguments;
          this[timeoutName] = setTimeout(() => {
            method.apply(this, args);
            delete this[timeoutName];
          }, threshold);
        };
      };
      utils.docReady = function(onDocReady) {
        let readyState = document.readyState;
        if (readyState == "complete" || readyState == "interactive") {
          setTimeout(onDocReady);
        } else {
          document.addEventListener("DOMContentLoaded", onDocReady);
        }
      };
      utils.toDashed = function(str) {
        return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
          return $1 + "-" + $2;
        }).toLowerCase();
      };
      let console = global.console;
      utils.htmlInit = function(WidgetClass, namespace) {
        utils.docReady(function() {
          let dashedNamespace = utils.toDashed(namespace);
          let dataAttr = "data-" + dashedNamespace;
          let dataAttrElems = document.querySelectorAll(`[${dataAttr}]`);
          let jQuery = global.jQuery;
          [...dataAttrElems].forEach((elem) => {
            let attr = elem.getAttribute(dataAttr);
            let options;
            try {
              options = attr && JSON.parse(attr);
            } catch (error) {
              if (console) {
                console.error(`Error parsing ${dataAttr} on ${elem.className}: ${error}`);
              }
              return;
            }
            let instance = new WidgetClass(elem, options);
            if (jQuery) {
              jQuery.data(elem, namespace, instance);
            }
          });
        });
      };
      return utils;
    });
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/cell.js
var require_cell = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/cell.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(require_get_size());
      } else {
        window2.Flickity = window2.Flickity || {};
        window2.Flickity.Cell = factory(window2.getSize);
      }
    })(typeof window != "undefined" ? window : exports, function factory(getSize) {
      const cellClassName = "flickity-cell";
      function Cell(elem) {
        this.element = elem;
        this.element.classList.add(cellClassName);
        this.x = 0;
        this.unselect();
      }
      let proto = Cell.prototype;
      proto.destroy = function() {
        this.unselect();
        this.element.classList.remove(cellClassName);
        this.element.style.transform = "";
        this.element.removeAttribute("aria-hidden");
      };
      proto.getSize = function() {
        this.size = getSize(this.element);
      };
      proto.select = function() {
        this.element.classList.add("is-selected");
        this.element.removeAttribute("aria-hidden");
      };
      proto.unselect = function() {
        this.element.classList.remove("is-selected");
        this.element.setAttribute("aria-hidden", "true");
      };
      proto.remove = function() {
        this.element.remove();
      };
      return Cell;
    });
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/slide.js
var require_slide = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/slide.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory();
      } else {
        window2.Flickity = window2.Flickity || {};
        window2.Flickity.Slide = factory();
      }
    })(typeof window != "undefined" ? window : exports, function factory() {
      function Slide(beginMargin, endMargin, cellAlign) {
        this.beginMargin = beginMargin;
        this.endMargin = endMargin;
        this.cellAlign = cellAlign;
        this.cells = [];
        this.outerWidth = 0;
        this.height = 0;
      }
      let proto = Slide.prototype;
      proto.addCell = function(cell) {
        this.cells.push(cell);
        this.outerWidth += cell.size.outerWidth;
        this.height = Math.max(cell.size.outerHeight, this.height);
        if (this.cells.length === 1) {
          this.x = cell.x;
          this.firstMargin = cell.size[this.beginMargin];
        }
      };
      proto.updateTarget = function() {
        let lastCell = this.getLastCell();
        let lastMargin = lastCell ? lastCell.size[this.endMargin] : 0;
        let slideWidth = this.outerWidth - (this.firstMargin + lastMargin);
        this.target = this.x + this.firstMargin + slideWidth * this.cellAlign;
      };
      proto.getLastCell = function() {
        return this.cells[this.cells.length - 1];
      };
      proto.select = function() {
        this.cells.forEach((cell) => cell.select());
      };
      proto.unselect = function() {
        this.cells.forEach((cell) => cell.unselect());
      };
      proto.getCellElements = function() {
        return this.cells.map((cell) => cell.element);
      };
      return Slide;
    });
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/animate.js
var require_animate = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/animate.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(require_utils());
      } else {
        window2.Flickity = window2.Flickity || {};
        window2.Flickity.animatePrototype = factory(window2.fizzyUIUtils);
      }
    })(typeof window != "undefined" ? window : exports, function factory(utils) {
      let proto = {};
      proto.startAnimation = function() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.restingFrames = 0;
        this.animate();
      };
      proto.animate = function() {
        this.applyDragForce();
        this.applySelectedAttraction();
        let previousX = this.x;
        this.integratePhysics();
        this.positionSlider();
        this.settle(previousX);
        if (this.isAnimating) requestAnimationFrame(() => this.animate());
      };
      proto.positionSlider = function() {
        let x = this.x;
        if (this.isWrapping) {
          x = utils.modulo(x, this.slideableWidth) - this.slideableWidth;
          this.shiftWrapCells(x);
        }
        this.setTranslateX(x, this.isAnimating);
        this.dispatchScrollEvent();
      };
      proto.setTranslateX = function(x, is3d) {
        x += this.cursorPosition;
        if (this.options.rightToLeft) x = -x;
        let translateX = this.getPositionValue(x);
        this.slider.style.transform = is3d ? `translate3d(${translateX},0,0)` : `translateX(${translateX})`;
      };
      proto.dispatchScrollEvent = function() {
        let firstSlide = this.slides[0];
        if (!firstSlide) return;
        let positionX = -this.x - firstSlide.target;
        let progress = positionX / this.slidesWidth;
        this.dispatchEvent("scroll", null, [progress, positionX]);
      };
      proto.positionSliderAtSelected = function() {
        if (!this.cells.length) return;
        this.x = -this.selectedSlide.target;
        this.velocity = 0;
        this.positionSlider();
      };
      proto.getPositionValue = function(position) {
        if (this.options.percentPosition) {
          return Math.round(position / this.size.innerWidth * 1e4) * 0.01 + "%";
        } else {
          return Math.round(position) + "px";
        }
      };
      proto.settle = function(previousX) {
        let isResting = !this.isPointerDown && Math.round(this.x * 100) === Math.round(previousX * 100);
        if (isResting) this.restingFrames++;
        if (this.restingFrames > 2) {
          this.isAnimating = false;
          delete this.isFreeScrolling;
          this.positionSlider();
          this.dispatchEvent("settle", null, [this.selectedIndex]);
        }
      };
      proto.shiftWrapCells = function(x) {
        let beforeGap = this.cursorPosition + x;
        this._shiftCells(this.beforeShiftCells, beforeGap, -1);
        let afterGap = this.size.innerWidth - (x + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, afterGap, 1);
      };
      proto._shiftCells = function(cells, gap, shift) {
        cells.forEach((cell) => {
          let cellShift = gap > 0 ? shift : 0;
          this._wrapShiftCell(cell, cellShift);
          gap -= cell.size.outerWidth;
        });
      };
      proto._unshiftCells = function(cells) {
        if (!cells || !cells.length) return;
        cells.forEach((cell) => this._wrapShiftCell(cell, 0));
      };
      proto._wrapShiftCell = function(cell, shift) {
        this._renderCellPosition(cell, cell.x + this.slideableWidth * shift);
      };
      proto.integratePhysics = function() {
        this.x += this.velocity;
        this.velocity *= this.getFrictionFactor();
      };
      proto.applyForce = function(force) {
        this.velocity += force;
      };
      proto.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"];
      };
      proto.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor());
      };
      proto.applyDragForce = function() {
        if (!this.isDraggable || !this.isPointerDown) return;
        let dragVelocity = this.dragX - this.x;
        let dragForce = dragVelocity - this.velocity;
        this.applyForce(dragForce);
      };
      proto.applySelectedAttraction = function() {
        let dragDown = this.isDraggable && this.isPointerDown;
        if (dragDown || this.isFreeScrolling || !this.slides.length) return;
        let distance = this.selectedSlide.target * -1 - this.x;
        let force = distance * this.options.selectedAttraction;
        this.applyForce(force);
      };
      return proto;
    });
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/core.js
var require_core = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/core.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(
          window2,
          require_ev_emitter(),
          require_get_size(),
          require_utils(),
          require_cell(),
          require_slide(),
          require_animate()
        );
      } else {
        let _Flickity = window2.Flickity;
        window2.Flickity = factory(
          window2,
          window2.EvEmitter,
          window2.getSize,
          window2.fizzyUIUtils,
          _Flickity.Cell,
          _Flickity.Slide,
          _Flickity.animatePrototype
        );
      }
    })(
      typeof window != "undefined" ? window : exports,
      function factory(window2, EvEmitter, getSize, utils, Cell, Slide, animatePrototype) {
        const { getComputedStyle: getComputedStyle2, console } = window2;
        let { jQuery } = window2;
        let GUID = 0;
        let instances = {};
        function Flickity(element, options) {
          let queryElement = utils.getQueryElement(element);
          if (!queryElement) {
            if (console) console.error(`Bad element for Flickity: ${queryElement || element}`);
            return;
          }
          this.element = queryElement;
          if (this.element.flickityGUID) {
            let instance = instances[this.element.flickityGUID];
            if (instance) instance.option(options);
            return instance;
          }
          if (jQuery) {
            this.$element = jQuery(this.element);
          }
          this.options = { ...this.constructor.defaults };
          this.option(options);
          this._create();
        }
        Flickity.defaults = {
          accessibility: true,
          // adaptiveHeight: false,
          cellAlign: "center",
          // cellSelector: undefined,
          // contain: false,
          freeScrollFriction: 0.075,
          // friction when free-scrolling
          friction: 0.28,
          // friction when selecting
          namespaceJQueryEvents: true,
          // initialIndex: 0,
          percentPosition: true,
          resize: true,
          selectedAttraction: 0.025,
          setGallerySize: true
          // watchCSS: false,
          // wrapAround: false
        };
        Flickity.create = {};
        let proto = Flickity.prototype;
        Object.assign(proto, EvEmitter.prototype);
        proto._create = function() {
          let { resize, watchCSS, rightToLeft } = this.options;
          let id = this.guid = ++GUID;
          this.element.flickityGUID = id;
          instances[id] = this;
          this.selectedIndex = 0;
          this.restingFrames = 0;
          this.x = 0;
          this.velocity = 0;
          this.beginMargin = rightToLeft ? "marginRight" : "marginLeft";
          this.endMargin = rightToLeft ? "marginLeft" : "marginRight";
          this.viewport = document.createElement("div");
          this.viewport.className = "flickity-viewport";
          this._createSlider();
          this.focusableElems = [this.element];
          if (resize || watchCSS) {
            window2.addEventListener("resize", this);
          }
          for (let eventName in this.options.on) {
            let listener = this.options.on[eventName];
            this.on(eventName, listener);
          }
          for (let method in Flickity.create) {
            Flickity.create[method].call(this);
          }
          if (watchCSS) {
            this.watchCSS();
          } else {
            this.activate();
          }
        };
        proto.option = function(opts) {
          Object.assign(this.options, opts);
        };
        proto.activate = function() {
          if (this.isActive) return;
          this.isActive = true;
          this.element.classList.add("flickity-enabled");
          if (this.options.rightToLeft) {
            this.element.classList.add("flickity-rtl");
          }
          this.getSize();
          let cellElems = this._filterFindCellElements(this.element.children);
          this.slider.append(...cellElems);
          this.viewport.append(this.slider);
          this.element.append(this.viewport);
          this.reloadCells();
          if (this.options.accessibility) {
            this.element.tabIndex = 0;
            this.element.addEventListener("keydown", this);
          }
          this.emitEvent("activate");
          this.selectInitialIndex();
          this.isInitActivated = true;
          this.dispatchEvent("ready");
        };
        proto._createSlider = function() {
          let slider = document.createElement("div");
          slider.className = "flickity-slider";
          this.slider = slider;
        };
        proto._filterFindCellElements = function(elems) {
          return utils.filterFindElements(elems, this.options.cellSelector);
        };
        proto.reloadCells = function() {
          this.cells = this._makeCells(this.slider.children);
          this.positionCells();
          this._updateWrapShiftCells();
          this.setGallerySize();
        };
        proto._makeCells = function(elems) {
          let cellElems = this._filterFindCellElements(elems);
          return cellElems.map((cellElem) => new Cell(cellElem));
        };
        proto.getLastCell = function() {
          return this.cells[this.cells.length - 1];
        };
        proto.getLastSlide = function() {
          return this.slides[this.slides.length - 1];
        };
        proto.positionCells = function() {
          this._sizeCells(this.cells);
          this._positionCells(0);
        };
        proto._positionCells = function(index) {
          index = index || 0;
          this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
          let cellX = 0;
          if (index > 0) {
            let startCell = this.cells[index - 1];
            cellX = startCell.x + startCell.size.outerWidth;
          }
          this.cells.slice(index).forEach((cell) => {
            cell.x = cellX;
            this._renderCellPosition(cell, cellX);
            cellX += cell.size.outerWidth;
            this.maxCellHeight = Math.max(cell.size.outerHeight, this.maxCellHeight);
          });
          this.slideableWidth = cellX;
          this.updateSlides();
          this._containSlides();
          this.slidesWidth = this.cells.length ? this.getLastSlide().target - this.slides[0].target : 0;
        };
        proto._renderCellPosition = function(cell, x) {
          let sideOffset = this.options.rightToLeft ? -1 : 1;
          let renderX = x * sideOffset;
          if (this.options.percentPosition) renderX *= this.size.innerWidth / cell.size.width;
          let positionValue = this.getPositionValue(renderX);
          cell.element.style.transform = `translateX( ${positionValue} )`;
        };
        proto._sizeCells = function(cells) {
          cells.forEach((cell) => cell.getSize());
        };
        proto.updateSlides = function() {
          this.slides = [];
          if (!this.cells.length) return;
          let { beginMargin, endMargin } = this;
          let slide = new Slide(beginMargin, endMargin, this.cellAlign);
          this.slides.push(slide);
          let canCellFit = this._getCanCellFit();
          this.cells.forEach((cell, i) => {
            if (!slide.cells.length) {
              slide.addCell(cell);
              return;
            }
            let slideWidth = slide.outerWidth - slide.firstMargin + (cell.size.outerWidth - cell.size[endMargin]);
            if (canCellFit(i, slideWidth)) {
              slide.addCell(cell);
            } else {
              slide.updateTarget();
              slide = new Slide(beginMargin, endMargin, this.cellAlign);
              this.slides.push(slide);
              slide.addCell(cell);
            }
          });
          slide.updateTarget();
          this.updateSelectedSlide();
        };
        proto._getCanCellFit = function() {
          let { groupCells } = this.options;
          if (!groupCells) return () => false;
          if (typeof groupCells == "number") {
            let number = parseInt(groupCells, 10);
            return (i) => i % number !== 0;
          }
          let percent = 1;
          let percentMatch = typeof groupCells == "string" && groupCells.match(/^(\d+)%$/);
          if (percentMatch) percent = parseInt(percentMatch[1], 10) / 100;
          let groupWidth = (this.size.innerWidth + 1) * percent;
          return (i, slideWidth) => slideWidth <= groupWidth;
        };
        proto._init = proto.reposition = function() {
          this.positionCells();
          this.positionSliderAtSelected();
        };
        proto.getSize = function() {
          this.size = getSize(this.element);
          this.setCellAlign();
          this.cursorPosition = this.size.innerWidth * this.cellAlign;
        };
        let cellAlignShorthands = {
          left: 0,
          center: 0.5,
          right: 1
        };
        proto.setCellAlign = function() {
          let { cellAlign, rightToLeft } = this.options;
          let shorthand = cellAlignShorthands[cellAlign];
          this.cellAlign = shorthand !== void 0 ? shorthand : cellAlign;
          if (rightToLeft) this.cellAlign = 1 - this.cellAlign;
        };
        proto.setGallerySize = function() {
          if (!this.options.setGallerySize) return;
          let height = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
          this.viewport.style.height = `${height}px`;
        };
        proto._updateWrapShiftCells = function() {
          this.isWrapping = this.getIsWrapping();
          if (!this.isWrapping) return;
          this._unshiftCells(this.beforeShiftCells);
          this._unshiftCells(this.afterShiftCells);
          let beforeGapX = this.cursorPosition;
          let lastIndex = this.cells.length - 1;
          this.beforeShiftCells = this._getGapCells(beforeGapX, lastIndex, -1);
          let afterGapX = this.size.innerWidth - this.cursorPosition;
          this.afterShiftCells = this._getGapCells(afterGapX, 0, 1);
        };
        proto.getIsWrapping = function() {
          let { wrapAround } = this.options;
          if (!wrapAround || this.slides.length < 2) return false;
          if (wrapAround !== "fill") return true;
          let gapWidth = this.slideableWidth - this.size.innerWidth;
          if (gapWidth > this.size.innerWidth) return true;
          for (let cell of this.cells) {
            if (cell.size.outerWidth > gapWidth) return false;
          }
          return true;
        };
        proto._getGapCells = function(gapX, cellIndex, increment) {
          let cells = [];
          while (gapX > 0) {
            let cell = this.cells[cellIndex];
            if (!cell) break;
            cells.push(cell);
            cellIndex += increment;
            gapX -= cell.size.outerWidth;
          }
          return cells;
        };
        proto._containSlides = function() {
          let isContaining = this.options.contain && !this.isWrapping && this.cells.length;
          if (!isContaining) return;
          let contentWidth = this.slideableWidth - this.getLastCell().size[this.endMargin];
          let isContentSmaller = contentWidth < this.size.innerWidth;
          if (isContentSmaller) {
            this.slides.forEach((slide) => {
              slide.target = contentWidth * this.cellAlign;
            });
          } else {
            let beginBound = this.cursorPosition + this.cells[0].size[this.beginMargin];
            let endBound = contentWidth - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach((slide) => {
              slide.target = Math.max(slide.target, beginBound);
              slide.target = Math.min(slide.target, endBound);
            });
          }
        };
        proto.dispatchEvent = function(type, event, args) {
          let emitArgs = event ? [event].concat(args) : args;
          this.emitEvent(type, emitArgs);
          if (jQuery && this.$element) {
            type += this.options.namespaceJQueryEvents ? ".flickity" : "";
            let $event = type;
            if (event) {
              let jQEvent = new jQuery.Event(event);
              jQEvent.type = type;
              $event = jQEvent;
            }
            this.$element.trigger($event, args);
          }
        };
        const unidraggerEvents = [
          "dragStart",
          "dragMove",
          "dragEnd",
          "pointerDown",
          "pointerMove",
          "pointerEnd",
          "staticClick"
        ];
        let _emitEvent = proto.emitEvent;
        proto.emitEvent = function(eventName, args) {
          if (eventName === "staticClick") {
            let clickedCell = this.getParentCell(args[0].target);
            let cellElem = clickedCell && clickedCell.element;
            let cellIndex = clickedCell && this.cells.indexOf(clickedCell);
            args = args.concat(cellElem, cellIndex);
          }
          _emitEvent.call(this, eventName, args);
          let isUnidraggerEvent = unidraggerEvents.includes(eventName);
          if (!isUnidraggerEvent || !jQuery || !this.$element) return;
          eventName += this.options.namespaceJQueryEvents ? ".flickity" : "";
          let event = args.shift(0);
          let jQEvent = new jQuery.Event(event);
          jQEvent.type = eventName;
          this.$element.trigger(jQEvent, args);
        };
        proto.select = function(index, isWrap, isInstant) {
          if (!this.isActive) return;
          index = parseInt(index, 10);
          this._wrapSelect(index);
          if (this.isWrapping || isWrap) {
            index = utils.modulo(index, this.slides.length);
          }
          if (!this.slides[index]) return;
          let prevIndex = this.selectedIndex;
          this.selectedIndex = index;
          this.updateSelectedSlide();
          if (isInstant) {
            this.positionSliderAtSelected();
          } else {
            this.startAnimation();
          }
          if (this.options.adaptiveHeight) {
            this.setGallerySize();
          }
          this.dispatchEvent("select", null, [index]);
          if (index !== prevIndex) {
            this.dispatchEvent("change", null, [index]);
          }
        };
        proto._wrapSelect = function(index) {
          if (!this.isWrapping) return;
          const { selectedIndex, slideableWidth, slides: { length } } = this;
          if (!this.isDragSelect) {
            let wrapIndex = utils.modulo(index, length);
            let delta = Math.abs(wrapIndex - selectedIndex);
            let backWrapDelta = Math.abs(wrapIndex + length - selectedIndex);
            let forewardWrapDelta = Math.abs(wrapIndex - length - selectedIndex);
            if (backWrapDelta < delta) {
              index += length;
            } else if (forewardWrapDelta < delta) {
              index -= length;
            }
          }
          if (index < 0) {
            this.x -= slideableWidth;
          } else if (index >= length) {
            this.x += slideableWidth;
          }
        };
        proto.previous = function(isWrap, isInstant) {
          this.select(this.selectedIndex - 1, isWrap, isInstant);
        };
        proto.next = function(isWrap, isInstant) {
          this.select(this.selectedIndex + 1, isWrap, isInstant);
        };
        proto.updateSelectedSlide = function() {
          let slide = this.slides[this.selectedIndex];
          if (!slide) return;
          this.unselectSelectedSlide();
          this.selectedSlide = slide;
          slide.select();
          this.selectedCells = slide.cells;
          this.selectedElements = slide.getCellElements();
          this.selectedCell = slide.cells[0];
          this.selectedElement = this.selectedElements[0];
        };
        proto.unselectSelectedSlide = function() {
          if (this.selectedSlide) this.selectedSlide.unselect();
        };
        proto.selectInitialIndex = function() {
          let initialIndex = this.options.initialIndex;
          if (this.isInitActivated) {
            this.select(this.selectedIndex, false, true);
            return;
          }
          if (initialIndex && typeof initialIndex == "string") {
            let cell = this.queryCell(initialIndex);
            if (cell) {
              this.selectCell(initialIndex, false, true);
              return;
            }
          }
          let index = 0;
          if (initialIndex && this.slides[initialIndex]) {
            index = initialIndex;
          }
          this.select(index, false, true);
        };
        proto.selectCell = function(value, isWrap, isInstant) {
          let cell = this.queryCell(value);
          if (!cell) return;
          let index = this.getCellSlideIndex(cell);
          this.select(index, isWrap, isInstant);
        };
        proto.getCellSlideIndex = function(cell) {
          let cellSlide = this.slides.find((slide) => slide.cells.includes(cell));
          return this.slides.indexOf(cellSlide);
        };
        proto.getCell = function(elem) {
          for (let cell of this.cells) {
            if (cell.element === elem) return cell;
          }
        };
        proto.getCells = function(elems) {
          elems = utils.makeArray(elems);
          return elems.map((elem) => this.getCell(elem)).filter(Boolean);
        };
        proto.getCellElements = function() {
          return this.cells.map((cell) => cell.element);
        };
        proto.getParentCell = function(elem) {
          let cell = this.getCell(elem);
          if (cell) return cell;
          let closest = elem.closest(".flickity-slider > *");
          return this.getCell(closest);
        };
        proto.getAdjacentCellElements = function(adjCount, index) {
          if (!adjCount) return this.selectedSlide.getCellElements();
          index = index === void 0 ? this.selectedIndex : index;
          let len = this.slides.length;
          if (1 + adjCount * 2 >= len) {
            return this.getCellElements();
          }
          let cellElems = [];
          for (let i = index - adjCount; i <= index + adjCount; i++) {
            let slideIndex = this.isWrapping ? utils.modulo(i, len) : i;
            let slide = this.slides[slideIndex];
            if (slide) {
              cellElems = cellElems.concat(slide.getCellElements());
            }
          }
          return cellElems;
        };
        proto.queryCell = function(selector) {
          if (typeof selector == "number") {
            return this.cells[selector];
          }
          let isSelectorString = typeof selector == "string" && !selector.match(/^[#.]?[\d/]/);
          if (isSelectorString) {
            selector = this.element.querySelector(selector);
          }
          return this.getCell(selector);
        };
        proto.uiChange = function() {
          this.emitEvent("uiChange");
        };
        proto.onresize = function() {
          this.watchCSS();
          this.resize();
        };
        utils.debounceMethod(Flickity, "onresize", 150);
        proto.resize = function() {
          if (!this.isActive || this.isAnimating || this.isDragging) return;
          this.getSize();
          if (this.isWrapping) {
            this.x = utils.modulo(this.x, this.slideableWidth);
          }
          this.positionCells();
          this._updateWrapShiftCells();
          this.setGallerySize();
          this.emitEvent("resize");
          let selectedElement = this.selectedElements && this.selectedElements[0];
          this.selectCell(selectedElement, false, true);
        };
        proto.watchCSS = function() {
          if (!this.options.watchCSS) return;
          let afterContent = getComputedStyle2(this.element, ":after").content;
          if (afterContent.includes("flickity")) {
            this.activate();
          } else {
            this.deactivate();
          }
        };
        proto.onkeydown = function(event) {
          let { activeElement } = document;
          let handler = Flickity.keyboardHandlers[event.key];
          if (!this.options.accessibility || !activeElement || !handler) return;
          let isFocused = this.focusableElems.some((elem) => activeElement === elem);
          if (isFocused) handler.call(this);
        };
        Flickity.keyboardHandlers = {
          ArrowLeft: function() {
            this.uiChange();
            let leftMethod = this.options.rightToLeft ? "next" : "previous";
            this[leftMethod]();
          },
          ArrowRight: function() {
            this.uiChange();
            let rightMethod = this.options.rightToLeft ? "previous" : "next";
            this[rightMethod]();
          }
        };
        proto.focus = function() {
          this.element.focus({ preventScroll: true });
        };
        proto.deactivate = function() {
          if (!this.isActive) return;
          this.element.classList.remove("flickity-enabled");
          this.element.classList.remove("flickity-rtl");
          this.unselectSelectedSlide();
          this.cells.forEach((cell) => cell.destroy());
          this.viewport.remove();
          this.element.append(...this.slider.children);
          if (this.options.accessibility) {
            this.element.removeAttribute("tabIndex");
            this.element.removeEventListener("keydown", this);
          }
          this.isActive = false;
          this.emitEvent("deactivate");
        };
        proto.destroy = function() {
          this.deactivate();
          window2.removeEventListener("resize", this);
          this.allOff();
          this.emitEvent("destroy");
          if (jQuery && this.$element) {
            jQuery.removeData(this.element, "flickity");
          }
          delete this.element.flickityGUID;
          delete instances[this.guid];
        };
        Object.assign(proto, animatePrototype);
        Flickity.data = function(elem) {
          elem = utils.getQueryElement(elem);
          if (elem) return instances[elem.flickityGUID];
        };
        utils.htmlInit(Flickity, "flickity");
        let { jQueryBridget } = window2;
        if (jQuery && jQueryBridget) {
          jQueryBridget("flickity", Flickity, jQuery);
        }
        Flickity.setJQuery = function(jq) {
          jQuery = jq;
        };
        Flickity.Cell = Cell;
        Flickity.Slide = Slide;
        return Flickity;
      }
    );
  }
});

// node_modules/.store/unidragger@3.0.1/node_modules/unidragger/unidragger.js
var require_unidragger = __commonJS({
  "node_modules/.store/unidragger@3.0.1/node_modules/unidragger/unidragger.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(
          window2,
          require_ev_emitter()
        );
      } else {
        window2.Unidragger = factory(
          window2,
          window2.EvEmitter
        );
      }
    })(typeof window != "undefined" ? window : exports, function factory(window2, EvEmitter) {
      function Unidragger() {
      }
      let proto = Unidragger.prototype = Object.create(EvEmitter.prototype);
      proto.handleEvent = function(event) {
        let method = "on" + event.type;
        if (this[method]) {
          this[method](event);
        }
      };
      let startEvent, activeEvents;
      if ("ontouchstart" in window2) {
        startEvent = "touchstart";
        activeEvents = ["touchmove", "touchend", "touchcancel"];
      } else if (window2.PointerEvent) {
        startEvent = "pointerdown";
        activeEvents = ["pointermove", "pointerup", "pointercancel"];
      } else {
        startEvent = "mousedown";
        activeEvents = ["mousemove", "mouseup"];
      }
      proto.touchActionValue = "none";
      proto.bindHandles = function() {
        this._bindHandles("addEventListener", this.touchActionValue);
      };
      proto.unbindHandles = function() {
        this._bindHandles("removeEventListener", "");
      };
      proto._bindHandles = function(bindMethod, touchAction) {
        this.handles.forEach((handle) => {
          handle[bindMethod](startEvent, this);
          handle[bindMethod]("click", this);
          if (window2.PointerEvent) handle.style.touchAction = touchAction;
        });
      };
      proto.bindActivePointerEvents = function() {
        activeEvents.forEach((eventName) => {
          window2.addEventListener(eventName, this);
        });
      };
      proto.unbindActivePointerEvents = function() {
        activeEvents.forEach((eventName) => {
          window2.removeEventListener(eventName, this);
        });
      };
      proto.withPointer = function(methodName, event) {
        if (event.pointerId === this.pointerIdentifier) {
          this[methodName](event, event);
        }
      };
      proto.withTouch = function(methodName, event) {
        let touch;
        for (let changedTouch of event.changedTouches) {
          if (changedTouch.identifier === this.pointerIdentifier) {
            touch = changedTouch;
          }
        }
        if (touch) this[methodName](event, touch);
      };
      proto.onmousedown = function(event) {
        this.pointerDown(event, event);
      };
      proto.ontouchstart = function(event) {
        this.pointerDown(event, event.changedTouches[0]);
      };
      proto.onpointerdown = function(event) {
        this.pointerDown(event, event);
      };
      const cursorNodes = ["TEXTAREA", "INPUT", "SELECT", "OPTION"];
      const clickTypes = ["radio", "checkbox", "button", "submit", "image", "file"];
      proto.pointerDown = function(event, pointer) {
        let isCursorNode = cursorNodes.includes(event.target.nodeName);
        let isClickType = clickTypes.includes(event.target.type);
        let isOkayElement = !isCursorNode || isClickType;
        let isOkay = !this.isPointerDown && !event.button && isOkayElement;
        if (!isOkay) return;
        this.isPointerDown = true;
        this.pointerIdentifier = pointer.pointerId !== void 0 ? (
          // pointerId for pointer events, touch.indentifier for touch events
          pointer.pointerId
        ) : pointer.identifier;
        this.pointerDownPointer = {
          pageX: pointer.pageX,
          pageY: pointer.pageY
        };
        this.bindActivePointerEvents();
        this.emitEvent("pointerDown", [event, pointer]);
      };
      proto.onmousemove = function(event) {
        this.pointerMove(event, event);
      };
      proto.onpointermove = function(event) {
        this.withPointer("pointerMove", event);
      };
      proto.ontouchmove = function(event) {
        this.withTouch("pointerMove", event);
      };
      proto.pointerMove = function(event, pointer) {
        let moveVector = {
          x: pointer.pageX - this.pointerDownPointer.pageX,
          y: pointer.pageY - this.pointerDownPointer.pageY
        };
        this.emitEvent("pointerMove", [event, pointer, moveVector]);
        let isDragStarting = !this.isDragging && this.hasDragStarted(moveVector);
        if (isDragStarting) this.dragStart(event, pointer);
        if (this.isDragging) this.dragMove(event, pointer, moveVector);
      };
      proto.hasDragStarted = function(moveVector) {
        return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
      };
      proto.dragStart = function(event, pointer) {
        this.isDragging = true;
        this.isPreventingClicks = true;
        this.emitEvent("dragStart", [event, pointer]);
      };
      proto.dragMove = function(event, pointer, moveVector) {
        this.emitEvent("dragMove", [event, pointer, moveVector]);
      };
      proto.onmouseup = function(event) {
        this.pointerUp(event, event);
      };
      proto.onpointerup = function(event) {
        this.withPointer("pointerUp", event);
      };
      proto.ontouchend = function(event) {
        this.withTouch("pointerUp", event);
      };
      proto.pointerUp = function(event, pointer) {
        this.pointerDone();
        this.emitEvent("pointerUp", [event, pointer]);
        if (this.isDragging) {
          this.dragEnd(event, pointer);
        } else {
          this.staticClick(event, pointer);
        }
      };
      proto.dragEnd = function(event, pointer) {
        this.isDragging = false;
        setTimeout(() => delete this.isPreventingClicks);
        this.emitEvent("dragEnd", [event, pointer]);
      };
      proto.pointerDone = function() {
        this.isPointerDown = false;
        delete this.pointerIdentifier;
        this.unbindActivePointerEvents();
        this.emitEvent("pointerDone");
      };
      proto.onpointercancel = function(event) {
        this.withPointer("pointerCancel", event);
      };
      proto.ontouchcancel = function(event) {
        this.withTouch("pointerCancel", event);
      };
      proto.pointerCancel = function(event, pointer) {
        this.pointerDone();
        this.emitEvent("pointerCancel", [event, pointer]);
      };
      proto.onclick = function(event) {
        if (this.isPreventingClicks) event.preventDefault();
      };
      proto.staticClick = function(event, pointer) {
        let isMouseup = event.type === "mouseup";
        if (isMouseup && this.isIgnoringMouseUp) return;
        this.emitEvent("staticClick", [event, pointer]);
        if (isMouseup) {
          this.isIgnoringMouseUp = true;
          setTimeout(() => {
            delete this.isIgnoringMouseUp;
          }, 400);
        }
      };
      return Unidragger;
    });
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/drag.js
var require_drag = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/drag.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(
          window2,
          require_core(),
          require_unidragger(),
          require_utils()
        );
      } else {
        window2.Flickity = factory(
          window2,
          window2.Flickity,
          window2.Unidragger,
          window2.fizzyUIUtils
        );
      }
    })(
      typeof window != "undefined" ? window : exports,
      function factory(window2, Flickity, Unidragger, utils) {
        Object.assign(Flickity.defaults, {
          draggable: ">1",
          dragThreshold: 3
        });
        let proto = Flickity.prototype;
        Object.assign(proto, Unidragger.prototype);
        proto.touchActionValue = "";
        Flickity.create.drag = function() {
          this.on("activate", this.onActivateDrag);
          this.on("uiChange", this._uiChangeDrag);
          this.on("deactivate", this.onDeactivateDrag);
          this.on("cellChange", this.updateDraggable);
          this.on("pointerDown", this.handlePointerDown);
          this.on("pointerUp", this.handlePointerUp);
          this.on("pointerDown", this.handlePointerDone);
          this.on("dragStart", this.handleDragStart);
          this.on("dragMove", this.handleDragMove);
          this.on("dragEnd", this.handleDragEnd);
          this.on("staticClick", this.handleStaticClick);
        };
        proto.onActivateDrag = function() {
          this.handles = [this.viewport];
          this.bindHandles();
          this.updateDraggable();
        };
        proto.onDeactivateDrag = function() {
          this.unbindHandles();
          this.element.classList.remove("is-draggable");
        };
        proto.updateDraggable = function() {
          if (this.options.draggable === ">1") {
            this.isDraggable = this.slides.length > 1;
          } else {
            this.isDraggable = this.options.draggable;
          }
          this.element.classList.toggle("is-draggable", this.isDraggable);
        };
        proto._uiChangeDrag = function() {
          delete this.isFreeScrolling;
        };
        proto.handlePointerDown = function(event) {
          if (!this.isDraggable) {
            this.bindActivePointerEvents(event);
            return;
          }
          let isTouchStart = event.type === "touchstart";
          let isTouchPointer = event.pointerType === "touch";
          let isFocusNode = event.target.matches("input, textarea, select");
          if (!isTouchStart && !isTouchPointer && !isFocusNode) event.preventDefault();
          if (!isFocusNode) this.focus();
          if (document.activeElement !== this.element) document.activeElement.blur();
          this.dragX = this.x;
          this.viewport.classList.add("is-pointer-down");
          this.pointerDownScroll = getScrollPosition();
          window2.addEventListener("scroll", this);
          this.bindActivePointerEvents(event);
        };
        proto.hasDragStarted = function(moveVector) {
          return Math.abs(moveVector.x) > this.options.dragThreshold;
        };
        proto.handlePointerUp = function() {
          delete this.isTouchScrolling;
          this.viewport.classList.remove("is-pointer-down");
        };
        proto.handlePointerDone = function() {
          window2.removeEventListener("scroll", this);
          delete this.pointerDownScroll;
        };
        proto.handleDragStart = function() {
          if (!this.isDraggable) return;
          this.dragStartPosition = this.x;
          this.startAnimation();
          window2.removeEventListener("scroll", this);
        };
        proto.handleDragMove = function(event, pointer, moveVector) {
          if (!this.isDraggable) return;
          event.preventDefault();
          this.previousDragX = this.dragX;
          let direction = this.options.rightToLeft ? -1 : 1;
          if (this.isWrapping) moveVector.x %= this.slideableWidth;
          let dragX = this.dragStartPosition + moveVector.x * direction;
          if (!this.isWrapping) {
            let originBound = Math.max(-this.slides[0].target, this.dragStartPosition);
            dragX = dragX > originBound ? (dragX + originBound) * 0.5 : dragX;
            let endBound = Math.min(-this.getLastSlide().target, this.dragStartPosition);
            dragX = dragX < endBound ? (dragX + endBound) * 0.5 : dragX;
          }
          this.dragX = dragX;
          this.dragMoveTime = /* @__PURE__ */ new Date();
        };
        proto.handleDragEnd = function() {
          if (!this.isDraggable) return;
          let { freeScroll } = this.options;
          if (freeScroll) this.isFreeScrolling = true;
          let index = this.dragEndRestingSelect();
          if (freeScroll && !this.isWrapping) {
            let restingX = this.getRestingPosition();
            this.isFreeScrolling = -restingX > this.slides[0].target && -restingX < this.getLastSlide().target;
          } else if (!freeScroll && index === this.selectedIndex) {
            index += this.dragEndBoostSelect();
          }
          delete this.previousDragX;
          this.isDragSelect = this.isWrapping;
          this.select(index);
          delete this.isDragSelect;
        };
        proto.dragEndRestingSelect = function() {
          let restingX = this.getRestingPosition();
          let distance = Math.abs(this.getSlideDistance(-restingX, this.selectedIndex));
          let positiveResting = this._getClosestResting(restingX, distance, 1);
          let negativeResting = this._getClosestResting(restingX, distance, -1);
          return positiveResting.distance < negativeResting.distance ? positiveResting.index : negativeResting.index;
        };
        proto._getClosestResting = function(restingX, distance, increment) {
          let index = this.selectedIndex;
          let minDistance = Infinity;
          let condition = this.options.contain && !this.isWrapping ? (
            // if containing, keep going if distance is equal to minDistance
            (dist, minDist) => dist <= minDist
          ) : (dist, minDist) => dist < minDist;
          while (condition(distance, minDistance)) {
            index += increment;
            minDistance = distance;
            distance = this.getSlideDistance(-restingX, index);
            if (distance === null) break;
            distance = Math.abs(distance);
          }
          return {
            distance: minDistance,
            // selected was previous index
            index: index - increment
          };
        };
        proto.getSlideDistance = function(x, index) {
          let len = this.slides.length;
          let isWrapAround = this.options.wrapAround && len > 1;
          let slideIndex = isWrapAround ? utils.modulo(index, len) : index;
          let slide = this.slides[slideIndex];
          if (!slide) return null;
          let wrap = isWrapAround ? this.slideableWidth * Math.floor(index / len) : 0;
          return x - (slide.target + wrap);
        };
        proto.dragEndBoostSelect = function() {
          if (this.previousDragX === void 0 || !this.dragMoveTime || // or if drag was held for 100 ms
          /* @__PURE__ */ new Date() - this.dragMoveTime > 100) {
            return 0;
          }
          let distance = this.getSlideDistance(-this.dragX, this.selectedIndex);
          let delta = this.previousDragX - this.dragX;
          if (distance > 0 && delta > 0) {
            return 1;
          } else if (distance < 0 && delta < 0) {
            return -1;
          }
          return 0;
        };
        proto.onscroll = function() {
          let scroll = getScrollPosition();
          let scrollMoveX = this.pointerDownScroll.x - scroll.x;
          let scrollMoveY = this.pointerDownScroll.y - scroll.y;
          if (Math.abs(scrollMoveX) > 3 || Math.abs(scrollMoveY) > 3) {
            this.pointerDone();
          }
        };
        function getScrollPosition() {
          return {
            x: window2.pageXOffset,
            y: window2.pageYOffset
          };
        }
        return Flickity;
      }
    );
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/prev-next-button.js
var require_prev_next_button = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/prev-next-button.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(require_core());
      } else {
        factory(window2.Flickity);
      }
    })(typeof window != "undefined" ? window : exports, function factory(Flickity) {
      const svgURI = "http://www.w3.org/2000/svg";
      function PrevNextButton(increment, direction, arrowShape) {
        this.increment = increment;
        this.direction = direction;
        this.isPrevious = increment === "previous";
        this.isLeft = direction === "left";
        this._create(arrowShape);
      }
      PrevNextButton.prototype._create = function(arrowShape) {
        let element = this.element = document.createElement("button");
        element.className = `flickity-button flickity-prev-next-button ${this.increment}`;
        let label = this.isPrevious ? "Previous" : "Next";
        element.setAttribute("type", "button");
        element.setAttribute("aria-label", label);
        this.disable();
        let svg = this.createSVG(label, arrowShape);
        element.append(svg);
      };
      PrevNextButton.prototype.createSVG = function(label, arrowShape) {
        let svg = document.createElementNS(svgURI, "svg");
        svg.setAttribute("class", "flickity-button-icon");
        svg.setAttribute("viewBox", "0 0 100 100");
        let title = document.createElementNS(svgURI, "title");
        title.append(label);
        let path = document.createElementNS(svgURI, "path");
        let pathMovements = getArrowMovements(arrowShape);
        path.setAttribute("d", pathMovements);
        path.setAttribute("class", "arrow");
        if (!this.isLeft) {
          path.setAttribute("transform", "translate(100, 100) rotate(180)");
        }
        svg.append(title, path);
        return svg;
      };
      function getArrowMovements(shape) {
        if (typeof shape == "string") return shape;
        let { x0, x1, x2, x3, y1, y2 } = shape;
        return `M ${x0}, 50
    L ${x1}, ${y1 + 50}
    L ${x2}, ${y2 + 50}
    L ${x3}, 50
    L ${x2}, ${50 - y2}
    L ${x1}, ${50 - y1}
    Z`;
      }
      PrevNextButton.prototype.enable = function() {
        this.element.removeAttribute("disabled");
      };
      PrevNextButton.prototype.disable = function() {
        this.element.setAttribute("disabled", true);
      };
      Object.assign(Flickity.defaults, {
        prevNextButtons: true,
        arrowShape: {
          x0: 10,
          x1: 60,
          y1: 50,
          x2: 70,
          y2: 40,
          x3: 30
        }
      });
      Flickity.create.prevNextButtons = function() {
        if (!this.options.prevNextButtons) return;
        let { rightToLeft, arrowShape } = this.options;
        let prevDirection = rightToLeft ? "right" : "left";
        let nextDirection = rightToLeft ? "left" : "right";
        this.prevButton = new PrevNextButton("previous", prevDirection, arrowShape);
        this.nextButton = new PrevNextButton("next", nextDirection, arrowShape);
        this.focusableElems.push(this.prevButton.element);
        this.focusableElems.push(this.nextButton.element);
        this.handlePrevButtonClick = () => {
          this.uiChange();
          this.previous();
        };
        this.handleNextButtonClick = () => {
          this.uiChange();
          this.next();
        };
        this.on("activate", this.activatePrevNextButtons);
        this.on("select", this.updatePrevNextButtons);
      };
      let proto = Flickity.prototype;
      proto.updatePrevNextButtons = function() {
        let lastIndex = this.slides.length ? this.slides.length - 1 : 0;
        this.updatePrevNextButton(this.prevButton, 0);
        this.updatePrevNextButton(this.nextButton, lastIndex);
      };
      proto.updatePrevNextButton = function(button, disabledIndex) {
        if (this.isWrapping && this.slides.length > 1) {
          button.enable();
          return;
        }
        let isEnabled = this.selectedIndex !== disabledIndex;
        button[isEnabled ? "enable" : "disable"]();
        let isDisabledFocused = !isEnabled && document.activeElement === button.element;
        if (isDisabledFocused) this.focus();
      };
      proto.activatePrevNextButtons = function() {
        this.prevButton.element.addEventListener("click", this.handlePrevButtonClick);
        this.nextButton.element.addEventListener("click", this.handleNextButtonClick);
        this.element.append(this.prevButton.element, this.nextButton.element);
        this.on("deactivate", this.deactivatePrevNextButtons);
      };
      proto.deactivatePrevNextButtons = function() {
        this.prevButton.element.remove();
        this.nextButton.element.remove();
        this.prevButton.element.removeEventListener("click", this.handlePrevButtonClick);
        this.nextButton.element.removeEventListener("click", this.handleNextButtonClick);
        this.off("deactivate", this.deactivatePrevNextButtons);
      };
      Flickity.PrevNextButton = PrevNextButton;
      return Flickity;
    });
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/page-dots.js
var require_page_dots = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/page-dots.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(
          require_core(),
          require_utils()
        );
      } else {
        factory(
          window2.Flickity,
          window2.fizzyUIUtils
        );
      }
    })(typeof window != "undefined" ? window : exports, function factory(Flickity, utils) {
      function PageDots() {
        this.holder = document.createElement("div");
        this.holder.className = "flickity-page-dots";
        this.dots = [];
      }
      PageDots.prototype.setDots = function(slidesLength) {
        let delta = slidesLength - this.dots.length;
        if (delta > 0) {
          this.addDots(delta);
        } else if (delta < 0) {
          this.removeDots(-delta);
        }
      };
      PageDots.prototype.addDots = function(count) {
        let newDots = new Array(count).fill().map((item, i) => {
          let dot = document.createElement("button");
          dot.setAttribute("type", "button");
          let num = i + 1 + this.dots.length;
          dot.className = "flickity-page-dot";
          dot.textContent = `View slide ${num}`;
          return dot;
        });
        this.holder.append(...newDots);
        this.dots = this.dots.concat(newDots);
      };
      PageDots.prototype.removeDots = function(count) {
        let removeDots = this.dots.splice(this.dots.length - count, count);
        removeDots.forEach((dot) => dot.remove());
      };
      PageDots.prototype.updateSelected = function(index) {
        if (this.selectedDot) {
          this.selectedDot.classList.remove("is-selected");
          this.selectedDot.removeAttribute("aria-current");
        }
        if (!this.dots.length) return;
        this.selectedDot = this.dots[index];
        this.selectedDot.classList.add("is-selected");
        this.selectedDot.setAttribute("aria-current", "step");
      };
      Flickity.PageDots = PageDots;
      Object.assign(Flickity.defaults, {
        pageDots: true
      });
      Flickity.create.pageDots = function() {
        if (!this.options.pageDots) return;
        this.pageDots = new PageDots();
        this.handlePageDotsClick = this.onPageDotsClick.bind(this);
        this.on("activate", this.activatePageDots);
        this.on("select", this.updateSelectedPageDots);
        this.on("cellChange", this.updatePageDots);
        this.on("resize", this.updatePageDots);
        this.on("deactivate", this.deactivatePageDots);
      };
      let proto = Flickity.prototype;
      proto.activatePageDots = function() {
        this.pageDots.setDots(this.slides.length);
        this.focusableElems.push(...this.pageDots.dots);
        this.pageDots.holder.addEventListener("click", this.handlePageDotsClick);
        this.element.append(this.pageDots.holder);
      };
      proto.onPageDotsClick = function(event) {
        let index = this.pageDots.dots.indexOf(event.target);
        if (index === -1) return;
        this.uiChange();
        this.select(index);
      };
      proto.updateSelectedPageDots = function() {
        this.pageDots.updateSelected(this.selectedIndex);
      };
      proto.updatePageDots = function() {
        this.pageDots.dots.forEach((dot) => {
          utils.removeFrom(this.focusableElems, dot);
        });
        this.pageDots.setDots(this.slides.length);
        this.focusableElems.push(...this.pageDots.dots);
      };
      proto.deactivatePageDots = function() {
        this.pageDots.holder.remove();
        this.pageDots.holder.removeEventListener("click", this.handlePageDotsClick);
      };
      Flickity.PageDots = PageDots;
      return Flickity;
    });
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/player.js
var require_player = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/player.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(require_core());
      } else {
        factory(window2.Flickity);
      }
    })(typeof window != "undefined" ? window : exports, function factory(Flickity) {
      function Player(autoPlay, onTick) {
        this.autoPlay = autoPlay;
        this.onTick = onTick;
        this.state = "stopped";
        this.onVisibilityChange = this.visibilityChange.bind(this);
        this.onVisibilityPlay = this.visibilityPlay.bind(this);
      }
      Player.prototype.play = function() {
        if (this.state === "playing") return;
        let isPageHidden = document.hidden;
        if (isPageHidden) {
          document.addEventListener("visibilitychange", this.onVisibilityPlay);
          return;
        }
        this.state = "playing";
        document.addEventListener("visibilitychange", this.onVisibilityChange);
        this.tick();
      };
      Player.prototype.tick = function() {
        if (this.state !== "playing") return;
        let time = typeof this.autoPlay == "number" ? this.autoPlay : 3e3;
        this.clear();
        this.timeout = setTimeout(() => {
          this.onTick();
          this.tick();
        }, time);
      };
      Player.prototype.stop = function() {
        this.state = "stopped";
        this.clear();
        document.removeEventListener("visibilitychange", this.onVisibilityChange);
      };
      Player.prototype.clear = function() {
        clearTimeout(this.timeout);
      };
      Player.prototype.pause = function() {
        if (this.state === "playing") {
          this.state = "paused";
          this.clear();
        }
      };
      Player.prototype.unpause = function() {
        if (this.state === "paused") this.play();
      };
      Player.prototype.visibilityChange = function() {
        let isPageHidden = document.hidden;
        this[isPageHidden ? "pause" : "unpause"]();
      };
      Player.prototype.visibilityPlay = function() {
        this.play();
        document.removeEventListener("visibilitychange", this.onVisibilityPlay);
      };
      Object.assign(Flickity.defaults, {
        pauseAutoPlayOnHover: true
      });
      Flickity.create.player = function() {
        this.player = new Player(this.options.autoPlay, () => {
          this.next(true);
        });
        this.on("activate", this.activatePlayer);
        this.on("uiChange", this.stopPlayer);
        this.on("pointerDown", this.stopPlayer);
        this.on("deactivate", this.deactivatePlayer);
      };
      let proto = Flickity.prototype;
      proto.activatePlayer = function() {
        if (!this.options.autoPlay) return;
        this.player.play();
        this.element.addEventListener("mouseenter", this);
      };
      proto.playPlayer = function() {
        this.player.play();
      };
      proto.stopPlayer = function() {
        this.player.stop();
      };
      proto.pausePlayer = function() {
        this.player.pause();
      };
      proto.unpausePlayer = function() {
        this.player.unpause();
      };
      proto.deactivatePlayer = function() {
        this.player.stop();
        this.element.removeEventListener("mouseenter", this);
      };
      proto.onmouseenter = function() {
        if (!this.options.pauseAutoPlayOnHover) return;
        this.player.pause();
        this.element.addEventListener("mouseleave", this);
      };
      proto.onmouseleave = function() {
        this.player.unpause();
        this.element.removeEventListener("mouseleave", this);
      };
      Flickity.Player = Player;
      return Flickity;
    });
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/add-remove-cell.js
var require_add_remove_cell = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/add-remove-cell.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(
          require_core(),
          require_utils()
        );
      } else {
        factory(
          window2.Flickity,
          window2.fizzyUIUtils
        );
      }
    })(typeof window != "undefined" ? window : exports, function factory(Flickity, utils) {
      function getCellsFragment(cells) {
        let fragment = document.createDocumentFragment();
        cells.forEach((cell) => fragment.appendChild(cell.element));
        return fragment;
      }
      let proto = Flickity.prototype;
      proto.insert = function(elems, index) {
        let cells = this._makeCells(elems);
        if (!cells || !cells.length) return;
        let len = this.cells.length;
        index = index === void 0 ? len : index;
        let fragment = getCellsFragment(cells);
        let isAppend = index === len;
        if (isAppend) {
          this.slider.appendChild(fragment);
        } else {
          let insertCellElement = this.cells[index].element;
          this.slider.insertBefore(fragment, insertCellElement);
        }
        if (index === 0) {
          this.cells = cells.concat(this.cells);
        } else if (isAppend) {
          this.cells = this.cells.concat(cells);
        } else {
          let endCells = this.cells.splice(index, len - index);
          this.cells = this.cells.concat(cells).concat(endCells);
        }
        this._sizeCells(cells);
        this.cellChange(index);
        this.positionSliderAtSelected();
      };
      proto.append = function(elems) {
        this.insert(elems, this.cells.length);
      };
      proto.prepend = function(elems) {
        this.insert(elems, 0);
      };
      proto.remove = function(elems) {
        let cells = this.getCells(elems);
        if (!cells || !cells.length) return;
        let minCellIndex = this.cells.length - 1;
        cells.forEach((cell) => {
          cell.remove();
          let index = this.cells.indexOf(cell);
          minCellIndex = Math.min(index, minCellIndex);
          utils.removeFrom(this.cells, cell);
        });
        this.cellChange(minCellIndex);
        this.positionSliderAtSelected();
      };
      proto.cellSizeChange = function(elem) {
        let cell = this.getCell(elem);
        if (!cell) return;
        cell.getSize();
        let index = this.cells.indexOf(cell);
        this.cellChange(index);
      };
      proto.cellChange = function(changedCellIndex) {
        let prevSelectedElem = this.selectedElement;
        this._positionCells(changedCellIndex);
        this._updateWrapShiftCells();
        this.setGallerySize();
        let cell = this.getCell(prevSelectedElem);
        if (cell) this.selectedIndex = this.getCellSlideIndex(cell);
        this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex);
        this.emitEvent("cellChange", [changedCellIndex]);
        this.select(this.selectedIndex);
      };
      return Flickity;
    });
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/lazyload.js
var require_lazyload = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/lazyload.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(
          require_core(),
          require_utils()
        );
      } else {
        factory(
          window2.Flickity,
          window2.fizzyUIUtils
        );
      }
    })(typeof window != "undefined" ? window : exports, function factory(Flickity, utils) {
      const lazyAttr = "data-flickity-lazyload";
      const lazySrcAttr = `${lazyAttr}-src`;
      const lazySrcsetAttr = `${lazyAttr}-srcset`;
      const imgSelector = `img[${lazyAttr}], img[${lazySrcAttr}], img[${lazySrcsetAttr}], source[${lazySrcsetAttr}]`;
      Flickity.create.lazyLoad = function() {
        this.on("select", this.lazyLoad);
        this.handleLazyLoadComplete = this.onLazyLoadComplete.bind(this);
      };
      let proto = Flickity.prototype;
      proto.lazyLoad = function() {
        let { lazyLoad } = this.options;
        if (!lazyLoad) return;
        let adjCount = typeof lazyLoad == "number" ? lazyLoad : 0;
        this.getAdjacentCellElements(adjCount).map(getCellLazyImages).flat().forEach((img) => new LazyLoader(img, this.handleLazyLoadComplete));
      };
      function getCellLazyImages(cellElem) {
        if (cellElem.matches("img")) {
          let cellAttr = cellElem.getAttribute(lazyAttr);
          let cellSrcAttr = cellElem.getAttribute(lazySrcAttr);
          let cellSrcsetAttr = cellElem.getAttribute(lazySrcsetAttr);
          if (cellAttr || cellSrcAttr || cellSrcsetAttr) {
            return cellElem;
          }
        }
        return [...cellElem.querySelectorAll(imgSelector)];
      }
      proto.onLazyLoadComplete = function(img, event) {
        let cell = this.getParentCell(img);
        let cellElem = cell && cell.element;
        this.cellSizeChange(cellElem);
        this.dispatchEvent("lazyLoad", event, cellElem);
      };
      function LazyLoader(img, onComplete) {
        this.img = img;
        this.onComplete = onComplete;
        this.load();
      }
      LazyLoader.prototype.handleEvent = utils.handleEvent;
      LazyLoader.prototype.load = function() {
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        let src = this.img.getAttribute(lazyAttr) || this.img.getAttribute(lazySrcAttr);
        let srcset = this.img.getAttribute(lazySrcsetAttr);
        this.img.src = src;
        if (srcset) this.img.setAttribute("srcset", srcset);
        this.img.removeAttribute(lazyAttr);
        this.img.removeAttribute(lazySrcAttr);
        this.img.removeAttribute(lazySrcsetAttr);
      };
      LazyLoader.prototype.onload = function(event) {
        this.complete(event, "flickity-lazyloaded");
      };
      LazyLoader.prototype.onerror = function(event) {
        this.complete(event, "flickity-lazyerror");
      };
      LazyLoader.prototype.complete = function(event, className) {
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
        let mediaElem = this.img.parentNode.matches("picture") ? this.img.parentNode : this.img;
        mediaElem.classList.add(className);
        this.onComplete(this.img, event);
      };
      Flickity.LazyLoader = LazyLoader;
      return Flickity;
    });
  }
});

// node_modules/.store/imagesloaded@5.0.0/node_modules/imagesloaded/imagesloaded.js
var require_imagesloaded = __commonJS({
  "node_modules/.store/imagesloaded@5.0.0/node_modules/imagesloaded/imagesloaded.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(window2, require_ev_emitter());
      } else {
        window2.imagesLoaded = factory(window2, window2.EvEmitter);
      }
    })(
      typeof window !== "undefined" ? window : exports,
      function factory(window2, EvEmitter) {
        let $ = window2.jQuery;
        let console = window2.console;
        function makeArray(obj) {
          if (Array.isArray(obj)) return obj;
          let isArrayLike = typeof obj == "object" && typeof obj.length == "number";
          if (isArrayLike) return [...obj];
          return [obj];
        }
        function ImagesLoaded(elem, options, onAlways) {
          if (!(this instanceof ImagesLoaded)) {
            return new ImagesLoaded(elem, options, onAlways);
          }
          let queryElem = elem;
          if (typeof elem == "string") {
            queryElem = document.querySelectorAll(elem);
          }
          if (!queryElem) {
            console.error(`Bad element for imagesLoaded ${queryElem || elem}`);
            return;
          }
          this.elements = makeArray(queryElem);
          this.options = {};
          if (typeof options == "function") {
            onAlways = options;
          } else {
            Object.assign(this.options, options);
          }
          if (onAlways) this.on("always", onAlways);
          this.getImages();
          if ($) this.jqDeferred = new $.Deferred();
          setTimeout(this.check.bind(this));
        }
        ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
        ImagesLoaded.prototype.getImages = function() {
          this.images = [];
          this.elements.forEach(this.addElementImages, this);
        };
        const elementNodeTypes = [1, 9, 11];
        ImagesLoaded.prototype.addElementImages = function(elem) {
          if (elem.nodeName === "IMG") {
            this.addImage(elem);
          }
          if (this.options.background === true) {
            this.addElementBackgroundImages(elem);
          }
          let { nodeType } = elem;
          if (!nodeType || !elementNodeTypes.includes(nodeType)) return;
          let childImgs = elem.querySelectorAll("img");
          for (let img of childImgs) {
            this.addImage(img);
          }
          if (typeof this.options.background == "string") {
            let children = elem.querySelectorAll(this.options.background);
            for (let child of children) {
              this.addElementBackgroundImages(child);
            }
          }
        };
        const reURL = /url\((['"])?(.*?)\1\)/gi;
        ImagesLoaded.prototype.addElementBackgroundImages = function(elem) {
          let style = getComputedStyle(elem);
          if (!style) return;
          let matches = reURL.exec(style.backgroundImage);
          while (matches !== null) {
            let url = matches && matches[2];
            if (url) {
              this.addBackground(url, elem);
            }
            matches = reURL.exec(style.backgroundImage);
          }
        };
        ImagesLoaded.prototype.addImage = function(img) {
          let loadingImage = new LoadingImage(img);
          this.images.push(loadingImage);
        };
        ImagesLoaded.prototype.addBackground = function(url, elem) {
          let background = new Background(url, elem);
          this.images.push(background);
        };
        ImagesLoaded.prototype.check = function() {
          this.progressedCount = 0;
          this.hasAnyBroken = false;
          if (!this.images.length) {
            this.complete();
            return;
          }
          let onProgress = (image, elem, message) => {
            setTimeout(() => {
              this.progress(image, elem, message);
            });
          };
          this.images.forEach(function(loadingImage) {
            loadingImage.once("progress", onProgress);
            loadingImage.check();
          });
        };
        ImagesLoaded.prototype.progress = function(image, elem, message) {
          this.progressedCount++;
          this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
          this.emitEvent("progress", [this, image, elem]);
          if (this.jqDeferred && this.jqDeferred.notify) {
            this.jqDeferred.notify(this, image);
          }
          if (this.progressedCount === this.images.length) {
            this.complete();
          }
          if (this.options.debug && console) {
            console.log(`progress: ${message}`, image, elem);
          }
        };
        ImagesLoaded.prototype.complete = function() {
          let eventName = this.hasAnyBroken ? "fail" : "done";
          this.isComplete = true;
          this.emitEvent(eventName, [this]);
          this.emitEvent("always", [this]);
          if (this.jqDeferred) {
            let jqMethod = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[jqMethod](this);
          }
        };
        function LoadingImage(img) {
          this.img = img;
        }
        LoadingImage.prototype = Object.create(EvEmitter.prototype);
        LoadingImage.prototype.check = function() {
          let isComplete = this.getIsImageComplete();
          if (isComplete) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            return;
          }
          this.proxyImage = new Image();
          if (this.img.crossOrigin) {
            this.proxyImage.crossOrigin = this.img.crossOrigin;
          }
          this.proxyImage.addEventListener("load", this);
          this.proxyImage.addEventListener("error", this);
          this.img.addEventListener("load", this);
          this.img.addEventListener("error", this);
          this.proxyImage.src = this.img.currentSrc || this.img.src;
        };
        LoadingImage.prototype.getIsImageComplete = function() {
          return this.img.complete && this.img.naturalWidth;
        };
        LoadingImage.prototype.confirm = function(isLoaded, message) {
          this.isLoaded = isLoaded;
          let { parentNode } = this.img;
          let elem = parentNode.nodeName === "PICTURE" ? parentNode : this.img;
          this.emitEvent("progress", [this, elem, message]);
        };
        LoadingImage.prototype.handleEvent = function(event) {
          let method = "on" + event.type;
          if (this[method]) {
            this[method](event);
          }
        };
        LoadingImage.prototype.onload = function() {
          this.confirm(true, "onload");
          this.unbindEvents();
        };
        LoadingImage.prototype.onerror = function() {
          this.confirm(false, "onerror");
          this.unbindEvents();
        };
        LoadingImage.prototype.unbindEvents = function() {
          this.proxyImage.removeEventListener("load", this);
          this.proxyImage.removeEventListener("error", this);
          this.img.removeEventListener("load", this);
          this.img.removeEventListener("error", this);
        };
        function Background(url, element) {
          this.url = url;
          this.element = element;
          this.img = new Image();
        }
        Background.prototype = Object.create(LoadingImage.prototype);
        Background.prototype.check = function() {
          this.img.addEventListener("load", this);
          this.img.addEventListener("error", this);
          this.img.src = this.url;
          let isComplete = this.getIsImageComplete();
          if (isComplete) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            this.unbindEvents();
          }
        };
        Background.prototype.unbindEvents = function() {
          this.img.removeEventListener("load", this);
          this.img.removeEventListener("error", this);
        };
        Background.prototype.confirm = function(isLoaded, message) {
          this.isLoaded = isLoaded;
          this.emitEvent("progress", [this, this.element, message]);
        };
        ImagesLoaded.makeJQueryPlugin = function(jQuery) {
          jQuery = jQuery || window2.jQuery;
          if (!jQuery) return;
          $ = jQuery;
          $.fn.imagesLoaded = function(options, onAlways) {
            let instance = new ImagesLoaded(this, options, onAlways);
            return instance.jqDeferred.promise($(this));
          };
        };
        ImagesLoaded.makeJQueryPlugin();
        return ImagesLoaded;
      }
    );
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/imagesloaded.js
var require_imagesloaded2 = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/imagesloaded.js"(exports, module) {
    (function(window2, factory) {
      if (typeof module == "object" && module.exports) {
        module.exports = factory(
          require_core(),
          require_imagesloaded()
        );
      } else {
        factory(
          window2.Flickity,
          window2.imagesLoaded
        );
      }
    })(
      typeof window != "undefined" ? window : exports,
      function factory(Flickity, imagesLoaded) {
        Flickity.create.imagesLoaded = function() {
          this.on("activate", this.imagesLoaded);
        };
        Flickity.prototype.imagesLoaded = function() {
          if (!this.options.imagesLoaded) return;
          let onImagesLoadedProgress = (instance, image) => {
            let cell = this.getParentCell(image.img);
            this.cellSizeChange(cell && cell.element);
            if (!this.options.freeScroll) this.positionSliderAtSelected();
          };
          imagesLoaded(this.slider).on("progress", onImagesLoadedProgress);
        };
        return Flickity;
      }
    );
  }
});

// node_modules/.store/flickity@3.0.0/node_modules/flickity/js/index.js
var require_js = __commonJS({
  "node_modules/.store/flickity@3.0.0/node_modules/flickity/js/index.js"(exports, module) {
    if (typeof module == "object" && module.exports) {
      const Flickity = require_core();
      require_drag();
      require_prev_next_button();
      require_page_dots();
      require_player();
      require_add_remove_cell();
      require_lazyload();
      require_imagesloaded2();
      module.exports = Flickity;
    }
  }
});
export default require_js();
/*! Bundled license information:

get-size/get-size.js:
  (*!
   * Infinite Scroll v2.0.4
   * measure size of elements
   * MIT license
   *)

unidragger/unidragger.js:
  (*!
   * Unidragger v3.0.1
   * Draggable base class
   * MIT license
   *)

imagesloaded/imagesloaded.js:
  (*!
   * imagesLoaded v5.0.0
   * JavaScript is all like "You images are done yet or what?"
   * MIT License
   *)

flickity/js/index.js:
  (*!
   * Flickity v3.0.0
   * Touch, responsive, flickable carousels
   *
   * Licensed GPLv3 for open source use
   * or Flickity Commercial License for commercial use
   *
   * https://flickity.metafizzy.co
   * Copyright 2015-2022 Metafizzy
   *)
*/
//# sourceMappingURL=flickity.js.map
