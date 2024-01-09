import { boardService } from '../../services/board.service.local.js'
// import { userService } from '../services/user.service.js'
import { store } from '../store.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_CURR_BOARD, SET_BOARDS, SET_IS_HEADER_COLLAPSED, UPDATE_BOARD, SET_FILTER_BY, SET_ACTIVE_TASK } from '../reducers/board.reducer.js'
import { setIsLoading } from './system.actions.js'


// Store - saveTask (from board.js)
// function storeSaveTask(boardId, groupId, task, activity) {

//     board = boardService.saveTask(boardId, groupId, task, activity)
//     // commit(ACTION) // dispatch(ACTION)
// }

// function updateTask(cmpType, data) {
// Switch by cmpType
// case MEMBERS:
//    task.members = data
//    activity = boardService.getEmptyActivity()
//    activity.txt = `Members changed for task ${}`
//    activity.task = '{mini-task}'
// case STATUS:
//    task.status = data

// dispatch to store: updateTask(task, activity)
// }



/**************** board actions ****************/

//maybe needs getAction as the rest for consistency?
export async function loadBoards() {
    try {
        const filterBy = store.getState().boardModule.filterBy
        const boards = await boardService.query(filterBy)
        store.dispatch(getActionSetBoards(boards))
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const filterBy = store.getState().boardModule.filterBy
        const board = await boardService.getById(boardId, filterBy)
        setCurrBoard(board)
        return board
    } catch (error) {
        console.log('Had issues in board details', error)
        throw error
    } finally {
        setIsLoading(false)
    }
}

export async function getBoardById(boardId) {
    try {
        const board = await boardService.getById(boardId)
        return board
    } catch (error) {
        console.log('Had issues in board details', error)
        throw error
    }
}

export async function saveBoards(boards) {
    try {
        await boardService.saveBoards(boards)
        store.dispatch(getActionSetBoards(boards))
    } catch (err) {
        console.log('Cannot save boards', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getActionRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export function getMembersFromBoard(board, members) {
    return members.map(member => getMemberFromBoard(board, member))
}

export function getMemberFromBoard(board, memberId) {
    return board.members.find(member => member._id === memberId)
}

//not working currently on the store!
export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        setCurrBoard(board)
        store.dispatch(getActionAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        // console.log('Updated Board:', savedBoard)
        store.dispatch(getActionUpdateBoard(savedBoard))

        const currBoardId = store.getState().boardModule.currBoard._id
        if (savedBoard._id === currBoardId) {
            // console.log('this is curr board!')
            setCurrBoard(savedBoard)
        }

        return savedBoard

    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

// export async function updateBoard(board) {
//     try {
//         loadBoard(board._id)
//         // setCurrBoard(savedBoard)
//         const savedBoard = await boardService.save(board)
//         // console.log('Updated Board:', savedBoard)
//         store.dispatch(getActionUpdateBoard(savedBoard))

//         // const currBoardId = store.getState().boardModule.currBoard._id
//         // if (savedBoard._id === currBoardId) {
//         //     // console.log('this is curr board!')
//         // }

//         return savedBoard

//     } catch (err) {
//         console.log('Cannot save board', err)
//         throw err
//     }
// }

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setIsHeaderCollapsed(isCollapsed) {
    store.dispatch({ type: SET_IS_HEADER_COLLAPSED, isCollapsed })
}

export function getBoardColors() {
    return boardService.getBoardColors()
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveBoardOptimistic(boardId) {
//     store.dispatch({
//         type: REMOVE_BOARD,
//         boardId
//     })
//     showSuccessMsg('Board removed')

//     boardService.remove(boardId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully')
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove board')
//             console.log('Cannot load boards', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_BOARD,
//             })
//         })
// }

export function setCurrBoard(board) {
    store.dispatch({ type: SET_CURR_BOARD, board })
}

/**************** group actions ****************/

export async function addGroup(boardId) {
    try {
        const board = await boardService.addGroup(boardId)
        setCurrBoard(board)
        store.dispatch(getActionUpdateBoard(board))
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')
    }

}

export async function removeGroup(boardId, groupId) {
    try {
        const board = await boardService.removeGroup(boardId, groupId)
        setCurrBoard(board)
        store.dispatch(getActionUpdateBoard(board))
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')
    }

}

export async function updateGroup(boardId, group) {
    const board = await boardService.updateGroup(boardId, group)
    setCurrBoard(board)
    store.dispatch(getActionUpdateBoard(board))
}


/**************** task actions ****************/

export async function addTask(boardId, groupId, taskTitle, unshiftTask = false) {
    try {
        const board = await boardService.addTask(boardId, groupId, taskTitle, unshiftTask)
        setCurrBoard(board)
        store.dispatch(getActionUpdateBoard(board))

        const groupIdx = unshiftTask ? 0 : board.groups.findIndex(group => group.id === groupId)
        const newTaskIdx = unshiftTask ? 0 : board.groups[groupIdx].tasks.length - 1
        const newTaskId = board.groups[groupIdx].tasks[newTaskIdx].id
        setActiveTask(newTaskId)

        return board
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')
    }

}

export async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await boardService.removeTask(boardId, groupId, taskId)
        setCurrBoard(board)
        store.dispatch(getActionUpdateBoard(board))
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')
    }
}

export async function updateTask(boardId, groupId, task) {
    const board = await boardService.updateTask(boardId, groupId, task)
    setCurrBoard(board)
    store.dispatch(getActionUpdateBoard(board))
}

export function setActiveTask(taskId) {
    store.dispatch(getActionSetActiveTask(taskId))
}


/**************** get actions ****************/

export function getActionRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}

export function getActionAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}

export function getActionUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

export function getActionSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}

export function getActionSetActiveTask(taskId) {
    return {
        type: SET_ACTIVE_TASK,
        taskId
    }
}



