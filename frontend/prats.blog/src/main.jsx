import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Post from './components/Post.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import NewPost from './components/NewPost.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/:slug", element: <Post />},
  {path: "/dashboard", element: <Dashboard />},
  {path: "/login", element: <Login />},
  {path: "/dashboard/newPost", element: <NewPost />},
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)