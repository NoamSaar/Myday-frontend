import { storageService } from './async-storage.service.js'
import { getBoardsData, getDefaultBoard } from './boards.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getById,
    save,
    saveBoards,
    remove,
    addTask,
    removeTask,
    updateTask,
    addGroup,
    removeGroup,
    updateGroup,
    getDefaultFilter,
    getBoardColors
}

window.boardService = boardService

const gBoards = getBoardsData()
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

_initBoards()

async function query(filterBy = { title: '' }) {
    try {
        let boards = await storageService.query(STORAGE_KEY)
        if (filterBy.title) {
            const regex = new RegExp(filterBy.title, 'i')
            boards = boards.filter(board => regex.test(board.title))
        }
        return boards
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting boards')
    }
}

async function getById(boardId) {
    try {
        let board = await storageService.get(STORAGE_KEY, boardId)
        return board
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting board')
    }
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    try {
        if (board) {
            return await storageService.put(STORAGE_KEY, board)
        } else {
            const defaultBoard = getDefaultBoard()
            return await storageService.post(STORAGE_KEY, defaultBoard)
        }
    } catch (err) {
        throw new Error(err.message || 'An err occurred during saving board')
    }
}

async function saveBoards(boards) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
    } catch (err) {
        throw new Error(err.message || 'An err occurred during saving boards')
    }
}

function getDefaultFilter() {
    return { title: '', txt: '', includedCols: [], member: '' }
}

function getBoardColors() {
    return gColors
}

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
                status: 'Working on it',
                date: 1703706909537,
                updates: [],
            },
            {
                id: 'c102',
                title: 'Item 2',
                members: [],
                status: 'Done',
                date: 1703708909537,
                updates: [],
            },
            {
                id: 'c103',
                title: 'Item 3',
                members: [],
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
        members: [],
        updates: [],
    }
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

//private

function _initBoards() {
    const boardsFromStorage = localStorage.getItem(STORAGE_KEY)
    if (boardsFromStorage && boardsFromStorage.length) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(gBoards))
}