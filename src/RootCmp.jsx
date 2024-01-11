import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { Sidebar } from './cmps/Sidebar/Sidebar'
import { BoardDetails } from './pages/BoardDetails'
import { HomePage } from './pages/HomePage'
import { Workspace } from './pages/Workspace'
import { DynamicModal } from './cmps/DynamicModal'
import { TaskDetails } from './pages/TaskDetails'

export function RootCmp() {
    // const { type } = useSelector((storeState) => storeState.systemModule.sidePanelData)

    return (
        <div className="main-layout grid">
            <AppHeader />
            <main className="content-container grid column">
                {/* home */}
                {/* board app */}
                <Sidebar />
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<Workspace />} path="/workspace" />
                    {/* <Route element={<BoardDetails />} path="/board" > */}
                    <Route element={<BoardDetails />} path="/board/:boardId" >
                        <Route path="task/:taskId" element={<TaskDetails />} />
                        {/* <Route path="activity_log" element={<ActivityLog />} /> */}
                    </Route>
                </Routes>
            </main>
            <DynamicModal />

        </div>
    )
}


