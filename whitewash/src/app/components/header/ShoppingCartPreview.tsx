"use client"

import { useState } from "react"
import receipt from "@public/header-icons/receipt.svg"
import Image from "next/image"
import Link from "next/link"

export const ShoppingCartPreview = () => {
	const [open, setOpen] = useState(false)

	return (
		<div>
			<button
				onClick={() => setOpen(!open)}
				onKeyUp={() => setOpen(!open)}
				className="font-bold flex justify-center hover:bg-rema-secondary-darkblue focus:outline-3 p-1.5 rounded-sm items-center ease-in-out duration-150 transition-all"
				type="button"
			>
				<span>Handlelapp</span>
				<Image src={receipt} alt="En Handlelapp" />
			</button>

			{open && (
				<div
					id="bg"
					onClick={() => setOpen(false)}
					className="absolute inset-0 top-22.5 z-30 bg-black/20 duration-150 ease-in-out transition-all"
					role="main"
				>
					<div
						id="menu"
						onClick={(e) => e.stopPropagation()}
						className="absolute right-0 h-full w-md bg-white shadow-lg p-4 z-50 text-center"
						role="menu"
					>
						<div className="flex flex-col gap-3 items-center justify-center h-full text-black">
							<span className="font-header text-rema-blue text-4xl">
								Her kommer det snart mer informasjon om handlelappen din!
							</span>
							<span>
								Vi utvikler nye systemer for å gjøre din handleopplevelse enda
								bedre!{" "}
							</span>
							<span>Har du noen spørsmål? Spør Oddy, da vel!</span>
							<span>
								I mellomtiden kan du også besøke{" "}
								<Link href="/handleliste" className="text-rema-blue font-bold">
									Handlelappsiden
								</Link>
							</span>

							<button
								onClick={() => setOpen(false)}
								onKeyUp={() => setOpen(!open)}
								className="font-bold bg-rema-blue text-white hover:bg-rema-secondary-darkblue focus:outline-3 p-1.5 mt-3 rounded-sm items-center ease-in-out duration-150 transition-all"
								type="button"
							>
								Lukk Meny
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
