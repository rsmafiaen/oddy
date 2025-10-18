"use client"

import Image, { type StaticImageData } from "next/image"
import oddy from "@/assets/images/oddy.png"
import frog from "@/assets/images/frog.png"
import prideFrog from "@/assets/images/pride-froggy.png"
import styles from "./Oddy.module.css"

type OddyProps = {
	message?: string
	onClick?: () => void
	isFrog?: boolean
	isPride?: boolean
}

export const Oddy = ({
	message = "Hei! Jeg er Oddy, kan jeg hjelpe deg med noe?",
	onClick,
	isFrog = false,
	isPride = false,
}: OddyProps) => {
	let avatar: StaticImageData
	let name: "Froggy" | "Oddy"

	if (isFrog) {
		avatar = isPride ? prideFrog : frog
		name = "Froggy"
	} else {
		avatar = oddy
		name = "Oddy"
	}

	return (
		<div
			id="chat-container"
			className="flex flex-col items-end gap-3 z-50 fixed bottom-6 right-6"
		>
			<button type="button" onClick={onClick} className="cursor-pointer">
				<Image
					src={avatar}
					alt={`${name} avatar`}
					width={80}
					height={80}
					className={`rounded-full ${isFrog ? styles.spinSlow : ""}`}
				/>
			</button>

			<button
				id="oddy_container"
				className="relative px-4 py-3 rounded-lg cursor-pointer"
				type="button"
				onClick={onClick}
			>
				<div className="relative bg-gray-200 px-4 py-3 rounded-lg text-gray-900 shadow">
					{isFrog
						? message.replace(
								/\bOddy\b/g,
								isPride ? "Pride Froggy 🏳️‍🌈" : "Froggy",
							)
						: message}
					<div className="absolute top-[-8px] right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-200" />
				</div>
			</button>
		</div>
	)
}
