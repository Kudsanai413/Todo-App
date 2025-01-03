/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { sub, todo } from "../Components/ToDoList";
import { FaCalendarXmark, FaTrash } from "react-icons/fa6";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { MdChecklistRtl, MdOutlineModeEditOutline } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { insertAt} from "./temp";

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





type ActionType = {
    action_type: string,
    payload? : string | number,
}
type ChildrenType = {
    children: React.ReactElement | React.ReactElement[]
}

const initReducerState = {
    title: "",
    description: "",
    due_date: "",
    iD: 0
}

type ApplicationContextType = {
    headerTitle: string,
    todos: todo[],
    setHeader: React.Dispatch<React.SetStateAction<string>>,
    setTodos: React.Dispatch<React.SetStateAction<todo[]>>,
    Delete: (id: number, subList? : sub[], parentID? : number) => void,
    Update: (id: number, subList? : sub[], parentID? : number) => void,
    footer: React.ReactElement,
    setPage: React.Dispatch<React.SetStateAction<"landing" | "individual" | "edit" | "trashed" | "completed">>,
    page: "landing" | "individual" | "edit" | "trashed" | "completed",
    setID : React.Dispatch<React.SetStateAction<number>>,
    error: string,
    position: number,
    changePosition : React.Dispatch<React.SetStateAction<number>>,
    addNew : (title: string, description? : string, date?: string, iD? : number ) => void,
    Select: React.Dispatch<React.SetStateAction<"completed"| "missed" | "all" | null>>,
    state: typeof initReducerState,
    dispatch: React.Dispatch<ActionType>,
    Edit: (post? : number) => void,
}



const reducerActions = {
    postpone: "postpone",
    retry: "retry",
    edit: ["title", "description", "due_date" ],
    revert: "initialize"
}

const Reducer = (state : typeof initReducerState, action : ActionType) : typeof initReducerState | any =>
{
    switch(action.action_type)
    {
        case reducerActions.postpone:
            return { ...state, iD: action.payload}

        case reducerActions.edit[0]:

            return { ...state, title: action.payload }

        case reducerActions.edit[1]:

            return { ...state, description: action.payload }

        case reducerActions.edit[2]:
            return { ...state, due_date: action.payload }

        case reducerActions.retry:
            return { ...state, due_date: action.payload }

        case reducerActions.revert:
            return initReducerState


        default:
            alert("Unknown Operation Failed")
    }
}


// const url = "http://localhost:4500/Tasks";


const ApplicationContext = createContext<ApplicationContextType>({
    headerTitle: "",
    todos: [],
    setHeader: () => {},
    setTodos: () => {},
    Delete: () => {},
    Update: () => {},
    footer: <></>,
    setPage: () => {},
    page: "landing",
    setID: () => {},
    error: "",
    position: 0,
    changePosition: () => {},
    addNew: () => {},
    Select: () => {},
    state: initReducerState,
    dispatch: () => {},
    Edit: () => { },
});


