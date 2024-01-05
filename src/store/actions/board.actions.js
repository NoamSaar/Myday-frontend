import { boardService } from '../../services/board.service.local.js'
// import { userService } from '../services/user.service.js'
import { store } from '../store.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD } from '../reducers/board.reducer.js'

// Store - saveTask (from board.js)
// function storeSaveTask(boardId, groupId, task, activity) {

//     board = boardService.saveTask(boardId, groupId, task, activity)
//     // commit(ACTION) // dispatch(ACTION)
// }




// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}

export function getActionAddBoard() {
    return {
        type: ADD_BOARD,
    }
}

export function getActionUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        // console.log('Boards from DB:', boards)
        store.dispatch({
            type: SET_BOARDS,
            boards
        })

    } catch (err) {
        console.log('Cannot load boards', err)
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

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Added Board', savedBoard)
        store.dispatch(getActionAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export function updateBoard(board) {
    return boardService.save(board)
        .then(savedBoard => {
            console.log('Updated Board:', savedBoard)
            store.dispatch(getActionUpdateBoard(savedBoard))
            return savedBoard
        })
        .catch(err => {
            console.log('Cannot save board', err)
            throw err
        })
}



// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {
    store.dispatch({
        type: REMOVE_BOARD,
        boardId
    })
    showSuccessMsg('Board removed')

    boardService.remove(boardId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove board')
            console.log('Cannot load boards', err)
            store.dispatch({
                type: UNDO_REMOVE_BOARD,
            })
        })
}



export function setCurBoard(board) {
    store.dispatch({ type: SET_BOARD, board })
}

//groups

export async function addGroup(boardId) {
    try {
        const board = await boardService.addGroup(boardId)
        setCurBoard(board)
        store.dispatch(getActionUpdateBoard(board))
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')
    }

}

export async function removeGroup(boardId, groupId) {
    try {
        const board = await boardService.removeGroup(boardId, groupId)
        setCurBoard(board)
        store.dispatch(getActionUpdateBoard(board))
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')
    }

}

//tasks

export async function addTask(boardId, groupId, taskTitle) {
    try {
        const board = await boardService.addTask(boardId, groupId, taskTitle)
        setCurBoard(board)
        store.dispatch(getActionUpdateBoard(board))
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')
    }

}

export async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await boardService.removeTask(boardId, groupId, taskId)
        setCurBoard(board)
        store.dispatch(getActionUpdateBoard(board))
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')
    }

}

export async function updateTask(boardId, groupId, task) {
    const board = await boardService.updateTask(boardId, groupId, task)
    setCurBoard(board)
    store.dispatch(getActionUpdateBoard(board))



    // switch (cmpType) {

    //     case 'title':
    //         task.title = data
    //         break;

    //     case 'members':
    //         task.person = data
    //         break;

    //     case 'status':
    //         task.status = data
    //         break;

    //     case 'priority':
    //         task.priority = data
    //         break;

    //     case 'file':
    //         task.file = data
    //         break;

    //     case 'link':
    //         task.link = data
    //         break;

    //     default:
    //         break;
    // }
}