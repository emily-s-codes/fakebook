# Setup
- [x] visualization of components, pages, and functionality
- [x] setup file structure
- [x] setup git repository
- [x] additional packages (original list in design): nodemon, dotenv

# Backend
- [x] connect database
- [x] setup express server
- [x] ROUTES: crud
    - [x] get (/contacts)
        - [x] test with thunder
    - [x] get (/contacts/:id)
        - [x] test with thunder
    - [x] post (/contact/new)
        - [x] test with thunder
- [x] rebuild with controller and model

## Backend 2.0
- [x] ROUTES: crud
    - [x] put (/contacts/:id)
    - [x] delete (/contacts/:id)
- [ ] sort data functionality
- [ ] photo upload
    

# Frontend
- [x] install react-router-dom
- [x] define routes
- [x] setup pages
    - [x] overall structure: header/footer and back button on each page
    - [x] home ('/')
        - [x] fetch get (/contacts)
    - [x] detail ('/contact/:id')
        - [x] fetch get (/contacts/:id)
    - [x] add  ('/contact/new')
        - [x] fetch post (/contact/new)
- [x] setup components
    - [x] overall structure
    - [x] header/nav
    - [x] footer
    - [x] form
    - [x] person
    - [x] back (useNav -1)
    - [x] add
- [x] change favicon
- [ ] find Dribbble design
- [ ] implement design

## Frontend 2.0
- [ ] setup pages
    - [x] edit
- [ ] setup components
    - [x] delete
    - [ ] edit
- [ ] set up drop down for sort functionality
- [ ] update to allow photo upload and to display photo