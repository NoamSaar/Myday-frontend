import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { Sidebar } from './cmps/Sidebar'
import { TaskDetails } from './pages/TaskDetails'
import { BoardDetails } from './pages/BoardDetails'
import { HomePage } from './pages/HomePage'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                {/* home! */}
                {/* board app */}
                <Sidebar />
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<BoardDetails />} path="/board/:boardId" >
                        <Route path="/board/:boardId/task/:taskId" element={<TaskDetails />} />
                    </Route>
                </Routes>
            </main>
        </div>
    )
}


