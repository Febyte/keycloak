import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import CodeMirror, { basicSetup, EditorView } from "@uiw/react-codemirror";
import { LanguageSupport } from "@codemirror/language";

const jsonTheme = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    backgroundImage: "",
    foreground: "#000000",
    caret: "#5d00ff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#fff",
    gutterForeground: "#237893",
  },
  styles: [
    { tag: t.angleBracket, color: "#0431fa" },
    { tag: t.string, color: "#0451a5" },
    { tag: t.squareBracket, color: "#319331" },
    { tag: t.propertyName, color: "#a31515" },
  ],
});

const CodeEditor = ({
  id,
  code,
  onChange,
  language,
  height,
  isReadOnly,
}: {
  id?: string;
  code?: string;
  onChange?: (data: string) => void;
  language: LanguageSupport;
  height?: string;
  isReadOnly?: boolean;
}) => (
  <CodeMirror
    id={id}
    extensions={[
      basicSetup(),
      language,
      EditorView.cspNonce.of("f55988f2-ae63-4969-ad0e-df696a57fbec"),
    ]}
    theme={jsonTheme}
    value={code}
    onChange={(value) => onChange?.(value)}
    height={height}
    readOnly={isReadOnly}
  />
);

export default CodeEditor;
