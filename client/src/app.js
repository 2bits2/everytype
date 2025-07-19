import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

const ydoc = new Y.Doc();
const provider = new WebsocketProvider('ws://localhost:1234', 'default-room', ydoc);

const FormField = Editor.createNode({
  name: 'formField',
  group: 'block',
  atom: true,
  addAttributes() {
    return { label: { default: 'field' }, type: { default: 'text' } };
  },
  parseHTML() {
    return [{ tag: 'span[data-form-field]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const { label, type } = HTMLAttributes;
    return ['span', { 'data-form-field': '', 'data-label': label, 'data-type': type }, [
      'input', { type, placeholder: label }
    ]];
  },
});

const SlashCommand = Editor.createExtension({
  addKeyboardShortcuts() {
    return {
      Slash: () => {
        const label = window.prompt('Form field label?');
        if (!label) return true;
        const type = window.prompt('type (text or number)?', 'text');
        this.editor.commands.insertContent({ type: 'formField', attrs: { label, type } });
        return true;
      },
    };
  },
});

const editor = new Editor({
  element: document.getElementById('editor'),
  extensions: [
    StarterKit,
    Collaboration.configure({ document: ydoc }),
    CollaborationCursor.configure({ provider, user: { name: 'Anonymous', color: '#ffcc00' } }),
    FormField,
    SlashCommand,
  ],
});

function collectFormData() {
  const result = [];
  document.querySelectorAll('[data-form-field]').forEach(el => {
    const label = el.dataset.label;
    const type = el.dataset.type;
    const value = el.querySelector('input').value;
    result.push({ label, type, value: type === 'number' ? Number(value) : value });
  });
  return result;
}

window.saveData = async function () {
  const data = collectFormData();
  await fetch('http://localhost:1234/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docId: 'default-room', data }),
  });
  alert('saved');
};
