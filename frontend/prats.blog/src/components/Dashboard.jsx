import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/check")
      .then(res => {
        if (!res.data.authenticated) {
          navigate("/login");
        } else {
          setLoading(false);

        }
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

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

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#252525] text-white">
        <nav className="p-4">
          <ul>
            <li className="mb-10 ml-3 mt-3">
              <h1 className="font-[Metamorphous] text-2xl">prats.blog</h1>
            </li>
            <Link to="/dashboard/new">
                <li className="mb-5">
                    <button className="w-48 rounded-full text-xl bg-[#3C7A89] hover:bg-[#478B9B] p-4">New Post</button>
                </li>
            </Link>
            
            <Link to="/dashboard">
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700 active:bg-gray-700">Dashboard</a>
            </li>
            </Link>
            <Link to="/settings">
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Settings</a>
            </li>
            </Link>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Profile</a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 p-10">
          <h2 className="text-5xl font-bold mb-15 ml-10 mt-5">Hello, Prateek.</h2>
          <div className="flex-col bg-[#252525] w-200 rounded-xl pb-10 max-h-[70vh] overflow-y-auto">
              <p className="text-white font-bold p-10 pb-5 text-3xl">Posts</p>

              <ul>
              {posts.map((post) => (
                <li key={post.id} className="list-none">
                  <div className="mx-auto my-2 w-[90%] rounded-lg overflow-hidden hover:bg-gray-700">
                    <div className="flex flex-row p-3 items-center">
                      <Link to={`/posts/${post.slug}`} className="flex flex-row flex-1 items-center min-w-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-white max-h-10 m-5 mb-0 mt-0" viewBox="0 0 32 32"><g data-name="32-Book"><path d="M29.71 8.29A5.86 5.86 0 0 1 28 5a5.87 5.87 0 0 1 1.71-3.29A1 1 0 0 0 29 0H7a5 5 0 0 0-5 5v22a5 5 0 0 0 5 5h22a1 1 0 0 0 1-1V9a1 1 0 0 0-.29-.71zM7 2h20a6.84 6.84 0 0 0-.84 2H11v4H7a3 3 0 0 1 0-6zm20 6h-8V6h7.13A6.81 6.81 0 0 0 27 8zm1 22H7a3 3 0 0 1-3-3V9a5 5 0 0 0 3 1h4v7a1 1 0 0 0 1.55.83L15 16.2l2.45 1.63A1 1 0 0 0 19 17v-7h9z"/><path d="M7 4h2v2H7zM25 18v-4a1 1 0 0 0-1-1h-3v2h2v2h-2v2h3a1 1 0 0 0 1-1zM7 22h2v2H7zM11 22h2v2h-2zM17 22h8v2h-8z"/></g></svg>
                        <div className="flex flex-col min-w-0">
                          <p className="text-white text-base truncate">{post.title}</p>
                          <p className="text-gray-400 text-sm truncate">{post.preview}</p>
                          <p className="text-gray-300 text-xs">{post.date_published}</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => navigate("/dashboard/edit", {state: {post} })}
                        className="ml-auto mr-10 bg-transparent hover:bg-gray-600 rounded-full p-0 flex items-center justify-center min-w-[40px] min-h-[40px]"
                        title="Edit"
                        style={{ minWidth: '40px', minHeight: '40px' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-white max-h-8 max-w-8" viewBox="0 0 24 24" width="32" height="32"><path d="M20.548 3.452a1.542 1.542 0 0 1 0 2.182l-7.636 7.636-3.273 1.091 1.091-3.273 7.636-7.636a1.542 1.542 0 0 1 2.182 0zM4 21h15a1 1 0 0 0 1-1v-8a1 1 0 0 0-2 0v7H5V6h7a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1z"/></svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              </ul>
              
          </div>
        </div>
    </div>
  );
}

export default Dashboard;