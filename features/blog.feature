Feature: Hello World
  Scenario Outline: A simple test
    Given this is a Friday night
    Then there should be <drink>
    Examples:
      | drink  |
      | coffee |
      | milk   |
      | tea    |