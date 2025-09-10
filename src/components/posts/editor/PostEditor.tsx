"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "./action";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import "./style.css";
import { useState } from "react";
import { useSubmitPostMutation } from "./mutations";
import LoadingButton from "@/components/LoadingButton";


export default function PostEditor() {
    const { user } = useSession();
    const [content, setContent] = useState("");
    const mutation = useSubmitPostMutation();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            Placeholder.configure({
                placeholder: "What's on your mind?"
            })
        ],
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
        setContent(editor.getText({ blockSeparator: "\n" }));
    },
        
    })

    const input 
        = editor?.getText({
            blockSeparator: "\n",
    }) || "";



    function onSubmit(){
        if (!input.trim()) return;

        mutation.mutate(input, {
          onSuccess: () => {
            editor?.commands.clearContent();

          },
        });
        setContent("");
    }

    return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3"
        />
      </div>
      
      <div className="flex justify-end">
        <LoadingButton 
            onClick={onSubmit} 
            loading={mutation.isPending}
            disabled={!content.trim()}
            className="min-w-20  bg-blue-500 text-white font-bold  hover:bg-blue-600"
        >
            Post
        </LoadingButton>

      </div>
    </div>
    );
}

