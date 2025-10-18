import { a as items } from "./mock_products.ts"
import { neon } from "npm:@neondatabase/serverless"
import { load } from "jsr:@std/dotenv"

const env = await load({
	envPath: ".env",
})

const values = items.map((item) => {
	return `('${item.productId}', '${item.gtin}', '${item.name}', '${item.description}', '${item.price}', '${item.pricePerUnit}', '${item.unit}', '{${item.allergens === "ingen" ? "" : item.allergens.split(", ")}}', '${item.carbonFootprintGram}', '${item.organic}')`
})

const insertstring =
	`INSERT INTO products ("productId", "gtin", "name", "description", "price", "pricePerUnit", "unit", "allergens", "carbonFootprintGram", "organic") VALUES\n` +
	values.join(",\n") +
	";"

const sql = neon(env.NEON_CONNECTION_STRING)

await sql`CREATE TABLE IF NOT EXISTS products("productId" INT PRIMARY KEY, "gtin" TEXT, name TEXT, "description" TEXT, "price" FLOAT, "pricePerUnit" FLOAT, "unit" TEXT, "allergens" TEXT[], "carbonFootprintGram" INT, "organic" BOOLEAN);`
await sql.query(insertstring)
