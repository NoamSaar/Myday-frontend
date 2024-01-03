import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { Sidebar } from './cmps/Sidebar'
import { TaskDetails } from './pages/TaskDetails'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Sidebar />
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="/board/:boardId/task/:taskId" element={<TaskDetails />} />
                </Routes>
            </main>
        </div>
    )
}


