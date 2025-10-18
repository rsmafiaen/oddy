'use client'

import { Header } from "@/components/header/header"
import { Product } from "@/components/shopping-cart/Product";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export type product = {
    productid: number,
    gtin: string,
    name: string,
    description: string,
    price: number,
    pricePerUnit: number,
    priceperunit: number,
    unit: string,
    allergens: string,
    carbonFootprintGram: number,
    organic: boolean,
}

export default function SearchPage(){
    const  [data, setData] = useState<product[]>();
    const  [loading, setLoading] = useState<boolean>(true);

    const searchParams = useSearchParams();
    const search = searchParams.get('a');

    useEffect (() => {
        const url=`http://localhost:4000/api/findProducts?search=`;

        const fetchData = async () => {
            try {
                console.log("fetching")
                const response = await fetch(url + search);
                const result = await response.json();
                setData(result);
                setLoading(false);
                console.log(result)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    }, [search]);
    

    return(
        <div>
            <Header />
            <div className="flex flex-col">
                {data && data.length > 0 ? 
                    data.map((vare: product, i) => (
                    <div className={`flex flex-row w-fit justify-between ${i % 2 ? "bg-rema-secondary-lightgray" : "bg-white"}`} key={vare.productid}>
                        <Product product={vare}  />
                    </div>

                    ))
                    : 
                    <div>
                        {loading ? "Loading..." : "Fant ingen resultater"}
                    </div>
                }
            </div>
        </div>
    )
}