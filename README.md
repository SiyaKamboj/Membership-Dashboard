# Membership-Dashboard
This is a full-stack project that tracks the members/employees of TTV, UCSD's film studio.
It was built using Java, Springboot, SQL, and React.JS. 

## How to Run the Project on your Local Device
### Run the Backend
* Open "ems-backend" on IntelliJ. If needed, regenerate Maven scripts.
* Run the executable file : EmsBackendApplication
### Run front-end on VSCode
* cd ems-frontend
* npm install
* npm run dev
Now, the project should be available on localhost:3000/employees. Note, there is no need to run mysql in the background; however, if you do want to, open terminal -> mysql -u root

## Version 2
### Pros
* Added in role information for each user
- It is enum'ed, meaning that in the back end, the database will store PHASE_1_INTERN, etc while the front end will display "Phase 1 Intern"
* Added the ability to filter by position in the "display all users" page
### Cons
* The "view employee" page has poor UI/UX design
### Future Work
* Add the ability to, not just filter by position, but also mass-change roles
* Add in a column for what the member's specialty is (ie DP, Directing, Editing, etc)
* Include another table for projects, and link the projects into the user's table
* Create user accounts to ensure only admin can alter users, but anyone can view projects/users
* Deploy this on AWS for public consumption

## Version 1
### Pros
* Allows website users to see all members, update members, delete members, and view the full description of their members
* Information listed for each member is first name, last name, and email
### Cons
* There is no space for their current position in the org
### Future Work
* Include a column in MySQL Database for their current position (PHASE 1 INTERN, ... ADMIN, etc)

