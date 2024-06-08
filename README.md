
# EGOLD HAVEN (MERN STACK)

A C2C / B2C E-Commerce Web Application exclusively for gold jewelry trading.

### Overview

This project entails the comprehensive design and development of a web application dedicated to gold jewelry trading. Key features include user authentication, database management, and a robust marketplace. The platform will support secure access for diverse user roles, including sellers, buyers, certified jewelers, partners, and community members.

### Technology

- React + tailwind (Front-End <Responsive>)
- Expressjs Backend Server
- Nodejs Backend 
- MongoDB database
- Third party API's
- Ant Design Components







## Environment Variables

To run this project, you will need to add the following environment variables to your 



**backend .env file**


`PORT =`

`MONGO_URI =`

`NODE_ENV=development`

`JWT_SECRET =`

`EMAIL_HOST = smtp-mail.outlook.com`

`EMAIL_USER = <your_outlook_email>`

`EMAIL_PASS = `

`FRONTEND_URL = <url:port`

For Google SSO:

`CLIENT_ID =`

`CLIENT_SECRET =`

For Geocoder (Co-ordinates)

`GEOCODER_PROVIDER = mapquest`

`GEOCODER_API_KEY = `


**frontend .env file**

`REACT_APP_BACKEND_URL = <url:port>`

`PORT = `




## Initializing Project

Create a clone of this project and open the root folder in the terminal.

**Open separate terminals for frontend and backend.**

Run the following command in both terminals.

```bash
  npm install
```
In case of any issue with dependencies run :

```bash
  npm install --legacy-peer-deps
```
Now start both frontend and backend server using :


```bash
  npm start
```

If any issue arises, install or update the relevant package.



## Admin API 

To create the admin account use postman to target the following api with the specific data below.

#### Get all items

Replace <url:port> below with your url and backend server port e.g localhost:8080 

```http
  POST <url:port>/api/users/register
```
x-www-form-urlencoded :

| Key | Value    | 
| :-------- | :------- | 
| `name` | `string` |
| `email` | `string` |
| `phoneno` | `string` |
| `password` | `string` |
| `status` | **admin** |

status is only required for admin, rest user and jeweler statuses and set automatically on registration.




## Features
### User Features
* #### Account management 
   * Register an account
   * Login to the platform
   * Edit profile information
   * Reset password
* #### Advertisement management
   * Place ads
   * Edit ads
   * Delete ads
   * Browse and search for listings
   * View listing details and set as favorites
* #### Interactions
   * Access the forum
   * Request jeweler status upgrade
   * Chat with other users or jewelers regarding ads
   * Receive notifications for various actions on the platform

### Admin Features
* #### Dashboard Access
   * view portal statistics
* #### Requests Administration
   * Accept/Reject Listings, Products, Jewelers & Commission Requests

### Jeweler Features
* #### Certification Services
   * Provide gold certification services to users

* #### Store Page management
   * Add, edit, and delete products on their page

* #### Commission Requests
   * Request for commission rate changes from the admins

## Documentation

All the relevant documentation including report, presentation, diagrams etc. are all present along with the code.


## Sample Views

![alt text](https://github.com/[talhahunter10]/[EGold-Haven-Project]/blob/[main]/Sample%20Views/landing%20page.png?raw=true)


## FAQ

#### How to create the admin account ?

Answered above in this readme file.

#### Why use geocoder api ?

It is being used to calculate the distance of the user from the listings he wishes to view. If a user selects a city to view listings posted there, relevant listings from areas in a 100km radius are also displayed.

#### How to login as Admin once we have created it using postman ?

Whenever you login using the admin credentials, the system opens the admin dashboard as there is no normal view for the admin.

#### How to login as Jeweler ?

Users can login normally but if the user wishes to register as a jeweler, he can do it from the landing page and once the request is accepted by the admin after verification, the user is notified of his status update and can start managing his jeweler store page / profile.

#### How to differentiate actions of the user and jeweler if both are accessed through the same account ?

The user logs in and if his status is a jeweler, he can also manage the jeweler store page. Each action is linked to its specific user and can be accessed through linked views. For example, user has its own notifications, chat and certification requests views, while the same user can access the jeweler pages for notifications, chat and certification requests from his jeweler store page / profile.
