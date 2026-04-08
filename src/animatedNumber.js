import { useState, useEffect, useRef } from 'react';

export function animatedNumber(targetValue) {
    const [displayValue, setDisplayValue] = useState(targetValue);
    const targetRef = useRef(targetValue);

    useEffect(() => {
        targetRef.current = targetValue;
    }, [targetValue]);

    useEffect(() => {
        let animationFrameId;

        const updateNumber = () => {
            setDisplayValue((prev) => {

                const diff = targetRef.current - prev;

                if (diff === 0) return prev;

                const step = diff * 0.3;

                if (Math.abs(diff) < 1) {
                    return targetRef.current;
                }
                return prev + step;
            });
            animationFrameId = requestAnimationFrame(updateNumber);
        };

        animationFrameId = requestAnimationFrame(updateNumber);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return displayValue;
}