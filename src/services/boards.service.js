export function getBoardsData() {
    return (
        [
            {
                _id: 'b101',
                title: 'Frontend',
                isStarred: false,
                archivedAt: null,
                createdBy: {
                    _id: '659fd52d810c3f98c2054719',
                    fullname: 'Eden Rize',
                    imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                },
                status: [
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
                        id: 'l101',
                        title: 'Done',
                        color: '#00c875',
                    },
                    {
                        id: 'l100',
                        color: '#c4c4c4',
                    },
                    {
                        id: 'l104',
                        title: 'Needs QA',
                        color: '#faa1f1',
                    },
                ],
                priority: [
                    {
                        id: 'l201',
                        title: 'Critical ⚠',
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
                    {
                        id: 'l200',
                        color: '#c4c4c4',
                    },
                ],
                members: [
                    {
                        _id: '659fd52d810c3f98c2054719',
                        fullname: 'Eden Rize',
                        imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
                    },
                    {
                        _id: '659fd60b810c3f98c205471b',
                        fullname: 'Mor Marzan',
                        imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1705356175/7B12EEEE-8B9C-489B-882B-D5B8E47D9874_pjpibk.jpg',
                    },
                    {
                        _id: '659fd5db810c3f98c205471a',
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
                                members: ['659fd5db810c3f98c205471a'],
                                status: 'l103',
                                priority: 'l204',
                                date: 1703706909537,
                                file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704302004/Screenshot_2024-01-03_113623_igieu2.png',
                                link: {
                                    url: 'https://socket.io/get-started/chat',
                                    displayTxt: 'Sockets docs',
                                },
                                msgs: [
                                    {
                                        id: 'u123',
                                        memberId: '659fd52d810c3f98c2054719',
                                        createdAt: 1704302734753,
                                        txt: 'Init socket service 👍',
                                        likes: [],
                                    },
                                ],
                            },
                            {
                                id: 'c102',
                                title: 'Add paging',
                                members: ['659fd60b810c3f98c205471b', '659fd5db810c3f98c205471a'],
                                status: 'l104',
                                priority: 'l203',
                                date: 1704241608991,
                                file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704303178/Screenshot_2024-01-03_113811_kqd5pv.png',
                                link: {
                                    url: 'https://www.turing.com/kb/implementing-javascript-pagination',
                                    displayTxt: 'How to page',
                                },
                                msgs: [],
                            },
                            {
                                id: 'c103',
                                title: 'Add about puki page',
                                members: ['659fd52d810c3f98c2054719'],
                                status: 'l102',
                                priority: 'l202',
                                msgs: [
                                    {
                                        id: 'u555',
                                        memberId: '659fd52d810c3f98c2054719',
                                        createdAt: 1704303445060,
                                        txt: 'Research about puki',
                                        likes: ['659fd60b810c3f98c205471b'],
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
                                members: ['659fd52d810c3f98c2054719', '659fd5db810c3f98c205471a'],
                                status: 'l102',
                                priority: 'l202',
                                date: 1704074068766,
                                link: {
                                    url: 'https://bryanlrobinson.com/blog/refactoring-css-into-sass-mixin/',
                                },
                                msgs: [
                                    {
                                        id: 'u127',
                                        memberId: '659fd5db810c3f98c205471a',
                                        createdAt: 1704303744452,
                                        txt: 'Added the imports, missing the vars',
                                        likes: ['659fd52d810c3f98c2054719'],
                                    },
                                ],
                            },
                            {
                                id: 'c202',
                                title: 'Refactor Filter.jsx into Components and change imports',
                                members: [],
                                status: 'l104',
                                priority: 'l203',
                                msgs: [],
                            },
                            {
                                id: 'c203',
                                title: 'Refactor to use Store Redux',
                                members: ['659fd52d810c3f98c2054719', '659fd60b810c3f98c205471b', '659fd5db810c3f98c205471a'],
                                status: 'l103',
                                priority: 'l201',
                                date: 1703703756181,
                                link: {
                                    url: 'https://redux.js.org/',
                                },
                                msgs: [
                                    {
                                        id: 'u777',
                                        memberId: '659fd5db810c3f98c205471a',
                                        createdAt: 1704304108853,
                                        txt: "i've begun the refactor but couldn't figure out how to use the dispatch. @Mor Marzan",
                                        likes: [],
                                    },
                                ],
                            },
                            {
                                id: 'c204',
                                title: 'Refactor vars/lets to const',
                                members: ['659fd60b810c3f98c205471b'],
                                status: 'l101',
                                priority: 'l200',
                                date: 1703720101090,
                                file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704304383/large-Screenshot_2024-01-03_at_11.35.48_qclnrt.png',
                                msgs: [],
                            },
                            {
                                id: 'c205',
                                title: 'Refactor service to use http',
                                members: ['659fd5db810c3f98c205471a'],
                                status: 'l100',
                                priority: 'l204',
                                date: 1703728412860,
                                msgs: [],
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
                                members: ['659fd60b810c3f98c205471b'],
                                status: 'l101',
                                priority: 'l201',
                                date: 1703785617881,
                                file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704305129/large-Screenshot_2024-01-03_at_11.39.56_dx6zkv.png',
                                link: {
                                    url: 'https://stackoverflow.com/questions/22776702/unresponsive-button-after-calling-javascript',
                                    displayTxt: 'Unresponsive button after calling javascript',
                                },
                                msgs: [
                                    {
                                        id: 'u157',
                                        memberId: '659fd60b810c3f98c205471b',
                                        createdAt: 1704305297046,
                                        txt: 'Desperate here, needs help! @Eden Rize',
                                        likes: ['659fd52d810c3f98c2054719'],
                                        comments: [
                                            {
                                                id: 'u457',
                                                memberId: '659fd52d810c3f98c2054719',
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
                                members: ['659fd52d810c3f98c2054719', '659fd60b810c3f98c205471b'],
                                status: 'l102',
                                priority: 'l204',
                                date: 1703894345657,
                                file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704305602/large-Screenshot_2024-01-03_at_11.48.45_tomxco.png',
                                link: {
                                    url: 'https://stackoverflow.com/questions/29740966/layout-distorted-when-viewed-on-mobile',
                                    displayTxt: 'Layout distorted when viewed on mobile',
                                },
                                msgs: [],
                            },
                            {
                                id: 'c303',
                                title: 'Broken Image Links',
                                members: ['659fd5db810c3f98c205471a'],
                                status: 'l102',
                                priority: 'l204',
                                msgs: [],
                            },
                            {
                                id: 'c304',
                                title: 'Inconsistent Styling Across Browsers',
                                members: ['659fd60b810c3f98c205471b'],
                                status: 'l101',
                                priority: 'l202',
                                date: 1703995874889,
                                msgs: [],
                            },
                            {
                                id: 'c305',
                                title: 'Slow Page Load Times',
                                members: ['659fd52d810c3f98c2054719'],
                                status: 'l104',
                                priority: 'l201',
                                date: 1704299392298,
                                msgs: [],
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
                            _id: '659fd52d810c3f98c2054719',
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
                            _id: '659fd52d810c3f98c2054719',
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
                            _id: '659fd60b810c3f98c205471b',
                            fullname: 'Mor Marzan',
                            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1705356175/7B12EEEE-8B9C-489B-882B-D5B8E47D9874_pjpibk.jpg'
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
                            _id: '659fd5db810c3f98c205471a',
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
                            _id: '659fd5db810c3f98c205471a',
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
                            _id: '659fd5db810c3f98c205471a',
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
                            _id: '659fd60b810c3f98c205471b',
                            fullname: 'Mor Marzan',
                            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1705356175/7B12EEEE-8B9C-489B-882B-D5B8E47D9874_pjpibk.jpg'
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
                            _id: '659fd52d810c3f98c2054719',
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
                            _id: '659fd60b810c3f98c205471b',
                            fullname: 'Mor Marzan',
                            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1705356175/7B12EEEE-8B9C-489B-882B-D5B8E47D9874_pjpibk.jpg'
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
                            _id: '659fd60b810c3f98c205471b',
                            fullname: 'Mor Marzan',
                            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1705356175/7B12EEEE-8B9C-489B-882B-D5B8E47D9874_pjpibk.jpg'
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
                            _id: '659fd5db810c3f98c205471a',
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
                            _id: '659fd52d810c3f98c2054719',
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
                            _id: '659fd5db810c3f98c205471a',
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
                            _id: '659fd60b810c3f98c205471b',
                            fullname: 'Mor Marzan',
                            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1705356175/7B12EEEE-8B9C-489B-882B-D5B8E47D9874_pjpibk.jpg'
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
                            _id: '659fd52d810c3f98c2054719',
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
                            _id: '659fd5db810c3f98c205471a',
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
                            _id: '659fd5db810c3f98c205471a',
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
                            _id: '659fd52d810c3f98c2054719',
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
                            _id: '659fd52d810c3f98c2054719',
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
                            _id: '659fd52d810c3f98c2054719',
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
                            _id: '659fd60b810c3f98c205471b',
                            fullname: 'Mor Marzan',
                            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1705356175/7B12EEEE-8B9C-489B-882B-D5B8E47D9874_pjpibk.jpg'
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
                titlesOrder: ['member', 'status', 'priority', 'date', 'link', 'file'],

            },
        ]
    )
}

export function getDefaultBoard() {
    return {
        title: 'New Board',
        isStarred: false,
        archivedAt: null,
        status: [
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
                id: 'l101',
                title: 'Done',
                color: '#00c875',
            },
            {
                id: 'l100',
                color: '#c4c4c4',
            },
        ],
        priority: [
            {
                id: 'l201',
                title: 'Critical ⚠',
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
            {
                id: 'l200',
                color: '#c4c4c4',
            },
        ],
        members: [
            {
                _id: '659fd52d810c3f98c2054719',
                fullname: 'Eden Rize',
                imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
            },
            {
                _id: '659fd60b810c3f98c205471b',
                fullname: 'Mor Marzan',
                imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1705356175/7B12EEEE-8B9C-489B-882B-D5B8E47D9874_pjpibk.jpg'
            },
            {
                _id: '659fd5db810c3f98c205471a',
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
                        members: [],
                        status: 'l102',
                        priority: 'l202',
                        date: 1703705909537,
                        link: {
                            url: 'https://redux.js.org/',
                        },
                        msgs: [],
                    },
                    {
                        id: 'c102',
                        title: 'Item 2',
                        members: [],
                        status: 'l101',
                        priority: 'l201',
                        date: 1703708909537,
                        file: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704304383/large-Screenshot_2024-01-03_at_11.35.48_qclnrt.png',
                        msgs: [],
                    },
                    {
                        id: 'c103',
                        title: 'Item 3',
                        status: 'l100',
                        priority: 'l200',
                        members: [],
                        msgs: [],
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
                        status: 'l100',
                        priority: 'l200',
                        members: [],
                        msgs: [],
                    },
                    {
                        id: 'c202',
                        title: 'Item 5',
                        status: 'l100',
                        priority: 'l200',
                        members: [],
                        msgs: [],
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
        titlesOrder: ['member', 'status', 'priority', 'date', 'link', 'file'],
    }
}