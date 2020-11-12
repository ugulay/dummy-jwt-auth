
## Dummy backend for JWT Auth

Static 2 Accounts inside the "data.js" file
/user/profile endpoint need Bearer auth.
### `JWT token valid last 10 minutes`

|Method|URL|Json Body|Auth|
|---|---|---|---|
|GET|/ping
|POST|/user/login|{username:'username',password:'password'}
|GET|/user/profile||Header: Bearer JWT