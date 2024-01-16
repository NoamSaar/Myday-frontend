
export function IntegrationList({ integrations, isDisabled, handleSwitchChange }) {
    return (
        <ul className="clean-list integration-list">
            {integrations.map((integration, idx) => {
                return <li key={idx} className={`${isDisabled && 'disabled'} flex column align-center justify-center integration-container`}>
                    <div className="flex align-center justify-center info-container">
                        {integration.icon}
                        <p>{integration.txt}</p>
                    </div>

                    <label className="switch">
                        <input disabled={isDisabled} type="checkbox" checked={integration.isChecked} onChange={ev => handleSwitchChange(ev, integration.name)} />
                        <span className="slider round"></span>
                    </label>
                </li>
            })}
        </ul>
    )
}
