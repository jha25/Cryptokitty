/** @format */

import React, { useState, useEffect } from "react"
import { newContextComponents } from "@drizzle/react-components"

const { ContractForm } = newContextComponents

const Admin = ({ drizzle, drizzleState }) => {
	const [isAdmin, setIsAdmin] = useState(false)

	useEffect(() => {
		;(async () => {
			const admin = await drizzle.contracts.Cryptokitty.methods.admin().call()
			console.log(admin)
			setIsAdmin(admin.toLowerCase() === drizzleState.accounts[0].toLowerCase())
		})()
	}, [])

	if (!isAdmin) {
		return null
	}

	return (
		<div>
			<div>
				<h2>Mint</h2>
				<ContractForm drizzle={drizzle} contract='Cryptokitty' method='mint' />
			</div>
		</div>
	)
}

export default Admin
