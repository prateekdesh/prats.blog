import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#252525] text-white">
        <nav className="p-4">
          <ul>
            <li className="mb-10 ml-3 mt-3">
              <h1 className="font-[Metamorphous] text-2xl">prats.blog</h1>
            </li>
            <li className="mb-5">
              <button className="w-48 rounded-full text-xl bg-[#3C7A89] hover:bg-[#478B9B] p-4">New Post</button>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Settings</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Profile</a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-5">Dashboard</h2>
        <p className="text-gray-700">Welcome to your dashboard. Here you can manage your blog posts, view analytics, and customize your settings.</p>
      </div>
    </div>
  );
}

export default Dashboard;