import { BoardDetails } from './pages/BoardDetails.jsx'
import { HomePage } from './pages/HomePage.jsx'

// comment to test
// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        //change to /board/:boardId
        path: '/board',
        component: <BoardDetails />,
        label: 'Board',
    },

]

export default routes