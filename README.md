## Clip Notes

Clip Notes is a simple note taking website. The app provides all the basic features of a note taking app. The user can create, edit, view and delete their posts.

### Welcome Page 
This page welcomes the user and also checks whether the user where previously logged in and if so the user is directly taken into the login page without any signin.
This done by token verification.

![Screenshot 2024-02-04 at 5 41 25 PM](https://github.com/ruhneb2004/Note-App/assets/146971477/553b8f66-b10f-4700-97e7-1f06b9aed55b)


### Sign Up Page
The users can sign up and then enter into the page here. The user will be provided a token which will be stored in the local storage which then will be used for all future verifications.
The password of the user is stored as hash for added security. Appropriate errors will also be thrown incase of invald opperations.
<img width="1680" alt="Screenshot 2024-02-04 at 5 44 09 PM" src="https://github.com/ruhneb2004/Note-App/assets/146971477/58f75bd8-75d2-4273-860e-1935e5c73cde">
<img width="1680" alt="Screenshot 2024-02-04 at 5 44 22 PM" src="https://github.com/ruhneb2004/Note-App/assets/146971477/169eebf0-be02-4f2f-ab36-396746770deb">
<img width="1680" alt="Screenshot 2024-02-04 at 5 44 49 PM" src="https://github.com/ruhneb2004/Note-App/assets/146971477/718ae227-5aa5-4bf1-b221-cf68bfc9ae46">

### Sign In Page 

The user if logged out have to enter their password and email correctly to enter into the website. If the user matches with the db then the signin will be success and token will be issued for the user.
Appropraite errors are also thrown here for a smooth experience
<img width="1680" alt="Screenshot 2024-02-04 at 5 50 05 PM" src="https://github.com/ruhneb2004/Note-App/assets/146971477/3ebf28ce-6c7e-402d-83b4-fd5c1e200d7a">
<img width="1680" alt="Screenshot 2024-02-04 at 5 50 24 PM" src="https://github.com/ruhneb2004/Note-App/assets/146971477/0f44bacc-5a31-42d0-8595-862267d0ae91">



### Main Page

This is the heart of the website and all the functionalities lie here. The user is able to create notes and store them in the right column. The user has the ability to edit the notes by clicking on them. The buttons for edit and delete will pop up for individaul notes and the user can delete, edit or even view the notes from there. The container containing the notes are adjustable is size so that the user can resize them to make the heading or description portions larger.
On clicking the edit button a pop up will appear and the user can edit their notes there or view them in a large section for better readability.
If the user only closes the website and dosent log out then user dont have to enter their password again for entering the website but if they do log out then the token will be removed from the local storage and the user will have to signin again.
<img width="1680" alt="Screenshot 2024-02-04 at 5 52 49 PM" src="https://github.com/ruhneb2004/Note-App/assets/146971477/5baf8e78-5ce0-48bb-8ba8-5f8141996e00">
<img width="1680" alt="Screenshot 2024-02-04 at 5 53 34 PM" src="https://github.com/ruhneb2004/Note-App/assets/146971477/0878dcb0-b97b-4ad9-889b-e06850377a02">
<img width="1680" alt="Screenshot 2024-02-04 at 5 57 45 PM" src="https://github.com/ruhneb2004/Note-App/assets/146971477/59fd7472-13bd-4304-86fa-59a033ea0f9b">


