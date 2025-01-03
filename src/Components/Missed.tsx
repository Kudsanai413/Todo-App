/* eslint-disable @typescript-eslint/no-unused-vars */
import {  FaTrashAlt } from "react-icons/fa";
import useGetAppContext from "../Context/ApplicationContext"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdRestartAlt, } from "react-icons/md";
import { GrSchedulePlay } from "react-icons/gr";
import { RiCheckDoubleFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { todo } from "./ToDoList";



const date  = new Date();
const year = date.getFullYear();
const day = (x : number) : string | number => date.getDate() + x < 10 ? `0${date.getDate() + x}` : date.getDate() + x;
const month = (date.getMonth() + 1) < 10 ? `0${ date.getMonth() + 1 }`: date.getMonth() + 1

const today = `${ year }-${ month }-${ day(0) }`;


export default function Missed() {

	const [visiblePopUp, setVisiblePopUp] = useState<number>(0);
	const { todos, Delete, setHeader, setPage, Select, dispatch, changePosition, state, Edit } = useGetAppContext();
	const [display, setDisplay] = useState<"black" | "transparent">("transparent");


	const missed = todos.filter(task => format(task.due_date) < format(today) && !task.done );
	const navigate = useNavigate();

	useEffect(() => {
		setHeader("Missed");
		setPage("trashed");
		Select("missed") ;
		const curr_task : todo = todos.filter(task => task.id === visiblePopUp)[0];
		if (curr_task)
		{
			dispatch({ action_type: "title", payload: curr_task.title})
			dispatch({ action_type: "description", payload: curr_task.description})
			dispatch({ action_type: "due_date", payload: state.due_date })
		}
	})

	return (
	<>
	{
		missed.length ?
			missed.map( task => (
				<div className="a">
					<div className="list-item"  key={ task.id }
						style={{
                            marginBottom: visiblePopUp === task.id ? 175 : "unset",
                            transition: "ease-in margin 200ms"
                        }}
					>
						<FaTrashAlt
							onClick={ _e => {
								Delete(task.id);
							}}
						/>

						<h3 onClick={ _e => { navigate(`/${ task.id }`); setHeader(task.title)}}>{ task.title }</h3>

						<button id="postpone" onClick={ _e => {
							setVisiblePopUp(task.id);
							dispatch({ action_type: "retry", payload: `${ year }-${ month }-${ day(3)}` })

							dispatch({ action_type: "postpone", payload: task.id })
							setTimeout(() => {
								setDisplay("black");
							}, 220);
						}}
						>&#8942;</button>
						<div className="pop-up"
							key={ task.id }
							style={{
								display: visiblePopUp === task.id && display === "black" ? "flex": "none",
								transition: "all 251ms",
								backgroundColor: display
							}}
						>
							<IoClose
								size={20}
								style={{
									position:"absolute",
									right: 8,
									top: 10
								}}
								onClick={ _e => {
									setVisiblePopUp(0);
									setDisplay("transparent");
								} }
							/>
							<li
								onClick={ _e => {
									Edit(state.iD);
									setVisiblePopUp(0);
								}}
							> <MdRestartAlt/>Retry</li>
							<li onClick={ _e => {
								setVisiblePopUp(0);
								changePosition(0);
							}}> <GrSchedulePlay/> Postpone</li>
							<li> <RiCheckDoubleFill/> Mark As Done</li>
						</div>
					</div>
				</div>
			))
				: <h2 style={{ fontWeight: "lighter" }}> 🎉🎉 Congratulations, 0 Missed Tasks</h2>
	}

	</>
	)
}



function format(date: string) : number
{
	const newDate = date.split("-");
	const formating = newDate[0] + newDate[1] + newDate[2];
	return parseInt(formating);
}
