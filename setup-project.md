<!--
Author:Steve
Whatsapp:+254756949393
-->

The Bash shell script automates the setup process for a new project within a Git repository. It creates a parent folder with a specified project name, adds subfolders named backend and frontend, creates index.js for API code inside backend, and generates .env and .env-sample files at the project's root. Additionally, it runs `npm init -y` in the backend folder to initialize the backend project with default settings. For the frontend, the script runs `npm create vite` inside the frontend folder to set up a Vite.js project. The script also updates the .gitignore file to ignore specific files and directories, streamlining version control management.

##How to use it

_Please ensure you have Node.js and npm installed on your system before running the script._

Open Git Bash and navigate to the directory where you saved the setup_project.sh file.
Make the script executable using the chmod command:
`chmod +x setup_project.sh`
Run the script
`./setup_project.sh`
After running the script, it will prompt you to enter the project name, create the folder structure with the necessary files, and update the .gitignore file as mentioned earlier.

_The script is intended to be executed in a Unix-like environment, so running it in Git Bash or similar shells ensures that it functions correctly. If you encounter any issues while running the script, using Git Bash is recommended._

_Feel free to use it any time_
