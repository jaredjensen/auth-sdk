# Sample Requests

## Testing in the XUI

You can test a flow in the XUI by specifying it in the querystring:

```text
// The use and placement of "&" is important (i.e. &service=, not ?service=)

http://openam:8886/XUI/#login&service=<tree_name>
```

## Testing with curl

### Username/Password Flow

1. Request the first step of auth tree "UsernamePassword":

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Accept-API-Version: protocol=1.0,resource=2.1" \
  "http://openam:8886/json/authenticate?authIndexType=service&authIndexValue=UsernamePassword" | jq
```

2. Review the response and capture the `authId` token:

```json
{
  "authId": "<jwt>",
  "template": "",
  "stage": "DataStore1",
  "header": "Sign in",
  "callbacks": [
    {
      "type": "NameCallback",
      "input": [
        {
          "name": "IDToken1",
          "value": ""
        }
      ],
      "output": [
        {
          "name": "prompt",
          "value": "User Name:"
        }
      ]
    },
    {
      "type": "PasswordCallback",
      "input": [
        {
          "name": "IDToken2",
          "value": ""
        }
      ],
      "output": [
        {
          "name": "prompt",
          "value": "Password:"
        }
      ]
    }
  ]
}
```

3. Update **submit-username-password.json** with the `authId` token and submit a response to the first step:

```bash
# Update curl/submit-username-password.json to specify jwt in "authId" property
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Accept-API-Version: protocol=1.0,resource=2.1" \
  -d @submit-username-password.json \
  "http://openam:8886/json/authenticate?authIndexType=service&authIndexValue=UsernamePassword" | jq
```

4. Review the response and capture the `tokenId` token:

```json
{
  "tokenId": "<token>",
  "successUrl": "/console",
  "realm": "/"
}
```
