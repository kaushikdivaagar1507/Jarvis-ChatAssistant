import { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Automatically scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    // Send message
    const sendMessage = async () => {
        if (!message.trim() || loading) {
            return;
        }

        const userMessage = message.trim();

        // Add user message immediately
        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userMessage
            }
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/chat",
                {
                    message: userMessage
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: response.data.answer
                }
            ]);

        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        error.response?.data?.error ||
                        "Something went wrong. Please try again."
                }
            ]);

        } finally {
            setLoading(false);
        }
    };

    // Enter = Send
    // Shift + Enter = New line
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Clear conversation
    const clearChat = () => {
        setMessages([]);
        setMessage("");

        textareaRef.current?.focus();
    };

    // Example question
    const askExample = (text) => {
        setMessage(text);
        textareaRef.current?.focus();
    };

    return (
        <div className="app">

            {/* Background decorations */}
            <div className="background-glow glow-one"></div>
            <div className="background-glow glow-two"></div>

            {/* Header */}
            <header className="header">

                <div className="brand">

                    <div className="brand-icon">
                        ✦
                    </div>

                    <div>
                        <h1>JARVIS</h1>
                        <span>by STARK INDUSTRIES</span>
                    </div>

                </div>

                {messages.length > 0 && (
                    <button
                        className="clear-button"
                        onClick={clearChat}
                    >
                        <span>⌫</span>
                        Clear
                    </button>
                )}

            </header>

            {/* Main Chat Area */}
            <main className="chat-area">

                {messages.length === 0 ? (

                    /* Welcome Screen */
                    <section className="welcome">

                        <div className="welcome-icon">
                            ✦
                        </div>

                        <h2>
                            How can I help you
                            <span> today?</span>
                        </h2>

                        <p>
                            Ask me anything. I'm here to help you
                            learn, create, solve problems and explore ideas.
                        </p>

                        {/* Example prompts */}
                        <div className="examples">

                            <button
                                onClick={() =>
                                    askExample(
                                        "Explain JavaScript in simple words"
                                    )
                                }
                            >
                                <span>💡</span>
                                <div>
                                    <strong>Learn something</strong>
                                    <small>
                                        Explain JavaScript in simple words
                                    </small>
                                </div>
                            </button>

                            <button
                                onClick={() =>
                                    askExample(
                                        "Give me 5 project ideas for a computer science student"
                                    )
                                }
                            >
                                <span>🚀</span>
                                <div>
                                    <strong>Get ideas</strong>
                                    <small>
                                        Give me project ideas
                                    </small>
                                </div>
                            </button>

                            <button
                                onClick={() =>
                                    askExample(
                                        "Explain how REST APIs work"
                                    )
                                }
                            >
                                <span>🧠</span>
                                <div>
                                    <strong>Understand concepts</strong>
                                    <small>
                                        Explain how REST APIs work
                                    </small>
                                </div>
                            </button>

                            <button
                                onClick={() =>
                                    askExample(
                                        "Write a Java program to reverse a string"
                                    )
                                }
                            >
                                <span>💻</span>
                                <div>
                                    <strong>Write code</strong>
                                    <small>
                                        Create a Java program
                                    </small>
                                </div>
                            </button>

                        </div>

                    </section>

                ) : (

                    /* Messages */
                    <section className="messages">

                        {messages.map((msg, index) => (

                            <div
                                className={`message-row ${msg.role}`}
                                key={index}
                            >

                                <div className="avatar">

                                    {msg.role === "user"
                                        ? "U"
                                        : "✦"}

                                </div>

                                <div className="message-content">

                                    <div className="message-name">
                                        {msg.role === "user"
                                            ? "You"
                                            : "Nova AI"}
                                    </div>

                                    <div className="message-text">
                                        {msg.content}
                                    </div>

                                </div>

                            </div>

                        ))}

                        {/* Loading animation */}
                        {loading && (

                            <div className="message-row assistant">

                                <div className="avatar">
                                    ✦
                                </div>

                                <div className="message-content">

                                    <div className="message-name">
                                        Nova AI
                                    </div>

                                    <div className="typing">

                                        <span></span>
                                        <span></span>
                                        <span></span>

                                    </div>

                                </div>

                            </div>

                        )}

                        <div ref={messagesEndRef}></div>

                    </section>

                )}

            </main>

            {/* Input Area */}
            <footer className="input-area">

                <div className="input-wrapper">

                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Message Nova AI..."
                        rows="1"
                    />

                    <button
                        className="send-button"
                        onClick={sendMessage}
                        disabled={!message.trim() || loading}
                    >
                        {loading ? "..." : "↑"}
                    </button>

                </div>

                <div className="input-hint">
                    <span>Enter</span> to send ·{" "}
                    <span>Shift + Enter</span> for a new line
                </div>

                <p className="disclaimer">
                     AI can make mistakes. Check important information.
                </p>

            </footer>

        </div>
    );
}

export default App;