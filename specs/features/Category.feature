Feature: Category

  Scenario: Pick a category
    Given category: History
    When Picking a category
    Then The picked category should be: History
