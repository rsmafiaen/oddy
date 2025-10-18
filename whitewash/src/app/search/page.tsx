'use client'

import { Header } from "@/components/header/header"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

type product = {
    productid: number,
    gtin: string,
    name: string,
    description: string,
    price: number,
    pricePerUnit: number,
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
                // console.log(result)
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
                    (
                    <ul>
                        {data.map((vare: product) => (
                        
                        <li key={vare.productid}> 
                            {/* Vare component */}
                            {vare.name} 
                        </li>
                        ))}
                    </ul>
                    ) 
                    : 
                    <div>
                        {loading ? "Loading..." : "Fant ingen resultater"}
                    </div>
                }
            </div>
        </div>
    )
}