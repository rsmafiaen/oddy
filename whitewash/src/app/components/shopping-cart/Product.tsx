import type { ProductItem } from "@/search/page"

type ProductProps = {
	product: ProductItem
}

export function Product(props: ProductProps) {
	return (
		<div className="flex flex-row justify-between px-4 py-3 min-w-100">
			<div className="flex flex-col">
				<span className="font-bold text-rema-secondary-darkblue text-xl">
					{props.product.name}
				</span>
				<span className="">{props.product.description}</span>
			</div>
			<div className="flex flex-col text-right">
				<span className="font-bold text-rema-secondary-blue text-lg ">{`${props.product.price} kr`}</span>
				<span className="text-xs text-rema-secondary">{`${props.product.pricePerUnit} kr/${props.product.unit}`}</span>
			</div>
		</div>
	)
}
