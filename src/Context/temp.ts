/* eslint-disable @typescript-eslint/no-explicit-any */
import { todo } from "../Components/ToDoList";


const titles : string[] = [" ", "Basic Instructions", "HarvestHub To-build List"]
const tasks : todo[] = [
  {
    "id": 1,
    "title": "Create Login Sub-System",
    "description": "Create a Fully Functional Login System, that can fetch credentials and responses for the Backend Login API. Therefore Warranting the creation of a Robust Backed Login API.",
    "due_date": "2025-01-10",
    "subList": [
      {
        "id": 1,
        "title": "Create A Beautiful Login Form",
        "done": true
      },
      {
        "id": 2,
        "title": "Create A Backend API",
        "done": false
      },
      {
        "id": 3,
        "title": "Handle and Manage Exceptions",
        "done": false
      },
      {
        "id": 4,
        "title": "Create A User Context",
        "done": false
      }
    ],
    "done": false
  },
  {
    "id": 2,
    "title": "Create A Registration Sub_system",
    "description": "Create A Fully Functional and Manageable Registration System. It should be able to post data to backend and fetch backend response seamlessly, and update the User Context.",
    "due_date": "2025-01-17",
    "subList": [
      {
        "id": 1,
        "title": "Create A Beautiful Register Form",
        "done": false
      },
      {
        "id": 2,
        "title": "Create Registration Details Confirmation Page",
        "done": false
      },
      {
        "id": 3,
        "title": "Create A Register Backend API",
        "done": false
      },
      {
        "id": 4,
        "title": "Handle and Manage Exceptions and Errors",
        "done": false
      }
    ],
    "done": false
  },
  {
    "id": 3,
    "title": "Create A  Dashboard / Home Page",
    "description": "Create A Landing Page for Users. It should be able to make use of the user context info to fetch user specified information from the database. It should also have logic that renders content based on user type  ",
    "due_date": "2025-01-24",
    "subList": [
      {
        "id": 1,
        "title": "( front-end )Create Beautiful Farmer Home Page",
        "done": false
      },
      {
        "id": 2,
        "title": "( front-end ) Create Beautiful Buyer Dashboard",
        "done": false
      },
      {
        "id": 3,
        "title": "Create Statistics Calculator Component",
        "done": false
      },
      {
        "id": 4,
        "title": "Create A Brief History Child Component",
        "done": false
      },
      {
        "id": 5,
        "title": "Create An Elegant Profile Component",
        "done": false
      },
      {
        "id": 6,
        "title": "Create Navigation System ( Tab, Stack, Drawer )",
        "done": false
      }
    ],
    "done": false
  },
  {
    "id": 4,
    "title": "Create Product Components ( Farmer & Buyer )",
    "description": "Create Products Components That allow: \n1. The Farmer To Create Product listing to show Buyers. \n2. The Buyers To Browse Through Product Listing & Act on them.\nThe Components Should Communicate With Backend And Fetch Data. ",
    "due_date": "2025-01-24",
    "subList": [
      {
        "id": 1,
        "title": "Create A Product Listings Creation Component (farmer)",
        "done": false
      },
      {
        "id": 2,
        "title": "Create A Product Listings Browsing Component (farmer)",
        "done": false
      },
      {
        "id": 3,
        "title": "Create A Product Management Page (farmer)",
        "done": false
      },
      {
        "id": 4,
        "title": "Backend API to Fetch Product Info( both )",
        "done": false
      },
      {
        "id": 5,
        "title": "Navigation Link To Messaging Page",
        "done": false
      },
      {
        "id": 6,
        "title": "Product Context",
        "done": false
      }
    ],
    "done": false
  },
  {
    "id": 5,
    "title": "Create The Contract Management Compomnent",
    "description": "Create A Fully Functional Contract management system, that allow creation, updating and termination of contracts between two parties. ",
    "due_date": "2025-01-31",
    "subList": [],
    "done": false
  },
  {
    "id": 6,
    "title": "Create A Messaging Component",
    "description": "Create A Messaging System, that allows the sending of both custom and push messages. It should also allow pop-up and push notification if a message is recieved",
    "due_date": "2025-02-07",
    "subList": [],
    "done": false
  },
  {
    "id": 7,
    "title": "Create History Component",
    "description": "Create A History Page That Shows All The Recorded Activities of the User. The History Includes activities like contracts made, deals and transactions made  ",
    "due_date": "2025-02-14",
    "subList": [],
    "done": false
  },
  {
    "id": 8,
    "title": "Security Measures and Implementation",
    "description": "Identify security threats and build counter measurers, to avoid unauthorized access and confirm eligibility. ",
    "due_date": "2025-02-21",
    "subList": [],
    "done": false
  },
  {
    "id": 9,
    "title": "HarvestHub Testing",
    "description": "Perform most kinds of functional and non-functional requirements ",
    "due_date": "2025-02-28",
    "subList": [],
    "done": false
  }
]
const insertAt = (original_list : todo[], editted: todo, altered_list: todo[] ) : todo[] | any  =>
{
	try
	{
		const  inOriginal: todo = original_list.filter(task => task.id == editted.id)[0];
		const index : number = original_list.indexOf(inOriginal);
		altered_list.splice(index, 0, editted);
		return altered_list;
	}

	catch (exc : any)
	{
		alert(exc.message);
	}
}

export { tasks, insertAt, titles }