export function ApplicationContextProvider({ children } : ChildrenType) : React.ReactElement
{

// State
    const [headerTitle, setHeaderTitle] = useState<string>("");
    const [todoTasks, setTodoTasks] = useState<todo[]>([]);
    const [currPage, setCurrPage] = useState<"landing" | "individual" | "edit" | "trashed" | "completed">("landing");
    const [id, setID ] = useState<number>(0);
    const [error, setError] = useState<string>("Loading");
    const loading = useRef<boolean>(false);
    const [position, setPosition] = useState<number>(-400);
    const navigate_to = useNavigate();
    const [selected, setSelected] = useState<"completed"| "missed" | "all" | null>(null);
    const [state, dispatch] = useReducer(Reducer, initReducerState);


    useEffect( () => {
        async function GetTasks() {
            if (!loading.current)
            {
                const response = await localStorage.getItem("tasks");
                if ( response )
                {
                    const data = JSON.parse(response);
                    setTodoTasks(data);
                }

                else
                {
                    setTodoTasks(tasks);
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                }

                dispatch({ action_type: reducerActions.revert })



            loading.current = true;
            }

        }

        GetTasks();
    }, [todoTasks]);


// All Functional Logic

    // creation of tasks
    function createTask(title: string, description?: string, date?: string, iD? : number) : void
    {
        if ( description && date )
        {
            const newTask : todo = {
                id: createID(todoTasks.length + 1),
                title: title,
                description: description,
                due_date: date,
                subList: [],
                done: false
            }
            const exists = localStorage.getItem("tasks");
            if (exists){
                localStorage.setItem("tasks", JSON.stringify([...todoTasks, newTask ]));
            }
            setTodoTasks([...todoTasks, newTask]);
        }

        else if ( iD )
        {
            const currTask  : todo = todoTasks.filter(task => task.id == iD )[0];
            const newSub : sub = { id: createID(currTask.subList.length + 1, currTask.subList), title: title, done: false};
            const withoutCurr : todo[] = todoTasks.filter(task => task.id !== iD);


            const updated : todo[] = [ ...withoutCurr, { ...currTask, subList: [...currTask.subList, newSub]}]
            const exists = localStorage.getItem("tasks");
            if (exists)
            {
                localStorage.clear();
                localStorage.setItem("tasks", JSON.stringify(updated))
            }

            setTodoTasks([...todoTasks, { ...currTask, subList: [...currTask.subList, newSub ] }])
        }

        else
        {
            alert("Not Recognixzed")
        }

        setTimeout(() => window.location.reload(), 505);
    }

    // Update Tasks / Edit Tasks
    function EditTasks( post? : number) : void
    {
        const iD : number = Number(id);

        if (post && post > 0)
        {
            let toEdit : todo = todoTasks.filter(task => task.id == post)[0];
            toEdit  = { ...toEdit, title: state.title, description: state.description, due_date: state.due_date }
            const withoutCurr : todo[] = todoTasks.filter(task => task.id != post);
            const updatedList : todo[] = insertAt(todoTasks, toEdit, withoutCurr);
            if ( localStorage.getItem("tasks"))
            {
                localStorage.clear();
                localStorage.setItem("tasks", (JSON.stringify(updatedList)))
            }

            setTodoTasks(updatedList);

        }

        else
        {
            alert(iD)
            let toEdit : todo = todoTasks.filter(task => task.id == iD)[0];
            toEdit  = { ...toEdit, title: state.title, description: state.description, due_date: state.due_date }
            const withoutCurr : todo[] = todoTasks.filter(task => task.id != Number(id));
            const updatedList : todo[] = insertAt(todoTasks, toEdit, withoutCurr)
            if ( localStorage.getItem("tasks"))
            {
                localStorage.clear();
                localStorage.setItem("tasks", (JSON.stringify(updatedList)))
            }



            setTodoTasks(updatedList);
            navigate_to(`/${ id }`);
        }

    }

    // deletion of tasks
    function deleteTask(id : number, subList? : sub[], parentID? : number) : void
    {
        try{
            if (subList && parentID)
            {
                const deleteFrom : sub[] = subList.filter( item => item.id !== id );
                const updatingTasks : todo[] = todoTasks.map( task => task.id === parentID ? { ...task, subList: deleteFrom }: task );
                setTodoTasks(updatingTasks);

                if (localStorage.getItem("tasks"))
                {
                    localStorage.clear();
                    localStorage.setItem("tasks", JSON.stringify(updatingTasks));
                }

            }

            else
            {
                const updatedTasks : todo[] = todoTasks.filter(task => task.id !== id);
                setTodoTasks(updatedTasks);
                if (localStorage.getItem("tasks"))
                {
                    localStorage.clear();
                    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                }
            }
        }

        catch (exc : any)
        {
            if (exc) setError(exc.message)
        }

    }

    // Update Tasks Completed Status
    function updateStatus(id : number, subList? : sub[], parentID? : number) : void
    {
        if (subList && parentID)
        {
            const updatedSubList : sub[] = subList.map( item => item.id === id ? { ...item, done: !item.done } : item );
            const updatingTasks : todo[] = todoTasks.map( task => task.id === parentID ? { ...task, subList: updatedSubList }: task );
            setTodoTasks(updatingTasks);
            if (localStorage.getItem("tasks"))
            {
                localStorage.clear();
                localStorage.setItem("tasks", JSON.stringify(updatingTasks))
            }
        }

        else
        {
            const updatedTask : todo[] = todoTasks.map( task => task.id === id ? { ...task, done : !task.done } : task );
            alert(AutoUpdate(id));
            if (localStorage.getItem("tasks"))
            {
                localStorage.clear();
                localStorage.setItem("tasks", JSON.stringify(updatedTask));
            }
            setTodoTasks(updatedTask);

        }
    }

    // Conditional Update Completed of Tasks and Sub Tasks
    function AutoUpdate(id: number) : boolean
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let completed : boolean = false;
        const selected_task : todo = todoTasks.filter(task => task.id == Number(id))[0];
        selected_task.subList.map( task => task.done ? completed = true : completed = false);
        return completed;
    }

    // create a unique id for tasks and sub tasks
    const createID = (ID : number, parent? : sub[]) : number =>
    {
        let iD = 1;
        !parent ? todoTasks.map(task => task.id === ID ? iD = ID + 1 : iD = ID)
            : parent.map( sub => sub.id == ID ? iD = ID + 1 : iD = ID);
        return iD
    }

    // Postpone A Missed Task


    // Navigation To Different Individual Tasks [ Next >> Previous]
    function go_to(id : number, sign? : number) : void
    {
        const list_length : number = todoTasks.length - 1;
        const first : number = todoTasks[0].id;
        const last : number = todoTasks[list_length].id;

        if ( last < id) navigate_to(`/${ first }`);

        else if (id < first) navigate_to(`/${ last }`);

        else
        {
            const exists : todo = todoTasks.filter(task => task.id == id)[0];
            if ( exists ) navigate_to(`/${ id }`);

            else if (sign) go_to(id + sign, sign);

        }
    }



