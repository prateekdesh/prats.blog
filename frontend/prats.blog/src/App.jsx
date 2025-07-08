import { useState, useEffect } from 'react';
import api from './api';
import { Link } from "react-router";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data)
      }
      catch(err) {
        console.log("Failed to fetch posts. Error: ", err)
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="min-h-screen bg-[#FFF]">
        <nav className="navbar w-full h-[10vh] m-0 p-0 bg-[#2C2C2C] flex items-center justify-between">
          <div className="nav-container">
            <h1 className='text-white text-3xl ml-10 mb-5 pt-5 font-[Metamorphous] font-normal'>prats.blog</h1>
          </div>
          <Link to="/login"><button className='bg-[#3C7A89] p-4 rounded-full text-white mr-10 hover:bg-[#478B9B]'>Login</button></Link>
        </nav>
      <div className="container mx-auto">
        {/* <h1 className="text-center text-4xl font-bold text-black my-8">prats.blog</h1> */}
 
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="list-none">
              <div className="p-5 my-5 rounded-2xl">
                <Link to={`/posts/${post.slug}`} className="no-underline">
                  <h1 className="text-2xl font-semibold text-black hover:text-gray-500">{post.title}</h1>
                </Link>
                <h5 className="text-sm text-gray-700 mb-3">{post.date_published}</h5>
                <h3 className="text-lg text-black mb-5 max-w-[55vw]">{post.content}</h3>
                <hr className='border-t-2 border-gray-300 w-[55vw]'/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;
