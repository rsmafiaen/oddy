import type { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import Link from "next/link"

type headerItemProps = {
	img: string | StaticImport
	link: string
	title: string
}

export function HeaderItem(props: headerItemProps) {
	return (
		<div className="mr-8">
			<Link className="flex flex-row" href={`/${props.link}`}>
				<Image src={props.img} alt={""} />
				<span>{props.title}</span>
			</Link>
		</div>
	)
}
