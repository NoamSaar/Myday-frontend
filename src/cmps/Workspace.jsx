import React from 'react'
import { HomeBlackFillIcon } from '../services/svg.service'

export default function Workspace() {
    return (
        <div className="workspace grid column">
            <div className="workspace-logo flex justify-center align-center">
                M
                <div className="home-icon"><HomeBlackFillIcon /></div>
            </div>

            <span>Main workspace</span>
        </div>
    )
}
