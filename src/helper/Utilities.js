import theme from '@elevenia/master-ui/Theme'

const getColor = property => {
    let style = theme.color[property]
    return style ? style : property
}
const hexToRgb = (color, opacity ) => {
    if (typeof color === 'undefined') {
        throw new Error('Hex color is not defined')
    }

    let hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)

    if (!hex) {
        throw new Error(color + ' is not a valid hex color')
    }

    let r
    let g
    let b

    if (color.length === 7) {
        r = parseInt(color.substring(1, 3), 16)
        g = parseInt(color.substring(3, 5), 16)
        b = parseInt(color.substring(5, 7), 16)
    } else {
        r = parseInt(color.substring(1, 2), 16)
        g = parseInt(color.substring(2, 3), 16)
        b = parseInt(color.substring(3, 5), 16)
    }

    return opacity
        ? 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')'
        : 'rgba(' + r + ', ' + g + ', ' + b + ')'
}

export { getColor, hexToRgb }
