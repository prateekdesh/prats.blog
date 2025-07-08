import api from "../api";
import Editor from "./Editor";
import { useState } from "react";
import 'reactjs-tiptap-editor/style.css';
import { useNavigate } from "react-router-dom";


function NewPost() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate();

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleIsPublic = (event) => {
        setIsPublic(event.target.checked)
    }

    const postPost = async () => {
        const post = {
            title: title, 
            content: content,
            is_public: true,
        }

        try {
            const response = await api.post("/posts", post);
            console.log(response.data)
            navigate("/dashboard");
        }
        catch(err) {
            console.log("An error occured: ", err)
        }
    }

    return (
        <div className="flex items-center h-screen w-full flex-col">
            <h1 className="mt-10 text-4xl font-bold">Get cookin'.</h1>
            <label>Title: 
                <input type="text" className="border rounded ml-3 mt-10 w-3xl overflow-x-auto bg-white" 
                value={title}
                onChange={handleTitle}
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
                <button onClick={postPost} className="bg-[#222] rounded-full p-3 text-white hover:bg-[#444] mr-10 w-30">Publish</button>
                <button className="bg-[#222] rounded-full p-3 text-white hover:bg-[#444] w-30">Draft</button>
            </div>            

        </div>
    )
}

export default NewPost;