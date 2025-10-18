import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Providers from "./providers"

const rema = localFont({
	src: [
		{
			path: "../../public/fonts/rema/REMA-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/rema/REMA-Italic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "../../public/fonts/rema/REMA-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/rema/REMA-BoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
	],
	variable: "--font-rema",
})

const remaBrush = localFont({
	src: [
		{
			path: "../../public/fonts/rema/REMA-Brush.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-brush",
})

const remaNumeral = localFont({
	src: [
		{
			path: "../../public/fonts/rema/REMA-Numeral.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-numeral",
})

const remaIcon = localFont({
	src: [
		{
			path: "../../public/fonts/rema/REMA-Ikon.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-rema-icons",
})

const uniform = localFont({
	src: [
		{
			path: "../../public/fonts/Uniform.otf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-uniform",
})

export const metadata: Metadata = {
	title: "Rema 3000",
	description: "Fremtidens Remaopplevelse",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${rema.variable} ${remaBrush.variable} ${remaNumeral.variable} ${uniform.variable} ${remaIcon.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
