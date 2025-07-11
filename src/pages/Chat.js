import React, { useState } from 'react';
import api from '../utils/api';

// Chat interface to get course recommendations from GPT
function Chat() {
    const [prompt, setPrompt] = useState('');
    const [reply, setReply] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post('/chat/recommend', { prompt });
        setReply(res.data.reply);
    };

    return (
        <div>
            <h2>Ask ChatGPT for Course Recommendations</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your goal" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <button type="submit">Ask</button>
            </form>
            <p><strong>GPT Suggestion:</strong> {reply}</p>
        </div>
    );
}

export default Chat;