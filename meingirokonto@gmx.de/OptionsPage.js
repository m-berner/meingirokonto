import { k as keys, g as genericComponent, p as propsFactory, a as provideTheme, u as useRtl, b as useLocale, c as useGroup, r as ref, d as computed, s as shallowRef, w as watch, e as useRender, f as withDirectives, h as resolveDirective, i as createVNode, m as makeThemeProps, j as makeTagProps, l as makeComponentProps, V as VBtn, n as provide, o as inject, q as useGroupItem, t as useSsrBoot, v as useLazy, M as MaybeTransition, x as makeLazyProps, y as makeGroupItemProps, z as nextTick, A as convertToUnit, B as vShow, C as useTextColor, D as mergeProps, E as forwardRefs, F as omit, G as makeVBtnProps, H as animate, I as standardEasing, J as Fragment, K as useProxiedModel, L as useDensity, N as useBackgroundColor, O as toRef, P as useScopeId, Q as provideDefaults, R as VSlideGroup, S as makeDensityProps, T as makeVSlideGroupProps, U as isObject, W as defineComponent, X as useSettingsStore, Y as createBlock, Z as openBlock, _ as VCard, $ as withCtx, a0 as VList, a1 as createElementBlock, a2 as renderList, a3 as VCardActions, a4 as VTextField, a5 as toRaw, a6 as VListItem, a7 as useI18n, a8 as storeToRefs, a9 as useTheme, aa as reactive, ab as onMounted, ac as VContainer, ad as VRow, ae as VCol, af as VRadioGroup, ag as unref, ah as createBaseVNode, ai as toDisplayString, aj as createTextVNode, ak as VRadio, al as VCheckbox, am as isRef } from "./app.js";
import { u as useApp } from "./useApp.js";
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  wrapper.start?.({
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  wrapper.end?.({
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  wrapper.move?.({
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  const value = binding.value;
  const target = value?.parent ? el.parentElement : el;
  const options = value?.options ?? {
    passive: true
  };
  const uid = binding.instance?.$.uid;
  if (!target || !uid) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  const target = binding.value?.parent ? el.parentElement : el;
  const uid = binding.instance?.$.uid;
  if (!target?._touchHandlers || !uid) return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": ["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover"
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => [createVNode("div", {
        "class": "v-window__container",
        "style": {
          height: transitionHeight.value
        }
      }, [slots.default?.({
        group
      }), props.showArrows !== false && createVNode("div", {
        "class": "v-window__controls"
      }, [arrows.value])]), slots.additional?.({
        group
      })]
    }), [[resolveDirective("touch"), touchOptions.value]]));
    return {
      group
    };
  }
});
const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    Touch
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      if (isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        window.transitionHeight.value = convertToUnit(window.rootRef.value?.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => [withDirectives(createVNode("div", {
        "class": ["v-window-item", groupItem.selectedClass.value, props.class],
        "style": props.style
      }, [hasContent.value && slots.default?.()]), [[vShow, groupItem.isSelected.value]])]
    }));
    return {
      groupItem
    };
  }
});
const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const makeVTabProps = propsFactory({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...omit(makeVBtnProps({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab");
const VTab = genericComponent()({
  name: "VTab",
  props: makeVTabProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(props, "sliderColor");
    const rootEl = ref();
    const sliderEl = ref();
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = computed(() => rootEl.value?.group?.isSelected.value ?? false);
    function updateSlider(_ref2) {
      let {
        value
      } = _ref2;
      if (value) {
        const prevEl = rootEl.value?.$el.parentElement?.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl) return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? "x" : "y";
        const XY = isHorizontal.value ? "X" : "Y";
        const rightBottom = isHorizontal.value ? "right" : "bottom";
        const widthHeight = isHorizontal.value ? "width" : "height";
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta) < 0 ? isHorizontal.value ? "left" : "top" : "center";
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, "currentcolor"],
          transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, "none"],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const btnProps = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab", props.class],
        "style": props.style,
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false
      }, btnProps, attrs, {
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : void 0,
        "onGroup:selected": updateSlider
      }), {
        ...slots,
        default: () => createVNode(Fragment, null, [slots.default?.() ?? props.text, !props.hideSlider && createVNode("div", {
          "ref": sliderEl,
          "class": ["v-tab__slider", sliderColorClasses.value],
          "style": sliderColorStyles.value
        }, null)])
      });
    });
    return forwardRefs({}, rootEl);
  }
});
const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow");
const VTabsWindow = genericComponent()({
  name: "VTabsWindow",
  props: makeVTabsWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject(VTabsSymbol, null);
    const _model = useProxiedModel(props, "modelValue");
    const model = computed({
      get() {
        if (_model.value != null || !group) return _model.value;
        return group.items.value.find((item) => group.selected.value.includes(item.id))?.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "_as": "VTabsWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs-window", props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});
const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, "VTabsWindowItem");
const VTabsWindowItem = genericComponent()({
  name: "VTabsWindowItem",
  props: makeVTabsWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VTabsWindowItem"
      }, windowItemProps, {
        "class": ["v-tabs-window-item", props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});
function parseItems(items) {
  if (!items) return [];
  return items.map((item) => {
    if (!isObject(item)) return {
      text: item,
      value: item
    };
    return item;
  });
}
const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...makeVSlideGroupProps({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VTabs");
const VTabs = genericComponent()({
  name: "VTabs",
  props: makeVTabsProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const items = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      scopeId
    } = useScopeId();
    provideDefaults({
      VTab: {
        color: toRef(props, "color"),
        direction: toRef(props, "direction"),
        stacked: toRef(props, "stacked"),
        fixed: toRef(props, "fixedTabs"),
        sliderColor: toRef(props, "sliderColor"),
        hideSlider: toRef(props, "hideSlider")
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      const hasWindow = !!(slots.window || props.items.length > 0);
      return createVNode(Fragment, null, [createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          "v-tabs--fixed-tabs": props.fixedTabs,
          "v-tabs--grow": props.grow,
          "v-tabs--stacked": props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          "--v-tabs-height": convertToUnit(props.height)
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }, scopeId, attrs), {
        default: () => [slots.default?.() ?? items.value.map((item) => slots.tab?.({
          item
        }) ?? createVNode(VTab, mergeProps(item, {
          "key": item.text,
          "value": item.value
        }), {
          default: slots[`tab.${item.value}`] ? () => slots[`tab.${item.value}`]?.({
            item
          }) : void 0
        }))]
      }), hasWindow && createVNode(VTabsWindow, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "key": "tabs-window"
      }, scopeId), {
        default: () => [items.value.map((item) => slots.item?.({
          item
        }) ?? createVNode(VTabsWindowItem, {
          "value": item.value
        }, {
          default: () => slots[`item.${item.value}`]?.({
            item
          })
        })), slots.window?.()]
      })]);
    });
    return {};
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DynamicList",
  props: {
    _title: {},
    _list: {},
    _label: {},
    _store: {},
    _hint: {},
    _counter: {},
    _placeholder: {},
    _toUpperCase: { type: Boolean }
  },
  setup(__props) {
    const { CONS } = useApp();
    const settings = useSettingsStore();
    const _props = __props;
    const state = { ..._props, _newItem: "" };
    const mAddItem = async (item) => {
      console.log("DYNAMICLIST: mAddItem");
      if (!state._list.includes(item)) {
        if (state._toUpperCase) {
          state._list.push(item.toUpperCase());
        } else {
          state._list.push(item);
        }
      }
      if (state._store === CONS.SETTINGS.EX) {
        await settings.setExchanges(toRaw(state._list));
        await browser.storage.local.set({ exchanges: toRaw(state._list) });
      } else if (state._store === CONS.SETTINGS.MP) {
        await settings.setMarkets(toRaw(state._list));
        await browser.storage.local.set({ markets: toRaw(state._list) });
      }
      state._newItem = "";
    };
    const mRemoveItem = async (n) => {
      console.log("DYNAMICLIST: mRemoveItem");
      if (n > 0) {
        if (state._store === CONS.SETTINGS.EX) {
          state._list.splice(n, 1);
          await settings.setExchanges(toRaw(state._list));
          await browser.storage.local.set({ exchanges: toRaw(state._list) });
        } else if (state._store === CONS.SETTINGS.MP) {
          state._list.splice(n, 1);
          await settings.setMarkets(toRaw(state._list));
          await browser.storage.local.set({ markets: toRaw(state._list) });
        }
      }
    };
    console.log("--- DynamicList.vue setup ---");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(VCard, {
        title: state._title
      }, {
        default: withCtx(() => [
          createVNode(VList, {
            modelValue: state._list,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state._list = $event)
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(state._list, (item, i) => {
                return openBlock(), createBlock(VListItem, {
                  key: JSON.stringify(item),
                  "hide-details": "",
                  title: item
                }, {
                  prepend: withCtx(() => [
                    createVNode(VBtn, {
                      class: "mr-3",
                      icon: "$close",
                      onClick: ($event) => mRemoveItem(i)
                    }, null, 8, ["onClick"])
                  ]),
                  _: 2
                }, 1032, ["title"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode(VCardActions, null, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: state._newItem,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => state._newItem = $event),
                type: "text",
                autofocus: true,
                clearable: true,
                label: state._label,
                placeholder: state._placeholder
              }, {
                append: withCtx(() => [
                  createVNode(VBtn, {
                    class: "ml-3",
                    icon: "$add",
                    onClick: _cache[1] || (_cache[1] = ($event) => mAddItem(state._newItem))
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "label", "placeholder"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["title"]);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OptionsPage",
  setup(__props) {
    const { t, tm } = useI18n();
    const { CONS } = useApp();
    const { group } = useApp();
    const settings = useSettingsStore();
    const { _indexes, _materials } = storeToRefs(settings);
    const theme = useTheme();
    const state = reactive({
      _tab: 0,
      _tabs_length: 0,
      _theme_keys: [],
      _service_keys: [],
      _index_keys: [],
      _material_keys: []
    });
    const service = (i) => {
      return {
        name: state._service_keys[i - 1],
        url: CONS.SERVICES[state._service_keys[i - 1]].HOME
      };
    };
    onMounted(() => {
      console.log("OPTIONSPAGE: onMounted");
      const labelsOptionsPage = tm("optionsPage");
      const serviceKeys = Object.keys(CONS.SERVICES);
      serviceKeys.pop();
      serviceKeys.pop();
      state._tab = 1;
      state._tabs_length = labelsOptionsPage.tabs.length;
      state._theme_keys = Object.keys(toRaw(theme.themes.value));
      state._service_keys = serviceKeys;
      state._index_keys = Object.keys(CONS.SETTINGS.INDEXES);
      state._material_keys = Object.keys(toRaw(labelsOptionsPage.materials));
    });
    console.log("--- OptionsPage.vue setup ---");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(VContainer, null, {
        default: withCtx(() => [
          createVNode(VTabs, {
            modelValue: state._tab,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state._tab = $event),
            "show-arrows": ""
          }, {
            default: withCtx(() => [
              createVNode(VRow, {
                class: "pa-2",
                justify: "space-between"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(state._tabs_length, (i) => {
                    return openBlock(), createBlock(VTab, {
                      key: i,
                      value: i
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)(`optionsPage.tabs[${i - 1}].title`)), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode(VWindow, {
            modelValue: state._tab,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => state._tab = $event),
            class: "pa-5"
          }, {
            default: withCtx(() => [
              createVNode(VWindowItem, { value: 1 }, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VRadioGroup, {
                            modelValue: unref(settings).skin,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(settings).skin = $event),
                            column: ""
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("h2", null, toDisplayString(unref(t)("optionsPage.capitals.skins")), 1),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(state._theme_keys.length, (i) => {
                                return openBlock(), createBlock(VRadio, {
                                  key: i,
                                  label: unref(t)(`optionsPage.themeNames.${state._theme_keys[i - 1]}`),
                                  value: state._theme_keys[i - 1],
                                  onClick: ($event) => unref(settings).setSkin(state._theme_keys[i - 1], unref(theme))
                                }, null, 8, ["label", "value", "onClick"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VRadioGroup, {
                            modelValue: unref(settings).service.name,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(settings).service.name = $event),
                            column: ""
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("h2", null, toDisplayString(unref(t)("optionsPage.capitals.services")), 1),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(state._service_keys.length, (i) => {
                                return openBlock(), createBlock(VRadio, {
                                  key: i,
                                  label: unref(CONS).SERVICES[state._service_keys[i - 1]].NAME,
                                  value: state._service_keys[i - 1],
                                  onClick: ($event) => unref(settings).setService(service(i))
                                }, null, 8, ["label", "value", "onClick"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VWindowItem, { value: 2 }, {
                default: withCtx(() => [
                  createVNode(VRow, {
                    class: "pa-10",
                    justify: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        md: "10",
                        sm: "10"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$1, {
                            _label: unref(t)("optionsPage.markets.label"),
                            _list: unref(settings).markets,
                            _store: unref(CONS).SETTINGS.MP,
                            _title: unref(t)("optionsPage.markets.title")
                          }, null, 8, ["_label", "_list", "_store", "_title"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VWindowItem, { value: 3 }, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(group)(state._index_keys.length)[0], (i) => {
                            return openBlock(), createBlock(VCheckbox, {
                              key: i,
                              modelValue: unref(_indexes),
                              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(_indexes) ? _indexes.value = $event : null),
                              "hide-details": "",
                              label: unref(CONS).SETTINGS.INDEXES[state._index_keys[i - 1]],
                              value: state._index_keys[i - 1],
                              onClick: ($event) => unref(settings).toggleIndexes(state._index_keys, i - 1)
                            }, null, 8, ["modelValue", "label", "value", "onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(group)(state._index_keys.length)[1], (i) => {
                            return openBlock(), createBlock(VCheckbox, {
                              key: i,
                              modelValue: unref(_indexes),
                              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(_indexes) ? _indexes.value = $event : null),
                              "hide-details": "",
                              label: unref(CONS).SETTINGS.INDEXES[state._index_keys[i - 1 + unref(group)(state._index_keys.length)[1]]],
                              value: state._index_keys[i - 1 + unref(group)(state._index_keys.length)[1]],
                              onClick: ($event) => unref(settings).toggleIndexes(state._index_keys, i - 1 + unref(group)(state._index_keys.length)[1])
                            }, null, 8, ["modelValue", "label", "value", "onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VWindowItem, { value: 4 }, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(group)(state._material_keys.length)[0], (i) => {
                            return openBlock(), createBlock(VCheckbox, {
                              key: i,
                              modelValue: unref(_materials),
                              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => isRef(_materials) ? _materials.value = $event : null),
                              "hide-details": "",
                              label: unref(t)(`optionsPage.materials.${state._material_keys[i - 1]}`),
                              value: state._material_keys[i - 1],
                              onClick: ($event) => unref(settings).toggleMaterials(state._material_keys, i - 1)
                            }, null, 8, ["modelValue", "label", "value", "onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(group)(state._material_keys.length)[1], (i) => {
                            return openBlock(), createBlock(VCheckbox, {
                              key: i,
                              modelValue: unref(_materials),
                              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => isRef(_materials) ? _materials.value = $event : null),
                              "hide-details": "",
                              label: unref(t)(
                                `optionsPage.materials.${state._material_keys[i - 1 + unref(group)(state._material_keys.length)[0]]}`
                              ),
                              value: state._material_keys[i - 1 + unref(group)(state._material_keys.length)[0]],
                              onClick: ($event) => unref(settings).toggleMaterials(
                                state._material_keys,
                                i - 1 + unref(group)(state._material_keys.length)[0]
                              )
                            }, null, 8, ["modelValue", "label", "value", "onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VWindowItem, { value: 5 }, {
                default: withCtx(() => [
                  createVNode(VRow, {
                    class: "pa-12",
                    justify: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        md: "10",
                        sm: "10"
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$1, {
                            _label: unref(t)("optionsPage.exchanges.label"),
                            _list: unref(settings).exchanges,
                            _placeholder: unref(CONS).DEFAULTS.STORAGE.exchanges[0],
                            _store: unref(CONS).SETTINGS.EX,
                            _title: unref(t)("optionsPage.exchanges.title"),
                            _toUpperCase: true
                          }, null, 8, ["_label", "_list", "_placeholder", "_store", "_title"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
