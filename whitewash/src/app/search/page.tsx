"use client"

import { Header } from "@/components/header/header"
import { Oddy } from "@/components/oddy/Oddy"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

type Product = {
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
	const searchParams = useSearchParams()
	const search = searchParams.get("a")
	const url = `http://localhost:4000/api/findProducts?search=`

	const { data, isLoading, error } = useQuery({
		queryKey: ["search", search],
		queryFn: async () => {
			const res = await fetch(url + search)

			return (await res.json()) as Product[]
		},
	})

	const { data: oddyResponse } = useQuery({
		queryKey: ["Oddy", "oddySearch", JSON.stringify(data)],
		queryFn: async () => {
			const url = "http://localhost:4000/api/oddy?inMessage="

			const oddyMessage = `Jeg har søkt på ${search} på nettsiden din, og fått opp disse resultatene (i json format): ${JSON.stringify(data)}. Gi meg en anbefaling på hva jeg burde kjøpe basert på CO2 fotavtrykket til varene, pris og sunnhet`
			console.log(oddyMessage)

			const res = await fetch(url + oddyMessage)

			return (await res.json()) as { message: string }
		},
		enabled: !!data,
	})

	return (
		<div>
			<Header />
			<div className="flex flex-col">
				{data && data.length > 0 ? (
					<ul>
						{data.map((vare: Product) => (
							<li key={vare.productId}>
								{/* Vare component */}
								{vare.name}
							</li>
						))}
					</ul>
				) : (
					<div>
						{isLoading ? "Loading..." : "Fant ingen resultater"}
						{error ? "En feil oppstod. Vennligst prøv igjen" : ""}
					</div>
				)}
				{oddyResponse && <Oddy message={oddyResponse.message} />}
			</div>
		</div>
	)
}
