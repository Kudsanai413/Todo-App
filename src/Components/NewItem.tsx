/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import useGetAppContext from '../Context/ApplicationContext';
import { IoClose } from 'react-icons/io5';
import { useParams } from 'react-router-dom';


export default function NewItem() {
  const { page, position, changePosition, addNew, state, dispatch, Edit } = useGetAppContext();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("")
    const [date, setDate] = useState<string>("");

	const { id } = useParams();

    const newTask : React.ReactElement= page === "landing" ?
		(
			<div id="form"
				style={{
					minHeight: 250,
				}}
			>
				<input type="text" value={ title } onChange={ (_e : React.ChangeEvent<HTMLInputElement>) => setTitle(_e.target.value)} placeholder='Task Title'/>
				<textarea name="" value={ description } cols={30} rows={5} onChange={ e => setDescription(e.target.value)} placeholder='Description'></textarea>
				<input type="date" value={ date } onChange={ e => setDate(e.target.value)}/>
			</div>
		)

			: page !== "trashed" ?
			(
				<div id="form">
					<input type="text" value={ title } onChange={ e => setTitle(e.target.value) } />
				</div>
			)

				:

				<div id='form'>
					<input type="date" value={ state.due_date }  onChange={ _e => dispatch({action_type: "due_date", payload: _e.target.value}) } />
				</div>
	return (
		<section id="pop-up-add"
			style={{
				// display: "none",
				minHeight: page === "landing" ? 400 : 200,
				bottom: position,
			}}
		>
			<IoClose size={28} color='white'onClick={ _e => changePosition(-400) }/>
			<h4> { page == "landing" ? "New Todo-Task" : page === "trashed" ? "Postpone": "New Sub-Task" }</h4>
			{ newTask }
			<button id="new" onClick={ _e => {
				changePosition(-400)
				page === "trashed" ?

					Edit(state.iD)
						:
							description.length && date.length ?
								addNew(title, description, date)
									: addNew(title, undefined,undefined, Number(id))

			} }>{ page === "trashed" ? "Confirm" : "Add"}</button>

		</section>
	)
}
