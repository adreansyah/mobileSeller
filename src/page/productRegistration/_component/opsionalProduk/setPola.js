export function pola1(array) {
    let pola = []
    for(let i = 0; i < array.length; i++) {
        let {label} = array[i];
        let pola1 = []
        for(let p1 = 0; p1 < label.length; p1++) {
            pola1 = [...pola1,{
                result: label[p1],
                quantity: 0
            }]
        }
        pola = [...pola,{
            names: array[i].names,
            pola: pola1
        }]
    }
    return pola
}

export function pola2(array) {
    let pola = [];
    for(let i = 0; i < array[0].label.length; i++) {
        let pola2 = []
        for(let p2 = 0; p2 < array[1].label.length; p2++) {
            pola2 = [...pola2,{
                result: array[1].label[p2],
                quantity: 0
            }]
        }
        pola = [...pola,{
            names: `${array[0].names} ${array[0].label[i]}`,
            setField: `${array[1].names}`,
            pola: pola2
        }]
    }
    return pola;
}

export function pola3(array) {
    let pola = [];
    for(let i = 0; i < array[0].label.length; i++) {
        let indexing = []
        for(let index = 0; index < array[1].label.length; index++) {
            let pola3 = [];
            for(let p3 = 0; p3 < array[2].label.length; p3++) {
                pola3 = [...pola3,{
                    type: array[2].label[p3],
                    quantity: 0
                }]
            }
            indexing = {
                pola: array[1].label[index],
                result: pola3
            }
        }
        pola = [...pola,{
            name: `${array[0].names} ${array[0].label[i]}`,
            pola: {
                name: array[1].names,
                ...indexing
            }
        }]
    }
    return pola
}