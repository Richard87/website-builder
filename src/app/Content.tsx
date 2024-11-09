"use client"
import {Value} from "@udecode/plate";
import {useCreateEditor} from "@/components/editor/use-create-editor";
import {Plate, PlateContent} from "@udecode/plate-common/react";

export const Content = ({blob}: {blob:Value|null}) => {
    const editor = useCreateEditor(blob)
    return <Plate editor={editor} readOnly><PlateContent /></Plate>
}

