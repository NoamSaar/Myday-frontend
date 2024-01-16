import { ArrowRightColoredIcon, ArrowRightIcon } from "../../services/svg.service"

export function IntegrationList({ integrations, isDisabled, handleSwitchChange }) {
    return (
        <ul className="clean-list integration-list">
            {integrations.map((integration, idx) => {
                return <li key={idx} className={`${isDisabled && 'disabled'} flex column align-center integration-container`}>
                    <div className="flex column  justify-center info-container">
                        <div className="flex flow-container">
                            <div className="flex align-center justify-center icon-container">
                                <img className="logo" src="/img/myday-temp-logo.png" />
                            </div>
                            <div className="flex align-center justify-center arrow-container">
                                <ArrowRightColoredIcon />
                            </div>
                            <div className="flex align-center justify-center icon-container">
                                {integration.icon}
                            </div>
                        </div>

                        <p>{integration.txt}</p>
                    </div>

                    <button
                        disabled={isDisabled}
                        onClick={() => handleSwitchChange(!integration.isChecked, integration.name)}
                        className={`btn flex justify-center ${integration.isChecked && 'checked'}`}>
                        {integration.isChecked ? 'Remove Integration' : 'Add Integration'}
                    </button>
                </li>
            })}
        </ul>
    )
}
