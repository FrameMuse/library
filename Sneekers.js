"use strict";

class ajax {
    static construct() {
        this.version = "v1";
        this.host = "https://standoffspin.ru";
        this.path = host + "/api/" + version;
        this.token = $('meta[name="csrf-token"]').attr('content');
        this.dataType = "json";
        this.dynamic = false;
        this.cache = false;
    }

    static request(method, url, params = {}) {
        this.construct();
        $.ajax({
            url: this.url(url), // Formated and Joined URL
            method: method,
            headers: {
                'X-CSRF-TOKEN': this.token,
                "DYNAMIC-REQUEST": this.dynamic,
            },
            cache: this.cache,
            dataType: this.dataType,
            data: $.param(params),
            success: this.success,
            error: this.error,
        });
    }

    static config(data) {
        
    }

    static url(path) {
        return this.path + path;
    }
}

class api extends ajax {
    static post(url, params = {}, success = function () { }) {
        this.request("POST", url, params, success);
    }

    static get(url, params = {}, success = function () { }) {
        this.request("GET", url, params, success);
    }
}

class Deferred {
    constructor() {
        this.refresh();
    }

    deconstruct(value) {
        this.value = value;
    }

    refresh() {
        this.promise = new Promise((resolve, reject) => {
            this.status = "pending";
            this.value = null;
            this.promiseTools = {
                resolve: resolve,
                reject: reject,
                status: this.status,
            };
        });
    }

    set status(value) {
        if (this.status != "pending") return false;
        switch (value) {
            case "pending":
            case "resolved":
            case "rejected":
                this.promiseTools.status = value;
                break;
        }
    }

    get status() {
        return this.promiseTools.status;
    }

    resolve(value = "") {
        this.status = "resolved";
        this.promiseTools.resolve(value);
        return this.deconstruct(value);
    }

    reject(value = "") {
        this.status = "rejected";
        this.promiseTools.reject(value);
        this.deconstruct(value);
    }

    then(fulfilled, rejected = () => { }) {
        return this.promise.then((value) => {
            if (this.status == "pending") this.resolve();
            fulfilled(value);
        }, (value) => {
            if (this.status == "pending") this.reject();
            rejected(value);
        });
    }
}

$.fn.extend({
    toggleText: function (a, b = null) {
        return this.html(this.html() == b ? a : b);
    },
    num_split: function () {
        var output = [],
            string = this.text().toString(),
            length = string.length;

        for (var i = 0; i < length; i++) {
            output.push(+string.charAt(i));
        }

        return output;
    },
    scrollTo: function (offset = false, duration = 400) {
        $("html").animate({
            scrollTop: $(this).offset().top + (5).toPx()
        }, duration);
    },

    // Timer needs to be refactored
    timer: async function (days_on = false) {
        typeof config.intervals != "object" ? config.intervals = [] : (function () {
            config.intervals.filter(function (interval) {
                clearInterval(interval);
            });
            config.intervals = [];
        })();
        this.each(function (i) {
            var data_time = $(this).attr("data-time");
            var data_days = $(this).data("days");

            config.intervals.push(setInterval(() => {
                if (+data_time) {
                    var timestamp = new Date(+data_time);
                } else {
                    var timestamp = new Date(new Date(data_time).getTime() - Date.now());
                }

                if (days_on || +data_days) {
                    var time = timestamp.toISOString().substr(8, 11).replace("T", ":");
                } else {
                    var time = timestamp.toISOString().substr(11, 8);
                }


                if (timestamp < 0) {
                    clearInterval(config.intervals[i]);
                    $(this).parent().remove();
                    eval($(this).attr("ontimerover"));
                } else $(this).html(time);
                if (+data_time) data_time = (data_time - 1000);
            }, 1000));
        });
    },
});

