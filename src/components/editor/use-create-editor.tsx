'use client';

import {withProps} from '@udecode/cn';
import {BasicElementsPlugin} from '@udecode/plate-basic-elements/react';
import {
    BasicMarksPlugin,
    BoldPlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import {
    ParagraphPlugin,
    PlateElement,
    PlateLeaf,
    usePlateEditor
} from '@udecode/plate-common/react';
import {NodeIdPlugin, Value} from "@udecode/plate";
import {DndPlugin} from "@udecode/plate-dnd";
import {withDraggables} from "@/components/plate-ui/with-draggables";
import {HeadingPlugin} from "@udecode/plate-heading/react";
import {IndentPlugin} from "@udecode/plate-indent/react";
import {HEADING_KEYS} from "@udecode/plate-heading";

export const useCreateEditor = (content: string | Value | undefined) => {
    return usePlateEditor({
        override: {
            // Default styles in globals.css
            components: withDraggables({
                [BoldPlugin.key]: withProps(PlateLeaf, {as: 'strong'}),
                [ItalicPlugin.key]: withProps(PlateLeaf, {as: 'em'}),
                [ParagraphPlugin.key]: withProps(PlateElement, {
                    as: 'p',
                    className: 'mb-4',
                }),
                [StrikethroughPlugin.key]: withProps(PlateLeaf, {as: 's'}),
                [UnderlinePlugin.key]: withProps(PlateLeaf, {as: 'u'}),
                blockquote: withProps(PlateElement, {
                    as: 'blockquote',
                    className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
                }),
                h1: withProps(PlateElement, {
                    as: 'h1',
                    className:
                        'mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl',
                }),
                h2: withProps(PlateElement, {
                    as: 'h2',
                    className: 'mb-4 mt-6 text-2xl font-semibold tracking-tight',
                }),
                h3: withProps(PlateElement, {
                    as: 'h3',
                    className: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
                }),
            }),
        },
        plugins: [

            HeadingPlugin,
            IndentPlugin.configure({
                inject: {
                    targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
                },
            }),
            BasicElementsPlugin,
            BasicMarksPlugin,
            NodeIdPlugin,
            DndPlugin.configure({options: {enableScroller: true}}),
        ],
        value: content,
    });
};