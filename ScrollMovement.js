// Imports
import { Bezier } from "Cubic_Bezier";
// Dev Staff
class AdvancedObserver {
    constructor() {
    }
}
class DataMaintain {
}
class WatchOver {
}
class IntersectionAnimation {
    constructor(data) {
        this.data = data;
        this.timing = data.TimingFunction;
        // Redering
        this.RenderFrame();
    }
    RenderFrame(target, params) {
    }
}
new IntersectionAnimation({
    target: ".target",
    TimingFunction: new Bezier(),
    animation: {
        from: {
            opacity: 0.25
        },
        to: {
            opacity: 1
        }
    }
});
