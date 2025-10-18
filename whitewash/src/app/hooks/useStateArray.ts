import { useState, useCallback } from "react"

export const useStateArray = <T>(
	initialValue: T[],
): readonly [T[], (newValue: T) => void] => {
	const [value, setValue] = useState<T[]>(initialValue)

	const addValue = useCallback((newValue: T) => {
		setValue((prev) => [...prev, newValue])
	}, [])

	return [value, addValue] as const
}
