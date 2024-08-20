# File Service API

This project provides a simple API to preview and download files stored in the `public` directory of the application.

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project and configure any necessary environment variables (if applicable).

   ```
   PORT=4000
   NODE_ENV=development
   ```

### Directory Structure

- Place all files that you want to make available through the API in the `public` directory at the root of the project. For example:
  ```
  ├── public/
  │   ├── example.png
  │   ├── document.pdf
  │   └── ...
  └── ...
  ```

### Running the Application

Start the server with the following command:

```bash
npm start
```

By default, the application will run on `http://localhost:4000`. You can then access the file routes as described below.

## API Endpoints

### Preview a File

To preview a file, make a GET request to the following endpoint:

```http
GET http://<ip>:4000/files/:fileId
```

- **fileId**: The name of the file you want to preview (including the file extension).
- Example: To preview an image named `example.png`:

  ```http
  GET http://localhost:4000/files/example.png
  ```

### Download a File

To download a file, make a GET request with the `mode=download` query parameter:

```http
GET http://<ip>:4000/files/:fileId?mode=download
```

- **fileId**: The name of the file you want to download (including the file extension).
- Example: To download an image named `example.png`:

  ```http
  GET http://localhost:4000/files/example.png?mode=download
  ```

### Example Use Cases

- **Preview an Image**:

  ```http
  GET http://localhost:4000/files/example.png
  ```

- **Download an Image**:
  ```http
  GET http://localhost:4000/files/example.png?mode=download
  ```

## Error Handling

- If the file is not found, the API will respond with a `500 Internal Server Error`.
- If an error occurs during file streaming, the API will also respond with a `500 Internal Server Error`.

## Notes

- Ensure that the `public` directory and the files within it have the correct permissions set for access by the server.
- The `mode=download` query parameter is case-sensitive and should be used as shown.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
