
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

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
    getGcolors

}

window.boardService = boardService
const gBoards = [
    {
        _id: 'b101',
        title: 'Frontend',
        isStarred: false,
        archivedAt: null,
        createdBy: {
            _id: 'u101',
            fullname: 'Eden Rize',
            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
        },
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
                title: 'Features',
                archivedAt: null,
                tasks: [
                    {
                        id: 'c101',
                        title: 'Add chat',
                        person: ['u103'],
                        status: 'Stuck',
                        priority: 'Low',
                        date: 1703706909537,
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704302004/Screenshot_2024-01-03_113623_igieu2.png',
                        link: {
                            url: 'https://socket.io/get-started/chat',
                            displayTxt: 'Sockets docs',
                        },
                        updates: [
                            {
                                id: 'u123',
                                memberId: 'u101',
                                createdAt: 1704302734753,
                                txt: 'Init socket service 👍',
                                likes: [],
                            },
                        ],
                    },
                    {
                        id: 'c102',
                        title: 'Add paging',
                        person: ['u102', 'u103'],
                        status: 'Needs QA',
                        priority: 'Medium',
                        date: 1704241608991,
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704303178/Screenshot_2024-01-03_113811_kqd5pv.png',
                        link: {
                            url: 'https://www.turing.com/kb/implementing-javascript-pagination',
                            displayTxt: 'How to page',
                        },
                        updates: [],
                    },
                    {
                        id: 'c103',
                        title: 'Add about puki page',
                        person: ['u101'],
                        status: 'Working on it',
                        priority: 'High',
                        updates: [
                            {
                                id: 'u555',
                                memberId: 'u101',
                                createdAt: 1704303445060,
                                txt: 'Research about puki',
                                likes: ['u102'],
                            },
                        ],
                    },
                ],
                color: '#579bfc',
            },
            {
                id: 'g102',
                title: 'Refactor',
                archivedAt: null,
                tasks: [
                    {
                        id: 'c201',
                        title: 'Reactor css files to scss',
                        person: ['u101', 'u103'],
                        status: 'Working on it',
                        priority: 'High',
                        date: 1704074068766,
                        link: {
                            url: 'https://bryanlrobinson.com/blog/refactoring-css-into-sass-mixin/',
                        },
                        updates: [
                            {
                                id: 'u127',
                                memberId: 'u103',
                                createdAt: 1704303744452,
                                txt: 'Added the imports, missing the vars',
                                likes: ['u101'],
                            },
                        ],
                    },
                    {
                        id: 'c202',
                        title: 'Refactor Filter.jsx into Components and change imports',
                        person: [],
                        status: 'Needs QA',
                        priority: 'Medium',
                        updates: [],
                    },
                    {
                        id: 'c203',
                        title: 'Refactor to use Store Redux',
                        person: ['u101', 'u102', 'u103'],
                        status: 'Stuck',
                        priority: 'Critical',
                        date: 1703703756181,
                        link: {
                            url: 'https://redux.js.org/',
                        },
                        updates: [
                            {
                                id: 'u777',
                                memberId: 'u103',
                                createdAt: 1704304108853,
                                txt: "i've begun the refactor but couldn't figure out how to use the dispatch. @Mor Marzan",
                                likes: [],
                            },
                        ],
                    },
                    {
                        id: 'c204',
                        title: 'Refactor vars/lets to const',
                        person: ['u102'],
                        status: 'Done',
                        date: 1703720101090,
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704304383/large-Screenshot_2024-01-03_at_11.35.48_qclnrt.png',
                        updates: [],
                    },
                    {
                        id: 'c205',
                        title: 'Refactor service to use http',
                        person: ['u103'],
                        priority: 'Low',
                        date: 1703728412860,
                        updates: [],
                    },
                ],
                color: '#bb3354',
            },
            {
                id: 'g103',
                title: 'Bugs',
                archivedAt: null,
                tasks: [
                    {
                        id: 'c301',
                        title: 'Unresponsive Button on Click',
                        person: ['u102'],
                        status: 'Done',
                        priority: 'Critical',
                        date: 1703785617881,
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704305129/large-Screenshot_2024-01-03_at_11.39.56_dx6zkv.png',
                        link: {
                            url: 'https://stackoverflow.com/questions/22776702/unresponsive-button-after-calling-javascript',
                            displayTxt: 'Unresponsive button after calling javascript',
                        },
                        updates: [
                            {
                                id: 'u157',
                                memberId: 'u102',
                                createdAt: 1704305297046,
                                txt: 'Desperate here, needs help! @Eden Rize',
                                likes: ['u101'],
                                comments: [
                                    {
                                        id: 'u457',
                                        memberId: 'u101',
                                        createdAt: 1704305400521,
                                        txt: 'Done 😄',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'c302',
                        title: 'Misaligned Layout on Mobile Devices',
                        person: ['u101', 'u102'],
                        status: 'Working on it',
                        priority: 'Low',
                        date: 1703894345657,
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704305602/large-Screenshot_2024-01-03_at_11.48.45_tomxco.png',
                        link: {
                            url: 'https://stackoverflow.com/questions/29740966/layout-distorted-when-viewed-on-mobile',
                            displayTxt: 'Layout distorted when viewed on mobile',
                        },
                        updates: [],
                    },
                    {
                        id: 'c303',
                        title: 'Broken Image Links',
                        person: ['u103'],
                        status: 'Working on it',
                        priority: 'Low',
                        updates: [],
                    },
                    {
                        id: 'c304',
                        title: 'Inconsistent Styling Across Browsers',
                        person: ['u102'],
                        status: 'Done',
                        priority: 'High',
                        date: 1703995874889,
                        updates: [],
                    },
                    {
                        id: 'c305',
                        title: 'Slow Page Load Times',
                        person: ['u101'],
                        status: 'Needs QA',
                        priority: 'Critical',
                        date: 1704299392298,
                        updates: [],
                    },
                ],
                color: '#8050ab',
            },
        ],
        activities: [
            {
                id: 'a999',
                txt: 'Changed Color',
                createdAt: 1704306285659,
                byMember: {
                    _id: 'u101',
                    fullname: 'Eden Rize',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c101',
                    title: 'Add chat',
                },
            },
            {
                id: 'a1000',
                txt: 'Change color',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u101',
                    fullname: 'Eden Rize',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c101',
                    title: 'Add chat',
                },
            },
            {
                id: 'a1001',
                txt: 'Add file',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u102',
                    fullname: 'Mor Marzan',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c102',
                    title: 'Add paging',
                },
            },
            {
                id: 'a1002',
                txt: 'Add file',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u103',
                    fullname: 'Noam Saar',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',
                },
                group: {
                    id: 'g103',
                    title: 'Bugs',
                },
                task: {
                    id: 'c301',
                    title: 'Unresponsive Button on Click',
                },
            },
            {
                id: 'a1003',
                txt: 'Change date',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u103',
                    fullname: 'Noam Saar',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',
                },
                group: {
                    id: 'g102',
                    title: 'Refactor',
                },
                task: {
                    id: 'c205',
                    title: 'Refactor service to use http',
                },
            },
            {
                id: 'a1004',
                txt: 'Create',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u103',
                    fullname: 'Noam Saar',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c103',
                    title: 'Add about puki page',
                },
            },
            {
                id: 'a1005',
                txt: 'Add file',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u102',
                    fullname: 'Mor Marzan',
                },
                group: {
                    id: 'g102',
                    title: 'Refactor',
                },
                task: {
                    id: 'c203',
                    title: 'Refactor to use Store Redux',
                },
            },
            {
                id: 'a1006',
                txt: 'Change status',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u101',
                    fullname: 'Eden Rize',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c103',
                    title: 'Add about puki page',
                },
            },
            {
                id: 'a1007',
                txt: 'Change color',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u102',
                    fullname: 'Mor Marzan',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c102',
                    title: 'Add paging',
                },
            },
            {
                id: 'a1008',
                txt: 'Change color',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u102',
                    fullname: 'Mor Marzan',
                },
                group: {
                    id: 'g102',
                    title: 'Refactor',
                },
                task: {
                    id: 'c201',
                    title: 'Reactor css files to scss',
                },
            },
            {
                id: 'a1009',
                txt: 'Change date',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u103',
                    fullname: 'Noam Saar',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',
                },
                group: {
                    id: 'g102',
                    title: 'Refactor',
                },
                task: {
                    id: 'c205',
                    title: 'Refactor service to use http',
                },
            },
            {
                id: 'a1010',
                txt: 'Add file',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u101',
                    fullname: 'Eden Rize',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c103',
                    title: 'Add about puki page',
                },
            },
            {
                id: 'a1011',
                txt: 'Create',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u103',
                    fullname: 'Noam Saar',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c103',
                    title: 'Add about puki page',
                },
            },
            {
                id: 'a1012',
                txt: 'Change status',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u102',
                    fullname: 'Mor Marzan',
                },
                group: {
                    id: 'g102',
                    title: 'Refactor',
                },
                task: {
                    id: 'c205',
                    title: 'Refactor service to use http',
                },
            },
            {
                id: 'a1013',
                txt: 'Change date',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u101',
                    fullname: 'Eden Rize',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                },
                group: {
                    id: 'g102',
                    title: 'Refactor',
                },
                task: {
                    id: 'c203',
                    title: 'Refactor to use Store Redux',
                },
            },
            {
                id: 'a1014',
                txt: 'Add person',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u103',
                    fullname: 'Noam Saar',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',
                },
                group: {
                    id: 'g102',
                    title: 'Refactor',
                },
                task: {
                    id: 'c202',
                    title: 'Refactor Filter.jsx into Components',
                },
            },
            {
                id: 'a1015',
                txt: 'Change status',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u103',
                    fullname: 'Noam Saar',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',
                },
                group: {
                    id: 'g102',
                    title: 'Refactor',
                },
                task: {
                    id: 'c201',
                    title: 'Reactor css files to scss',
                },
            },
            {
                id: 'a1016',
                txt: 'Change date',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u101',
                    fullname: 'Eden Rize',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                },
                group: {
                    id: 'g102',
                    title: 'Refactor',
                },
                task: {
                    id: 'c201',
                    title: 'Reactor css files to scss',
                },
            },
            {
                id: 'a1017',
                txt: 'Change status',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u101',
                    fullname: 'Eden Rize',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                },
                group: {
                    id: 'g103',
                    title: 'Bugs',
                },
                task: {
                    id: 'c304',
                    title: 'Inconsistent Styling Across Browsers',
                },
            },
            {
                id: 'a1018',
                txt: 'Change color',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u101',
                    fullname: 'Eden Rize',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c101',
                    title: 'Add chat',
                },
            },
            {
                id: 'a1019',
                txt: 'Change status',
                createdAt: 1704308766516,
                byMember: {
                    _id: 'u102',
                    fullname: 'Mor Marzan',
                },
                group: {
                    id: 'g103',
                    title: 'Bugs',
                },
                task: {
                    id: 'c304',
                    title: 'Inconsistent Styling Across Browsers',
                },
            },
        ],
        titlesOrder: ['person', 'status', 'priority', 'date', 'file', 'link'],
    },
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
    } catch (error) {
        throw new Error(error.message || 'An error occurred during getting boards')
    }

}

