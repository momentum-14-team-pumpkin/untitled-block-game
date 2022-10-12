Blocks of Time

PRODUCTION URL: https://young-plateau-94674.herokuapp.com/

ENDPOINTS: the following endpoints are available at the subdirectories listed below, just add them to the end of the Production Url above.

| Method | URL Subdirectory      | Input                                | Output                                       | Notes                   |
| ------ | --------------------- | ------------------------------------ | -------------------------------------------- | ----------------------- |
| GET    | users/                | -                                    | list of all Users                            |                         |
| POST   | users/                | username and password in JSON body   | Created User information along with pk       |                         |
| GET    | users/<int:pk>/       | use pk of user in Subdirectory       | Specific User Details                        |                         |
| PUT    | users/<int:pk>/       | use pk of user in Subdirectory       | Update all User Details                      |                         |
| PATCH  | users/<int:pk>/       | use pk of user in Subdirectory       | Update specific User Details                 |                         |
| DELETE | users/<int:pk>/       | use pk of user in Subdirectory       | Delete User                                  |                         |
| GET    | times/                | -                                    | list of all Times                            |                         |
| POST   | times/                | time in JSON body with bearer token  | Created Time Trial information along with pk |                         |
| GET    | times/<int:pk>/       | use pk of time trial in Subdirectory | Specific Time Trial Details                  |                         |
| PUT    | times/<int:pk>/       | use pk of time trial in Subdirectory | Update all Time Trial Details                |                         |
| PATCH  | times/<int:pk>/       | use pk of time trial in Subdirectory | Update specific Time Trial Details           |                         |
| DELETE | times/<int:pk>/       | use pk of time trial in Subdirectory | Delete Time Trial                            |                         |
| GET    | users/<int:pk>/times/ | use pk of user in Subdirectory       | Specific User Time Trial Details             |                         |

DJOSER ENDPOINTS: in addition to above endpoints, Djoser comes with prebuilt endpoints for registering users and granting tokens, here are a few helpful ones below.

| Method | URL Subdirectory      | Input (All Require Bearer Token)     | Output                                       | Notes                   |
| ------ | --------------------- | ------------------------------------ | -------------------------------------------- | ----------------------- |
| GET    | auth/users/           | -                                    | list of all Users                            |                         |
| POST   | auth/users/           | username and password in JSON body   | Created User information along with pk       |                         |
| GET    | auth/users/me/        | -                                    | Logged in User Details                       |                         |
| POST   | auth/token/login/     | username and password in JSON body   | Created Bearer Token                         |                         |
| POST   | auth/token/logout/    | -                                    | 204 No Content Confirmation                  |                         |


For additional endpoints and more information about djoser endpoints, see the getting started page for the djoser docs here: 
https://djoser.readthedocs.io/en/latest/getting_started.html