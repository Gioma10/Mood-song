interface AnswerQuestions{
    title: string,
    active: boolean,
    emotions: string[],
}

export const ANSWERQUESTIONS: AnswerQuestions[]= [
    {
        title: 'positivy', 
        active: false,
        emotions: [
            'Felice',
            'Energico',
            'Chill',
            'Romantico',
            'Ispirato',
        ]
    },
    {
        title: 'negativy', 
        active: false,
        emotions: [
            'Triste',
            'Ansioso',
            'Nostalgico',
            'Addolorato'
        ]
    },
    {
        title: 'neutral', 
        active: false,
        emotions: [
            'Concentrato',
            'Nostalgico',
            'Neutro',
        ]
    },
    {
        title: 'variable', 
        active: false,
        emotions: [
            'Sorpreso',
            'Confuso',
            'Misterioso',
        ]
    },
]