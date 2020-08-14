Module
- /modules
-- /{module-name} `(books) pluralized name`
-- module.json `link all the submodule route files together`
--- /{object} `(author, book, publisher) singlur name of each object type`
---- {object}.route.json `routing and components this ends up being a page with dynamic content (author, authors, book, books)`
---- {object}.schema.json `data schema (author, book, publisher)`
---- /queries `folder for all object queries`
----- {object}.query.graphql `individual prebaked queries for routes`
---- /events `folder for all object events`
----- {event}.event.json `event callback`

