# Visual_SQL

This is am application which produces a visual version of MySQL database, i.e. user can generate queries and results of a database by just entering some letters in right areas.

User Interface

The initial screen will allow the user to provide the credentials for a MySQL database on the server. These will include database name, username, and password. We will assume that the database is available on the server where the application is running.

Upon successfully verifying the credentials, the user should be shown a list of tables in the MySQL database. This list should be interactive in the sense that the user should be able to generate table skeletons by choosing or clicking on these table names. The user may also wish to generate a condition box. To express some queries, some table skeletons will have to be generated more than once.

To express a query, the user enters form elements in the table skeletons and condition box. There are four types of elements: P., P._Variable, Constant, and _Variable.
Once the query is formulated, the user may submit the query for execution. The QBE processor should first check for any syntax or semantic errors in the query. Once the QBE query is error free, the QBE processor should generate an appropriate SQL query, execute it against the database and show the results. The results page may look like: results page.
