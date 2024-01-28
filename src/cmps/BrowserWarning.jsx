import { useEffect, useState } from 'react'

export function BrowserWarning() {
    const [showWarning, setShowWarning] = useState(false)

    useEffect(() => {
        const userAgent = navigator.userAgent
        if (userAgent.includes("SamsungBrowser")) {
            setShowWarning(true)
        }
    }, [])

    if (!showWarning) {
        return null
    }

    return (
        <section className="browser-warning">
            <div className="scrolling-text">
                <p>
                    ⚠️ It seems you're using Samsung Internet, which does not support some features on this site.
                    For the best experience, we recommend using a different browser.
                </p>
                <p>
                    ⚠️ It seems you're using Samsung Internet, which does not support some features on this site.
                    For the best experience, we recommend using a different browser.
                </p>
            </div>
        </section>
    )
}
