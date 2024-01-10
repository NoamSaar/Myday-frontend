import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { Sidebar } from './cmps/Sidebar/Sidebar'
import { TaskDetails } from './pages/TaskDetails'
import { BoardDetails } from './pages/BoardDetails'
import { HomePage } from './pages/HomePage'
import { Workspace } from './pages/Workspace'
import { DynamicAbsoluteModal } from './cmps/DynamicAbsoluteModal'

export function RootCmp() {

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
                        <Route path="/board/:boardId/task/:taskId" element={<TaskDetails />} />
                    </Route>
                </Routes>
            </main>
            <DynamicAbsoluteModal />
        </div>
    )
}


