/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { FileComponent } from './file-component';

export const fileExtension = Node.create({
  name: 'fileExtension',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      url: {
        default: undefined,
      },
      alt: {
        default: undefined,
      },
      size: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'file-extension',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['file-extension', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileComponent);
  },
});