import { useEffect, useState } from "react";

export function LabelSummary({ title, group, board }) {
    const [titleStats, setTitleStats] = useState(calculateTitleStatsAndPercentage(group, title, board))

    useEffect(() => {
        setTitleStats(calculateTitleStatsAndPercentage(group, title, board))
    }, [title, group, board])

    function getTitleColor(title, board, labelId) {
        const titleInfo = board[title].find((item) => item.id === labelId);
        return titleInfo ? titleInfo.color : null;
    }

    function calculateTitleStatsAndPercentage(group, title, board) {
        const totalTasks = group.tasks.length;

        const titleStats = group.tasks.reduce((acc, task) => {
            const labelId = task[title];
            acc[labelId] = (acc[labelId] || 0) + 1;
            return acc;
        }, {});

        const resultArray = Object.entries(titleStats).map(([labelId, value]) => {
            const percentage = ((value / totalTasks) * 100).toFixed(2);
            const formattedPercentage = percentage.includes('.00') ? percentage.split('.')[0] + '%' : percentage + '%';

            const label = board[title].find((option) => option.id === labelId).title;

            return {
                title: label,
                color: getTitleColor(title, board, labelId),
                percentageMap: {
                    percent: formattedPercentage,
                    fraction: `${value}/${totalTasks}`,
                },
            };
        });

        return resultArray;
    }



    return (
        <li className="label-summary">
            <div className="label-summary-battery">
                {titleStats.map((titleStat, idx) => {
                    return <div
                        key={idx}
                        className="label-data"
                        style={{ backgroundColor: titleStat.color, width: titleStat.percentageMap.percent }}
                        title={`${titleStat.title ? titleStat.title : ''} ${titleStat.percentageMap.fraction} ${titleStat.percentageMap.percent}`}
                    ></div>
                })}
            </div>
        </li>
    )
}
