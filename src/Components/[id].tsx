/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom"
import useGetAppContext from "../Context/ApplicationContext";
import { todo } from "./ToDoList";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useRef } from "react";

const fetched = () : todo[] =>
{
    const todoList : any = localStorage.getItem("tasks");
    const fetched : todo[] = JSON.parse(todoList);

    return fetched
}

export default function IndividualTask() {
    const { id } = useParams();
    const {  setHeader, Delete, Update, setPage, setID, position } = useGetAppContext();
    const effectRan = useRef<boolean>(false);
    const currTask : todo = fetched().filter( (item : todo) => item.id == Number(id))[0];
    useEffect( () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ( !effectRan.current)
            {
                setHeader(currTask.title);
                setPage("individual");
                setID(Number(id));
            }

            else
            {
                effectRan.current = true;
            }

    }, [ position, id ]);

    return (
        <>

            <p>
                <span id="description" style={{ fontStyle: "italic"}}>Description</span>
                { currTask.description }
            </p>
            <div id="sub-tasks"
                style={{
                    minWidth: window.innerWidth > 500 ? 450 : window.innerWidth - 20,
                    maxWidth: window.innerWidth > 500 ? 450 : window.innerWidth - 20,
                    maxHeight: "97%",
                    overflow: "hidden"
                }}
            >
            <h2>Sub Tasks</h2>
            <div id="sublist"
                style={{
                    minWidth: window.innerWidth > 500 ? 450 : window.innerWidth - 20,
                    maxWidth: window.innerWidth > 500 ? 450 : window.innerWidth - 20,
                    maxHeight:window.innerWidth > 500? 350 : "97%",
                }}
            >

                {
                    currTask.subList.length ?
                        currTask.subList.map( task => (
                            <div className="list-item" key={ task.id }
                            >
                                <input type="checkbox" checked={ task.done } onClick={ _e => Update(task.id, currTask.subList, Number(id)) } />
                                <h3>{ task.title }</h3>
                                <FaTrashAlt
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    onClick={ _e => Delete(task.id, currTask.subList, Number(id)) }
                                />
                            </div>
                        ))

                            : <h2> There Are No Sub Tasks</h2>
                }
            </div>
            </div>
        </>
    );
}

