'use client';

import '@mdxeditor/editor/style.css';
import './markdown.css';
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertImage,
  imagePlugin,
} from '@mdxeditor/editor';
import React, { FC } from 'react';

interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
  onChange?: (markdown: string) => void;
}

const MarkdownEditor: FC<EditorProps> = ({ markdown, editorRef, ...props }) => {
  return <MDXEditor
    contentEditableClassName="markdown bg-secondary"
    className="markdown-editor border-2 border-primary bg-primary"
    onChange={props.onChange}
    ref={editorRef}
    markdown={markdown}
    plugins={[
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      markdownShortcutPlugin(),
      imagePlugin({
        imageUploadHandler: () => {
          return Promise.resolve('https://picsum.photos/200/300');
        },
        imageAutocompleteSuggestions: [
          'https://picsum.photos/200/300',
          'https://picsum.photos/200',
        ],
      }),
      toolbarPlugin({
        toolbarContents: () => (<> <UndoRedo /><BoldItalicUnderlineToggles /><InsertImage /></>),
      }),
    ]} />;
};

export default MarkdownEditor;
