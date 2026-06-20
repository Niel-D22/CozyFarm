import { FiSettings, FiX, FiVolume2, FiVolumeX, FiCheck } from "react-icons/fi";

export default function SettingsPanel({
  closePanel,
  volume,
  setVolume,
  sfxEnabled,
  setSfxEnabled,
}) {
  return (
    <section className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-400/30 bg-slate-950/95 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
            <FiSettings size={20} />
          </div>
            <h1 className="text-lg font-bold text-white">Settings</h1>
            <p className="text-xs text-slate-400">Adjust game sounds</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close settings"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <FiX size={20} />
        </button>
      
      <div className="space-y-6 p-6">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <FiVolume2 size={18} /> Volume
            </div>
            <span className="font-mono text-sm text-emerald-300">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => {
              setVolume(Number(event.target.value));
            }}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-emerald-500"
          />
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900 p-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                sfxEnabled
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {sfxEnabled ? <FiVolume2 size={19} /> : <FiVolumeX size={19} />}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Sound Effects</p>
              <p className="text-xs text-slate-400">
                Interaction and activity sounds
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setSfxEnabled((currentValue) => !currentValue);
            }}
            className={`relative h-7 w-12 rounded-full transition ${
              sfxEnabled ? "bg-emerald-500" : "bg-slate-700"
            }`}
            aria-label="Enable or disable sound effects"
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                sfxEnabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="border-t border-slate-700 p-5">
        <button
          type="button"
          onClick={closePanel}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500 active:scale-[0.98]"
        >
          <FiCheck size={18} /> Save Settings
        </button>
      </div>
    </section>
  );
}
