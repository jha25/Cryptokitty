/** @format */

import React from "react"
import KittyList from "./KittyList"
import { newContextComponents } from "@drizzle/react-components"

const { ContractData } = newContextComponents

const Catalogue = ({ drizzle, drizzleState }) => {
	return (
		<div>
			<div>
				<h2>Catalogue</h2>
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
								method='getAllKitties'
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
export default Catalogue
