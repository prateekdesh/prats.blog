import api from "../api";
import Editor from "./Editor";
import { useState } from "react";
import 'reactjs-tiptap-editor/style.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function EditPost() {
    const location = useLocation();
    const post = location.state?.post;
    const [content, setContent] = useState(post.content);
    const [title, setTitle] = useState(post.title);
    const [preview, setPreview] = useState(post.preview || "");
    const [isPublic, setIsPublic] = useState(post.is_public);
    const navigate = useNavigate();

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handlePreview = (event) => {
        setPreview(event.target.value)
    }

    const handleIsPublic = (event) => {
        setIsPublic(event.target.checked)
    }

    const editPost = async () => {
        if (!window.confirm("Are you sure you want to save changes to this post?")) {
            return;
        }
        const edited = {
            title: title, 
            content: content,
            preview: preview,
            is_public: isPublic,
        }

        try {
            const response = await api.put(`/posts/${post.id}`, edited);
            console.log(response.data)
            navigate("/dashboard");
        }
        catch(err) {
            console.log("An error occured: ", err)
        }
    }

    const deletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            return;
        }
        try {
            const response = await api.delete(`/posts/${post.id}`);
            console.log(response.data)
            navigate("/dashboard")
        }
        catch(err) {
            console.log("An error occured: ", err)
        }
    }

    return (
        <div className="flex items-center h-screen w-full flex-col">
            <h1 className="mt-10 text-4xl font-bold">Did you overcook?</h1>
            <label>Title: 
                <input type="text" className="border rounded ml-3 mt-10 w-3xl overflow-x-auto bg-white" 
                value={title}
                onChange={handleTitle}
                />
            </label>
            <label>Preview: 
                <textarea 
                    className="border rounded ml-3 mt-5 w-3xl h-20 p-2 bg-white resize-none" 
                    value={preview}
                    onChange={handlePreview}
                    placeholder="Enter a brief preview of your post..."
                />
            </label>
            <div className="max-w-4xl m-10">
                <Editor content={content} setContent={setContent} />
            </div>
            <label className="text-xl mb-10">
            <input type="checkbox" className="mr-2" checked={isPublic} onChange={handleIsPublic} />
              public
            </label>
            <div className="flex flex-row pb-10">
                <button onClick={editPost} className="bg-[#222] rounded-full p-3 text-white hover:bg-[#444] mr-10 w-30">Save</button>
                <button onClick={deletePost} className="bg-red-600 rounded-full p-3 text-white hover:bg-red-500 w-30">Delete</button>
            </div>            

        </div>
    )
}

export default EditPost;