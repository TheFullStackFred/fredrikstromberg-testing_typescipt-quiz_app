const difficulties = ['easy', 'medium', 'hard']
const shuffledDifficulties = Math.floor(Math.random() * difficulties.length)

export const difficultiesOptions = [
  { backendName: 'easy', displayName: 'Easy' },
  { backendName: 'medium', displayName: 'Medium' },
  { backendName: 'hard', displayName: 'Hard' },
  { backendName: difficulties[shuffledDifficulties], displayName: 'Random' }
]

export const categoriesOptions = [
  { backendName: 'arts_and_literature', displayName: 'Arts & Literature' },
  { backendName: 'film_and_tv', displayName: 'Film & TV' },
  { backendName: 'food_and_drink', displayName: 'Food & Drink' },
  { backendName: 'general_knowledge', displayName: 'General Knowledge' },
  { backendName: 'geography', displayName: 'Geography' },
  { backendName: 'history', displayName: 'History' },
  { backendName: 'music', displayName: 'Music' },
  { backendName: 'science', displayName: 'Science' },
  { backendName: 'society_and_culture', displayName: 'Society & Culture' },
  { backendName: 'sport_and_leisure', displayName: 'Sport & Leisure' }
]
