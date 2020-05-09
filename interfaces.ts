export interface IntersectionAnimationData {
    target: string,
    TimingFunction: BezierType,
    animation: {
        from, to: {
            opacity?: number,
            "font-size"?: number
        },
    }
}