Blocks of Time

PRODUCTION URL: https://young-plateau-94674.herokuapp.com/

ENDPOINTS: the following endpoints are available at the subdirectories listed below, just add them to the end of the Production Url above.

| Method | URL Subdirectory       | Input                                             | Output                                       | Notes           |
| ------ | ---------------------- | ------------------------------------------------- | -------------------------------------------- | --------------- |
| GET    | users/                 | -                                                 | list of all Users                            |                 |
| POST   | users/                 | username and password in JSON body                | Created User information along with pk       |                 |
| GET    | users/<int:pk>/        | use pk of user in Subdirectory                    | Specific User Details                        |                 |
| PUT    | users/<int:pk>/        | use pk of user in Subdirectory                    | Update all User Details                      |                 |
| PATCH  | users/<int:pk>/        | use pk of user in Subdirectory                    | Update specific User Details                 |                 |
| DELETE | users/<int:pk>/        | use pk of user in Subdirectory                    | Delete User                                  |                 |
| GET    | times/                 | -                                                 | List of all Times                            |                 |
| POST   | times/                 | time in JSON body with bearer token               | Created Time Trial information along with pk | Level = none    |
| GET    | times/<int:pk>/        | use pk of time trial in Subdirectory              | Specific Time Trial Details                  |                 |
| PUT    | times/<int:pk>/        | use pk of time trial in Subdirectory              | Update all Time Trial Details                |                 |
| PATCH  | times/<int:pk>/        | use pk of time trial in Subdirectory              | Update specific Time Trial Details           |                 |
| DELETE | times/<int:pk>/        | use pk of time trial in Subdirectory              | Delete Time Trial                            |                 |
| GET    | levels/                | -                                                 | list of all Levels                           |                 |
| POST   | levels/                | number in JSON body                               | Created Level information along with pk      |                 |
| GET    | levels/<int:pk>/       | use pk of level in Subdirectory                   | Specific Level Details                       |                 |
| PUT    | levels/<int:pk>/       | use pk of level in Subdirectory                   | Update all Level Details                     |                 |
| PATCH  | levels/<int:pk>/       | use pk of level in Subdirectory                   | Update specific Level Details                |                 |
| DELETE | levels/<int:pk>/       | use pk of level in Subdirectory                   | Delete Level                                 |                 |
| GET    | users/<int:pk>/times/  | use pk of user in Subdirectory                    | Specific User Time Trial Details             |                 |
| GET    | levels/<int:pk>/times/ | use pk of level in Subdirectory                   | Specific Level Time Trial Details            |                 |
| POST   | levels/<int:pk>/times/ | use pk of level in Subdirectory with Bearer Token | Specific Level Time Trial Details            | Use This One!   |

DJOSER ENDPOINTS: in addition to above endpoints, Djoser comes with prebuilt endpoints for registering users and granting tokens, here are a few helpful ones below.

| Method | URL Subdirectory      | Input (All Require Bearer Token)     | Output                                       | Notes                   |
| ------ | --------------------- | ------------------------------------ | -------------------------------------------- | ----------------------- |
| GET    | auth/users/           | -                                    | List of all Users                            |                         |
| POST   | auth/users/           | username and password in JSON body   | Created User information along with pk       |                         |
| GET    | auth/users/me/        | -                                    | Logged in User Details                       |                         |
| POST   | auth/token/login/     | username and password in JSON body   | Created Bearer Token                         |                         |
| POST   | auth/token/logout/    | -                                    | 204 No Content Confirmation                  |                         |


For additional endpoints and more information about djoser endpoints, see the getting started page for the djoser docs here: 
https://djoser.readthedocs.io/en/latest/getting_started.html


__Example of Username and Password in JSON body:__
``` js
{
    "username": "put desired username here",
    "password": "put desired password here"
}
```

__Example of Time in JSON body:__
_Note: uses Bearer Token to identify logged in user and saves username associated with time automatically_
``` js
{
    "time": put float number here
}
```