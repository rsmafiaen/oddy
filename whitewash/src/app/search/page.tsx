"use client"

import { OddyChat } from "@/components/chat/OddyChat"
import { Header } from "@/components/header/Header"
import { Oddy } from "@/components/oddy/Oddy"
import { Product } from "@/components/shopping-cart/Product"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export type ProductItem = {
	productId: number
	gtin: string
	name: string
	description: string
	price: number
	pricePerUnit: number
	unit: string
	allergens: string
	carbonFootprintGram: number
	organic: boolean
}

export default function SearchPage() {
	const [chattingWithOddy, setChattingWithOddy] = useState(false)
	const searchParams = useSearchParams()
	const search = searchParams.get("search")
	const url = `http://localhost:4000/api/findProducts?search=`

	const { data, isLoading, error } = useQuery({
		queryKey: ["search", search],
		queryFn: async () => {
			const res = await fetch(url + search)

			return (await res.json()) as ProductItem[]
		},
	})

	const oddyMessage = `Jeg har søkt på ${search} på nettsiden din, og fått opp disse resultatene (i json format): ${JSON.stringify(data)}. Gi meg en anbefaling på hva jeg burde kjøpe basert på CO2 fotavtrykket til varene, pris og sunnhet. Til senere svar, vennligst bare referer til disse varene og baser svar på resultatene. Du har ikke tilgang til å finne mer informasjon om varer på egen hånd. Om du trenger mer informasjon, be meg om å starte ett nytt søk etter det du leter etter`
	const { data: oddyResponse, isLoading: oddyLoading } = useQuery({
		queryKey: ["Oddy", "oddySearch", JSON.stringify(data)],
		queryFn: async () => {
			const url = "http://localhost:4000/api/oddy?inMessage="

			const res = await fetch(url + oddyMessage)

			return (await res.json()) as { message: string }
		},
		enabled: !!data && data.length > 0,
	})

	const handleToggleChat = () => setChattingWithOddy((v) => !v)

	const oddyView = chattingWithOddy ? (
		<OddyChat
			previousMessages={
				oddyResponse
					? [
							{
								id: "0",
								role: "user",
								content: oddyMessage,
							},
							{
								id: crypto.randomUUID(),
								role: "assistant",
								content: oddyResponse.message,
							},
						]
					: [
							{
								id: "0",
								role: "user",
								content:
									oddyMessage +
									"Om det ikke er noen resultater, spør om det er noe annet du kan hjelpe med.",
							},
							{
								id: crypto.randomUUID(),
								role: "assistant",
								content:
									"Set ut som vi ikke fant noen resultater for søket ditt. Er det noe annet jeg kan hjelpe med?",
							},
						]
			}
		/>
	) : (
		!oddyLoading &&
		!!data && (
			<Oddy
				message={
					data.length > 0 && oddyResponse
						? oddyResponse.message
						: "Set ut som vi ikke fant noen resultater for søket ditt. Er det noe annet jeg kan hjelpe med?"
				}
				onClick={handleToggleChat}
			/>
		)
	)

	return (
		<div>
			<Header />
			<div className="flex flex-col">
				{data && data.length > 0 ? (
					data.map((vare: ProductItem, i) => (
						<div
							className={`flex flex-row w-fit justify-between ${i % 2 ? "bg-rema-secondary-lightgray" : "bg-white"}`}
							key={vare.productId}
						>
							<Product product={vare} />
						</div>
					))
				) : (
					<div>
						{isLoading ? "Loading..." : "Fant ingen resultater"}
						{error ? "En feil oppstod. Vennligst prøv igjen" : ""}
					</div>
				)}
				{oddyView}
			</div>
		</div>
	)
}
