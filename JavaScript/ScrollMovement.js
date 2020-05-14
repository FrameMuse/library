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
                console.table([entry.intersectionRatio, entry.intersectionRect]);
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
        this.config = data.config;
        // Destructed data
        const { area, target, animation } = data;
        // Constants
        const Area = document.querySelector(area);
        const Target = document.querySelector(target);
        const Observer = new AdvancedIntersectionObserver(Area, {
            root: null,
            threshold: Array(101).fill(0).map((v, i) => i / 100)
        });
        // Advanced Observer
        Observer.setCallback(entry => {
            // Animation params
            animation.to;
            // Animation params adjustment
            entry.intersectionRatio;
            // Redering
            this.RenderFrame(Target, this.animation.maximum, entry.intersectionRatio);
        });
        // Animation params
        animation.from;
        // Set default animation params
        this.RenderFrame(Target, this.animation.minimum, 1); // 1 == 100% percent (adjustment)
    }
    RenderFrame(target, params, adjustment) {
        for (const param in params) {
            const value = params[param];
            const AdjustedTiming = this.timing(adjustment);
            const valueAdjusted = value * AdjustedTiming;
            //if (valueAdjusted < this.animation.minimum[param]) continue;
            if (valueAdjusted > this.animation.maximum[param])
                continue;
            switch (param) {
                case "width":
                case "height":
                    const govno = value * (1 - AdjustedTiming);
                    if (govno < this.animation.minimum[param])
                        continue;
                    target.style[param] = govno;
                    break;
                case "background":
                case "color":
                    const rgba = value.map(v => v * (1 - AdjustedTiming));
                    target.style[param] = `rgba(${rgba})`;
                    break;
                case "transform":
                    var transforms = "";
                    for (const style in value) {
                        const element = value[style] * AdjustedTiming;
                        const suffix = this.config.suffixes[style];
                        transforms += `${style}(${element + suffix})`;
                    }
                    target.style[param] = transforms;
                    break;
                default:
                    target.style[param] = valueAdjusted;
                    break;
            }
        }
        // jQuery method
        // $(target).css(params);
    }
}
