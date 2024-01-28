import { useSelector } from 'react-redux'

export function BrowserWarning() {
    const isIncompatibleBrowser = useSelector((storeState) => storeState.systemModule.isIncompatibleBrowser)

    if (!isIncompatibleBrowser) {
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
