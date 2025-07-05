import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import api from "../api";

function Post() {
    const {slug} = useParams();
    const [post, setPost] = useState([]);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await api.get(`/posts/${slug}`);
          setPost(response.data)
        }
        catch(err) {
          console.log("Failed to fetch posts. Error: ", err)
        }
      };
      fetchPost();
    }, []);

    return (
        <div className="w-full min-h-screen">
            <nav className="bg-[#2C2C2C]">
                <h1 className='text-white text-3xl ml-10 pt-5 font-[Metamorphous] font-normal'>prats.blog</h1>
            </nav>

            <div className="bg-[#2C2C2C] w-full h-[30vh] flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-5xl font-bold text-white font-[DM Serif Text] font-normal">{post.title}</h1>
                    <h4 className="mt-2 text-gray-300 font-[DM Serif Text] font-light">{post.date_published}</h4>
                </div>
            </div>
            <div className="flex justify-center mt-10 w-full">
                <p className="max-w-3xl w-full text-lg text-black">{post.content}</p>
            </div>
        </div>
    )
}

export default Post;