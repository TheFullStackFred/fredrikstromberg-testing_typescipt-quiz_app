# UML Class Diagram

```mermaid
  classDiagram
    App <|-- Home
    App <|-- Quiz
    Quiz <|-- QuestionCard
    Home <|-- Nameinput


    class App {
        +String beakColor
        +swim()
        +quack()
    }
    class Home.{
        -Input
        -Button(navigate to Quiz)
    }
    class Quiz {
        +bool is_wild
        +run()
    }
    class QuestionCard {
        +bool is_wild
        +run()
    }


```
