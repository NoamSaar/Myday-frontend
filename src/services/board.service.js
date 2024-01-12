
import { store } from '../store/store.js'
import { getDefaultBoard } from './boards.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'board/'
const BOARDS_URL = 'boards/'

export const boardService = {
    query,
    getById,
    save,
    remove,
    saveBoards,
    getBoardColors,
    getDefaultFilter,
    addGroup,
    removeGroup,
    updateGroup,
    findGroupIdByTaskId,
    addTask,
    removeTask,
    updateTask,
    getTaskById,
    getNewUpdate,
}
window.boardService = boardService

const gColors = [
    '#ffcb00',
    '#007038',
    '#469e9b',
    '#579bfc',
    '#9aadbd',
    '#bba5e8',
    '#8050ab',
    '#4f3a65',
    '#92334c',
    '#bb3354',
    '#ff7575',
]

async function query() {
    try {
        return await httpService.get(BASE_URL)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting boards')
    }
}

async function getById(boardId) {
    try {
        const returnedBoard = await httpService.get(BASE_URL + boardId)
        return returnedBoard
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
            return await httpService.post(BASE_URL, defaultBoard)
        }
    } catch (err) {
        throw new Error(err.message || 'An err occurred during saving board')
    }
}

async function saveBoards(boards) {
    try {
        return await httpService.post(BOARDS_URL + 'reorder', boards)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during saving board')
    }
}

function getBoardColors() {
    return gColors
}

function getDefaultFilter() {
    return { title: '', txt: '', includedCols: [], member: '' }
}

//group

async function addGroup(boardId) {
    try {
        const board = await getById(boardId)
        board.groups.push(_getDefaultGroup())

        return await save(board)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during adding group')
    }
}

async function removeGroup(boardId, groupId) {
    try {
        const board = await getById(boardId)
        const idx = board.groups.findIndex(group => group.id === groupId)
        if (idx < 0) throw new Error(`Remove failed, cannot find group with id: ${groupId} in: ${board.title}`)
        board.groups.splice(idx, 1)
        return await save(board)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing group')
    }
}

async function updateGroup(boardId, group) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(currgroup => currgroup.id === group.id)

        board.groups.splice(groupIdx, 1, group)
        return await save(board)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing group')
    }
}


function findGroupIdByTaskId(taskId) {
    const currBoard = store.getState().boardModule.currBoard

    if (currBoard) {
        for (const group of currBoard.groups) {
            const taskIndex = group.tasks.findIndex(task => task.id === taskId)
            if (taskIndex !== -1) {
                return group.id
            }
        }
    }
    return null
}

//tasks

async function addTask(boardId, groupId, taskTitle, unshiftTask = false) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const group = board.groups[groupIdx]

        const taskMethod = unshiftTask ? 'unshift' : 'push'
        group.tasks[taskMethod](_getDefaultTask(taskTitle))

        return await save(board)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during adding task')
    }
}

async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let group = board.groups[groupIdx]
        const tasks = group.tasks.filter(task => task.id !== taskId)

        group = { ...group, tasks }
        board.groups.splice(groupIdx, 1, group)

        return await save(board)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing task')
    }
}

async function updateTask(boardId, groupId, task) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        let group = board.groups[groupIdx]
        const tasks = group.tasks.map(currTask => currTask.id === task.id ? task : currTask)

        group = { ...group, tasks }
        board.groups.splice(groupIdx, 1, group)

        return await save(board)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing task')
    }
}

async function getTaskById(boardId, taskId) {
    try {
        const board = await getById(boardId)
        for (const group of board.groups) {
            const taskIdx = group.tasks.findIndex(currTask => currTask.id === taskId)
            if (taskIdx !== -1) {
                return { ...group.tasks[taskIdx] }
            }
        }

        return null
    } catch (error) {
        console.error('Error fetching task:', error)
        throw new Error('Failed to fetch task')
    }
}


// private methods

function _getDefaultGroup() {
    return {
        id: utilService.makeId(),
        title: 'New Group',
        archivedAt: null,
        tasks: [
            {
                id: 'c101',
                title: 'Item 1',
                members: [],
                status: 'l102',
                priority: 'l200',
                date: 1703706909537,
                updates: [],
            },
            {
                id: 'c102',
                title: 'Item 2',
                members: [],
                status: 'l101',
                priority: 'l200',
                date: 1703708909537,
                updates: [],
            },
            {
                id: 'c103',
                title: 'Item 3',
                members: [],
                status: 'l100',
                priority: 'l200',
                date: 1703706909537,
                updates: [],
            },
        ],
        color: '#579bfc',
    }
}

function _getDefaultTask(title) {
    return {
        id: utilService.makeId(),
        title,
        status: 'l100',
        priority: 'l200',
        members: [],
    }
}

function getNewUpdate(txt) {
    return {
        createdAt: Date.now().toString(),
        id: utilService.makeId(),
        likes: [],
        memberId: '659fd52d810c3f98c2054719',
        // memberId: userService.getLoggedinUser(),
        txt,
    }
}