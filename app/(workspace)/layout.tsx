import type { ReactNode } from "react";
// ‼️ import tiptap styles after core package styles

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh w-full bg-white text-slate-900">
      <div className="flex h-full">
        <Sidebar />

        <main className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <div className="min-w-0 flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  const navItems = [
    { label: "검색", icon: "🔎" },
    { label: "홈", icon: "🏠" },
    { label: "회의", icon: "🗓️" },
    { label: "Notion AI", icon: "✨" },
    { label: "수신함", icon: "📥" },
  ];

  const pages = [
    "왜 일본을 가려고하는지",
    "노션 클론",
    "사업/아이디어",
    "프론트엔드",
    "일본어문법",
    "의지없이 공부하는법",
  ];

  return (
    <aside className="bg-[#F9F8F7] border-r border-[#EEE EEC]">
      {/* workspace header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-8 w-8 shrink-0 rounded-lg bg-slate-200" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">seodonghyun</div>
            <div className="truncate text-xs text-slate-500">개인 페이지</div>
          </div>
        </div>
        <button className="rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-200/60">
          ⋯
        </button>
      </div>

      {/* quick nav */}
      <nav className="px-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-200/60 focus:bg-slate-200/70"
          >
            <span className="w-5 text-slate-500">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="my-3 border-t border-slate-200" />

      {/* pages */}
      <div className="px-2 pb-3">
        <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500">
          <span>개인 페이지</span>
          <button className="rounded px-2 py-1 hover:bg-slate-200/60">
            ＋
          </button>
        </div>

        <div className="space-y-1">
          {pages.map((p) => {
            return (
              <button
                key={p}
                className={[
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  "hover:bg-slate-200/60 hover:text-slate-900",
                ].join(" ")}
              >
                <span className="text-slate-500">📄</span>
                <span className="truncate">{p}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* bottom */}
      <div className="mt-auto border-t border-slate-200 p-3 text-xs text-slate-500">
        <div className="flex items-center justify-between">
          <button className="rounded-md px-2 py-1 hover:bg-slate-200/60">
            설정
          </button>
          <button className="rounded-md px-2 py-1 hover:bg-slate-200/60">
            휴지통
          </button>
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 bg-white">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="truncate">왜 일본을 가려고하는지</span>
          <span className="text-slate-300">/</span>
          <span className="truncate">개인 페이지</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">
          공유
        </button>
        <button className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100">
          업데이트
        </button>
        <button className="rounded-md px-2 py-1.5 text-slate-600 hover:bg-slate-100">
          ⋯
        </button>
      </div>
    </header>
  );
}
