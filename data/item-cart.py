import json
import os
from datetime import datetime

FILE_NAME = "shopping_items.json"

def get_input(prompt, required=True):
    while True:
        value = input(prompt).strip()
        if value or not required:
            return value
        print("This field is required.")

def get_boolean(prompt):
    while True:
        value = input(prompt + " (yes/no): ").lower()
        if value in ["yes", "y"]:
            return True
        elif value in ["no", "n"]:
            return False
        print("Please enter yes or no")

def create_item():
    item = {
        "name": get_input("Item Name: "),
        "price": get_input("Item Price: "),
        "description": get_input("Description: "),
        "isAvailable": get_boolean("Is the item available? "),
        "imageUrl": get_input("Image Url or path: "),
        "dateAdded": datetime.now().strftime("%m-%d-%Y")
    }

    return item

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
        json.dump(data, file, indent=2)

def add_item():
    data = load_data()
    item = create_item()
    data.append(item)
    save_data(data)
    print("Item added successfully!")

def main():
    while True:
        print("Items Load Manager")
        print("1. Add Item")
        print("2. Exit")

        choice = input("Choose an option: ")

        if choice == "1":
            add_item()
        elif choice == "2":
            break
        else:
            print("Invalid option.")

if __name__ == "__main__":
    main()