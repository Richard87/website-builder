"use client"
import { JSONContent} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {RichTextReadOnly} from "mui-tiptap";

export const Content = ({content}: {content:JSONContent|null}) => {
    return(
            <RichTextReadOnly
                extensions={[StarterKit]}
                content={content}
                immediatelyRender={false}
            />
    )
}

