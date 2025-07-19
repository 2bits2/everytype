import React, { useEffect } from 'react';
import { MilkdownProvider, Milkdown, useEditor, useInstance } from '@milkdown/react';
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { nord } from '@milkdown/theme-nord';
import { collab, collabServiceCtx } from '@milkdown/plugin-collab';
import { WebsocketProvider } from 'y-websocket';
import { Doc } from 'yjs';
import '@milkdown/theme-nord/style.css';

const markdown = '# Milkdown React Editor';

const MilkdownEditor: React.FC = () => {
  useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, markdown);
      })
      .config(nord)
      .use(commonmark)
      .use(collab),
  []);

  const [loading, get] = useInstance();

  useEffect(() => {
    if (loading) return;
    const editor = get();
    editor.action((ctx) => {
      const collabService = ctx.get(collabServiceCtx);
      const doc = new Doc();
      const wsProvider = new WebsocketProvider('ws://localhost:1234', 'default-room', doc);
      collabService.bindDoc(doc).setAwareness(wsProvider.awareness).connect();
    });
  }, [loading, get]);

  return <Milkdown />;
};

export const App: React.FC = () => (
  <MilkdownProvider>
    <MilkdownEditor />
  </MilkdownProvider>
);

export default App;
