"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header/header"
import { OddyChat } from "./components/chat/OddyChat"
import { Oddy } from "./components/oddy/Oddy"
import Popover from "@mui/material/Popover"
import banner from "./assets/images/promo-banner.avif"
import oddyImg from "./assets/images/reitan-i-butikk.png"
import Image from "next/image"

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
			<div className="relative w-full h-64 md:h-80 overflow-hidden">
				<Image src={banner} alt="promo-banner" fill className="" />
			</div>
			<div className="flex space-x-8 m-10">
				<Image
					src={oddyImg}
					alt="Oddy our supreme leader"
					className="rounded-lg"
          />
				<div className="bg-white rounded-lg flex items-center justify-center p-20">
					<p className="mt-4 text-center text-lg italic">
						"Rema‑1000 er som... som... wow! Billige priser, så... så god smak,
						så... så glad hjertet ditt hopper som en... som en dans!" – Oddy
					</p>
				</div>
			</div>
      {oddyView}
		</div>
	)
}
