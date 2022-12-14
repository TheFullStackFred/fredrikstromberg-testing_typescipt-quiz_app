```mermaid
sequenceDiagram
    participant User
    participant App
    participant Api

    User->>App: Enter username &/or start quiz
    App->>User: Navigate to quiz
    User->>App: Select a category and difficulty
    User->>App: Start quiz
    App->>Api: Send fetch request
    Api->>App: Send response
    App->>User: Send question
    User->>App: Answer question
    App->>Api: Send next question

```
