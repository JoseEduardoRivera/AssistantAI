import { apiKey } from "../constants";
import axios from 'axios'


const client = axios.create({
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    }
})

const chatGPTUrl = 'https://api.openai.com/v1/chat/completions'
const dallEUrl = 'https://api.openai.com/v1/images/generations'

export const apiCall = async (prompt, messages) => {

    // // Logic 1 : this will check the prompt from chatgpt if user wants to create an image
    try {
        const res = await client.post(chatGPTUrl, {
            model: "gpt-3.5-turbo",
            messages: [{
                role: 'user',
                content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`
            }]
        });

        // Check for 429 status code
        if (res.status === 429) {
            console.log('ChatGPT not working: Too Many Requests');
            return Promise.resolve({ success: false, msg: 'ChatGPT not working: Too Many Requests' });
        }

        let answer = res?.data?.choices?.[0]?.message?.content;
        if (!answer) {
            console.log('Respuesta inesperada de la API:', res);
            return Promise.resolve({ success: false, msg: 'Respuesta inesperada de la API' });
        }


        isArt = res.data?.choices[0]?.message?.content;
        isArt = isArt.trim();
        if (isArt.toLowerCase().includes('yes')) {
            console.log('dalle api call');
            return dalleApiCall(prompt, messages)
        } else {
            console.log('chatgpt api call')
            return chatgptApiCall(prompt, messages);
        }

    } catch (err) {
        console.log('error: ', err);
        return Promise.resolve({ success: false, msg: err.message });
    }

}

const chatgptApiCall = async (prompt, messages) => {
    try {
        const res = await client.post(chatGPTUrl, {
            model: "gpt-3.5-turbo",
            messages
        })

        let answer = res.data?.choices[0]?.message?.content;
        messages.push({ role: 'assistant', content: answer.trim() });
        // console.log('got chat response', answer);
        return Promise.resolve({ success: true, data: messages });

    } catch (err) {
        console.log('error: ', err);
        return Promise.resolve({ success: false, msg: err.message });
    }
}

const dalleApiCall = async (prompt, messages) => {
    try {
        const res = await client.post(dallEUrl, {
            prompt,
            n: 1,
            size: "512x512"
        })

        let url = res?.data?.data[0]?.url;
        // console.log('got image url: ',url);
        messages.push({ role: 'assistant', content: url });
        return Promise.resolve({ success: true, data: messages });

    } catch (err) {
        console.log('error: ', err);
        return Promise.resolve({ success: false, msg: err.message });
    }
}