class interpret {
    static JSDOM(string) {
        if (string == null) return string;
        var brackets = [string.indexOf('{'), string.indexOf('}')];
        function createSpan(spot) {
            return `<span class="js-${spot}"></span>`.multiReplace(['=>'], '-').multiReplace(['->'], '_');
        }
        while (brackets[0] != -1 && brackets[1] != -1) {
            var brackets = [string.indexOf('{'), string.indexOf('}')];
            var $var = string.slice(brackets[0] + 1, brackets[1]);
            var string = string.multiReplace(['{' + $var + '}'], createSpan($var));
        }
        return string;
    }
}

class ProgressBar {
    static construct() {
        this.progress = new Deferred();
        this.rail = 0;
    }
    static async start() {
        this.progress.refresh();
        $(".load-indicator").css({ opacity: 1 });
        $(".load-indicator__fill").css({ width: 15 + "%" });
        $("body, button, input, a").css({ cursor: "wait" });

        for (var i = 0; i < this.TimerSteps.length; i++) {
            await delay(this.TimerSteps[i]["time"]);
            if (this.progress.status == "resolved") return;
            $(".load-indicator__fill").css({ width: this.TimerSteps[i]["width"] + "%" });
        }
    }

    static end() {
        this.progress.resolve();
        $(".load-indicator__fill").css({ width: 100 + "%" });
        setTimeout(() => {
            $(".load-indicator__fill").css({ width: "" });
            $(".load-indicator").css({ opacity: 0 });
            $("body, button, input, a").css({ cursor: "" });
        }, 350);
    }

    set timming(data) {
        this.TimerSteps = data;
    }
}
class onWindowLoaded {
    constructor() {
        this.scripts = [];
        $(window).on("load", () => this.load());
    }

    add($function) {
        this.scripts.push($function);
    }

    load() {
        this.scripts.forEach(element => element());
    }
}

class html {
    static construct() {
        this.targets = [];
        this.observer = new MutationObserver(MutationRecord => this.callback(MutationRecord));
    }

    static callback(mutationsList) {
        mutationsList.forEach(mutation => {
            this.targets.filter(lisnter => {
                if (lisnter.target === mutation.target)
                    lisnter.action(mutation.type, lisnter.target);
            });
        });
    }

    static listen(target, action, mutations = { attributes: true, childList: true, subtree: true }) {
        $(target).each((i, e) => {
            this.targets.push({
                target: e,
                action: action,
            });
            this.observer.observe(e, mutations);
        });
    }

    static update(prefix, changes, separate = false) {
        var origin = ".js-" + prefix + "-";
        for (const key in changes) {
            $(origin + key).html(separate ? split_number(+changes[key]) : changes[key]);
        }
    }

    static on(event, prefix, handlers) {
        var origin = ".js-" + prefix + "-";
        for (const key in handlers) {
            $(document).on(event, origin + key, handlers[key]);
        }
    }

    static click(prefix = [], handler = () => { }) {
        switch (typeof prefix) {
            case "array":
                this.on("click", prefix[0], {}[prefix[1]] = handler);
                break;

            default:
                $(document).on("click", prefix, handler);
                break;
        }
    }

    static $(prefix, name) {
        return $(".js-" + prefix + "-" + name);
    }
}

class PageCache {
    constructor(url, success) {
        this.page = url.split("/")[1];
        this.localCache = this.getCache(this.page);

        if (PageCache.CachePages.includes(this.page)) {

            if (this.localCache == false) {
                (async () => {
                    await page.support.pageLoading.promise;
                    localStorage.setItem(this.page, JSON.stringify({
                        content: this.cache(),
                        date: new Date(),
                    })); 
                })();
                return false;
            } else {
                success(this.localCache);
                return true;
            }
        } else {
            return false;
        }
    }

    cache() {
        var contrainer = $(page.support.fickle);
        return contrainer.html();
    }

    getCache(page) {
        var raw_data = localStorage.getItem(page);
        if (raw_data == null) return false;

        var data = JSON.parse(raw_data);
        var content = data.content;

        return content;
    }

