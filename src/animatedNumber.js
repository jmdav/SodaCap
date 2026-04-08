import { useState, useEffect } from 'react';

export function animatedNumber(targetValue) {
    const [displayValue, setDisplayValue] = useState(targetValue);

    useEffect(() => {
        let animationFrameId;

        const updateNumber = () => {
            setDisplayValue((prev) => {

                if (prev === targetValue) {
                    return prev;
                }

                const diff = targetValue - prev;

                const step = diff > 0 ? Math.ceil(diff * 0.15) : Math.floor(diff * 0.15);

                if (Math.abs(diff) <= 1) {
                    return targetValue;
                }

                animationFrameId = requestAnimationFrame(updateNumber);
                return prev + step;
            });
        };

        animationFrameId = requestAnimationFrame(updateNumber);

        return () => cancelAnimationFrame(animationFrameId);
    }, [targetValue]);

    return displayValue;
}