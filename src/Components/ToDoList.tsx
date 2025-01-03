/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useGetAppContext from "../Context/ApplicationContext";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { GrSchedulePlay } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import Skeleton from "../skeletons/Skeleton";

const title  = localStorage.getItem("Title");
export type sub = {
    id: number,
    title: string,
    done: boolean,
}
export type todo = {
    id: number,
    title: string,
    description: string,
    subList: sub[],
    done: boolean,
    due_date: string,
}

export default function ToDoList() {

    const [visiblePopUp, setVisiblePopUp] = useState<number>(0);
	const [display, setDisplay] = useState<"black" | "transparent">("transparent");
    const { todos : todolist, setHeader, Update, setPage, error, changePosition, Delete, Select, dispatch } = useGetAppContext();
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (title) setHeader(title);
        else setHeader("HarvestHub To Build List")
        setPage("landing")
        changePosition(-400)
        Select("all")}, []);
    return (
        <>
        {
            todolist.length ?
                todolist.map( item => (
                    <div className="a" key={ item.id }
                        style={{
                            marginBottom: visiblePopUp === item.id ? 145 : "unset",
                            transition: "ease-in margin 250ms"
                        }}
                    >
                        <div className="list-item">
                            <input type="checkbox" checked={ item.done }  onClick={ _e => Update(item.id) } onChange={ _e => {alert(_e.target.checked)}}/>
                            <h3 onClick={ _e => { navigate(`/${ item.id }`); setHeader(item.title)}}>{ item.title }</h3>
                            <button id="postpone" onClick={ _e => {
                                setVisiblePopUp(item.id);
                                dispatch({ action_type: "postpone", payload: item.id })
                                setTimeout(() => {
                                    setDisplay("black");
							}, 220);
                            }}>&#8942;</button>

                            <div className="pop-up"
                                style={{
                                    display: visiblePopUp === item.id && display === "black" ? "flex": "none",

                                    backgroundColor: display,
                                    minWidth: visiblePopUp === item.id && display === "black" ? 200 : 2,
                                    minHeight: visiblePopUp === item.id && display === "black" ? 165 : 2,
                                }}
                            >
                                <IoClose
                                    size={20}
                                    style={{
                                        position:"absolute",
                                        right: 8,
                                        top: 10
                                    }}
                                    onClick={ _e => setVisiblePopUp(0) }
                                />
                                <li onClick={ _e => { dispatch({ action_type: "initialize" }); navigate(`/${item.id}/edit`)}}><FiEdit2/> Edit</li>
                                <li onClick={ _e => Delete(item.id) }><FaTrashAlt/> Delete</li>
                                <li onClick={ _e => { setPage("trashed"); changePosition(0) }}><GrSchedulePlay/> Postpone</li>
                            </div>
                        </div>
                    </div>
                ))

                    :
                    <>
                        <h4>{ error } Tasks...</h4>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                    </>
        }
        </>
    );
}
