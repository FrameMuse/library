// Imports

import { Bezier } from "Cubic_Bezier";



// Types

// type BezierType = Bezier;



// Interfaces

interface IntersectionAnimationData {
    target: string,
    TimingFunction: Bezier,
    animation: {
        from, to: {
            opacity?: number,
            "font-size"?: number
        },
    }
}



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
    data: object
    timing: Function

    constructor(data: IntersectionAnimationData) {
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