async function getById(boardId, filterBy = { txt: '', includedCols: [], member: '' }) {
    // console.log("Received arguments getById:", arguments)
    try {
        let board = await storageService.get(STORAGE_KEY, boardId)
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            board.groups = board.groups.filter(group => {
                group.tasks = group.tasks.filter(task => regex.test(task.title))
                // Return groups that have matching title or have at least one matching task title
                return regex.test(group.title) || group.tasks.length > 0
            })
        }
        if (filterBy.member) {
            board.groups = board.groups.map(group => {
                group.tasks = group.tasks.filter(task => {
                    return task.person.some(currPerson => filterBy.member === currPerson) //person is array! its items are ids
                })
                return group
            })
        }
        return board
    } catch (error) {
        throw new Error(error.message || 'An error occurred during getting board')
    }
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    try {
        if (board) {
            return await storageService.put(STORAGE_KEY, board)
        } else {
            const defaultBoard = _getDefaultBoard()
            return await storageService.post(STORAGE_KEY, defaultBoard)
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred during saving board')

    }
}

async function saveBoards(boards) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
    } catch (error) {
        throw new Error(error.message || 'An error occurred during saving boards')
    }
}

function getDefaultFilter() {
    return { title: '', txt: '', includedCols: [], member: '' }
}

function getGcolors() {
    return gColors
}

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

