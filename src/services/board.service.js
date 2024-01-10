
// import { storageService } from './async-storage.service.js'
import { getDefaultBoard } from './boards.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'

const BASE_URL = 'board/'

export const boardService = {
    query,
    getById,
    save,
    remove,
    saveTask,
}
window.cs = boardService

async function query(filterBy = { title: '' }) {
    try {
        return await httpService.get(BASE_URL, filterBy)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting boards')
    }
}

async function getById(boardId) {
    try {
        return await httpService.get(BASE_URL + boardId)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting board')
    }
}

async function remove(boardId) {
    try {
        return await httpService.delete(BASE_URL + boardId)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing board')
    }
}

async function save(board) {
    try {
        if (board) {
            return await httpService.put(BASE_URL, board)
        } else {
            const defaultBoard = getDefaultBoard()
            defaultBoard.createdBy = userService.getLoggedinUser()
            return await httpService.post(BASE_URL, board)
        }
    } catch (err) {

        throw new Error(err.message || 'An err occurred during saving board')
    }
}

function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    // PUT /api/board/b123/task/t678

    // TODO: find the task, and update
    board.activities.unshift(activity)
    saveBoard(board)
    // return board
    // return task
}



