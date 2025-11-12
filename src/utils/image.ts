const base64ToImageUrl = (base64String: string): string => {
	return `data:image/jpeg;base64,${base64String}`
}

export default base64ToImageUrl
