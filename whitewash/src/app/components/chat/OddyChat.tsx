"use client"

import { useStateArray } from "@/hooks/useStateArray"
import { useEffect, useRef, useState } from "react"

type ChatMsg = {
	id: string
	role: "user" | "oddy"
	message: string
}

export const OddyChat = () => {
	const [messages, addMessage] = useStateArray<ChatMsg>([])
	const [input, setInput] = useState("")
	const [agent, setAgent] = useState<"oddy" | "froggy">("froggy")
	const [isPride, setIsPride] = useState(false)
	const ws = useRef<WebSocket | null>(null)

	useEffect(() => {
		const url = new URL("ws://localhost:4001")
		url.searchParams.set("agent", agent)
		url.searchParams.set("isPride", String(isPride))

		ws.current?.close()
		ws.current = new WebSocket(url.toString())

		ws.current.onopen = () => {
			console.log("✅ Connected to WebSocket")
		}

		ws.current.onmessage = (event) => {
			if (event.data === "Successfully connected") return
			addMessage({
				id: crypto.randomUUID(),
				role: "oddy",
				message: String(event.data),
			})
		}

		ws.current.onerror = (err) => console.error("❌ WebSocket error:", err)
		ws.current.onclose = () => console.log("🔌 WebSocket closed")

		return () => {
			ws.current?.close()
		}
	}, [agent, isPride, addMessage])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const trimmed = input.trim()
		if (!trimmed) return

		const msg: ChatMsg = {
			id: crypto.randomUUID(),
			role: "user",
			message: trimmed,
		}
		addMessage(msg)
		ws.current?.send(trimmed)
		setInput("")
	}

	return (
		<div className="fixed bottom-6 right-6 z-50 w-[min(90vw,420px)]">
			<div className="mb-2 flex items-center gap-3">
				<select
					className="border rounded px-2 py-1 text-sm"
					value={agent}
					onChange={(e) => setAgent(e.target.value as "oddy" | "froggy")}
				>
					<option value="oddy">Oddy</option>
					<option value="froggy">Froggy</option>
				</select>

				<label className="text-sm flex items-center gap-2">
					<input
						type="checkbox"
						checked={isPride}
						onChange={(e) => setIsPride(e.target.checked)}
					/>
					Pride
				</label>
			</div>

			<div className="bg-white/90 backdrop-blur rounded-lg shadow max-h-[50vh] overflow-auto p-3 space-y-2">
				{messages.map((m) => (
					<p
						key={m.id}
						className={`max-w-[85%] rounded px-3 py-2 ${
							m.role === "oddy"
								? "bg-gray-100 text-gray-900 self-start"
								: "bg-blue-600 text-white self-end ml-auto"
						}`}
					>
						{m.message}
					</p>
				))}
				{messages.length === 0 && (
					<p className="text-gray-500 text-sm">
						Si hei til {agent === "froggy" ? "Froggy 🐸" : "Oddy"}…
					</p>
				)}
			</div>

			<form onSubmit={handleSubmit} className="mt-2 flex gap-2">
				<input
					className="border rounded p-2 flex-1"
					value={input}
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
	)
}
