```mermaid
sequenceDiagram
    participant User
    participant App
    participant Api

       User->>App: Ask for question?
    App-->>Api: Fetch question
    Api-)User: Send question
```
