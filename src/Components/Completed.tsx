/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import useGetAppContext from "../Context/ApplicationContext"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Completed() {
    const { todos,Delete, setHeader, setPage, Select } = useGetAppContext();
    const completed = todos.filter( task => task.done === true)
    const navigate = useNavigate();
    useEffect(() => { setHeader("Completed"); setPage("completed"); Select("completed") }, [])
  return (
    <>
        {
            completed.length ?
                completed.map( task => (
                    <div className="list-item"  key={ task.id }
                    >
                        <FaCheckCircle/>
                        <h3 onClick={ _e => { navigate(`/${ task.id }`); setHeader(task.title)}}>{ task.title }</h3>
                        <FaTrashAlt
                            onClick={ _e => {
                                Delete(task.id);
                            }}
                        />
                    </div>
                ))

                    : <h2> Zero0️⃣ Completed Tasks 😨</h2>
        }
    </>
  )
}

