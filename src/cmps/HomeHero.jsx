import { SquerePreviewList } from "./SquerePreviewList.jsx";

export function HomeHero() {
    const squeres = [
        { txt: 'Creative & design' },
        { txt: 'Operations' },
        { txt: 'Marketing' },
        { txt: 'Project management' },
    ]
    return (
        <div className="home-hero">

            <div className="main-header">
                <h1>A platform built for a
                    new way of working</h1>

                <h2>What would you like to manage?</h2>
            </div>

            <SquerePreviewList squeres={squeres} />

        </div>
    )
}
