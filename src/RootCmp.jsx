import React from 'react'
import { Routes, Route } from 'react-router'
import { useSession } from '@supabase/auth-helpers-react'
import 'animate.css';

import { BoardDetails } from './pages/BoardDetails'
import { HomePage } from './pages/HomePage'
import { Workspace } from './pages/Workspace'
import { TaskDetails } from './pages/TaskDetails'
import { BoardApp } from './pages/BoardApp'
import { setIsMobile } from './store/actions/system.actions'
import { useEffect } from 'react'
import { LoginSignup } from './pages/LoginSignup'
import { UserMsg } from './cmps/UserMsg'
import { ActivityLog } from './cmps/Panel/ActivityLog'
import { utilService } from './services/util.service';


export function RootCmp() {
    const session = useSession()

    useEffect(() => {
        window.addEventListener('resize', handleScreenResize)

        return () => {
            window.removeEventListener('resize', handleScreenResize)
        }
    }, [])


    useEffect(() => {
        if (session && session.provider_token) {
            utilService.saveToStorage('provider_token', session.provider_token)
        } else {
            utilService.saveToStorage('provider_token', null)
        }

    }, [session])

    function handleScreenResize() {
        setIsMobile(window.innerWidth <= 905)
    }

    return (
        <section className="app">
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<LoginSignup />} path="/auth/:navLocation" />

                <Route element={<BoardApp />} path="/board" >
                    <Route element={<Workspace />} path="/board/workspace" />
                    <Route element={<BoardDetails />} path="/board/:boardId" >
                        <Route path="/board/:boardId/task/:taskId" element={<TaskDetails />} />
                        <Route path="/board/:boardId/activity_log" element={<ActivityLog />} />
                    </Route>
                </Route>
            </Routes>
            <UserMsg />
        </section>
    )
}


