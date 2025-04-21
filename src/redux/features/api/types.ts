export interface GoogleApiRespond {
    sentences: {
        trans: string, 
        orig: string, 
        backend: number
    }[],
    dict?: {
        pos: string, 
        terms: string[], 
        entry?: {
            word: string,
            reverse_translation: string[],
            score: number
        }[], 
        base_form: string, 
        pos_enum: number
    }[],
    src: string,
    spell?: { // temp; idk what it is
        [field: string]: unknown
    }
}
