import json
import os
from datetime import datetime

FILE_NAME = "byu_certificate.json"

def get_input(prompt, required=True):
    while True:
        value = input(prompt).strip()
        if value or not required:
            return value
        print("This field is required")

def get_boolean(prompt):
    while True:
        value = input(prompt + " (yes/no): ").lower()
        if value in ["yes", "y"]:
            return True
        elif value in ["no", "n"]:
            return False
        print("Please enter yes or no")

def get_list(prompt):
    value = input(prompt + " (comma separated): ")
    return [item.strip() for item in value.split(",") if item.strip()]

def create_certificate():
    certificate = {
        "name": get_input("Certificate Name: "),
        "code": get_input("Code: "),
        "catalog": get_input("Catalog Year: "),
        "courses": get_list("Courses: "),
        "equivalent": get_list("Equivalent Courses: "),
        "preReqCourses": get_list("Pre-Req Courses: "),
        "taughtOut": get_list("Taught Out Courses: "),
        "notes": get_list("Notes: ")
    }
    return certificate

def load_data():
    if not os.path.exists(FILE_NAME):
        return []
    
    with open(FILE_NAME, "r") as file:
        try:
            return json.load(file)
        except json.JSONDecodeError:
            return []
        
def save_data(data):
    with open(FILE_NAME, "w") as file:
        json.dump(data, file, indent=6)

def add_certificate():
    data = load_data()
    certificate = create_certificate()
    data.append(certificate)
    save_data(data)
    print("Certificate added successfully!")

def main():
    while True:
        print("Certificate Manager")
        print("1. Add Certificate")
        print("2. Exit")

        choice = input("Choose an option: ")

        if choice == "1":
            add_certificate()
        elif choice == "2":
            break
        else:
            print("Invalid option.")

if __name__ == "__main__":
    main()