import RichTextEditor from 'reactjs-tiptap-editor';

import 'prism-code-editor-lightweight/layout.css'; 
import 'prism-code-editor-lightweight/themes/github-dark.css'; 
import "@excalidraw/excalidraw/index.css"; 


import 'reactjs-tiptap-editor/style.css';

const extensions = {}
const Viewer = ({ content, setContent }) => {

  const onChangeContent = (newContent) => {
    setContent(newContent);
  };
  return (
    <RichTextEditor
      output='html'
      content={content}
      onChangeContent={onChangeContent}
      extensions={extensions}
      dark={false}
      disabled={true}
      hideToolbar={true}
    />
  );
};

export default Viewer;