"use client"

import Image, { type StaticImageData } from "next/image"
import oddy from "@/assets/images/oddy.png"
import frog from "@/assets/images/frog.png"
import prideFrog from "@/assets/images/pride-froggy.png"
import styles from "../oddy/Oddy.module.css"
import { useEffect, useRef, useState } from "react"
import { useStateArray } from "@/hooks/useStateArray"

type ChatMsg = {
	id: string
	role: "user" | "assistant"
	content: string
}

type OddyChatProps = {
	isFrog?: boolean
	isPride?: boolean
	previousMessages?: ChatMsg[]
}

export const OddyChat = ({
	isFrog = false,
	isPride = false,
	previousMessages,
}: OddyChatProps) => {
	const [avatar, setAvatar] = useState<StaticImageData>(oddy)
	const [name, setName] = useState<"Froggy" | "Oddy">(
		isFrog ? "Froggy" : "Oddy",
	)
	previousMessages = previousMessages !== undefined ? [...previousMessages] : []

	const [messages, addMessage] = useStateArray<ChatMsg>(previousMessages)
	const [input, setInput] = useState("")
	const ws = useRef<WebSocket | null>(null)

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}
	useEffect(() => {
		requestAnimationFrame(() => {
			messagesEndRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			})
		})
	}, [])

	useEffect(() => {
		scrollToBottom()
	}, [scrollToBottom])

	// pick correct avatar on mount or when props change
	useEffect(() => {
		if (isFrog) {
			setAvatar(isPride ? prideFrog : frog)
			setName("Froggy")
		} else {
			setAvatar(oddy)
			setName("Oddy")
		}
	}, [isFrog, isPride])

	// connect websocket
	useEffect(() => {
		const agent = isFrog ? "froggy" : "oddy"
		const url = new URL("ws://localhost:4001")
		url.searchParams.set("agent", agent)
		url.searchParams.set("isPride", String(isPride))
		url.searchParams.set(
			"prevMessages",
			JSON.stringify(
				previousMessages.map((p) => {
					return { role: p.role, content: p.content }
				}),
			),
		)

		ws.current?.close()
		ws.current = new WebSocket(url.toString())

		ws.current.onmessage = (event) => {
			if (event.data === "Successfully connected")
				return () => ws.current?.close()
			addMessage({
				id: crypto.randomUUID(),
				role: "assistant",
				content: String(event.data),
			})
			scrollToBottom()
		}

		return () => ws.current?.close()
	}, [isFrog, isPride, addMessage, previousMessages.map, ])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const trimmed = input.trim()
		if (!trimmed) return

		const msg: ChatMsg = {
			id: crypto.randomUUID(),
			role: "user",
			content: trimmed,
		}
		addMessage(msg)
		ws.current?.send(trimmed)
		setInput("")
	}

	return (
		<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 bg-rema-secondary-lightblue rounded-3xl p-5 backdrop-blur">
			<Image
				src={avatar}
				alt={`${name} avatar`}
				width={80}
				height={80}
				className={`rounded-full ${isFrog ? styles.spinSlow : ""}`}
			/>

			<div className="w-[min(90vw,420px)] flex flex-col items-end">
				<div className="max-h-[50vh] min-h-100 overflow-auto p-3 space-y-2 w-full bg-white rounded-lg">
					{previousMessages.length === 0 ? (
						<p className="max-w-[85%] rounded px-3 py-2 bg-gray-100 text-gray-900 self-start">
							{!isFrog
								? "Heisann sveisann, jeg er Odd Reitan, men du kan kalle meg Oddy!"
								: "Ribbit!"}
						</p>
					) : (
						""
					)}
					{messages
						.filter((v) => v.id !== "0")
						.map((m) => (
							<p
								key={m.id}
								className={`max-w-[85%] rounded px-3 py-2 ${
									m.role === "assistant"
										? "bg-gray-100 text-gray-900 self-start"
										: "bg-blue-600 text-white self-end ml-auto"
								}`}
							>
								{m.content}
							</p>
						))}
					<div ref={messagesEndRef} />
				</div>

				<form onSubmit={handleSubmit} className="mt-2 flex gap-2 w-full">
					<input
						className="border rounded p-2 flex-1 bg-white border-rema-secondary-darkblue"
						value={input}
						onFocus={scrollToBottom}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Skriv meldingen din…"
					/>
					<button
						type="submit"
						className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
					>
						Send
					</button>
				</form>
			</div>
		</div>
	)
}
