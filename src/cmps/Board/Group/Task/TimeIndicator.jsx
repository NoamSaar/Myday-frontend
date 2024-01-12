import { useEffect, useState } from 'react';

export function TimeIndicator({ timestamp }) {
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const calculateDaysLeft = () => {
            const currentTimestamp = Date.now();
            const timeDifference = timestamp - currentTimestamp;
            const daysLeft = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

            setDaysLeft(daysLeft >= 0 ? daysLeft : 0);
        };

        calculateDaysLeft();

        // Update days left every hour (adjust as needed)
        const intervalId = setInterval(calculateDaysLeft, 3600000);

        return () => clearInterval(intervalId);
    }, [timestamp]);

    const renderSlices = () => {
        const slices = [];
        for (let i = 0; i < 7; i++) {
            slices.push(<div key={i} className={`slice ${i < daysLeft ? 'filled' : ''}`} />);
        }
        return slices;
    };
    console.log('daysLeft', daysLeft)

    return (
        <div className={`time-indicator ${daysLeft === 0 ? 'expired' : ''}`}>
            {daysLeft === 0 ? 'Expired' : renderSlices()}
        </div>
    );
}
