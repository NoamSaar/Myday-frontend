
export function HomeHero() {
    const squares = [
        { txt: 'Creative & design' },
        { txt: 'Operations' },
        { txt: 'Marketing' },
        { txt: 'Project management' },
    ]
    return (
        <section className="hero-section">
            <h1 className="hero-section-header">
                A platform built for a <br /> new way of working
            </h1>
            <h2 className="hero-section-header2">
                What would you like to manage?
            </h2>
            <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
            <div className="tabs-preview flex column">
                {renderTabContent()}
                <div className="tabs-preview-actions flex column align-center">
                    <button className="get-started-btn">Get Started</button>
                    <span className="tabs-preview-info">
                        No credit card needed ✦ Unlimited time on Free plan
                    </span>
                </div>
            </div>
            <div style={{ minHeight: '32vw' }}>
                <img src={QuerterlyRoadmap} alt="" />
            </div>
        </section>
    )
}
