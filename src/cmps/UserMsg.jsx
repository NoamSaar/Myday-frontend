import { useEffect, useRef } from 'react'

import { setMsg } from "../store/actions/system.actions.js"
import { useSelector } from "react-redux"

// import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from "../services/socket.service.js"

export function UserMsg() {
  const msg = useSelector((storeState) => storeState.systemModule.msg)
  const timeoutIdRef = useRef()

  useEffect(() => {
    if (!msg) return
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = null
    }
    timeoutIdRef.current = setTimeout(closeMsg, 3000)
  }, [msg])
  // useEffect(() => {
  //   const unsubscribe = eventBus.on('show-msg', (msg) => {
  //     setMsg(msg)
  //     window.scrollTo({ top: 0, behavior: 'smooth' })
  //     if (timeoutIdRef.current) {
  //       timeoutIdRef.current = null
  //       clearTimeout(timeoutIdRef.current)
  //     }
  //     timeoutIdRef.current = setTimeout(closeMsg, 3000)
  //   })

  //   // Todo : Add listener for a review added about me
  //   socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (msg) => {
  //     showSuccessMsg(msg)
  //   })

  //   return () => {
  //     unsubscribe()
  //     socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
  //   }
  // }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      <button onClick={closeMsg}>x</button>
      <p>{msg.txt}</p>
    </section>
  )
}