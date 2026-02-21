"use client";

import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo } from "react";

type Props = {
  docId: string; // 같은 문서에 들어갈 사람들은 docId가 같아야 함(= room/name)
  userName: string;
  userColor: string; // "#ff0000" 같은 형태
  serverUrl?: string; // 기본 ws://localhost:1234
};

export default function CollaborativeBlockNote({
  docId,
  userName,
  userColor,
  serverUrl = "ws://localhost:1234",
}: Props) {
  // Next.js라면 "클라이언트에서만" 만들기 위해 useMemo 사용
  const { ydoc, provider } = useMemo(() => {
    const ydoc = new Y.Doc();

    const provider = new HocuspocusProvider({
      url: serverUrl,
      name: docId, // 문서/룸 식별자 (모든 클라이언트에서 동일해야 같은 문서)
      document: ydoc, // Y.Doc 연결 :contentReference[oaicite:5]{index=5}
    });

    return { ydoc, provider };
  }, [docId, serverUrl]);

  const editor = useCreateBlockNote({
    collaboration: {
      provider, // Yjs Provider
      fragment: ydoc.getXmlFragment("document-store"),
      user: {
        name: userName,
        color: userColor,
      },
      showCursorLabels: "activity",
    },
  });

  // 정리(안 하면 탭 이동/언마운트 때 소켓/메모리 누수)
  useEffect(() => {
    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, [provider, ydoc]);

  return <BlockNoteView editor={editor} />;
}