    static clear() {
        for (let i = 0; i < PageCache.CachePages.length; i++) {
            const element = PageCache.CachePages[i];
            localStorage.removeItem(element);
        }
    }
}

Sneekers.local.popup = class {
    constructor() {
        this.on = {};
        this.tmp = {};
        this.opened = new Deferred();
        this.closed = new Deferred();
    }

    tend(option) {
        var element = ".popup-window__" + option;
        return $(element);
    }

    wEdit(options = {}) {
        for (var option in options) {
            this.tend(option).html(options[option]);
        }
    }

    fadeIn(object = ".popup-window") {
        $(".popup").removeAttr("hidden");
        setTimeout(() => {
            $(object).removeClass("scale-out scale-in").addClass("scale-in");
        }, 50);
    }

    fadeOut() {
        $(".popup").find("> *:not(.popup__cover)").removeClass("scale-out scale-in").addClass("scale-out");
        setTimeout(() => $(".popup").attr("hidden", ""), 200);
    }

    open($window, options = {}) {
        // Resoling the the Popup Opened promise
        this.opened.resolve();
        // Fetching
        this.wText = function (ref) {
            var wText = "popup." + $window + ".";
            return (wText + ref).cat();
        }
        // Assinging default vars
        this.title = this.wText("title");
        this.summary = this.wText("summary");
        // Clearing
        this.wEdit({
            title: this.title,
            summary: this.summary,
            content: null,
            help: "popup.help".cat(),
        });
        // Calling found window
        try {
            this.on[$window].apply(this, [options]);
        } catch (error) {
            dev.addError(error);
        }
        // Animation
        this.fadeIn($(".popup-window"));
        // Return Promise
        return this.closed.refresh();
    }

    close() {
        // Animation
        this.fadeOut();
        // Refreshing popup closed promise
        this.closed.refresh();
        // Resolving popup opened promise
        return this.opened.resolve();
    }
}

class ScrollInspector {
    constructor(page = "") {
        this.data = {
            page: page,
        };
        this.listeners = [];
        this.entry = new Deferred();
        this.CurrentListener = this.GetOncrollEvent();
        window.addEventListener('scroll', this.CurrentListener);
    }

    GetOncrollEvent() {
        try {
            return async event => {
                await this.entry.promise;
                if (!event.isTrusted || event.type != "scroll") return;
                if (this.listeners != undefined) {
                    this.listeners.filter($this => {
                        if (event.path[1].scrollY >= $this.offset()) {
                            $this.event.apply($this.context, [event, this]);
                        }
                    });
                }
            };
        } catch (error) {
            this.deconstruct();
            console.error(error);
        }
    }

    OnScrollEvent(offset = 0, event = () => { }) {
        const $offset = typeof offset == "function" ? offset : function () {
            return typeof offset == "number" ? offset : $(offset).offset().top;
        };
        this.listeners.push({
            offset: $offset,
            event: event,
            context: this,
        });
        this.entry.resolve();
    }

    deconstruct() {
        window.removeEventListener('scroll', this.CurrentListener);
        delete this;
    }

    destroy() {
        getEventListeners(window).scroll.forEach((e) => {
            removeEventListener("scroll", e.listener);
        })
    }
}

