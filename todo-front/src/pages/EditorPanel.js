 

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { createEditor, Transforms, Editor, Element as SlateElement } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { contentService } from "../services/editorService";

// Initial content
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "Start writing..." }],
  },
];

const EditorPanel = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem("editorContent")) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem("editorContent", JSON.stringify(value));
  }, [value]);

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  // Toggle text formatting
  const toggleMark = (format) => {
    const isActive = Editor.marks(editor)?.[format];
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  // Toggle block type (heading, quote, list, code)
  const toggleBlock = (format) => {
    const isActive = Editor.nodes(editor, {
      match: (n) => n.type === format,
    }).length > 0;

    Transforms.setNodes(editor, { type: isActive ? "paragraph" : format });
  };

  // Apply font family
  const changeFontFamily = (event) => {
    Editor.addMark(editor, "fontFamily", event.target.value);
  };

  // Apply font size
  const changeFontSize = (event) => {
    Editor.addMark(editor, "fontSize", event.target.value);
  };

  // Apply text color
  const changeTextColor = (event) => {
    Editor.addMark(editor, "color", event.target.value);
  };

  const contentCreate = async () => {
    try {
      console.log("data:: ", value);
      const contentData = {
        content: JSON.stringify(value), 
      };
      console.log("content:: ", contentData)
     const content= await contentService.createContent(contentData);
      console.log("content:: ", content.content)
      // fetchTodos(currentPage); 
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  };

  return (
    <div className="right-panel">
      <div className="editor-panel">  
      {/* Toolbar */}
      <div className="toolbar">
        <button onMouseDown={(e) => { e.preventDefault(); toggleMark("bold"); }}>Bold</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleMark("italic"); }}>Italic</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleMark("underline"); }}>Underline</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleMark("strikethrough"); }}>Strikethrough</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleBlock("heading"); }}>H1</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleBlock("blockquote"); }}>Quote</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleBlock("code"); }}>Code</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleBlock("list"); }}>List</button>

        {/* Font Family Dropdown */}
        <select onChange={changeFontFamily}>
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>

        {/* Font Size Dropdown */}
        <select onChange={changeFontSize}>
          <option value="12px">12px</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
        </select>

        {/* Text Color Picker */}
        <input type="color" onChange={changeTextColor} />
  
      </div>

      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Start writing..."
          spellCheck
          autoFocus
          className="editable-area"
        />
      </Slate>
      <div>
        <button onClick={contentCreate}>Save</button>
      </div>
    </div>
    </div>
  );
};

// Render elements (Blocks like headings, lists, quotes)
const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "heading":
      return <h1 {...attributes}>{children}</h1>;
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "code":
      return <pre {...attributes}><code>{children}</code></pre>;
    case "list":
      return <ul {...attributes}><li>{children}</li></ul>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// Render text styles (Bold, Italic, Underline, Font Family, Font Size, Color)
const Leaf = ({ attributes, children, leaf }) => {
  let style = {};
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.strikethrough) children = <s>{children}</s>;
  if (leaf.fontFamily) style.fontFamily = leaf.fontFamily;
  if (leaf.fontSize) style.fontSize = leaf.fontSize;
  if (leaf.color) style.color = leaf.color;

  return <span {...attributes} style={style}>{children}</span>;
};

export default EditorPanel;
