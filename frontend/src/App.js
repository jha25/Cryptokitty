/** @format */

import "./App.css"
import React from "react"
import { DrizzleContext } from "@drizzle/react-plugin"
import { Drizzle } from "@drizzle/store"
import drizzleOptions from "./utils/drizzleOptions"
import Admin from "./components/Admin"
import Catalogue from "./components/Catalogue"
import Player from "./components/Player"

const drizzle = new Drizzle(drizzleOptions)

function App() {
	return (
		<div className='container'>
			<h1>Cryptokitty</h1>
			<DrizzleContext.Provider drizzle={drizzle}>
				<DrizzleContext.Consumer>
					{(drizzleContext) => {
						const { drizzle, drizzleState, initialized } = drizzleContext
						console.log(drizzle)
						console.log(drizzleState)
						if (!initialized) {
							return "Loading..."
						}
						return (
							<>
								<Catalogue drizzle={drizzle} drizzleState={drizzleState} />
								<Player drizzle={drizzle} drizzleState={drizzleState} />
								<Admin drizzle={drizzle} drizzleState={drizzleState} />
							</>
						)
					}}
				</DrizzleContext.Consumer>
			</DrizzleContext.Provider>
		</div>
	)
}

export default App
