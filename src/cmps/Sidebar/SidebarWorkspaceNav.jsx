import { useRef } from "react"
import { FilledStarIcon, MenuIcon } from "../../services/svg.service"
import WorkspaceDisplay from "../WorkspaceDisplay"
import { resetDynamicModal, setDynamicModal } from "../../store/actions/system.actions"
import { useSelector } from "react-redux"
import FavoriteDisplay from "../FavoriteDisplay"

export function SidebarWorkspaceNav({ boardsToDisplay, dynFavoriteClass }) {
    const menuBtnRef = useRef(null)
    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const isMenuOpen = parentId === 'sidebar-workspace-menu'

    function onShowFavorites() {
        boardsToDisplay('favorites')
    }

    function onShowAllBoards() {
        boardsToDisplay('all')
    }

    function toggleMenu() {
        if (isMenuOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: menuBtnRef.current,
                parentId: 'sidebar-workspace-menu',
                type: 'menuOptions',
                data: { options: menuOptions },
                isPosBlock: true
            })
        }
    }

    const menuOptions = [
        {
            icon: <WorkspaceDisplay />,
            title: '',
            onOptionClick: onShowAllBoards
        },
        {
            icon: <FilledStarIcon />,
            title: 'Favorites',
            onOptionClick: onShowFavorites
        }
    ]

    const style = { position: 'relative' }
    return (
        <>
            <section className="sidebar-workspace-nav flex align-center">
                {(dynFavoriteClass === 'favorite') ?
                    <FavoriteDisplay />
                    :
                    <WorkspaceDisplay />
                }
            </section>
            <button
                className="btn btn-option-menu svg-inherit-color"
                onClick={toggleMenu}
                style={style}
                ref={menuBtnRef}
                title="Board Menu"
            >
                <MenuIcon />
            </button>
        </>
    )
}