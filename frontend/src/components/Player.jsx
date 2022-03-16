/** @format */

import React from "react"
import { newContextComponents } from "@drizzle/react-components"
import KittyList from "./KittyList"

const { ContractData, ContractForm } = newContextComponents

const Player = ({ drizzle, drizzleState }) => {
	return (
		<div>
			<div>
				<h2>Breed</h2>
				<ContractForm drizzle={drizzle} contract='Cryptokitty' method='breed' />
			</div>
			<div>
				<h2>Player Kitties</h2>
				<ContractData
					drizzle={drizzle}
					drizzleState={drizzleState}
					contract='Cryptokitty'
					method='tokenURIBase'
					render={(uriBase) => {
						return (
							<ContractData
								drizzle={drizzle}
								drizzleState={drizzleState}
								contract='Cryptokitty'
								method='getAllKittiesOf'
								methodArgs={[drizzleState.accounts[0]]}
								render={(kitties) => (
									<KittyList kitties={kitties} uriBase={uriBase} />
								)}
							/>
						)
					}}
				/>
			</div>
		</div>
	)
}

export default Player