Sneekers.local.pages = class {
    constructor() {
        // Begin
        this.pages = {};
        this.errors = {};
        this.fickle = ".ajax-fickle";
        this.DeviceType = "desktop";
        this.ScrollInspector = {};
        this.actionOnLoaded = [];
        this.AbleScrollDown = true;
        this.pageLoading = new Deferred();
        this.onPageLoaded = () => { };

        this.refresh();

        window.onpopstate = (event) => {
            this.__load(event.state.href, event.state.data);
        }

        // Events
        $("body").append(`<div class="notifier"><div class="notifier__message"></div><span class="notifier__signal"></span></div>`);
        $(document).on("click", "a.ajax-link[href]", (e) => {
            e.preventDefault();
            // Progress
            ProgressBar.start();
            // Other
            this.pageLoading.refresh();
            var href = $(e.currentTarget).attr("href").split("#!");
            if (href != null) {
                this.load(href[0], href[1]);
            } else console.error("The link attr is empty");
        });
    }

    load(url, hashAction = false) {
        ProgressBar.start();
        this.dynamic_request(url, (result) => {
            // Histoty Push
            if (history.state == null) {
                history.replaceState({ href: url, data: result }, "", url);
            } else {
                history.pushState({ href: url, data: result }, "", url);
            }
            this.save_hash(hashAction);
            this.final(result, url);
        });
        return this.pageLoading;
    }

    __load(url, result) {
        ProgressBar.start();
        this.final(result, url);
        return this.pageLoading;
    }

    refresh() {
        this.load(window.location.pathname);
    }

    dynamic_request(url, $success) {
        $.ajax({
            url: url,
            headers: {
                "DYNAMIC-REQUEST": true,
            },
            dataType: 'text',
            cache: false,
            success: $success,
            error: (error) => {
                this.pageLoading.reject();
                ProgressBar.end();
                console.warn("Page Loading Error:", error);
            },
            statusCode: this.errors[url.split("/")[1]],
        });

    }

    request(url, $success) {
        $.ajax({
            url: url,
            dataType: 'html',
            success: $success,
        });
    }

    final(result, url) {
        // Other
        this.pageLoaded = url.split("/");
        this.active_page = "/" + this.pageLoaded[1];
        $(this.fickle).html(result);
    }

    addPage(page_name, run) {
        page_name = page_name.replace("/", "");
        this.pages[page_name] = run;
    }

    __addPage(settings) {
        settings.page = settings.page.replace("/", "");
        if ("ScrollInspector" in settings) {
            this.ScrollInspector[settings.page] = function () {
                try {
                    settings.ScrollInspector.apply(new ScrollInspector("/" + settings.page));
                } catch (error) {
                    console.warn(error);
                }
            };
        }
        this.pages[settings.page + (settings.device != undefined ? "__mobile" : "")] = settings.onSuccess;
        this.errors[settings.page] = settings.errors;
    }

    EventPageLoaded(url, DeviceType = false) {
        url[1] += DeviceType ? "__" + DeviceType : "";
        if (url[1] in this.pages) try {
            this.pages[url[1]].apply(this, [url[2]]);
        } catch (error) {
            console.error(error);
            this.load("/");
        }
    }

    startActionOnLoaded() {
        if (!this.hash || this.hash == "") return false;
        this.actionOnLoaded[this.hash]();
    }

    isFirstInHistory() {
        return history.state != null && history.state.first;
    }

    set active_page(url) {
        // Jquery Event
        $("[class *= 'menu']").each(function () {
            var active_name = $(this).attr("class") + "__link--active";
            $(this).find("a").removeClass(active_name);
            $(this).find("a[href='" + url + "']").addClass(active_name);
        });
    }

    notify(signal, message) {
        var singals = {
            error: 0,
            warning: 50,
            success: 100,
        };
        if (page.mobile.if) {
            var values = {
                bottom_start: "4em",
                bottom_end: "-5em",
            };
        } else {
            var values = {
                bottom_start: "2em",
                bottom_end: "-5em",
            };
        }

        $(".notifier").animate({ bottom: values.bottom_start, }, 350);
        $(".notifier__message").html(message);
        $(".notifier__signal").css({
            background: "hsl(" + singals[signal] + ", 50%, 40%)",
        }).animate({
            width: "100%",
        }, 5000, "linear", function () {
            $(".notifier").animate({ bottom: values.bottom_end, }, 350, () => $(this).css({ width: "" }));
        });
    }

    notify_dev(type, result) {
        if ($(".dev-log").length == 0) {
            $("body").append(`<div class="dev-log"><div class="dev-log__header"><span>Request Response: </span><span class="js-dev-log-type"></span></div><pre class="dev-log__body js-dev-log-content"></pre></div>`);
        }
        var json = JSON.stringify(result, undefined, 2),
            parsed_html = parse_html(json),
            colored_html = color_html(json, parsed_html);

        DOM.update("dev-log", {
            type: type,
            content: colored_html,
        })
    }

    save_hash(hash) {
        this.hash = hash ? hash : window.location.hash.split("!");
        this.clear_hash();
    }

    clear_hash() {
        history.replaceState(history.state, "", window.location.href.split('#')[0]);
    }

    context(object) {
        object.apply(this);
    }
}



