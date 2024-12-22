"use client"

import TextStyle from '@tiptap/extension-text-style'
import {type Content, EditorProvider, useCurrentEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import classNames from 'classnames'
import type React from 'react'
import {savePage} from "@/store";
import {FaBold, FaCode, FaHeading, FaItalic, FaParagraph, FaStrikethrough, FaStripe} from "react-icons/fa";


type ButtonProps = React.PropsWithChildren<{ onClick: () => unknown, disabled?: boolean, active?: boolean }>;
const Button = ({onClick, disabled, active, children}: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={classNames("btn btn-sm", active ? "btn-primary" : "btn-ghost")}
        >
            {children}
        </button>
    )
}

const MenuBar = ({pageId}: {pageId: string }) => {
    const {editor} = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className="menu menu-horizontal menu-sm">
            <Button
                onClick={() => savePage(pageId, editor?.getJSON())}
                active
            >
                Save
            </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    active={editor.isActive('bold')}
                >
                    <FaBold />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    active={editor.isActive('italic')}
                >
                    <FaItalic />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    active={editor.isActive('strike')}
                >
                    <FaStrikethrough />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    active={editor.isActive('code')}
                >
                    <FaCode />
                </Button>
                <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    Clear marks
                </Button>
                <Button onClick={() => editor.chain().focus().clearNodes().run()}>
                    Clear nodes
                </Button>
                <Button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    active={editor.isActive('paragraph')}
                >
                    <FaParagraph />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive('heading', { level: 1 })}
                >
                    <FaHeading />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                >
                    H2
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                >
                    H3
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    active={editor.isActive('heading', { level: 4 })}
                >
                    H4
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    active={editor.isActive('heading', { level: 5 })}
                >
                    H5
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    active={editor.isActive('heading', { level: 6 })}
                >
                    H6
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                >
                    Bullet list
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                >
                    Ordered list
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    active={editor.isActive('codeBlock')}
                >
                    Code block
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                >
                    Blockquote
                </Button>
                <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    Horizontal rule
                </Button>
                <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
                    Hard break
                </Button>
                <Button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    Undo
                </Button>
                <Button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    Redo
                </Button>
        </div>
    )
}

export const extensions = [
    TextStyle.configure(),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]

export function Editor({content, pageId}: {content: Content, pageId: string}) {
    return (
        <EditorProvider
            editorContainerProps={{ className: "h-full"}}
            editorProps={{attributes: {classNames: "h-max bg-white"}}}
            slotBefore={<MenuBar pageId={pageId} />}
            extensions={extensions}
            content={content}
        />
    )
}
