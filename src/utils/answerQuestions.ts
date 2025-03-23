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
            'Motivated',
        ]
    },
    {
        title: 'negativy', 
        active: false,
        emotions: [
            'Angry',
            'Sad',
            'Tired',
        ]
    },
    {
        title: 'neutral', 
        active: false,
        emotions: [
            'Calm',
            'Bored',
        ]
    },
    
]