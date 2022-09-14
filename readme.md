# React Quiz

An API for collecting React Quiz questions.

# Testing

I test from the terminal with HTTPie.

POST with hand crafted JSON:

```bash
echo -n '{"question": "Que?", "answers": ["a","b"]}' | http POST :8989/api/questions
```

POST from a JSON file:

```bash
http POST :8989/api/questions < question.json
```

# Design

what do I want to collect?

A question has the actual `question` (duh)

An `answer` is a string array because multiple correct answers are possible.

Perhaps a field for defining whether 1 correct answer is enough, or all correct answers need to be given?

A question can be open, then the answer has to exactly match the given answer.

A question can also be multiple choice, then there is a `choices` string array with all answers to choose from.

Optionally one or more `categories`, which is a string array.

Optionally a link to an `imageUrl`, which can be a Carbon code image for example.

Optionally a link to a `codeUrl` to try out and experiment with the code.