// Midifizing Prototypes

String.prototype.intConvert = function () {
    return parseInt(this, 10);
};

String.prototype.num_split = function () {
    var output = [],
        string = this.toString(),
        length = string.length;

    for (var i = 0; i < length; i++) {
        output.push(+string.charAt(i));
    }

    return output;
};

String.prototype.multiReplace = function (array, replacement) {
    var string = this;
    for (var i in array) {
        string = string.replace(new RegExp(array[i], 'g'), replacement);
    }
    return string;
};

String.prototype.ias = function (argument1 = "", argument2 = "") {
    if (argument1 == "" && argument2 == "") return interpret.JSDOM(this);
    return this.multiReplace([`{${argument1}}`], argument2);
};

String.prototype.cat = function (param) {
    var needle = param.split(".");
    var haystack = window._language;

    for (var v of needle) {
        if (!haystack[v]) {
            haystack = param + " doesn't exist";
            return;
        }
        haystack = haystack[v];
    }

    return haystack;
};

Number.prototype.toPx = function (parent = "html") {
    return this * $(parent).css("font-size").replace("px", "");
};

Array.prototype.last = function (argument1) {
    if (this == null) return;
    switch (typeof argument1) {
        case "function":
            const $this = this[this.length - 1];
            argument1.apply($this, [$this]);
            return this[this.length - 1];
            break;
        default:
            if (argument1 == null)
                return this[this.length - 1];
            return this.slice(Math.max(this.length - argument1, 0));
            break;
    }
};

// Simple functions

function num_split(number = 0, bandwidth = 0) {
    var string = number.toString(),
        length = string.length,
        bandwidth = length >= bandwidth ? 0 : bandwidth - length,
        output = new Array(bandwidth).fill(0);

    for (var i = 0; i < length; i++) {
        output.push(+string.charAt(i));
    }

    return output;
}

function prevent_error_function($function, ...$args) {
    // Prevent Unexpected Errors
    try {
        $function(...$args);
    } catch (error) {
        //console.warn("Function error prevented: " + error);
    }
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function split_number(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function alter_by_currency(param, appendCurrency = false) {
    var multiplier = getLanguage('settings.multiplier'),
        currency = getLanguage('settings.currency'),
        number = (param.toString().multiReplace([" ", currency], "")) * multiplier;
    if (isFloat(number)) number = number.toFixed(2);
    return appendCurrency ? (number + ' ' + currency) : number;
}

function parse_html(html) {
    var regex = RegExp('[^":]*', 'g'),
        matches = html.match(regex);
    return matches;
}

function color_html(html, parsed_html) {
    parsed_html.forEach(value => {
        if (["", " ", ",", "}", "{", "[", "]", "(", ")"].includes(value) || value.search(",") > -1 || value.search("{") > -1 || value.search("}") > -1) return;
        html = html.replace(value, '<span class="dev-log__color">' + value + '</span>');
    });
    return html;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function get_random_int(min = 0, max = 2) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function IsDefined($this) {
    return $this != "undefined" && $this != undefined && typeof $this != "undefined";
}

function img_error(element, isAvatar = false) {
    element.src = '/assets/img/guest.png';
    page.popup.tmp.NeedsToSetAvatar = isAvatar;
}