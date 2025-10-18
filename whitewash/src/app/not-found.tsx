"use client"

import Image from "next/image"
import frog from "@/assets/images/frog.png"
import prideFrog from "@/assets/images/pride-froggy.png"
import { Header } from "@/components/header/header"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HeaderPage() {
	const [frogImage, setFrogImage] = useState(frog)

	useEffect(() => {
		if (Math.random() < 1 / 20) {
			setFrogImage(prideFrog)
		}
	}, [])

	return (
		<div className="min-h-screen bg-[#fff] flex flex-col">
			<Header />
			<div className="flex-1 flex flex-col justify-center items-center">
				<span className="text-black">Ikke noe å se her.</span>
				<Link href="/">
					<Image src={frogImage} alt="frog" height={300} />
				</Link>
			</div>
		</div>
	)
}
