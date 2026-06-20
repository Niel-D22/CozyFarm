import React from "react";

export default function StatsRow() {
  const [activeFarmers, setActiveFarmers] = React.useState(0);
  const [cropTypes, setCropTypes] = React.useState(0);
  const [dailyQuests, setDailyQuests] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  React.useEffect(() => {
    if (!hasAnimated) return;

    // Tick Count Animation
    const duration = 1500; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing steps
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setActiveFarmers(Math.floor(easeProgress * 500));
      setCropTypes(Math.floor(easeProgress * 12));
      setDailyQuests(Math.floor(easeProgress * 5));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setActiveFarmers(500);
        setCropTypes(12);
        setDailyQuests(5);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated]);

  return (
    <div
      ref={elementRef}
      id="stats-row"
      className="bg-[#E8A838] border-y-4 border-[#1a2e0f] select-none py-8 relative overflow-hidden"
    >
      {/* Dynamic line decor */}
      <div className="absolute top-1 left-0 right-0 h-[2px] bg-[#1a2e0f]/20 border-t border-dashed border-[#1a2e0f]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center items-center">

          {/* Active Farmers */}
          <div className="flex flex-col items-center p-2 transform hover:scale-105 transition-transform duration-200">
            <span className="font-pixel text-2xl sm:text-4xl lg:text-5xl text-[#1a2e0f] mb-2 tracking-wide block">
              {activeFarmers}+
            </span>
            <span className="font-sans font-black text-sm sm:text-base text-[#1a2e0f]/80 uppercase tracking-widest text-center">
              Active Farmers
            </span>
          </div>

          {/* Crop Types */}
          <div className="flex flex-col items-center p-2 transform hover:scale-105 transition-transform duration-200">
            <span className="font-pixel text-2xl sm:text-4xl lg:text-5xl text-[#1a2e0f] mb-2 tracking-wide block">
              {cropTypes}
            </span>
            <span className="font-sans font-black text-sm sm:text-base text-[#1a2e0f]/80 uppercase tracking-widest text-center">
              Crop Types
            </span>
          </div>

          {/* Daily Quests */}
          <div className="flex flex-col items-center p-2 transform hover:scale-105 transition-transform duration-200">
            <span className="font-pixel text-2xl sm:text-4xl lg:text-5xl text-[#1a2e0f] mb-2 tracking-wide block">
              {dailyQuests}
            </span>
            <span className="font-sans font-black text-sm sm:text-base text-[#1a2e0f]/80 uppercase tracking-widest text-center">
              Daily Quests
            </span>
          </div>

          {/* Farming Game Top Title */}
          <div className="flex flex-col items-center p-2 transform hover:scale-105 transition-transform duration-200">
            <span className="font-pixel text-2xl sm:text-4xl lg:text-5xl text-[#1a2e0f] mb-2 tracking-wide block animate-pulse">
              #1
            </span>
            <span className="font-sans font-black text-sm sm:text-base text-[#1a2e0f]/80 uppercase tracking-widest text-center">
              Farming Game
            </span>
          </div>

        </div>
      </div>

      <div className="absolute bottom-1 left-0 right-0 h-[2px] bg-[#1a2e0f]/20 border-b border-dashed border-[#1a2e0f]" />
    </div>
  );
}
