import {
  FiBookOpen,
  FiZap,
  FiDroplet,
  FiMoon,
  FiMove,
  FiX,
} from "react-icons/fi";
import GuideItem from "./GuideItem";

export default function GuidePanel({ closePanel }) {
  return (
    <section className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-400/30 bg-slate-950/95 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <FiBookOpen size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">How to Play</h1>
            <p className="text-xs text-slate-400">Basic guide to Cozy Pixel Farm</p>
          </div>
        </div>
        <button
          type="button"
          onClick={closePanel}
          aria-label="Close how to play"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <FiX size={20} />
        </button>
      </div>
      <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
        <GuideItem
          icon={<FiMove size={19} />}
          title="Move"
          description="Use WASD or arrow keys to move the character."
          keys={["W", "A", "S", "D"]}
        />
        <GuideItem
          icon={<FiZap size={19} />}
          title="Interact"
          description="Approach a friend or farm plot, then press E to interact."
          keys={["E"]}
        />
        <GuideItem
          icon={<FiDroplet size={19} />}
          title="Farming"
          description="Plant seeds, water crops daily, then harvest when they are ripe."
        />
        <GuideItem
          icon={<FiMoon size={19} />}
          title="Change Day"
          description="Use the Sleep button to restore energy and continue crop growth."
        />
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
          <h2 className="mb-2 font-semibold text-amber-300">Cooking and Selling</h2>
          <p className="text-sm leading-6 text-slate-300">
            Use harvests to make Fresh Salad or Mashed Potatoes.
            Harvests and dishes can be sold for coins.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-700 p-5">
        <button
          type="button"
          onClick={closePanel}
          className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500 active:scale-[0.98]"
        >
          Continue Playing
        </button>
      </div>
    </section>
  );
}
