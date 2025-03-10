# Restaurant Website - GloriaFood Integration

A small restaurant website based on GloriaFood API to extract and display the menu dynamically and always updated.

## Features
- **3 main pages**: Home, Contacts, Menu
- **Integration with GloriaFood**: Automatic synchronization of the menu directly from the GloriaFood API
- **Customization of the Home and Contacts page**: Configuration via .json file or database
- **Automatic update of containers**: Synchronization with GitHub for continuous deployment

## Technologies used
- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Containerization**: Docker
- **CI/CD**: Automatic synchronization of containers via GitHub

## Installation

1. Clone the repository:
```sh
git https://github.com/Areasettantotto/GloriaFood-fm.git
```
2. Access the project folder:
```sh
cd GloriaFood-fm.git
```
3. Install the dependencies:
```sh
npm install
```
4. Start the development project:
```sh
npm run dev
```

## Deployment with Docker

1. Build and start the container:
```sh
docker-compose up --build -d
```
2. To stop the containers:
```sh
docker-compose down
```

## Configuration

- Edit the `env.example.txt` file to customize the Home and Contact pages
- If you use a database, configure the environment in the `.env` file

## Contributions
If you want to contribute to the project, feel free to fork it and submit a pull request!

## License
This project is licensed under the MIT license.
