import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";

export const convertHTMLToEditorState = (html: string): EditorState => {
  const contentState = stateFromHTML(html);
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};
