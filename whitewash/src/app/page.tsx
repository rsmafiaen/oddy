import { Header } from "@/components/header/header"
import { Oddy } from "@/components/oddy/Oddy"
import banner from "./assets/images/promo-banner.avif"
import oddyImg from "./assets/images/reitan-i-butikk.png"
import Image from "next/image"

export default function Home() {
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

			<Oddy />
		</div>
	)
}
