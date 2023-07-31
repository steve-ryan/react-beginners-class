#!/bin/bash

# Function to check if a rule already exists in .gitignore
rule_exists() {
    local rule="$1"
    grep -q "$rule" .gitignore
}

# Function to generate ignore rules for a given project and update .gitignore
generate_project_ignore_rules() {
    local project_name="$1"

    local env_rule="$project_name/.env"
    local env_sample_rule="$project_name/.env-sample"
    local frontend_node_modules_rule="$project_name/frontend/node_modules/"
    local backend_node_modules_rule="$project_name/backend/node_modules/"

    if ! rule_exists "$env_rule"; then
        echo "# Ignore .env files for $project_name"
        echo "$env_rule" >> .gitignore
    fi

    if ! rule_exists "$env_sample_rule"; then
        echo "$env_sample_rule" >> .gitignore
    fi

    if ! rule_exists "$frontend_node_modules_rule"; then
        echo >> .gitignore
        echo "# Ignore node_modules directory for $project_name frontend" >> .gitignore
        echo "$frontend_node_modules_rule" >> .gitignore
    fi

    if ! rule_exists "$backend_node_modules_rule"; then
        echo >> .gitignore
        echo "# Ignore node_modules directory for $project_name backend" >> .gitignore
        echo "$backend_node_modules_rule" >> .gitignore
    fi
}

# Function to create the project directory structure and files
create_project_structure() {
    local project_name="$1"

    # Create parent folder with the provided project name
    mkdir "$project_name"

    # Create backend and frontend subfolders
    mkdir "$project_name/backend"
    mkdir "$project_name/frontend"

    # Create index.js in the backend folder
    touch "$project_name/backend/index.js"

    # Create .env and .env-sample files in the parent project directory
    touch "$project_name/.env"
    touch "$project_name/.env-sample"

    # Run npm install -y in the backend folder
    (cd "$project_name/backend" && npm init -y)

     # Run npm create vite in the frontend folder
    (cd "$project_name/frontend" && npm create vite)
}

# Main function
main() {
    # Get the project name from user input
    read -p "Enter the project name: " project_name

    # Update .gitignore with rules for the given project
    generate_project_ignore_rules "$project_name"

    # Create the project directory structure and files
    create_project_structure "$project_name"

    echo "Project '$project_name' setup and .gitignore updated successfully!"
}

main
