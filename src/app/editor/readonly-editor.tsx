"use client"
import {Content, EditorProvider} from "@tiptap/react";
import React from "react";
import {extensions} from "@/app/editor/editor";

export function ReadonlyEditor({content}: {content: Content}) {
    return <EditorProvider immediatelyRender={true} editable={false } extensions={extensions} content={content}></EditorProvider>
}
