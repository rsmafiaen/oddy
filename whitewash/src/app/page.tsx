"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header/header"
import { OddyChat } from "./components/chat/OddyChat"
import { Oddy } from "./components/oddy/Oddy"
import Popover from "@mui/material/Popover"

export default function Home() {
	const [chattingWithOddy, setChattingWithOddy] = useState(false)

	const [isFrog, setIsFrog] = useState(false)
	const [isPride, setIsPride] = useState(false)

	useEffect(() => {
		const shouldBeFrog = Math.random() < 1 / 15
		const shouldBePride = shouldBeFrog && Math.random() < 1 / 8
		setIsFrog(shouldBeFrog)
		setIsPride(shouldBePride)
	}, [])

	const handleToggleChat = () => setChattingWithOddy((v) => !v)

	const oddyView = chattingWithOddy ? (
		<Popover
			className="mt-6"
			open={true}
			onClose={() => setChattingWithOddy((v) => !v)}
			// anchorEl={}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			transformOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
		>
			<OddyChat isFrog={isFrog} isPride={isPride} />
		</Popover>
	) : (
		<Oddy isFrog={isFrog} isPride={isPride} onClick={handleToggleChat} />
	)

	return (
		<div>
			<Header />
			{oddyView}
		</div>
	)
}
