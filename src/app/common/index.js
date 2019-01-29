export const upgradeTemp = (temp) => {
    return (temp - 273.15).toFixed(1)
}

export const checkHasIcons = (nameFolder, nameIcon) => {
    try {
        return require(`../assets/${nameFolder}/${nameIcon}.png`)

    } catch(e) {
        console.log(e.message)
    }
}