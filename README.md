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

## Version 6 (Current Version)
### Pros
* Fixed minor bug: When updating members and roles attached to a specific project, if you don't fill in both the member and the role for every single row, then no rows are saved into the database. Now, it doesn't let the user add a new row unless the previous rows have role and member filled in AND when submitted, it filters through all rows and only saves the ones where both role and member are filled in.
* Added and, subsequently, commented out some code for deploying on AWS in applications.properties
* Made navbar look less ugly
### Cons
* Some UI/UX changes:
- Increase space between Members and Projects in navbar
- Add more back-buttons, especially when updating or adding a member or project
- When you add members to a project, (1) Gray out member name until member role is selected & (2) For incomplete or invalid fields, highlight it in red
- The color scheme for both projects and members is the same, which might be confusing
### Future Work
* Add in a column for what the member's specialty is (ie DP, Directing, Editing, etc) & allow users to filter by specialty (generally, allow users to filter by different categories rather than just position)
* Create user accounts to ensure only admin can alter users, but anyone can view projects/users
* Deploy this on AWS for public consumption

## Version 5 
### Pros
* Created new table called projectEmployee where one column links to a project, one column links to member, and one column is an ENUM of role on set (ie Director, DP, AD, etc).
- If you navigate to "view a user", then there is a list of projects that the user has worked on and the user's corresponding role/position on it.
- If you navigate to "add/edit a project", then you can edit the members involved and their role.
- If you delete a specific project and/or member, then all traces of that project and/or member are moved from the projectemployee table in the database
* This is the version that is currently going to be deployed on AWS
### Cons
* The color scheme for both projects and members is the same, which might be confusing
* Improve the aesthetics of the nav bar
### Future Work
* Add in a column for what the member's specialty is (ie DP, Directing, Editing, etc) & allow users to filter by specialty (generally, allow users to filter by different categories rather than just position)
* Create user accounts to ensure only admin can alter users, but anyone can view projects/users
* Deploy this on AWS for public consumption

## Version 4
### Pros
* Added a new tab for projects, that is currently completely separate from the member's table. The projects table contains title, type (which is either AS, Club Collab, Sanctioned Narrative, Unsanctioned Narrative, or other), and description. 
* Improved UI/UX Design of "view employee" and "view project"
### Cons
* The color scheme for both projects and members is the same, which might be confusing
* Improve the aesthetics of the nav bar
### Future Work
* Create new table called projectEmployee where one column links to a project, one column links to member, and one column is an ENUM of role on set (ie Director, DP, AD, etc)
* Add in a column for what the member's specialty is (ie DP, Directing, Editing, etc) & allow users to filter by specialty
* Create user accounts to ensure only admin can alter users, but anyone can view projects/users
* Deploy this on AWS for public consumption

## Version 3
### Pros
* Added the ability to "mass-change" all members of position x to position y
### Cons
* The "view employee" page has poor UI/UX design
### Future Work
* Add in a column for what the member's specialty is (ie DP, Directing, Editing, etc) & allow users to filter by specialty
* Include another table for projects, and link the projects into the user's table
* Create user accounts to ensure only admin can alter users, but anyone can view projects/users
* Deploy this on AWS for public consumption

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

