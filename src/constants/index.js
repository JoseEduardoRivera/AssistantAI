
export const apiKey = process.env.OPENAI_SECRET_KEY

export const dummyMessages = [
    {
        role: 'user',
        content: 'How Are you?'
    },
    {
        role: 'assistant',
        content: "I'm fine, How can i help you today?"
    },
    {
        role: 'user',
        content: 'How Are you?'
    },
    {
        role: 'assistant',
        content: "I'm fine, How can i help you today?"
    },
    {
        role: 'user',
        content: 'create an image of a dog playing with cat'
    },
    {
        role: 'assistant',
        content: 'https://storage.googleapis.com/pai-images/ae74b3002bfe4b538493ca7aedb6a300.jpeg'
    },
]