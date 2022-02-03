export const toJpegBase64 = (ArrayBuffer) => {
    let base64String
    if (ArrayBuffer) {
        const buffer = Buffer.from(ArrayBuffer)
        base64String = buffer.toString("base64")
    }

    return `data:image/jpeg;base64,${base64String}`
}

export const toMp3Base64 = (ArrayBuffer) => {
    let base64String
    if (ArrayBuffer) {
        const buffer = Buffer.from(ArrayBuffer)
        base64String = buffer.toString("base64")
    }

    return `data:audio/mp3;base64,${base64String}`
}

export const defaultImageToBase64 = (img) => {
    const canvas = document.createElement("canvas")
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0)
    const dataURL = canvas.toDataURL("image/jpeg")
    return dataURL
}