function _getDefaultBoard() {
    // const user = userService.getLoggedinUser()
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
                        title: 'item 1',
                        person: [],
                        status: 'Working on it',
                        priority: 'High',
                        date: 1703705909537,
                        link: {
                            url: 'https://redux.js.org/',
                        },
                        updates: [],
                    },
                    {
                        id: 'c102',
                        title: 'Item 2',
                        person: [],
                        status: 'Done',
                        priority: 'Critical',
                        date: 1703708909537,
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704304383/large-Screenshot_2024-01-03_at_11.35.48_qclnrt.png',
                        updates: [],
                    },
                    {
                        id: 'c103',
                        title: 'Item 3',
                        person: [],
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
                        person: [],
                        updates: [],
                    },
                    {
                        id: 'c202',
                        title: 'Item 5',
                        person: [],
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
        titlesOrder: ['person', 'status', 'priority', 'date', 'file', 'link'],

    }
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
                person: [],
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
    }
}

function _getDefaultTask(title) {
    return {
        id: utilService.makeId(),
        title,
        person: [],
        updates: [],
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

//group

async function addGroup(boardId) {
    try {
        const board = await getById(boardId)
        board.groups.push(_getDefaultGroup())
        return await save(board)
    } catch (error) {
        throw new Error(error.message || 'An error occurred during adding group')

    }

}

async function removeGroup(boardId, groupId) {
    try {
        const board = await getById(boardId)
        const idx = board.groups.findIndex(group => group.id === groupId)
        if (idx < 0) throw new Error(`Remove failed, cannot find group with id: ${groupId} in: ${board.title}`)
        board.groups.splice(idx, 1)
        return await save(board)
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing group')

    }

}

async function updateGroup(boardId, group) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(currgroup => currgroup.id === group.id)

        board.groups.splice(groupIdx, 1, group)
        return await save(board)
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing group')

    }

}

//tasks

// async function addTask(boardId, groupId, taskTitle, unshiftTask = false) {
//     try {
//         const board = await getById(boardId)
//         const groupIdx = board.groups.findIndex(group => group.id === groupId)
//         const group = board.groups[groupIdx]
//         if (!unshiftTask) {
//             group.tasks.push(_getDefaultTask(taskTitle))
//         } else {
//             group.tasks.unshift(_getDefaultTask(taskTitle))
//         }

//         return await save(board)
//     } catch (error) {
//         throw new Error(error.message || 'An error occurred during removing task')

//     }

// }
async function addTask(boardId, groupId, taskTitle, unshiftTask = false) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const group = board.groups[groupIdx]

        const taskMethod = unshiftTask ? 'unshift' : 'push'
        group.tasks[taskMethod](_getDefaultTask(taskTitle))

        return await save(board)
    } catch (error) {
        throw new Error(error.message || 'An error occurred during adding task')
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

    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')

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
    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing task')

    }

}


//privet

function _initBoards() {
    const boardsFromStorage = localStorage.getItem(STORAGE_KEY)
    if (boardsFromStorage && boardsFromStorage.length) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(gBoards))
}








