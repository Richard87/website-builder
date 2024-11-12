"use client"
import { Box } from "@mui/material";
import { JSONContent} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {RichTextReadOnly} from "mui-tiptap";

export const Content = ({content}: {content:JSONContent|null}) => {


    return(
        <Box>
            <RichTextReadOnly
                extensions={[StarterKit]}
                content={content}
            />
        </Box>
    )
}

