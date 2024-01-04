
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'


const BASE_URL = 'board/'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getDefaultBoard,
    saveTask,
}
window.cs = boardService


async function query(filterBy = { title: '' }) {
    try {
        return await httpService.get(BASE_URL, filterBy)
    } catch (error) {
        throw new Error(error.message || 'An error occurred during getting boards')

    }
}

async function getById(boardId) {
    try {
        return await httpService.get(BASE_URL + boardId)
    } catch (error) {
        throw new Error(error.message || 'An error occurred during getting board')

    }
}

async function remove(boardId) {
    try {
        return await httpService.delete(BASE_URL + boardId)

    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing board')

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
    } catch (error) {

        throw new Error(error.message || 'An error occurred during saving board')
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


function getDefaultBoard() {
    return {
        title: 'New Board',
        isStarred: false,
        archivedAt: null,
        status: [
            {
                id: 'l100',
                color: '#c4c4c4',
            },
            {
                id: 'l101',
                title: 'Done',
                color: '#00c875',
            },
            {
                id: 'l102',
                title: 'Working on it',
                color: '#fdab3d',
            },
            {
                id: 'l103',
                title: 'Stuck',
                color: '#e2445c',
            },
            {
                id: 'l104',
                title: 'Needs QA',
                color: '#faa1f1',
            },
        ],
        priority: [
            {
                id: 'l200',
                color: '#c4c4c4',
            },
            {
                id: 'l201',
                title: 'Critical',
                color: '#333333',
            },
            {
                id: 'l202',
                title: 'High',
                color: '#401694',
            },
            {
                id: 'l203',
                title: 'Medium',
                color: '#5559df',
            },
            {
                id: 'l204',
                title: 'Low',
                color: '#579bfc',
            },
        ],
        members: [
            {
                _id: 'u101',
                fullname: 'Eden Rize',
                imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
            },
            {
                _id: 'u102',
                fullname: 'Mor Marzan',
            },
            {
                _id: 'u103',
                fullname: 'Noam Saar',
                imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',
            },
        ],
        groups: [
            {
                id: 'g101',
                title: 'Group Title',
                archivedAt: null,
                tasks: [
                    {
                        id: 'c101',
                        title: 'Item 1',
                        person: [user._id],
                        status: 'Working on it',
                        date: 1703706909537,
                        updates: [],
                    },
                    {
                        id: 'c102',
                        title: 'Item 2',
                        person: [],
                        status: 'Done',
                        date: 1703708909537,
                        updates: [],
                    },
                    {
                        id: 'c103',
                        title: 'Item 3',
                        person: [],
                        date: 1703706909537,
                        updates: [],
                    },
                ],
                color: '#579bfc',
            },
            {
                id: 'g102',
                title: 'Group Title',
                archivedAt: null,
                tasks: [
                    {
                        id: 'c201',
                        title: 'Item 4',
                        person: [user._id],
                        date: 1703706909537,
                        updates: [],
                    },
                    {
                        id: 'c202',
                        title: 'Item 5',
                        person: [],
                        date: 1703708909537,
                        updates: [],
                    },

                ],
                color: '#a25ddc',
            },
        ],
        activities: [],
        // activities: [
        //     {
        //         id: 'a999',
        //         txt: 'Changed Color',
        //         createdAt: 1704306285659,
        //         byMember: user,
        //         group: {
        //             id: 'g101',
        //             title: 'Features',
        //         },
        //         task: {
        //             id: 'c101',
        //             title: 'Add chat',
        //         },
        //     },
        //     {
        //         id: 'a1000',
        //         txt: 'Change color',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g101',
        //             title: 'Features',
        //         },
        //         task: {
        //             id: 'c101',
        //             title: 'Add chat',
        //         },
        //     },
        //     {
        //         id: 'a1001',
        //         txt: 'Add file',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g101',
        //             title: 'Features',
        //         },
        //         task: {
        //             id: 'c102',
        //             title: 'Add paging',
        //         },
        //     },
        //     {
        //         id: 'a1002',
        //         txt: 'Add file',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g103',
        //             title: 'Bugs',
        //         },
        //         task: {
        //             id: 'c301',
        //             title: 'Unresponsive Button on Click',
        //         },
        //     },
        //     {
        //         id: 'a1003',
        //         txt: 'Change date',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g102',
        //             title: 'Refactor',
        //         },
        //         task: {
        //             id: 'c205',
        //             title: 'Refactor service to use http',
        //         },
        //     },
        //     {
        //         id: 'a1004',
        //         txt: 'Create',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g101',
        //             title: 'Features',
        //         },
        //         task: {
        //             id: 'c103',
        //             title: 'Add about puki page',
        //         },
        //     },
        //     {
        //         id: 'a1005',
        //         txt: 'Add file',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g102',
        //             title: 'Refactor',
        //         },
        //         task: {
        //             id: 'c203',
        //             title: 'Refactor to use Store Redux',
        //         },
        //     },
        //     {
        //         id: 'a1006',
        //         txt: 'Change status',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g101',
        //             title: 'Features',
        //         },
        //         task: {
        //             id: 'c103',
        //             title: 'Add about puki page',
        //         },
        //     },
        //     {
        //         id: 'a1007',
        //         txt: 'Change color',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g101',
        //             title: 'Features',
        //         },
        //         task: {
        //             id: 'c102',
        //             title: 'Add paging',
        //         },
        //     },
        //     {
        //         id: 'a1008',
        //         txt: 'Change color',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g102',
        //             title: 'Refactor',
        //         },
        //         task: {
        //             id: 'c201',
        //             title: 'Reactor css files to scss',
        //         },
        //     },
        //     {
        //         id: 'a1009',
        //         txt: 'Change date',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g102',
        //             title: 'Refactor',
        //         },
        //         task: {
        //             id: 'c205',
        //             title: 'Refactor service to use http',
        //         },
        //     },
        //     {
        //         id: 'a1010',
        //         txt: 'Add file',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g101',
        //             title: 'Features',
        //         },
        //         task: {
        //             id: 'c103',
        //             title: 'Add about puki page',
        //         },
        //     },
        //     {
        //         id: 'a1011',
        //         txt: 'Create',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g101',
        //             title: 'Features',
        //         },
        //         task: {
        //             id: 'c103',
        //             title: 'Add about puki page',
        //         },
        //     },
        //     {
        //         id: 'a1012',
        //         txt: 'Change status',
        //         createdAt: 1704308766516,
        //         byMember: user,
        //         group: {
        //             id: 'g102',
        //             title: 'Refactor',
        //         },
        //         task: {
        //             id: 'c205',
        //             title: 'Refactor service to use http',
        //         },
        //     },
        // ],
        titlesOrder: ['Person', 'Status', 'Date'],

    }
}








