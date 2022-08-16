'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('shallowequal');
var stylis = require('stylis');
var unitless = require('@emotion/unitless');
var transformDeclPairs = require('css-to-react-native');
var postcss = require('postcss');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var unitless__default = /*#__PURE__*/_interopDefaultLegacy(unitless);
var transformDeclPairs__default = /*#__PURE__*/_interopDefaultLegacy(transformDeclPairs);

const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

var errorMap = {
    '1': 'Cannot create styled-component for component: %s.\n\n',
    '2': "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
    '3': 'Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n',
    '4': 'The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n',
    '5': 'The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n',
    '6': "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
    '7': 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',
    '8': 'ThemeProvider: Please make your "theme" prop an object.\n\n',
    '9': 'Missing document `<head>`\n\n',
    '10': 'Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n',
    '11': '_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n',
    '12': 'It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n',
    '13': '%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n',
    '14': 'ThemeProvider: "theme" prop is required.\n\n',
    '15': "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",
    '16': "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",
    '17': "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n",
};

const ERRORS = process.env.NODE_ENV !== 'production' ? errorMap : {};
/**
 * super basic version of sprintf
 */
function format(...args) {
    let a = args[0];
    const b = [];
    for (let c = 1, len = args.length; c < len; c += 1) {
        b.push(args[c]);
    }
    b.forEach(d => {
        a = a.replace(/%[a-z]/, d);
    });
    return a;
}
/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 */
function throwStyledComponentsError(code, ...interpolations) {
    if (process.env.NODE_ENV === 'production') {
        return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${code} for more information.${interpolations.length > 0 ? ` Args: ${interpolations.join(', ')}` : ''}`);
    }
    else {
        return new Error(format(ERRORS[code], ...interpolations).trim());
    }
}

const SC_ATTR = (typeof process !== 'undefined' && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR)) ||
    'data-styled';
const SC_ATTR_ACTIVE = 'active';
const SC_ATTR_VERSION = 'data-styled-version';
const SC_VERSION = "6.0.0-alpha.8";
const SPLITTER = '/*!sc*/\n';
const IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;
const DISABLE_SPEEDY = Boolean(typeof SC_DISABLE_SPEEDY === 'boolean'
    ? SC_DISABLE_SPEEDY
    : typeof process !== 'undefined' &&
        typeof process.env.REACT_APP_SC_DISABLE_SPEEDY !== 'undefined' &&
        process.env.REACT_APP_SC_DISABLE_SPEEDY !== ''
        ? process.env.REACT_APP_SC_DISABLE_SPEEDY === 'false'
            ? false
            : process.env.REACT_APP_SC_DISABLE_SPEEDY
        : typeof process !== 'undefined' &&
            typeof process.env.SC_DISABLE_SPEEDY !== 'undefined' &&
            process.env.SC_DISABLE_SPEEDY !== ''
            ? process.env.SC_DISABLE_SPEEDY === 'false'
                ? false
                : process.env.SC_DISABLE_SPEEDY
            : process.env.NODE_ENV !== 'production');

/** Create a GroupedTag with an underlying Tag implementation */
const makeGroupedTag = (tag) => {
    return new DefaultGroupedTag(tag);
};
const BASE_SIZE = 1 << 9;
const DefaultGroupedTag = class DefaultGroupedTag {
    groupSizes;
    length;
    tag;
    constructor(tag) {
        this.groupSizes = new Uint32Array(BASE_SIZE);
        this.length = BASE_SIZE;
        this.tag = tag;
    }
    indexOfGroup(group) {
        let index = 0;
        for (let i = 0; i < group; i++) {
            index += this.groupSizes[i];
        }
        return index;
    }
    insertRules(group, rules) {
        if (group >= this.groupSizes.length) {
            const oldBuffer = this.groupSizes;
            const oldSize = oldBuffer.length;
            let newSize = oldSize;
            while (group >= newSize) {
                newSize <<= 1;
                if (newSize < 0) {
                    throw throwStyledComponentsError(16, `${group}`);
                }
            }
            this.groupSizes = new Uint32Array(newSize);
            this.groupSizes.set(oldBuffer);
            this.length = newSize;
            for (let i = oldSize; i < newSize; i++) {
                this.groupSizes[i] = 0;
            }
        }
        let ruleIndex = this.indexOfGroup(group + 1);
        if (Array.isArray(rules)) {
            for (let i = 0, l = rules.length; i < l; i++) {
                if (this.tag.insertRule(ruleIndex, rules[i])) {
                    this.groupSizes[group]++;
                    ruleIndex++;
                }
            }
        }
        else {
            if (this.tag.insertRule(ruleIndex, rules)) {
                this.groupSizes[group]++;
            }
        }
    }
    clearGroup(group) {
        if (group < this.length) {
            const length = this.groupSizes[group];
            const startIndex = this.indexOfGroup(group);
            const endIndex = startIndex + length;
            this.groupSizes[group] = 0;
            for (let i = startIndex; i < endIndex; i++) {
                this.tag.deleteRule(startIndex);
            }
        }
    }
    getGroup(group) {
        let css = '';
        if (group >= this.length || this.groupSizes[group] === 0) {
            return css;
        }
        const length = this.groupSizes[group];
        const startIndex = this.indexOfGroup(group);
        const endIndex = startIndex + length;
        for (let i = startIndex; i < endIndex; i++) {
            css += `${this.tag.getRule(i)}${SPLITTER}`;
        }
        return css;
    }
};

const MAX_SMI = 1 << (31 - 1);
let groupIDRegister = new Map();
let reverseRegister = new Map();
let nextFreeGroup = 1;
const getGroupForId = (id) => {
    if (groupIDRegister.has(id)) {
        return groupIDRegister.get(id);
    }
    while (reverseRegister.has(nextFreeGroup)) {
        nextFreeGroup++;
    }
    const group = nextFreeGroup++;
    if (process.env.NODE_ENV !== 'production' && ((group | 0) < 0 || group > MAX_SMI)) {
        throw throwStyledComponentsError(16, `${group}`);
    }
    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
    return group;
};
const getIdForGroup = (group) => {
    return reverseRegister.get(group);
};
const setGroupForId = (id, group) => {
    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
};

const SELECTOR = `style[${SC_ATTR}][${SC_ATTR_VERSION}="${SC_VERSION}"]`;
const MARKER_RE = new RegExp(`^${SC_ATTR}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`);
const outputSheet = (sheet) => {
    const tag = sheet.getTag();
    const { length } = tag;
    let css = '';
    for (let group = 0; group < length; group++) {
        const id = getIdForGroup(group);
        if (id === undefined)
            continue;
        const names = sheet.names.get(id);
        const rules = tag.getGroup(group);
        if (names === undefined || rules.length === 0)
            continue;
        const selector = `${SC_ATTR}.g${group}[id="${id}"]`;
        let content = '';
        if (names !== undefined) {
            names.forEach(name => {
                if (name.length > 0) {
                    content += `${name},`;
                }
            });
        }
        // NOTE: It's easier to collect rules and have the marker
        // after the actual rules to simplify the rehydration
        css += `${rules}${selector}{content:"${content}"}${SPLITTER}`;
    }
    return css;
};
const rehydrateNamesFromContent = (sheet, id, content) => {
    const names = content.split(',');
    let name;
    for (let i = 0, l = names.length; i < l; i++) {
        // eslint-disable-next-line
        if ((name = names[i])) {
            sheet.registerName(id, name);
        }
    }
};
const rehydrateSheetFromTag = (sheet, style) => {
    const parts = (style.textContent ?? '').split(SPLITTER);
    const rules = [];
    for (let i = 0, l = parts.length; i < l; i++) {
        const part = parts[i].trim();
        if (!part)
            continue;
        const marker = part.match(MARKER_RE);
        if (marker) {
            const group = parseInt(marker[1], 10) | 0;
            const id = marker[2];
            if (group !== 0) {
                // Rehydrate componentId to group index mapping
                setGroupForId(id, group);
                // Rehydrate names and rules
                // looks like: data-styled.g11[id="idA"]{content:"nameA,"}
                rehydrateNamesFromContent(sheet, id, marker[3]);
                sheet.getTag().insertRules(group, rules);
            }
            rules.length = 0;
        }
        else {
            rules.push(part);
        }
    }
};
const rehydrateSheet = (sheet) => {
    const nodes = document.querySelectorAll(SELECTOR);
    for (let i = 0, l = nodes.length; i < l; i++) {
        const node = nodes[i];
        if (node && node.getAttribute(SC_ATTR) !== SC_ATTR_ACTIVE) {
            rehydrateSheetFromTag(sheet, node);
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }
};

function getNonce() {
    return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
}

const ELEMENT_TYPE = 1;
/* Node.ELEMENT_TYPE */
/** Find last style element if any inside target */
const findLastStyleTag = (target) => {
    const { childNodes } = target;
    for (let i = childNodes.length; i >= 0; i--) {
        const child = childNodes[i];
        if (child && child.nodeType === ELEMENT_TYPE && child.hasAttribute(SC_ATTR)) {
            return child;
        }
    }
    return undefined;
};
/** Create a style element inside `target` or <head> after the last */
const makeStyleTag = (target) => {
    const head = document.head;
    const parent = target || head;
    const style = document.createElement('style');
    const prevStyle = findLastStyleTag(parent);
    const nextSibling = prevStyle !== undefined ? prevStyle.nextSibling : null;
    style.setAttribute(SC_ATTR, SC_ATTR_ACTIVE);
    style.setAttribute(SC_ATTR_VERSION, SC_VERSION);
    const nonce = getNonce();
    if (nonce)
        style.setAttribute('nonce', nonce);
    parent.insertBefore(style, nextSibling);
    return style;
};
/** Get the CSSStyleSheet instance for a given style element */
const getSheet = (tag) => {
    if (tag.sheet) {
        return tag.sheet;
    }
    // Avoid Firefox quirk where the style element might not have a sheet property
    const { styleSheets } = document;
    for (let i = 0, l = styleSheets.length; i < l; i++) {
        const sheet = styleSheets[i];
        if (sheet.ownerNode === tag) {
            return sheet;
        }
    }
    throw throwStyledComponentsError(17);
};

/** Create a CSSStyleSheet-like tag depending on the environment */
const makeTag = ({ isServer, useCSSOMInjection, target }) => {
    if (isServer) {
        return new VirtualTag(target);
    }
    else if (useCSSOMInjection) {
        return new CSSOMTag(target);
    }
    else {
        return new TextTag(target);
    }
};
const CSSOMTag = class CSSOMTag {
    element;
    sheet;
    length;
    constructor(target) {
        const element = (this.element = makeStyleTag(target));
        // Avoid Edge bug where empty style elements don't create sheets
        element.appendChild(document.createTextNode(''));
        this.sheet = getSheet(element);
        this.length = 0;
    }
    insertRule(index, rule) {
        try {
            this.sheet.insertRule(rule, index);
            this.length++;
            return true;
        }
        catch (_error) {
            return false;
        }
    }
    deleteRule(index) {
        this.sheet.deleteRule(index);
        this.length--;
    }
    getRule(index) {
        const rule = this.sheet.cssRules[index];
        // Avoid IE11 quirk where cssText is inaccessible on some invalid rules
        if (rule !== undefined && typeof rule.cssText === 'string') {
            return rule.cssText;
        }
        else {
            return '';
        }
    }
};
/** A Tag that emulates the CSSStyleSheet API but uses text nodes */
const TextTag = class TextTag {
    element;
    nodes;
    length;
    constructor(target) {
        const element = (this.element = makeStyleTag(target));
        this.nodes = element.childNodes;
        this.length = 0;
    }
    insertRule(index, rule) {
        if (index <= this.length && index >= 0) {
            const node = document.createTextNode(rule);
            const refNode = this.nodes[index];
            this.element.insertBefore(node, refNode || null);
            this.length++;
            return true;
        }
        else {
            return false;
        }
    }
    deleteRule(index) {
        this.element.removeChild(this.nodes[index]);
        this.length--;
    }
    getRule(index) {
        if (index < this.length) {
            return this.nodes[index].textContent;
        }
        else {
            return '';
        }
    }
};
/** A completely virtual (server-side) Tag that doesn't manipulate the DOM */
const VirtualTag = class VirtualTag {
    rules;
    length;
    constructor(_target) {
        this.rules = [];
        this.length = 0;
    }
    insertRule(index, rule) {
        if (index <= this.length) {
            this.rules.splice(index, 0, rule);
            this.length++;
            return true;
        }
        else {
            return false;
        }
    }
    deleteRule(index) {
        this.rules.splice(index, 1);
        this.length--;
    }
    getRule(index) {
        if (index < this.length) {
            return this.rules[index];
        }
        else {
            return '';
        }
    }
};

let SHOULD_REHYDRATE = IS_BROWSER;
const defaultOptions = {
    isServer: !IS_BROWSER,
    useCSSOMInjection: !DISABLE_SPEEDY,
};
/** Contains the main stylesheet logic for stringification and caching */
class StyleSheet {
    gs;
    names;
    options;
    server;
    tag;
    /** Register a group ID to give it an index */
    static registerId(id) {
        return getGroupForId(id);
    }
    constructor(options = EMPTY_OBJECT, globalStyles = {}, names) {
        this.options = {
            ...defaultOptions,
            ...options,
        };
        this.gs = globalStyles;
        this.names = new Map(names);
        this.server = !!options.isServer;
        // We rehydrate only once and use the sheet that is created first
        if (!this.server && IS_BROWSER && SHOULD_REHYDRATE) {
            SHOULD_REHYDRATE = false;
            rehydrateSheet(this);
        }
    }
    reconstructWithOptions(options, withNames = true) {
        return new StyleSheet({ ...this.options, ...options }, this.gs, (withNames && this.names) || undefined);
    }
    allocateGSInstance(id) {
        return (this.gs[id] = (this.gs[id] || 0) + 1);
    }
    /** Lazily initialises a GroupedTag for when it's actually needed */
    getTag() {
        return this.tag || (this.tag = makeGroupedTag(makeTag(this.options)));
    }
    /** Check whether a name is known for caching */
    hasNameForId(id, name) {
        return this.names.has(id) && this.names.get(id).has(name);
    }
    /** Mark a group's name as known for caching */
    registerName(id, name) {
        getGroupForId(id);
        if (!this.names.has(id)) {
            const groupNames = new Set();
            groupNames.add(name);
            this.names.set(id, groupNames);
        }
        else {
            this.names.get(id).add(name);
        }
    }
    /** Insert new rules which also marks the name as known */
    insertRules(id, name, rules) {
        this.registerName(id, name);
        this.getTag().insertRules(getGroupForId(id), rules);
    }
    /** Clears all cached names for a given group ID */
    clearNames(id) {
        if (this.names.has(id)) {
            this.names.get(id).clear();
        }
    }
    /** Clears all rules for a given group ID */
    clearRules(id) {
        this.getTag().clearGroup(getGroupForId(id));
        this.clearNames(id);
    }
    /** Clears the entire tag which deletes all rules but not its names */
    clearTag() {
        // NOTE: This does not clear the names, since it's only used during SSR
        // so that we can continuously output only new rules
        this.tag = undefined;
    }
    /** Outputs the current sheet as a CSS string with markers for SSR */
    toString() {
        return outputSheet(this);
    }
}

const SEED = 5381;
// When we have separate strings it's useful to run a progressive
// version of djb2 where we pretend that we're still looping over
// the same string
const phash = (h, x) => {
    let i = x.length;
    while (i) {
        h = (h * 33) ^ x.charCodeAt(--i);
    }
    return h;
};
// This is a djb2 hashing function
const hash = (x) => {
    return phash(SEED, x);
};

const COMMENT_REGEX = /^\s*\/\/.*$/gm;
const COMPLEX_SELECTOR_PREFIX = [':', '[', '.', '#'];
/**
 * Serialize stylis output as an array of css strings. It is important that rules are
 * separated when using CSSOM injection.
 */
function serialize(children, callback) {
    return children.map((c, i) => callback(c, i, children, callback)).filter(Boolean);
}
function createStylisInstance({ options = EMPTY_OBJECT, plugins = EMPTY_ARRAY, } = EMPTY_OBJECT) {
    let _componentId;
    let _selector;
    let _selectorRegexp;
    let _consecutiveSelfRefRegExp;
    const selfReferenceReplacer = (match, offset, string) => {
        if (
        // do not replace the first occurrence if it is complex (has a modifier)
        (offset === 0 ? !COMPLEX_SELECTOR_PREFIX.includes(string[_selector.length]) : true) && // no consecutive self refs (.b.b); that is a precedence boost and treated differently
            !string.match(_consecutiveSelfRefRegExp)) {
            return `.${_componentId}`;
        }
        return match;
    };
    /**
     * When writing a style like
     *
     * & + & {
     *   color: red;
     * }
     *
     * The second ampersand should be a reference to the static component class. stylis
     * has no knowledge of static class so we have to intelligently replace the base selector.
     *
     * https://github.com/thysultan/stylis.js/tree/v4.0.2#abstract-syntax-structure
     */
    const selfReferenceReplacementPlugin = element => {
        if (element.type === stylis.RULESET && element.value.includes('&')) {
            const props = element.props;
            props[0] = props[0].replace(_selectorRegexp, selfReferenceReplacer);
        }
    };
    const stringifyRules = (css, selector = '', prefix = '', componentId = '&') => {
        let flatCSS = css.replace(COMMENT_REGEX, '');
        // stylis has no concept of state to be passed to plugins
        // but since JS is single-threaded, we can rely on that to ensure
        // these properties stay in sync with the current stylis run
        _componentId = componentId;
        _selector = selector;
        _selectorRegexp = new RegExp(`\\${_selector}\\b`, 'g');
        _consecutiveSelfRefRegExp = new RegExp(`(\\${_selector}\\b){2,}`);
        const middlewares = plugins.slice();
        if (options.prefix || options.prefix === undefined) {
            middlewares.unshift(stylis.prefixer);
        }
        middlewares.push(selfReferenceReplacementPlugin, stylis.stringify);
        return serialize(stylis.compile(prefix || selector ? `${prefix} ${selector} { ${flatCSS} }` : flatCSS), stylis.middleware(middlewares));
    };
    stringifyRules.hash = plugins.length
        ? plugins
            .reduce((acc, plugin) => {
            if (!plugin.name) {
                throwStyledComponentsError(15);
            }
            return phash(acc, plugin.name);
        }, SEED)
            .toString()
        : '';
    return stringifyRules;
}

const StyleSheetContext = React__default["default"].createContext(undefined);
StyleSheetContext.Consumer;
const StylisContext = React__default["default"].createContext(undefined);
StylisContext.Consumer;
new StyleSheet();
const mainStylis = createStylisInstance();

class Keyframes {
    id;
    name;
    rules;
    constructor(name, rules) {
        this.name = name;
        this.id = `sc-keyframes-${name}`;
        this.rules = rules;
    }
    inject = (styleSheet, stylisInstance = mainStylis) => {
        const resolvedName = this.name + stylisInstance.hash;
        if (!styleSheet.hasNameForId(this.id, resolvedName)) {
            styleSheet.insertRules(this.id, resolvedName, stylisInstance(this.rules, resolvedName, '@keyframes'));
        }
    };
    toString = () => {
        throw throwStyledComponentsError(12, String(this.name));
    };
    getName(stylisInstance = mainStylis) {
        return this.name + stylisInstance.hash;
    }
}

// Taken from https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/shared/dangerousStyleValue.js
function addUnitIfNeeded(name, value) {
    // https://github.com/amilajack/eslint-plugin-flowtype-errors/issues/133
    if (value == null || typeof value === 'boolean' || value === '') {
        return '';
    }
    if (typeof value === 'number' && value !== 0 && !(name in unitless__default["default"])) {
        return `${value}px`; // Presumes implicit 'px' suffix for unitless numbers
    }
    return String(value).trim();
}

function getComponentName(target) {
    return ((process.env.NODE_ENV !== 'production' ? typeof target === 'string' && target : false) ||
        target.displayName ||
        target.name ||
        'Component');
}

/**
 * inlined version of
 * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/hyphenateStyleName.js
 */
const uppercaseCheck = /([A-Z])/;
const uppercasePattern = /([A-Z])/g;
const msPattern = /^ms-/;
const prefixAndLowerCase = (char) => `-${char.toLowerCase()}`;
/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 */
function hyphenateStyleName(string) {
    return uppercaseCheck.test(string)
        ? string.replace(uppercasePattern, prefixAndLowerCase).replace(msPattern, '-ms-')
        : string;
}

function isFunction(test) {
    return typeof test === 'function';
}

function isPlainObject(x) {
    return (x !== null &&
        typeof x === 'object' &&
        /* a check for empty prototype would be more typical, but that
           doesn't play well with objects created in different vm contexts */
        (!x.constructor || x.constructor.name === 'Object') &&
        (x.toString ? x.toString() : Object.prototype.toString.call(x)) === '[object Object]' &&
        /* check for reasonable markers that the object isn't an element for react & preact/compat */
        !('props' in x && (x.$$typeof || x.constructor === undefined)));
}

function isStatelessFunction(test) {
    return typeof test === 'function' && !(test.prototype && test.prototype.isReactComponent);
}

function isStyledComponent(target) {
    return typeof target === 'object' && 'styledComponentId' in target;
}

/**
 * It's falsish not falsy because 0 is allowed.
 */
const isFalsish = (chunk) => chunk === undefined || chunk === null || chunk === false || chunk === '';
const objToCssArray = (obj, prevKey) => {
    const rules = [];
    for (const key in obj) {
        if (!obj.hasOwnProperty(key) || isFalsish(obj[key]))
            continue;
        if ((Array.isArray(obj[key]) && obj[key].isCss) || isFunction(obj[key])) {
            rules.push(`${hyphenateStyleName(key)}:`, obj[key], ';');
        }
        else if (isPlainObject(obj[key])) {
            rules.push(...objToCssArray(obj[key], key));
        }
        else {
            rules.push(`${hyphenateStyleName(key)}: ${addUnitIfNeeded(key, obj[key])};`);
        }
    }
    return prevKey ? [`${prevKey} {`, ...rules, '}'] : rules;
};
function flatten(chunk, executionContext, styleSheet, stylisInstance) {
    if (Array.isArray(chunk)) {
        const ruleSet = [];
        for (let i = 0, len = chunk.length, result; i < len; i += 1) {
            result = flatten(chunk[i], executionContext, styleSheet, stylisInstance);
            if (result === '')
                continue;
            else if (Array.isArray(result))
                ruleSet.push(...result);
            else
                ruleSet.push(result);
        }
        return ruleSet;
    }
    if (isFalsish(chunk)) {
        return '';
    }
    /* Handle other components */
    if (isStyledComponent(chunk)) {
        return `.${chunk.styledComponentId}`;
    }
    /* Either execute or defer the function */
    if (isFunction(chunk)) {
        if (isStatelessFunction(chunk) && executionContext) {
            const chunkFn = chunk;
            const result = chunkFn(executionContext);
            if (process.env.NODE_ENV !== 'production' &&
                typeof result === 'object' &&
                !Array.isArray(result) &&
                !(result instanceof Keyframes) &&
                !isPlainObject(result)) {
                // eslint-disable-next-line no-console
                console.error(`${getComponentName(
                // @ts-expect-error handling unexpected input
                chunkFn)} is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.`);
            }
            return flatten(result, executionContext, styleSheet, stylisInstance);
        }
        else
            return chunk;
    }
    if (chunk instanceof Keyframes) {
        if (styleSheet) {
            chunk.inject(styleSheet, stylisInstance);
            return chunk.getName(stylisInstance);
        }
        else
            return chunk;
    }
    /* Handle objects */
    return isPlainObject(chunk) ? objToCssArray(chunk) : chunk.toString();
}

function interleave(strings, interpolations) {
    const result = [strings[0]];
    for (let i = 0, len = interpolations.length; i < len; i += 1) {
        result.push(interpolations[i], strings[i + 1]);
    }
    return result;
}

/**
 * Used when flattening object styles to determine if we should
 * expand an array of styles.
 */
const addTag = (arg) => {
    if (Array.isArray(arg)) {
        // eslint-disable-next-line no-param-reassign
        arg.isCss = true;
    }
    return arg;
};
function css(styles, ...interpolations) {
    if (isFunction(styles) || isPlainObject(styles)) {
        const styleFunctionOrObject = styles;
        return addTag(flatten(interleave(EMPTY_ARRAY, [
            styleFunctionOrObject,
            ...interpolations,
        ])));
    }
    const styleStringArray = styles;
    if (interpolations.length === 0 &&
        styleStringArray.length === 1 &&
        typeof styleStringArray[0] === 'string') {
        return styleStringArray;
    }
    return addTag(flatten(interleave(styleStringArray, interpolations)));
}

function constructWithOptions(componentConstructor, tag, options = EMPTY_OBJECT) {
    // We trust that the tag is a valid component as long as it isn't falsish
    // Typically the tag here is a string or function (i.e. class or pure function component)
    // However a component may also be an object if it uses another utility, e.g. React.memo
    // React will output an appropriate warning however if the `tag` isn't valid
    if (!tag) {
        throw throwStyledComponentsError(1, tag);
    }
    /* This is callable directly as a template function */
    const templateFunction = (initialStyles, ...interpolations) => componentConstructor(tag, options, css(initialStyles, ...interpolations));
    /* Modify/inject new props at runtime */
    templateFunction.attrs = (attrs) => constructWithOptions(componentConstructor, tag, {
        ...options,
        attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean),
    });
    /**
     * If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = (config) => constructWithOptions(componentConstructor, tag, {
        ...options,
        ...config,
    });
    return templateFunction;
}

const ThemeContext = React__default["default"].createContext(undefined);
const ThemeConsumer = ThemeContext.Consumer;
function mergeTheme(theme, outerTheme) {
    if (!theme) {
        throw throwStyledComponentsError(14);
    }
    if (isFunction(theme)) {
        const themeFn = theme;
        const mergedTheme = themeFn(outerTheme);
        if (process.env.NODE_ENV !== 'production' &&
            (mergedTheme === null || Array.isArray(mergedTheme) || typeof mergedTheme !== 'object')) {
            throw throwStyledComponentsError(7);
        }
        return mergedTheme;
    }
    if (Array.isArray(theme) || typeof theme !== 'object') {
        throw throwStyledComponentsError(8);
    }
    return outerTheme ? { ...outerTheme, ...theme } : theme;
}
/**
 * Provide a theme to an entire react component tree via context
 */
function ThemeProvider(props) {
    const outerTheme = React.useContext(ThemeContext);
    const themeContext = React.useMemo(() => mergeTheme(props.theme, outerTheme), [props.theme, outerTheme]);
    if (!props.children) {
        return null;
    }
    return React__default["default"].createElement(ThemeContext.Provider, { value: themeContext }, props.children);
}

function determineTheme(props, providedTheme, defaultProps = EMPTY_OBJECT) {
    return (props.theme !== defaultProps.theme && props.theme) || providedTheme || defaultProps.theme;
}

const hasSymbol = typeof Symbol === 'function' && Symbol.for;
// copied from react-is
const REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
const REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
/**
 * Adapted from hoist-non-react-statics to avoid the react-is dependency.
 */
const REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true,
};
const KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true,
};
const FORWARD_REF_STATICS = {
    $$typeof: true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
};
const MEMO_STATICS = {
    $$typeof: true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true,
};
const TYPE_STATICS = {
    [REACT_FORWARD_REF_TYPE]: FORWARD_REF_STATICS,
    [REACT_MEMO_TYPE]: MEMO_STATICS,
};
// adapted from react-is
function isMemo(object) {
    const $$typeofType = 'type' in object && object.type.$$typeof;
    return $$typeofType === REACT_MEMO_TYPE;
}
function getStatics(component) {
    // React v16.11 and below
    if (isMemo(component)) {
        return MEMO_STATICS;
    }
    // React v16.12 and above
    return '$$typeof' in component
        ? TYPE_STATICS[component['$$typeof']]
        : REACT_STATICS;
}
const defineProperty = Object.defineProperty;
const getOwnPropertyNames = Object.getOwnPropertyNames;
const getOwnPropertySymbols = Object.getOwnPropertySymbols;
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const getPrototypeOf = Object.getPrototypeOf;
const objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, excludelist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components
        if (objectPrototype) {
            const inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, excludelist);
            }
        }
        let keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        const targetStatics = getStatics(targetComponent);
        const sourceStatics = getStatics(sourceComponent);
        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            if (!(key in KNOWN_STATICS) &&
                !(excludelist && excludelist[key]) &&
                !(sourceStatics && key in sourceStatics) &&
                !(targetStatics && key in targetStatics)) {
                const descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                }
                catch (e) {
                    /* ignore */
                }
            }
        }
    }
    return targetComponent;
}

function withTheme(Component) {
    const WithTheme = React__default["default"].forwardRef((props, ref) => {
        const theme = React__default["default"].useContext(ThemeContext);
        const themeProp = determineTheme(props, theme, Component.defaultProps);
        if (process.env.NODE_ENV !== 'production' && themeProp === undefined) {
            // eslint-disable-next-line no-console
            console.warn(`[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class "${getComponentName(Component)}"`);
        }
        return React__default["default"].createElement(Component, { ...props, theme: themeProp, ref: ref });
    });
    WithTheme.displayName = `WithTheme(${getComponentName(Component)})`;
    return hoistNonReactStatics(WithTheme, Component);
}

const useTheme = () => React.useContext(ThemeContext);

const AD_REPLACER_R = /(a)(d)/gi;
/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
const charsLength = 52;
/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
const getAlphabeticChar = (code) => String.fromCharCode(code + (code > 25 ? 39 : 97));
/* input a number, usually a hash and convert it to base-52 */
function generateAlphabeticName(code) {
    let name = '';
    let x;
    /* get a char and divide by alphabet-length */
    for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
        name = getAlphabeticChar(x % charsLength) + name;
    }
    return (getAlphabeticChar(x % charsLength) + name).replace(AD_REPLACER_R, '$1-$2');
}

function generateComponentId(str) {
    return generateAlphabeticName(hash(str) >>> 0);
}

let generated = {};
/**
 * InlineStyle takes arbitrary CSS and generates a flat object
 */
function makeInlineStyleClass(styleSheet) {
    const InlineStyle = class InlineStyle {
        rules;
        constructor(rules) {
            this.rules = rules;
        }
        generateStyleObject(executionContext) {
            // keyframes, functions, and component selectors are not allowed for React Native
            const flatCSS = flatten(this.rules, executionContext).join('');
            const hash = generateComponentId(flatCSS);
            if (!generated[hash]) {
                const root = postcss.parse(flatCSS);
                const declPairs = [];
                root.each(node => {
                    if (node.type === 'decl') {
                        declPairs.push([node.prop, node.value]);
                    }
                    else if (process.env.NODE_ENV !== 'production' && node.type !== 'comment') {
                        /* eslint-disable no-console */
                        console.warn(`Node of type ${node.type} not supported as an inline style`);
                    }
                });
                const styleObject = transformDeclPairs__default["default"](declPairs);
                const styles = styleSheet.create({
                    generated: styleObject,
                });
                generated[hash] = styles.generated;
            }
            return generated[hash];
        }
    };
    return InlineStyle;
}

function isTag(target) {
    return (typeof target === 'string' &&
        (process.env.NODE_ENV !== 'production'
            ? target.charAt(0) === target.charAt(0).toLowerCase()
            : true));
}

function generateDisplayName(target) {
    return isTag(target) ? `styled.${target}` : `Styled(${getComponentName(target)})`;
}

function mixinRecursively(target, source, forceMerge = false) {
    /* only merge into POJOs, Arrays, but for top level objects only
     * allow to merge into anything by passing forceMerge = true */
    if (!forceMerge && !isPlainObject(target) && !Array.isArray(target)) {
        return source;
    }
    if (Array.isArray(source)) {
        for (let key = 0; key < source.length; key++) {
            target[key] = mixinRecursively(target[key], source[key]);
        }
    }
    else if (isPlainObject(source)) {
        for (const key in source) {
            target[key] = mixinRecursively(target[key], source[key]);
        }
    }
    return target;
}
/**
 * Arrays & POJOs merged recursively, other objects and value types are overridden
 * If target is not a POJO or an Array, it will get source properties injected via shallow merge
 * Source objects applied left to right.  Mutates & returns target.  Similar to lodash merge.
 */
function mixinDeep(target = {}, ...sources) {
    for (const source of sources) {
        mixinRecursively(target, source, true);
    }
    return target;
}

function useResolvedAttrs(theme = EMPTY_OBJECT, props, attrs) {
    // NOTE: can't memoize this
    // returns [context, resolvedAttrs]
    // where resolvedAttrs is only the things injected by the attrs themselves
    const context = { ...props, theme };
    const resolvedAttrs = {};
    attrs.forEach(attrDef => {
        // @ts-expect-error narrowing isn't working properly for some reason
        let resolvedAttrDef = typeof attrDef === 'function' ? attrDef(context) : attrDef;
        let key;
        /* eslint-disable guard-for-in */
        for (key in resolvedAttrDef) {
            // @ts-expect-error bad types
            context[key] = resolvedAttrs[key] = resolvedAttrDef[key];
        }
        /* eslint-enable guard-for-in */
    });
    return [context, resolvedAttrs];
}
// Validator defaults to true if not in HTML/DOM env
const validAttr = () => true;
function useStyledComponentImpl(forwardedComponent, props, forwardedRef) {
    const { attrs: componentAttrs, inlineStyle, defaultProps, shouldForwardProp, target, } = forwardedComponent;
    // NOTE: the non-hooks version only subscribes to this when !componentStyle.isStatic,
    // but that'd be against the rules-of-hooks. We could be naughty and do it anyway as it
    // should be an immutable value, but behave for now.
    const theme = determineTheme(props, React.useContext(ThemeContext), defaultProps);
    const [context, attrs] = useResolvedAttrs(theme || EMPTY_OBJECT, props, componentAttrs);
    const generatedStyles = inlineStyle.generateStyleObject(context);
    const refToForward = forwardedRef;
    const elementToBeCreated = attrs.$as || props.$as || attrs.as || props.as || target;
    const computedProps = attrs !== props ? { ...props, ...attrs } : props;
    const propsForElement = {};
    // eslint-disable-next-line guard-for-in
    for (const key in computedProps) {
        if (key[0] === '$' || key === 'as')
            continue;
        else if (key === 'forwardedAs') {
            propsForElement.as = computedProps[key];
        }
        else if (!shouldForwardProp || shouldForwardProp(key, validAttr, elementToBeCreated)) {
            propsForElement[key] = computedProps[key];
        }
    }
    propsForElement.style = React.useMemo(() => {
        if (typeof props.style === 'function') {
            return (state) => {
                return [generatedStyles].concat(props.style(state));
            };
        }
        else if (props.style == null) {
            return generatedStyles;
        }
        else {
            return [generatedStyles].concat(props.style || []);
        }
    }, [props.style, generatedStyles]);
    propsForElement.ref = refToForward;
    return React.createElement(elementToBeCreated, propsForElement);
}
var _StyledNativeComponent = (InlineStyle) => {
    const createStyledNativeComponent = (target, options, rules) => {
        const isTargetStyledComp = isStyledComponent(target);
        const styledComponentTarget = target;
        const { displayName = generateDisplayName(target), attrs = EMPTY_ARRAY } = options;
        // fold the underlying StyledComponent attrs up (implicit extend)
        const finalAttrs = isTargetStyledComp && styledComponentTarget.attrs
            ? styledComponentTarget.attrs.concat(attrs).filter(Boolean)
            : attrs;
        // eslint-disable-next-line prefer-destructuring
        let shouldForwardProp = options.shouldForwardProp;
        if (isTargetStyledComp && styledComponentTarget.shouldForwardProp) {
            const shouldForwardPropFn = styledComponentTarget.shouldForwardProp;
            if (options.shouldForwardProp) {
                const passedShouldForwardPropFn = options.shouldForwardProp;
                // compose nested shouldForwardProp calls
                shouldForwardProp = (prop, filterFn, elementToBeCreated) => shouldForwardPropFn(prop, filterFn, elementToBeCreated) &&
                    passedShouldForwardPropFn(prop, filterFn, elementToBeCreated);
            }
            else {
                // eslint-disable-next-line prefer-destructuring
                shouldForwardProp = shouldForwardPropFn;
            }
        }
        const forwardRef = (props, ref) => 
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useStyledComponentImpl(WrappedStyledComponent, props, ref);
        forwardRef.displayName = displayName;
        /**
         * forwardRef creates a new interim component, which we'll take advantage of
         * instead of extending ParentComponent to create _another_ interim class
         */
        let WrappedStyledComponent = React__default["default"].forwardRef(forwardRef);
        WrappedStyledComponent.attrs = finalAttrs;
        WrappedStyledComponent.inlineStyle = new InlineStyle(isTargetStyledComp ? styledComponentTarget.inlineStyle.rules.concat(rules) : rules);
        WrappedStyledComponent.displayName = displayName;
        WrappedStyledComponent.shouldForwardProp = shouldForwardProp;
        // @ts-expect-error we don't actually need this for anything other than detection of a styled-component
        WrappedStyledComponent.styledComponentId = true;
        // fold the underlying StyledComponent target up since we folded the styles
        WrappedStyledComponent.target = isTargetStyledComp ? styledComponentTarget.target : target;
        WrappedStyledComponent.withComponent = function withComponent(tag) {
            const newOptions = {
                ...options,
                attrs: finalAttrs,
            };
            return createStyledNativeComponent(tag, newOptions, rules);
        };
        Object.defineProperty(WrappedStyledComponent, 'defaultProps', {
            get() {
                return this._foldedDefaultProps;
            },
            set(obj) {
                this._foldedDefaultProps = isTargetStyledComp
                    ? mixinDeep({}, styledComponentTarget.defaultProps, obj)
                    : obj;
            },
        });
        hoistNonReactStatics(WrappedStyledComponent, target, {
            // all SC-specific things should not be hoisted
            attrs: true,
            inlineStyle: true,
            displayName: true,
            shouldForwardProp: true,
            target: true,
            withComponent: true,
        });
        return WrappedStyledComponent;
    };
    return createStyledNativeComponent;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactNative = require('react-native');
const InlineStyle = makeInlineStyleClass(reactNative.StyleSheet);
const StyledNativeComponent = _StyledNativeComponent(InlineStyle);
const baseStyled = (tag) => constructWithOptions(StyledNativeComponent, tag);
/* React native lazy-requires each of these modules for some reason, so let's
 *  assume it's for a good reason and not eagerly load them all */
const aliases = [
    'ActivityIndicator',
    'Button',
    'DatePickerIOS',
    'DrawerLayoutAndroid',
    'FlatList',
    'Image',
    'ImageBackground',
    'KeyboardAvoidingView',
    'Modal',
    'Pressable',
    'ProgressBarAndroid',
    'ProgressViewIOS',
    'RefreshControl',
    'SafeAreaView',
    'ScrollView',
    'SectionList',
    'Slider',
    'Switch',
    'Text',
    'TextInput',
    'TouchableHighlight',
    'TouchableOpacity',
    'View',
    'VirtualizedList',
];
const styled = baseStyled;
/* Define a getter for each alias which simply gets the reactNative component
 * and passes it to styled */
aliases.forEach(alias => Object.defineProperty(styled, alias, {
    enumerable: true,
    configurable: false,
    get() {
        if (alias in reactNative && reactNative[alias]) {
            return styled(reactNative[alias]);
        }
        throw new Error(`${alias} is not available in the currently-installed version of react-native`);
    },
}));

exports.ThemeConsumer = ThemeConsumer;
exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.css = css;
exports["default"] = styled;
exports.isStyledComponent = isStyledComponent;
exports.useTheme = useTheme;
exports.withTheme = withTheme;
//# sourceMappingURL=styled-components.native.cjs.js.map
