# Library System TODO

# FIRST PRIO
Split up app.ts(backend) and setup auth

## 1. Project Foundation
- [ ] Decide the final app structure: public area, user area, admin area
- [ ] Define the core user roles: guest, member, admin
- [ ] Define the core book lifecycle: available, borrowed, unavailable, archived
- [ ] Agree on the primary routes for the app
- [ ] Confirm the data model for books, users, loans, reservations, and history

## 2. Authentication and Authorization
- [ ] Add user registration
- [ ] Add user login
- [ ] Add logout
- [ ] Store auth state safely in the frontend
- [ ] Protect member-only routes
- [ ] Protect admin-only routes
- [ ] Add role-based route guards
- [ ] Handle expired sessions and token refresh if needed

## 3. User Accounts
- [ ] Create user profile page
- [ ] Show borrowed books on the user profile
- [ ] Show borrowing history
- [ ] Show active reservations
- [ ] Allow profile updates
- [ ] Allow password change
- [ ] Allow account deactivation if required

## 4. Book Catalog
- [ ] Build a public book listing page
- [ ] Build a single book detail page
- [ ] Add search by title, author, genre, and keywords
- [ ] Add filtering by category, availability, and format
- [ ] Add sorting by title, author, newest, or popularity
- [ ] Add pagination or infinite scrolling
- [ ] Add related books on the detail page
- [ ] Add book cover images
- [ ] Add book metadata such as ISBN, genre, summary, language, and publication year

## 5. Borrowing and Renting
- [ ] Define the borrowing rules
- [ ] Add a borrow book action for available books
- [ ] Prevent borrowing when no copies are available
- [ ] Set loan durations
- [ ] Track due dates
- [ ] Show remaining borrow time
- [ ] Allow renewals if allowed
- [ ] Allow returns
- [ ] Record overdue loans
- [ ] Add fine or penalty logic if required
- [ ] Notify users before due dates if desired

## 6. Reservations and Availability
- [ ] Let users reserve unavailable books
- [ ] Queue reservations in order
- [ ] Notify the next user when a book becomes available
- [ ] Cancel reservations
- [ ] Show current availability clearly on book pages
- [ ] Show how many copies exist and how many are available

## 7. Admin Tools
- [ ] Build an admin dashboard
- [ ] Add create book form
- [ ] Add edit book form
- [ ] Add delete book action
- [ ] Add archive or restore book action
- [ ] Manage copies and stock counts
- [ ] View users and borrowing activity
- [ ] Override loans or reservations if necessary
- [ ] Moderate bad data or broken records
- [ ] Add audit logging for admin actions

## 8. Backend API
- [ ] Create auth endpoints
- [ ] Create user endpoints
- [ ] Create book endpoints
- [ ] Create borrow and return endpoints
- [ ] Create reservation endpoints
- [ ] Create admin-only management endpoints
- [ ] Add validation for all request payloads
- [ ] Add centralized error handling
- [ ] Add pagination, filtering, and sorting support
- [ ] Add rate limiting where needed

## 9. Database Design
- [ ] Finalize the Users table or collection
- [ ] Finalize the Books table or collection
- [ ] Add Loans table or collection
- [ ] Add Reservations table or collection
- [ ] Add Roles or permissions structure
- [ ] Add indexing for search and lookup performance
- [ ] Add timestamps and audit fields
- [ ] Decide how deleted or archived books are handled

## 10. Frontend Architecture
- [ ] Add routing for all major pages
- [ ] Add layout shells for public, member, and admin views
- [ ] Add reusable form components
- [ ] Add reusable card, list, badge, and modal components
- [ ] Add loading states
- [ ] Add empty states
- [ ] Add error states
- [ ] Add optimistic UI where appropriate
- [ ] Keep styling consistent across the app

## 11. UX and Accessibility
- [ ] Make the app responsive on mobile, tablet, and desktop
- [ ] Ensure keyboard navigation works everywhere
- [ ] Add accessible labels to forms and buttons
- [ ] Add focus states
- [ ] Support screen readers
- [ ] Use readable color contrast
- [ ] Make long titles and descriptions behave well in cards and detail pages
- [ ] Make the borrow and admin actions visually clear

## 12. Notifications and Communication
- [ ] Notify users when a borrowed book is due soon
- [ ] Notify users when a reserved book becomes available
- [ ] Notify users when a rental is overdue
- [ ] Notify admins about failed operations or suspicious activity
- [ ] Decide whether notifications are email, in-app, or both

## 13. Security
- [ ] Hash passwords securely
- [ ] Never expose sensitive user data in public responses
- [ ] Lock down admin endpoints
- [ ] Validate all form input
- [ ] Sanitize user-provided content
- [ ] Add CSRF protection if needed
- [ ] Review authorization on every protected action

## 14. Testing
- [ ] Add unit tests for utility functions
- [ ] Add component tests for forms and cards
- [ ] Add integration tests for auth flows
- [ ] Add integration tests for borrow and return flows
- [ ] Add integration tests for admin CRUD actions
- [ ] Add API tests for all endpoints
- [ ] Add regression tests for availability and reservation rules

## 15. Deployment and Maintenance
- [ ] Decide production hosting for frontend and backend
- [ ] Configure environment variables
- [ ] Set up database backups
- [ ] Set up logging and monitoring
- [ ] Set up error reporting
- [ ] Document how to run the project locally
- [ ] Document how to deploy updates
- [ ] Add seed data for development and demos

## 16. Nice-to-Have Later
- [ ] Add book reviews and ratings
- [ ] Add reading lists or favorites
- [ ] Add author pages
- [ ] Add tags and advanced discovery
- [ ] Add ISBN lookup or external metadata sync
- [ ] Add barcode scanning for admin workflows
- [ ] Add multi-library support
- [ ] Add analytics for popular books and user activity
