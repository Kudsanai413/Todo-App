/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "./header.css"
import useGetAppContext from "../Context/ApplicationContext";
import { useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";

type props = {
	setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function Header({ setVisible} : props) : React.ReactElement
{
	const { headerTitle } = useGetAppContext();
	const { id } = useParams();
	const [home, setHome] = useState<number>(0);

	useEffect(() => {
		if (id) setHome(parseInt(id))
	}, [id])

	return(
		<>
			<header>
				<FaHome color="black" size={32}
					style={{
						display: home === 0 ? "none" : "initial",
						position: "absolute",
						left: 15,
					}}

					onClick={ _e => location.replace("/")}

				/>
				<img src={ localStorage.getItem("Title")?.includes("Harvest") ? getURLs("img2.png") : getURLs("gcLogo.png") } alt="HIT200"
					style={{
						width: !localStorage.getItem("Title")?.includes("Harvest") ? 50 : 75,
						right: home === 0 ? "unset" : 15,
						left: home === 0 ? 15 : "unset",
					}}
				/>
				<h1 id="heading" onClick={ _e => setVisible(true) }>{ headerTitle } </h1>
			</header>
		</>
	);
}

const getURLs = (name : string) : string =>
{
	return new URL(`../assets/${ name }`, import.meta.url).href
}