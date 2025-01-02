"use client";

import PhotoNodeExtension from "@/editor-extensions/photo";
import { savePage } from "@/store";
import TextStyle from "@tiptap/extension-text-style";
import {generateJSON} from "@tiptap/html"
import {
	type Content,
	EditorContent, type HTMLContent,type JSONContent,
	type Editor as TipTapEditor,
	useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import type React from "react";
import {
	FaBold,
	FaCode,
	FaHeading, FaImage,
	FaItalic,
	FaListOl,
	FaListUl,
	FaQuoteLeft,
	FaRedo,
	FaRemoveFormat,
	FaRulerHorizontal,
	FaStrikethrough,
	FaUndo,
} from "react-icons/fa";

type ButtonProps = React.PropsWithChildren<{
	onClick: () => unknown;
	disabled?: boolean;
	active?: boolean;
}>;
const Button = ({ onClick, disabled, active, children }: ButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={classNames("btn btn-sm", active ? "btn-primary" : "btn-ghost")}
		>
			{children}
		</button>
	);
};

const MenuBar = ({
	editor,
	onSave
}: { editor: TipTapEditor | null, onSave: (content: string) => unknown }) => {
	if (!editor) {
		return null;
	}

	const onLocalSave = () => {
		const content = editor?.getHTML();
		const json: JSONContent = generateJSON(content, extensions)
		const body = JSON.stringify(json, null, 2);
		onSave(body)
	}

	return (
		<div className="menu menu-horizontal menu-sm z-10 shadow rounded-box">
			<Button onClick={onLocalSave} active>
				Save
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				active={editor.isActive("bold")}
			>
				<FaBold />
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				active={editor.isActive("italic")}
			>
				<FaItalic />
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				active={editor.isActive("strike")}
			>
				<FaStrikethrough />
			</Button>
			<div className={"dropdown"}>
				<div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
					<FaHeading />
				</div>
				<div className="menu dropdown-content bg-base-100 w-36 rounded-box z-[1] p-2 shadow">
					<Button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
						active={editor.isActive("heading", { level: 1 })}
					>
						Title
					</Button>
					<Button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						active={editor.isActive("heading", { level: 2 })}
					>
						Heading 1
					</Button>
					<Button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 3 }).run()
						}
						active={editor.isActive("heading", { level: 3 })}
					>
						Heading 2
					</Button>
					<Button
						onClick={() => editor.chain().focus().setParagraph().run()}
						active={editor.isActive("paragraph")}
					>
						Normal
					</Button>
				</div>
			</div>
            <Button
                onClick={() =>
                    editor.chain().focus().unsetAllMarks().clearNodes().run()
                }
            >
                <FaRemoveFormat />
            </Button>
			<Button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				active={editor.isActive("bulletList")}
			>
				<FaListUl />
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				active={editor.isActive("orderedList")}
			>
				<FaListOl />
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				active={editor.isActive("codeBlock")}
			>
				<FaCode />
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				active={editor.isActive("blockquote")}
			>
				<FaQuoteLeft />
			</Button>
			<Button
				onClick={() => editor.chain().focus().insertPhoto().run()}
				active={editor.isActive("photoNode")}
			>
				<FaImage />
			</Button>
			<Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
				<FaRulerHorizontal />
			</Button>
			<Button
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				<FaUndo />
			</Button>
			<Button
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				<FaRedo />
			</Button>
		</div>
	);
};

export const extensions = [
	TextStyle.configure(),
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: true,
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: true,
		},
	}),
	PhotoNodeExtension,
];

type Props = { content: Content; pageId: string };

export function Editor({ content, pageId }: Props) {
	const editor = useEditor({
		extensions: extensions,
		content: content,
		immediatelyRender: false,
		editable: true,
		editorProps: {
			attributes: {
				classNames: "bg-white textarea textarea-bordered",
				style: "height: 100%;",
			},
		},
	});

	const onSave = (content: string) => {
		savePage(pageId, content);
	}

	return (
		<div className="flex flex-col flex-grow ">
			<MenuBar onSave={onSave} editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}
