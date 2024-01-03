
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getById,
    save,
    remove,
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
            imgUrl: 'http://some-img',
        },
        labels: [
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
        members: [
            {
                _id: 'u101',
                fullname: 'Eden Rize',
                imgUrl: 'http://some-img.jpg',
            },
            {
                _id: 'u102',
                fullname: 'Mor Marzan',
                imgUrl: 'http://some-img.jpg',
            },
            {
                _id: 'u103',
                fullname: 'Noam Saar',
                imgUrl: 'http://some-img.jpg',
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
                        memberIds: ['u103'],
                        status: 'Stuck',
                        priority: 'Low',
                        date: '1703706909537',
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704302004/Screenshot_2024-01-03_113623_igieu2.png',
                        link: {
                            url: 'https://socket.io/get-started/chat',
                            displayTxt: 'Sockets docs',
                        },
                        updates: [
                            {
                                id: 'u123',
                                memberId: 'u101',
                                createdAt: '1704302734753',
                                txt: 'Init socket service 👍',
                                likes: [],
                            },
                        ],
                    },
                    {
                        id: 'c102',
                        title: 'Add paging',
                        memberIds: ['u102', 'u103'],
                        status: 'Needs QA',
                        priority: 'Medium',
                        date: '1704241608991',
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704303178/Screenshot_2024-01-03_113811_kqd5pv.png',
                        link: {
                            url: 'https://www.turing.com/kb/implementing-javascript-pagination',
                            displayTxt: 'How to page',
                        },
                        updates: [],
                    },
                    {
                        id: 'c102',
                        title: 'Add about puki page',
                        memberIds: ['u101'],
                        status: 'Working on it',
                        priority: 'High',
                        updates: [
                            {
                                id: 'u555',
                                memberId: 'u101',
                                createdAt: '1704303445060',
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
                        memberIds: ['u101', 'u103'],
                        status: 'Working on it',
                        priority: 'High',
                        date: '1704074068766',
                        link: {
                            url: 'https://bryanlrobinson.com/blog/refactoring-css-into-sass-mixin/',
                        },
                        updates: [
                            {
                                id: 'u127',
                                memberId: 'u103',
                                createdAt: '1704303744452',
                                txt: 'Added the imports, missing the vars',
                                likes: ['u101'],
                            },
                        ],
                    },
                    {
                        id: 'c202',
                        title: 'Refactor Filter.jsx into Components',
                        memberIds: [],
                        status: 'Needs QA',
                        priority: 'Medium',
                        updates: [],
                    },
                    {
                        id: 'c203',
                        title: 'Refactor to use Store Redux',
                        memberIds: ['u101', 'u102', 'u103'],
                        status: 'Stuck',
                        priority: 'Critical',
                        date: '1703703756181',
                        link: {
                            url: 'https://redux.js.org/',
                        },
                        updates: [
                            {
                                id: 'u777',
                                memberId: 'u103',
                                createdAt: '1704304108853',
                                txt: "i've begun the refactor but couldn't figure out how to use the dispatch. @Mor Marzan",
                                likes: [],
                            },
                        ],
                    },
                    {
                        id: 'c204',
                        title: 'Refactor vars/lets to const',
                        memberIds: ['u102'],
                        status: 'Done',
                        date: '1703720101090',
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704304383/large-Screenshot_2024-01-03_at_11.35.48_qclnrt.png',
                        updates: [],
                    },
                    {
                        id: 'c205',
                        title: 'Refactor service to use http',
                        memberIds: ['u103'],
                        priority: 'Low',
                        date: '1703728412860',
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
                        memberIds: ['u102'],
                        status: 'Done',
                        priority: 'Critical',
                        date: '1703785617881',
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704305129/large-Screenshot_2024-01-03_at_11.39.56_dx6zkv.png',
                        link: {
                            url: 'https://stackoverflow.com/questions/22776702/unresponsive-button-after-calling-javascript',
                            displayTxt: 'Unresponsive button after calling javascript',
                        },
                        updates: [
                            {
                                id: 'u157',
                                memberId: 'u102',
                                createdAt: '1704305297046',
                                txt: 'Desperate here, needs help! @Eden Rize',
                                likes: ['u101'],
                                comments: [
                                    {
                                        id: 'u457',
                                        memberId: 'u101',
                                        createdAt: '1704305400521',
                                        txt: 'Done 😄',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'c302',
                        title: 'Misaligned Layout on Mobile Devices',
                        memberIds: ['u101', 'u102'],
                        status: 'Working on it',
                        priority: 'Low',
                        date: '1703894345657',
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
                        memberIds: ['u103'],
                        status: 'Working on it',
                        priority: 'Low',
                        updates: [],
                    },
                    {
                        id: 'c304',
                        title: 'Inconsistent Styling Across Browsers',
                        memberIds: ['u102'],
                        status: 'Done',
                        priority: 'High',
                        date: '1703995874889',
                        updates: [],
                    },
                    {
                        id: 'c305',
                        title: 'Slow Page Load Times',
                        memberIds: ['u101'],
                        status: 'Needs QA',
                        priority: 'Critical',
                        date: '1704299392298',
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
                    imgUrl: 'http://some-img',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c102',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c102',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c102',
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
                    imgUrl: 'http://some-img.jpg',
                },
                group: {
                    id: 'g101',
                    title: 'Features',
                },
                task: {
                    id: 'c102',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
                    imgUrl: 'http://some-img.jpg',
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
        cmpsOrder: ['person', 'Status', 'Priority', 'Due Date', 'File', 'Link'],
    },
]

_initBoards()

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

function _initBoards() {
    const boardsFromStorage = localStorage.getItem(STORAGE_KEY)
    if (boardsFromStorage && boardsFromStorage.length) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(gBoards))
}








