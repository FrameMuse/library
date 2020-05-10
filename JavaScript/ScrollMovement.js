// Imports
// Types
// type BezierType = Bezier;
// Dev Staff
class AdvancedIntersectionObserver {
    constructor(target, options) {
        console.log(target);
        this.observer = new IntersectionObserver((entries, observer) => this.observerCallback(entries, observer), options);
        this.observer.observe(target);
    }
    setCallback(AdvancedObserverCallback) {
        this.observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting)
                    return;
                AdvancedObserverCallback(entry, observer);
                console.log(entry.intersectionRatio);
            });
        };
    }
}
class DataMaintain {
}
class WatchOver {
}
class IntersectionAnimation {
    constructor(data) {
        this.timing = data.TimingFunction;
        this.animation = data.animation;
        // Destructed data
        const { target, animation } = data;
        // Constants
        const element = document.querySelector(target);
        const Observer = new AdvancedIntersectionObserver(element, {
            root: null,
            threshold: Array(1001).fill(0).map((value, index) => index / 1000)
        });
        // Advanced Observer
        Observer.setCallback(entry => {
            // Animation params
            animation.to;
            // Animation params adjustment
            entry.intersectionRatio;
            // Redering
            this.RenderFrame(element, this.animation.maximum, entry.intersectionRatio);
        });
        // Animation params
        animation.from;
        // Set default animation params
        this.RenderFrame(element, this.animation.minimum, 1); // 1 == 100% percent (adjustment)
    }
    RenderFrame(target, params, adjustment) {
        for (const param in params) {
            const value = params[param];
            const AdjustedTiming = this.timing(adjustment);
            const valueAdjusted = value * AdjustedTiming;
            if (value < this.animation.minimum[param])
                continue;
            if (value > this.animation.maximum[param])
                continue;
            target.style[param] = valueAdjusted;
        }
        // jQuery method
        // $(target).css(params);
    }
}
