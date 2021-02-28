# ghTagAdder

add tags based on user to your gh repo

## Setup

1. Create a `.env` file containing

```env
GIT_OATH=Github oath key
REPO=Repository name
REPO_OWNER=Owner of repository
```

2. Create a `config.json` file in the root of repository containing this structure:

```json
[
  {
    "role": "rollname-1",
    "asignees": [
      "user1",
      "user2",
      "user3",
      ...
      ]
  },
  {
    "role": "rollname-2",
    "asignees": [
      "user1",
      ...
    ]
  },
  ...
]
```
