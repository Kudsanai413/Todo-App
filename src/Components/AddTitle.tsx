/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { IoClose } from "react-icons/io5"

type props = {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddTitle({ visible, setVisible } : props) {
    const [title, setTitle] = useState<string>("");
  return (
    <div id="new-title-container"
        style={{
            display: visible ? "flex" : "none"
        }}
    >

        <div id="new-title">
            <IoClose size={28} color="white" onClick={ _e => setVisible(false)}/>

            <h3>Change The Title</h3>
            <input type="text" name="new-title" id="title" value={ title } onChange={ e => setTitle( e.target.value )}/>

            <button
                onClick={ _e => localStorage.setItem("Title", title) }
            >Add</button>
        </div>
    </div>
  )
}
