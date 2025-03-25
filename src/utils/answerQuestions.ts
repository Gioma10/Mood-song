interface AnswerQuestions{
    title: string,
    active: boolean,
    emotions: {emotion: string, color: string}[],
}

export const ANSWERQUESTIONS: AnswerQuestions[]= [
    {
        title: 'positivy', 
        active: false,
        emotions: [
            {emotion: 'Happy', color: "#FFEB3B"},
            {emotion: 'Motivated', color: "#9C27B0"}
        ]
    },
    {
        title: 'negativy', 
        active: false,
        emotions: [
            {emotion: 'Angry', color: "#F44336"},
            {emotion: 'Sad', color: "#2196F3"},
            {emotion: 'Tired', color: "#BDBDBD"}
        ]
    },
    {
        title: 'neutral', 
        active: false,
        emotions: [
            {emotion: 'Calm', color: "#FF5722"},
            {emotion: 'Bored', color: "#81C784"}
        ]
    },
    
]