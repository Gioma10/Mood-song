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
            'Happy',
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
            'Sad',
            'Ansioso',
            'Nostalgico',
            'Addolorato'
        ]
    },
    {
        title: 'neutral', 
        active: false,
        emotions: [
            'Focus',
            'Nostalgico',
            'Neutro',
        ]
    },
    
]