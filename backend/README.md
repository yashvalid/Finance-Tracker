Personal Finance Tracker is a full-stack application designed to help users manage their personal finances. It allows users to track their income and expenses, view financial summaries, and analyze their spending habits.

## Features

- Add, update, and delete transactions (income or expenses).
- View a list of all transactions.
- Analyze financial data with charts and summaries.
- Categorize transactions for better organization.

## Project Structure

The project is divided into two main parts:

1. **Backend**: Built with Node.js, Express, and MongoDB.
2. **Frontend**: Built with React and Vite, styled with TailwindCSS.

---

## Backend

### Routes

The backend provides the following API routes:

#### Transaction Routes

##### Add a Transaction

- **Endpoint**: `/transaction/add`
- **Method**: `POST`
- **Description**: Adds a new transaction.
- **Request Body**:
    ```json
    {
        "Tname": "string",
        "amount": "number",
        "transactionType": "income | expense",
        "category": "string",
        "date": "ISODate"
    }
    ```
- **Responses**:
    - `200`: Transaction added successfully.
    - `400`: Transaction not created.
    - `500`: Internal server error.

##### Delete a Transaction

- **Endpoint**: `/transaction/delete`
- **Method**: `POST`
- **Description**: Deletes a transaction by its ID.
- **Request Body**:
    ```json
    {
        "_id": "string"
    }
    ```
- **Responses**:
    - `200`: Transaction deleted successfully.
    - `400`: Transaction not deleted.
    - `500`: Internal server error.

##### Get All Transactions

- **Endpoint**: `/transaction/all`
- **Method**: `GET`
- **Description**: Retrieves all transactions.
- **Responses**:
    - `200`: List of all transactions.

##### Update a Transaction

- **Endpoint**: `/transaction/update`
- **Method**: `POST`
- **Description**: Updates an existing transaction.
- **Request Body**:
    ```json
    {
        "_id": "string",
        "Tname": "string",
        "amount": "number",
        "transactionType": "income | expense",
        "category": "string",
        "date": "ISODate"
    }
    ```
- **Responses**:
    - `200`: Transaction updated successfully.
    - `400`: Transaction not found.
    - `500`: Internal server error.