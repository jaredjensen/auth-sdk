# Authentication Trees

Authentication Trees are a series of steps defined in AM to control an authentication flow. These steps may:

- Collect information (e.g. username, password)
- Look up a user in the datastore
- Present the user with choices
- Issue one-time password (OTP) challenges
- And many other types of tasks

Some notes about trees:

- A tree can be targeted in the XUI at `/XUI/#login&service=<tree_name>`
- A tree can be targeted in the API at `/json/authenticate?authIndexType=service&authIndexValue=<tree_name>`
- The API serves up one step at a time, issuing a unique id for each that must be POSTed back when requesting the subsequent step
- Upon completion of a tree, a token is issued
