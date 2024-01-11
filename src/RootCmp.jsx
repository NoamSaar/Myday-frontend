import React from 'react'
import { Routes, Route } from 'react-router'

import { BoardDetails } from './pages/BoardDetails'
import { HomePage } from './pages/HomePage'
import { Workspace } from './pages/Workspace'
import { TaskDetails } from './pages/TaskDetails'
import { BoardApp } from './pages/BoardApp'

export function RootCmp() {
    return (
        <section className="app">
            <Routes>

                <Route element={<HomePage />} path="/" />

                <Route element={<BoardApp />} path="/board" >
                    <Route element={<Workspace />} path="/board/workspace" />
                    <Route element={<BoardDetails />} path="/board/:boardId" >
                        <Route path="/board/:boardId/task/:taskId" element={<TaskDetails />} />
                        {/* <Route path="activity_log" element={<ActivityLog />} /> */}
                    </Route>
                </Route>

            </Routes>
        </section>
    )
}


