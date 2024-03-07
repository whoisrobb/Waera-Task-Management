import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  Theme,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "../themes/theme-provider";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
  };

const darkTheme = {
  colors: {
    editor: {
      text: "inherit",
      background: "inherit",
    },
    menu: {
      text: "inherit",
      background: "#020817",
    },
    tooltip: {
      text: "#ffffff",
      background: "#1e293b",
    },
    hovered: {
      text: "#ffffff",
      background: "#1e293b",
    },
    selected: {
      text: "#ffffff",
      background: "#1e293b",
    },
    disabled: {
      background: "#1e293b",
    },
    shadow: "rgba(#1e293b, .7)",
    border: "#1e293b",
  },
  borderRadius: 4,
  fontFamily: "Inter, sans-serif",
} satisfies Theme;

const lightTheme = {
  colors: {
    editor: {
      text: "inherit",
      background: "inherit",
    },
    menu: {
      text: "#1e293b",
    },
    hovered: {
      background: "rgba(0, 0, 0, .1)",
    },
    selected: {
      background: "#1e293b",
    },
    border: "rgba(0, 0, 0, .1)",
    shadow: "none",
  },
  borderRadius: 4,
  fontFamily: "Inter, sans-serif",
} satisfies Theme;


const Editor = ({
    onChange,
    initialContent,
    editable
 }: EditorProps) => {
  const { theme } = useTheme();
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  })

  return (
    <div className="">
      <BlockNoteView
        editor={editor}
        theme={ theme === 'dark' ? darkTheme : lightTheme }
      />
    </div>
  )
}

export default Editor;