// All Shared Components

    // Footer
    const Footer : React.ReactElement = currPage === "landing" || currPage === "trashed" || currPage=== "completed"?
        // for the landing home page
        (
            <>
                <footer>
                    <div className="tab-item"
                        onClick={ _e => {
                            navigate_to("/");
                            setSelected("all");
                        } }

                        style={{
                            color : selected === "all" ? "black" : "gray"
                        }}
                    >
                        <FaListAlt style={{ width: 23, height: 23}} color={ selected === "all" ? "black" : "gray" } />
                        All Tasks
                    </div>
                    <div className="tab-item"
                        onClick={ _e => {
                            navigate_to("/completed");
                            setSelected("completed")
                        } }
                        style={{
                            color : selected === "completed" ? "black" : "gray"
                        }}
                    >
                        <MdChecklistRtl  style={{ width: 23, height: 23}} color={ selected === "completed" ? "black" : "gray" } />
                        Completed
                    </div>
                    <div className="tab-item"
                        onClick={ _e => {
                            navigate_to("/missed");
                            setSelected("missed")
                        } }
                        style={{
                            color : selected === "missed" ? "black" : "gray"
                        }}
                    >
                        <FaCalendarXmark  style={{ width: 22, height: 22}} color={ selected === "missed" ? "black" : "gray" }/>
                        Missed
                    </div>
                </footer>
            </>
        )
            // For Standalone Task Page
            : currPage === "individual" ?
                (
                    <footer>
                        <div className="tab-item"
                            onClick={ _e => { go_to((Number(id) - 1), -1) }}
                        ><BsChevronDoubleLeft/></div>
                        <div className="tab-item" onClick={ _e => navigate_to(`/${id}/edit`)}><MdOutlineModeEditOutline/>Edit</div>
                        <div className="tab-item" onClick={ _e => { deleteTask(id); go_to(Number(id) -1, -1) }}><FaTrash/> Delete</div>
                        <div className="tab-item"
                            onClick={ _e => { go_to((Number(id) + 1), 1) }}
                        ><BsChevronDoubleRight/></div>
                    </footer>
                )

                    : // for the edit page
                    (
                        <footer
                            style={{
                                justifyContent: "space-between"
                            }}
                        >

                            <div className="tab-item edit"
                                onClick={ _e => navigate_to(`/${ id }`)}
                            >
                                <IoClose size={34}/>&nbsp;Cancel
                            </div>

                            <div className="tab-item edit"
                            onClick={ _e => EditTasks() }
                            >
                                <IoSaveOutline/>&nbsp;Save
                            </div>
                        </footer>
                    )






    // Context Provider
    return(
        <>
            <ApplicationContext.Provider
                value={{
                    headerTitle: headerTitle,
                    setHeader: setHeaderTitle,
                    todos: todoTasks,
                    setTodos: setTodoTasks,
                    Delete: deleteTask,
                    Update: updateStatus,
                    footer: Footer,
                    page: currPage,
                    setPage: setCurrPage,
                    setID: setID,
                    error: error,
                    position:  position,
                    changePosition: setPosition,
                    addNew: createTask,
                    Select: setSelected,
                    state: state,
                    dispatch: dispatch,
                    Edit: EditTasks
                }}
            >

                { children }

            </ApplicationContext.Provider>
        </>
    )

}



// eslint-disable-next-line react-refresh/only-export-components
export default function useGetAppContext() : ApplicationContextType { return useContext(ApplicationContext); }

