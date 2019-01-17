# Authentication SDK

This is a JavaScript library that customers can use to create an embedded authentication widget into their websites. The widget talks to our gateway, which abstracts and simplifies AM auth trees.

## Prerequisites

- An instance of AM available at http://localhost:8886
- Authentication tree named "UsernamePassword" created in that instance

## Setup

```bash
npm i
npm start
```

Sample customer site should be available at http://localhost:9000.

## Project Structure

| Layer    | Purpose                                             |
| -------- | --------------------------------------------------- |
| Model    | Interfaces, types, enums                            |
| Services | Abstractions of REST calls, HTML rendering, etc     |
| Views    | HTML templates for each type of authentication step |

## Additional Documentation

- [AM Auth Trees](docs/auth-trees.md)
- [Sample Requests](docs/sample-requests.md)

## To Do

- Research CORS impact and fixes
