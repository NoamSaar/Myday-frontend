
export function HomeHero() {
    const squares = [
        { txt: 'Creative & design' },
        { txt: 'Operations' },
        { txt: 'Marketing' },
        { txt: 'Project management' },
    ]
    return (
        <div className="home-hero">

            <div className="main-header">
                <h1>Coming Soon...</h1>
                {/* <h1>A platform built for a
                    new way of working</h1> */}

                {/* <h2>What would you like to manage?</h2> */}
            </div>

            {/* <ul className="clean-list squares-list">

                {squares.map((square, idx) => {
                    return <li key={idx}>{square.txt}</li>
                })}
            </ul> */}

        </div>
    )
}
