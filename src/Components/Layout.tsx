/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from "react-router-dom";
import Header from "./Header";
import useGetAppContext from "../Context/ApplicationContext";
import { FaPlus } from "react-icons/fa6";
import NewItem from "./NewItem";
import AddTitle from "./AddTitle";
import { useState } from "react";

const width : number  = window.innerWidth > 600 ? 500 : window.innerWidth - 20;
export default function Layout() {

  const [visibility, setVisibility]  = useState<boolean>(false);
  const { footer, changePosition, page } = useGetAppContext();
  return (
    <>
        <Header setVisible={ setVisibility }/>
        <div id="main"
          style={{
            maxWidth: width
          }}
        >
          <Outlet/>
          <button id="add"
            onClick={ _e => changePosition(0)}
            style={ {
              visibility: page === "individual" || page === "landing" ? "visible" : "hidden"
            } }
          >
            <FaPlus color="black" size={28}/>
          </button>
        </div>
        { footer }
        <NewItem/>
        <AddTitle visible={ visibility } setVisible={ setVisibility }/>
    </>
  )
}
