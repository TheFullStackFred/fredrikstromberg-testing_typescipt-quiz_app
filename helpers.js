// map enum

// const result = (Object.keys(Categories) as (keyof typeof Categories)[]).map(
//     (key, index) => {
//       return Categories[key];
//     },
//   )

// fetch

//   export const fetchQuestions = async (): Promise<QuestionsState[]> => {
//     const url = `https://the-trivia-api.com/api/questions?limit=9
//     `
//     const data = await (await fetch(url)).json()
//     console.log(data)

//     return data.map((question: Question) => ({
//       ...question,
//       answers: shuffleArray([
//         ...question.incorrectAnswers,
//         question.correctAnswer
//       ])
//     }))
//   }
