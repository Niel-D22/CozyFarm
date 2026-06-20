const GameState = {
  day: 1,
  energy: 100,
  maxEnergy: 100,
  gold: 0,
  inventory: {
    turnip_seed: 5,
    potato_seed: 3,
    turnip: 0,
    potato: 0,
    salad: 0,
    mashed_potato: 0,
  },
  // Diisi ulang oleh FarmScene.create() saat scene dimulai — jangan isi
  // data statis di sini supaya tidak ada dua sumber kebenaran posisi plot.
  plots: [],
  quests: [
    { id: 1, title: 'First Seed', desc: 'Plant 3 crops (0/3)', goal: 3, progress: 0, done: false },
    { id: 2, title: 'Green Thumb', desc: 'Water 2 days in a row (0/2)', goal: 2, progress: 0, done: false },
    { id: 3, title: 'First Harvest', desc: 'Harvest 3 crops (0/3)', goal: 3, progress: 0, done: false },
    { id: 4, title: 'Chef', desc: 'Cook 1 dish (0/1)', goal: 1, progress: 0, done: false },
    { id: 5, title: 'Talk to Friend', desc: 'Meet Friend in front of house', goal: 1, progress: 0, done: false },
  ],
  activeQuest: 0,
  wateredStreak: 0,
  hasWateredToday: false,
  onQuestComplete: null,

  addProgress(questIndex, amount = 1) {
    const q = this.quests[questIndex];
    if (q && !q.done) {
      q.progress = Math.min(q.progress + amount, q.goal);
      if (q.id === 1) q.desc = `Plant 3 crops (${q.progress}/3)`;
      else if (q.id === 2) q.desc = `Water 2 days in a row (${q.progress}/2)`;
      else if (q.id === 3) q.desc = `Harvest 3 crops (${q.progress}/3)`;
      else if (q.id === 4) q.desc = `Cook 1 dish (${q.progress}/1)`;

      if (q.progress >= q.goal) {
        q.done = true;
        this.activeQuest++;
        if (typeof this.onQuestComplete === 'function') {
          this.onQuestComplete(q.title);
        }
      }
    }
  }
};

export default GameState;