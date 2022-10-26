Blocks of Time

STORY: 

Prof. Pretzel while finishing his puzzle book ended up walking into his own experiment with time portals, he unintentionally walked into the portal!  It is up to you and Prof. Pretzel to move and stack blocks to get him back home.

Help Prof. Pretzel travel through each of the levels, moving blocks to get him back to his current time.

GAME CONTROLS:

Move using the Left and Right Arrow Buttons.
Lift blocks using the Down Arrow Key
Jump using the Space Bar.

Use 'R' to Reset the level back to the very beginning.
Use 'Z' to Reverse time to fix mistakes.

SETTINGS:

Press E to mute the sound effects
Press M to mute the music

PRODUCTION URL: https://blocks-of-time.herokuapp.com/

ENDPOINTS: the following endpoints are available at the subdirectories listed below, just add them to the end of the Production URL above.

| Method | URL Subdirectory           | Input                                             | Output                                          | Notes           |
| ------ | -------------------------- | ------------------------------------------------- | ----------------------------------------------- | --------------- |
| GET    | users/                     | -                                                 | list of all Users                               |                 |
| POST   | users/                     | username and password in JSON body                | Created User information along with pk          |                 |
| GET    | users/<int:pk>/            | use pk of user in Subdirectory                    | Specific User Details                           |                 |
| PUT    | users/<int:pk>/            | use pk of user in Subdirectory                    | Update all User Details                         |                 |
| PATCH  | users/<int:pk>/            | use pk of user in Subdirectory                    | Update specific User Details                    |                 |
| DELETE | users/<int:pk>/            | use pk of user in Subdirectory                    | Delete User                                     |                 |
| GET    | times/                     | -                                                 | List of all Times                               |                 |
| POST   | times/                     | time in JSON body with bearer token               | Created Time Trial information along with pk    | Level = none    |
| GET    | times/<int:pk>/            | use pk of time trial in Subdirectory              | Specific Time Trial Details                     |                 |
| PUT    | times/<int:pk>/            | use pk of time trial in Subdirectory              | Update all Time Trial Details                   |                 |
| PATCH  | times/<int:pk>/            | use pk of time trial in Subdirectory              | Update specific Time Trial Details              |                 |
| DELETE | times/<int:pk>/            | use pk of time trial in Subdirectory              | Delete Time Trial                               |                 |
| GET    | levels/                    | -                                                 | List of all Levels                              |                 |
| POST   | levels/                    | number in JSON body                               | Created Level information along with pk         |                 |
| GET    | levels/<int:pk>/           | use pk of level in Subdirectory                   | Specific Level Details                          |                 |
| PUT    | levels/<int:pk>/           | use pk of level in Subdirectory                   | Update all Level Details                        |                 |
| PATCH  | levels/<int:pk>/           | use pk of level in Subdirectory                   | Update specific Level Details                   |                 |
| DELETE | levels/<int:pk>/           | use pk of level in Subdirectory                   | Delete Level                                    |                 |
| GET    | users/<int:pk>/times/      | use pk of user in Subdirectory                    | List of Specific User Time Trials               |                 |
| GET    | user/level/<int:pk>/times/ | use pk of level in Subdirectory                   | List of Specific User Time Trials per Level     |                 |
| GET    | levels/<int:pk>/times/     | use pk of level in Subdirectory                   | List of Specific Level Time Trials              |                 |
| POST   | levels/<int:pk>/times/     | use pk of level in Subdirectory with Bearer Token | Update all Level Time Trial Details             | Use This One!   |
| GET    | full-run-times/            | -                                                 | List of all Full Run Times                      |                 |
| POST   | full-run-times/            | number in JSON body with Bearer Token             | Created Full Run Time information along with pk |                 |
| PUT    | full-run-times/<int:pk>/   | use pk of full run time in Subdirectory           | Update all Full Run Time Details                |                 |
| PATCH  | full-run-times/<int:pk>/   | use pk of full run time in Subdirectory           | Update specific Full Run Time Details           |                 |
| DELETE | full-run-times/<int:pk>/   | use pk of full run time in Subdirectory           | Delete Full Run Time                            |                 |
| GET    | user/full-run-times/       | Bearer Token                                      | List of all Full Run Times of Logged in User    |                 |

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
_Also: for full run completion times, changes the full_run field to True automatically to help sort_
``` js
{
    "time": put float number here
}
```