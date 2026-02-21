"use client";

import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useRef, useEffect } from "react";

export default function EditorClient({
  docId,
  name,
  color,
}: {
  docId: string;
}) {
  // 1. 문서 1개만 만들기
  const ydocRef = useRef<Y.Doc | null>(null);
  if (!ydocRef.current) {
    ydocRef.current = new Y.Doc();
    console.log("Y.Doc 생성됨");
    console.log(ydocRef.current);
  }

  // 2. 웹소켓 연결도 1개만 만들기
  const providerRef = useRef<HocuspocusProvider | null>(null);
  if (!providerRef.current) {
    providerRef.current = new HocuspocusProvider({
      url: "ws://127.0.0.1:1234",
      name: docId,
      document: ydocRef.current,
    });

    console.log("WebSocket 연결 생성됨");
  }

  // 3. BlockNote에 연결
  const editor = useCreateBlockNote({
    collaboration: {
      provider: providerRef.current,
      fragment: ydocRef.current.getXmlFragment("document-store"),
      user: { name: "user", color: "#4eaf41" },
    },
  });

  // 4. 페이지 떠날 때 정리
  useEffect(() => {
    return () => {
      console.log("연결 정리");
      providerRef.current?.destroy();
      ydocRef.current?.destroy();
    };
  }, []);

  return <BlockNoteView editor={editor} />;
}
