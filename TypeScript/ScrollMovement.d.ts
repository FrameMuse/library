interface IntersectionAnimationData {
    target: string,
    TimingFunction: Bezier,
    animation: {
        maximum, minumum: {
            opacity?: number,
            "font-size"?: number
        },
    }
}