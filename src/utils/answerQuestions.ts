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
            'Cheerful',
            'Excited',
            'Calm',
            'Grateful'
        ]
    },
    {
        title: 'negativy', 
        active: false,
        emotions: [
            'Angry',
            'Sad',
            'Frustrated',
            'Anxious',
            'Lonely',
        ]
    },
    {
        title: 'neutral', 
        active: false,
        emotions: [
            'Relaxed',
            'Neutral',
            'Curious',
            'Tired',
        ]
    },
    
]