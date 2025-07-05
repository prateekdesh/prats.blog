import RichTextEditor from 'reactjs-tiptap-editor';
import { BaseKit } from 'reactjs-tiptap-editor';
import { useState } from 'react';
import { Blockquote } from 'reactjs-tiptap-editor/blockquote'; 
import { Bold } from 'reactjs-tiptap-editor/bold'; 
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Clear } from 'reactjs-tiptap-editor/clear'; 
import { Code } from 'reactjs-tiptap-editor/code'; 
import { CodeBlock } from 'reactjs-tiptap-editor/codeblock'; 

import 'prism-code-editor-lightweight/layout.css'; 
import 'prism-code-editor-lightweight/themes/github-dark.css'; 
import { Color } from 'reactjs-tiptap-editor/color'; 
import { FontSize } from 'reactjs-tiptap-editor/fontsize'; 
import { Link } from 'reactjs-tiptap-editor/link'; 
import { SlashCommand } from 'reactjs-tiptap-editor/slashcommand'; 
import { Strike } from 'reactjs-tiptap-editor/strike'; 

import 'reactjs-tiptap-editor/style.css';


const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {  
      showOnlyCurrent: true, 
    },  

    // Character count
    characterCount: {  
      limit: 50_000,  
    },  
  }),
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  FontSize,
  Link,
  SlashCommand,
  Strike,

];

const DEFAULT = '';

const Editor = () => {
  const [content, setContent] = useState(DEFAULT);

  const onChangeContent = () => {
    setContent();
  };

  return (
    <RichTextEditor
      output='html'
      content={content}
      onChangeContent={onChangeContent}
      extensions={extensions}
    />
  );
};

export default Editor;