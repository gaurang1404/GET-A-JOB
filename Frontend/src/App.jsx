import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/pages/home/Home.jsx'
import { Login } from './components/auth/Login.jsx'
import { Signup } from './components/auth/Signup.jsx'
import { Jobs } from './components/pages/jobs/Jobs.jsx'
import { UserProfile } from './components/pages/profile/UserProfile.jsx'
import { Applications } from './components/pages/application/Applications.jsx'
import { ApplicationPage } from './components/pages/application/ApplicationPage.jsx'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/jobs",
    element: <Jobs/>
  },
  {
    path: "/profile",
    element: <UserProfile/>
  },
  {
    path: "/applications",
    element: <Applications/>
  },
  {
    path: "/job/applynow",
    element: <ApplicationPage/>
  },

])

function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
