import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { StepsProps } from '../types';

function Steps(props: StepsProps) {
    const { stepsCount, activeStep } = props;

    const [steps, setSteps] = useState<number[]>([]);

    useEffect(() => {
        const arr = [];
        for (let i = 1; i <= stepsCount; i++) {
            arr.push(i);
        }
        setSteps(arr);
    }, [stepsCount]);

    return (
        <div className={styles.wrapper}>
            {steps.map((step, index) => (
                <div key={step} className={styles.step}>
                    <span className={`${styles.item} ${step === activeStep && styles.item_active}`}>{step}</span>
                    {index + 1 !== stepsCount && <Line />}
                </div>
            ))}
        </div>
    );
}

export default Steps;

function Line() {
    return (
        <svg width="32" height="2" viewBox="0 0 32 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="32" height="1" rx="0.5" fill="#332F6B" />
        </svg>
    );
}
