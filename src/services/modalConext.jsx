import { createContext, useContext, useState } from "react"

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [openModal, setOpenModal] = useState(null)

    const open = (modalKey) => {
        setOpenModal(modalKey)
    }

    const close = () => {
        setOpenModal(null)
    }

    return (
        <ModalContext.Provider value={{ openModal, open, close }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}
