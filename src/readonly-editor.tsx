"use client"
//TODO Update to real SSR when https://github.com/ueberdosis/tiptap/pull/5528 is released

import {extensions} from "@/editor";
import {type Content, EditorContent, useEditor} from "@tiptap/react";
import type React from "react";

export function ReadOnlyEditor({content}: { content: Content; }) {
	const editor = useEditor({
		content, extensions: extensions,editable: false,immediatelyRender: false,
		editorProps: {attributes: {class: "main-container prose "}}
	});
	return <EditorContent editor={editor} />	;
}
