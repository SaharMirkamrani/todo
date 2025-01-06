# To-Do List App

## Installation and Running

```bash
npm i
npm run dev
```

## Overview

This is a simple To-Do List application built as part of an interview task for **Ideall Technology company**. It allows users to manage tasks with features like creating, updating, deleting, and viewing tasks. The application is built with the following technologies:

- Next.js: A React framework for server-side rendering and static website generation.
- React-Query: A powerful data-fetching library to manage server state and caching.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- Material-UI: A popular React component library for building stylish UI components.
- Axios: A promise-based HTTP client for the browser and Node.js.
- React Hook Form: A library for handling form inputs and validation with ease.

## Features

- Create a Task: Users can create new tasks by filling out a form with the task's title, description, and dates.
- Update a Task: Users can mark tasks as "complete" by updating the task's isComplete status, which is reflected in the list immediately.
- Delete a Task: Tasks can be deleted by clicking on the task and confirming the deletion within a modal.
- Task List Sorting: The tasks are displayed with sorting options for:
  All, open, closed tasks
- Open tasks (incomplete)
- Closed tasks (completed)
- Task Modal: Clicking on a task in the list opens a modal showing detailed information about the task, including the option to delete it. Further enhancements can be made to allow updates to the task's title, description, and dates.

- Instant List Updates: Thanks to React-Query, the task list updates instantly without requiring a page reload after actions like creating, deleting, or updating tasks.
- Create Task Modal: A modal with input fields for creating a new task, powered by React Hook Form for form validation. We can enhance this further by integrating Zod for better validation.

## Limitations

Archived Tab: The original design included an "Archived" tab, but it has not been implemented in this version. This is because the backend API does not currently provide an is_archived property for tasks.

## Future Improvements

- Zod Validation: Currently, the app uses basic form handling with React Hook Form. We can enhance this by integrating Zod for better schema validation.
- Edit Task Functionality: The ability to update the task's title, description, and possibly start and end dates could be added in future versions.
