```mermaid
sequenceDiagram
    participant User
    participant App
    participant Api

       User->>App: Enter username or start quiz
    App->>Api: Fetch question
    Api-)App: Send question
    App->>User: Send question
```
