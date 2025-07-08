import RichTextEditor from 'reactjs-tiptap-editor';
import { BaseKit } from 'reactjs-tiptap-editor';
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
import { SubAndSuperScript } from 'reactjs-tiptap-editor/subandsuperscript'; 
import { Table } from 'reactjs-tiptap-editor/table'; 
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline'; 
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace'; 
import { Excalidraw } from 'reactjs-tiptap-editor/excalidraw'; 
import "@excalidraw/excalidraw/index.css"; 
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily'; 
import { HorizontalRule } from 'reactjs-tiptap-editor/horizontalrule'; 
import { Highlight } from 'reactjs-tiptap-editor/highlight'; 
import { Italic } from 'reactjs-tiptap-editor/italic'; 


import 'reactjs-tiptap-editor/style.css';


const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {  
      showOnlyCurrent: true, 
    },  
    characterCount: {},

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
  SubAndSuperScript,
  Table,
  TextUnderline,
  SearchAndReplace,
  Excalidraw,
  FontFamily,
  HorizontalRule,
  Highlight,
  Italic,
];

const Editor = ({ content, setContent }) => {

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
      disabled={false}
      hideToolbar={false}
      minHeight={1}
      maxHeight={1}
    />
  );
};

export default Editor;