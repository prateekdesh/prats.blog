import api from "../api";
import Editor from "./Editor";
import { useState } from "react";
import 'reactjs-tiptap-editor/style.css';


function NewPost() {
    const [content, setContent] = useState("");

    return (
        <div className="flex items-center h-screen w-full flex-col">
            <h1 className="mt-10 text-4xl font-bold">Get cookin'.</h1>
            <div className="max-w-4xl m-10">
                <Editor content={content} setContent={setContent} />
            </div>
            <label className="text-xl mb-10">
              <input type="checkbox" className="mr-2"/>
              public
            </label>
            <div className="flex flex-row pb-10">
                <button className="bg-[#222] rounded-full p-3 text-white hover:bg-[#444] mr-10 w-30">Publish</button>
                <button className="bg-[#222] rounded-full p-3 text-white hover:bg-[#444] w-30">Draft</button>
            </div>            

        </div>
    )
}

export default NewPost;