export default function GuideItem({ icon, title, description, keys = [] }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
        {icon}
      </div>
      <div>
        <h2 className="font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
        {keys.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {keys.map((keyName) => (
              <span
                key={keyName}
                className="flex min-w-8 items-center justify-center rounded-md border border-slate-600 bg-slate-800 px-2 py-1 font-mono text-xs font-bold text-amber-300"
              >
                {keyName}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
