
export function LabelSummary({ title, group, board }) {

    function getTitleColor(title, board, label) {
        console.log('title', title)
        const titleInfo = board[title].find((item) => item.title === label);
        return titleInfo ? titleInfo.color : null;
    }

    function calculateTitleStatsAndPercentage(group, title, board) {
        const totalTasks = group.tasks.length;

        const titleStats = group.tasks.reduce((acc, task) => {
            const taskTitle = task[title];
            acc[taskTitle] = (acc[taskTitle] || 0) + 1;
            return acc;
        }, {});

        const resultArray = Object.entries(titleStats).map(([key, value]) => {
            const percentage = ((value / totalTasks) * 100).toFixed(2);
            const formattedPercentage = percentage.includes('.00') ? percentage.split('.')[0] + '%' : percentage + '%';

            return {
                title: key,
                color: getTitleColor(title, board, key),
                percentageMap: {
                    percent: formattedPercentage,
                    fraction: `${value}/${totalTasks}`,
                },
            };
        });

        return resultArray;
    }


    const titleStats = calculateTitleStatsAndPercentage(group, title, board)
    console.log('titleStats', titleStats)


    return (
        <li className="label-summary">
            HEREE
        </li>
    )
}
