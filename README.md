# Vacation Tagging System

This project is a vacation tagging system that allows users to manage and tag vacations, with two distinct roles - User and Admin. The system is designed to provide functionality for users to follow and unfollow vacations, while administrators have additional capabilities such as adding, editing, and deleting vacations, viewing reports, and managing the system.

## Features

### User (User –)
- **Registration:** New users can register to access the system.
- **Login:** Registered users can log in to their accounts.
- **View Vacations:** Users can view a list of vacations.
- **Tag Vacation (Follow):** Users can tag (follow) a vacation.
- **Untag Vacation (Unfollow):** Users can untag (unfollow) a previously tagged vacation.
- **Filter Vacations:** Users can filter vacations based on specific criteria.

### Admin
- **Add Vacation:** Admins can add new vacations to the system.
- **Edit Vacation:** Admins can edit existing vacation details.
- **Delete Vacation:** Admins can delete vacations from the system.
- **View Reports:** Admins can view reports related to vacation tagging.
- **Download CSV:** Admins can create and download a CSV file containing vacation destinations and the number of followers.

## Technology Stack

- **Database:** MySQL
- **Server Side:** REST API in js.Node using Express (built in TypeScript)
- **Client Side:** React
- **Docker Containers:** The project is built and deployed using Docker containers.

## Screens and Options

1. **Registration Page**
   - Allows new users to register for the system.

2. **Login Page**
   - Provides a login interface for registered users.

3. **Vacations Page**
   - Displays a list of vacations.
   - Allows users to follow or unfollow vacations.
   - Provides options for filtering vacations.

4. **Admin Page**
   - Accessible only to administrators.
   - Allows admins to add, edit, and delete vacations.
   - Provides access to view reports and download a CSV file.

5. **Add Vacation Page**
   - Allows administrators to add a new vacation.

6. **Vacation Editing Page**
   - Enables administrators to edit existing vacation details.

7. **Vacation Report Display Page**
   - Displays reports related to vacation tagging.

8. **CSV File Creation**
   - Provides an option to create and download a CSV file containing vacation destinations and follower counts.

## Additional Comments
- The project includes integration testing and unit testing.
- The entire project is containerized using Docker containers for easy deployment and scalability.

Feel free to explore and contribute to the development of this vacation tagging system!