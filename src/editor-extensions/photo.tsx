import {Node, type NodeViewProps} from '@tiptap/core';
import {NodeViewWrapper, ReactNodeViewRenderer} from '@tiptap/react';
import type React from 'react';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        photo: {
            /**
             * Add an image
             * @param options The image attributes
             * @example
             * editor
             *   .commands
             *   .setImage({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo' })
             */
            insertPhoto: () => ReturnType,
        }
    }
}

const WhitePixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgMBA3mHAgAAAABJRU5ErkJggg==";

const ReadOnlyPhotoComponent = ({node}: NodeViewProps) => {
    return (
        <NodeViewWrapper className="photo-node relative react-component">
            <img
                src={node.attrs.src ?? WhitePixel}
                alt="Selected" style={{height: '300px', background: "white"}} className={"w-full h[300] object-cover"}/>
        </NodeViewWrapper>
    );
}

const PhotoComponent = ({ node, updateAttributes, deleteNode }: NodeViewProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event:  ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                updateAttributes({ src: reader.result }); // Update the `src` attribute
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectPhoto = () => {
        fileInputRef.current?.click(); // Trigger the file input dialog
    };

    return (
        <NodeViewWrapper className="photo-node relative react-component">
            <img
                src={node.attrs.src ?? WhitePixel}
                alt="Selected" style={{height: '300px', background: "white"}} className={"w-full h[300] object-cover"}/>
            <div className={"absolute left-0 bottom-0"}>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />
                <button type={"button"} className={"btn btn-sm"} onClick={handleSelectPhoto}>Upload
                    Photo
                </button>
                <button type={"button"} onClick={deleteNode} className={"btn btn-sm"}>Delete Photo</button>
            </div>
        </NodeViewWrapper>
    );
};

const PhotoNodeExtension = Node.create({
    name: 'photoNode',
    group: 'block',
    atom: true,
    inline: false,
    draggable: true,

    addAttributes() {
        return {
            src: {
                default: WhitePixel
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'photo-node',
            },
        ];
    },

    renderHTML({  HTMLAttributes }) {
        return ['photo-node', HTMLAttributes];
    },

    addNodeView() {
        if (this.editor.options.editable) return ReactNodeViewRenderer(PhotoComponent)
        return ReactNodeViewRenderer(ReadOnlyPhotoComponent, {});
    },

    addCommands() {
        return {
            insertPhoto: () => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: {src: WhitePixel},
                })
            },
        }
    },
});

export default PhotoNodeExtension;
