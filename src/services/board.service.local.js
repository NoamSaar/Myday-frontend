
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
}

window.boardService = boardService

async function query(filterBy = { txt: '' }) {
    let boards = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.title))
    }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    let savedBoard
    if (board) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        const defaultBoard = _getDefaultBoard()
        defaultBoard.createdBy = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, defaultBoard)
    }
    return savedBoard
}

// async function addBoardMsg(boardId, txt) {
//     // Later, this is all done by the backend
//     const board = await getById(boardId)
//     if (!board.msgs) board.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     board.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, board)

//     return msg
// }

function _getDefaultBoard() {
    return {
        title: 'My board',
        isStarred: false,
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




