let words: string[] = [
    'COMPUTADORA',
    'VETERINARIO',
    'AGUACATE',
    'VEHICULO',
    'ANIMAL',
    'FRESA',
    'PLATANO',
    'UVA',
    'GATO',
    'PERRO',
    'MURCIELAGO',
    'CABALLO',
    'CELULAR'
]

export function getRandomWord() {
    
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex];
}