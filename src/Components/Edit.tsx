/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import useGetAppContext from "../Context/ApplicationContext"
import { useParams } from "react-router-dom";
import { todo } from "./ToDoList";

export default function Edit() {
    const { setPage, todos, setHeader, state, dispatch, setID } = useGetAppContext();
    const initRed = useRef<boolean>(false);

    const { id } = useParams();
    let currTask : todo;
    if (id)
    {
        setID(Number(id));
        currTask = todos.filter(task => task.id == Number(id))[0];
    }

    useEffect(() => {
        if (initRed.current)
        {
            setPage("edit")
            dispatch({ action_type: "title", payload: currTask.title });
            dispatch({ action_type: "description", payload: currTask.description });
            dispatch({ action_type: "due_date", payload: currTask.due_date });
            setHeader(` Edit - ${ currTask.title }`);

        }

        else
        {
            initRed.current = true;
            dispatch({ action_type: "initialize" });
        }
    }, [])
    return (
        <>
            <input type="text" value={ state.title } onChange={ (_e : React.ChangeEvent<HTMLInputElement>) => dispatch({ action_type: "title", payload: _e.target.value })} placeholder='Task Title'/>
            <textarea name="" value={ state.description } cols={30} rows={5} onChange={ _e => dispatch({ action_type: "description", payload: _e.target.value })} placeholder='Description'></textarea>
            <input type="date" value={ state.due_date } onChange={ _e => dispatch({ action_type: "due_date", payload: _e.target.value })}/>
        </>
    );
}
