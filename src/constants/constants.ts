const difficulties = ['easy', 'medium', 'hard']
const shuffledDifficulties = Math.floor(Math.random() * difficulties.length)

export const difficultiesOptions = [
  { backendName: 'easy', displayName: 'Easy' },
  { backendName: 'medium', displayName: 'Medium' },
  { backendName: 'hard', displayName: 'Hard' },
  { backendName: difficulties[shuffledDifficulties], displayName: 'Random' }
]

export const categoriesOptions = [
  { backendName: 'Arts & Literature', displayName: 'Arts & Literature' },
  { backendName: 'Film & TV', displayName: 'Film & TV' },
  { backendName: 'Food & Drink', displayName: 'Food & Drink' },
  { backendName: 'General Knowledge', displayName: 'General Knowledge' },
  { backendName: 'Geography', displayName: 'Geography' },
  { backendName: 'History', displayName: 'History' },
  { backendName: 'Music', displayName: 'Music' },
  { backendName: 'Science', displayName: 'Science' },
  { backendName: 'Society & Culture', displayName: 'Society & Culture' },
  { backendName: 'Sport & Leisure', displayName: 'Sport & Leisure' }
]
