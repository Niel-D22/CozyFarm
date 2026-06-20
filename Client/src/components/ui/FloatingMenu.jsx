import { FiBookOpen } from "react-icons/fi";

export default function FloatingMenu({ openGuide }) {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 z-[100] flex -translate-y-1/2 flex-col gap-3">
      <button
        type="button"
        onClick={openGuide}
        aria-label="Open how to play"
        title="How to Play"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-950/90 text-emerald-100 shadow-xl backdrop-blur-sm transition hover:scale-105 hover:bg-emerald-800 active:scale-95"
      >
        <FiBookOpen size={21} />
      </button>
    </div>
  );
}
