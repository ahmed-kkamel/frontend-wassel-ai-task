import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { X, Mic, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import ChatButton from "./ChatButton";
import { Message } from "../_types/chatWedgitTypes";

const CHAT_HISTORY_KEY = "chat_history";

export default function ChatWidget() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const messageOptions = useMemo(() => [
        t("chat.options.services"),
        t("chat.options.contact"),
        t("chat.options.pricing"),
        t("chat.options.guidance"),
    ], [t]);

    useEffect(() => {
        const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            setMessages([{ text: t("chat.welcome"), user: false }]);
        }
    }, [t]);

    useEffect(() => {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        if (transcript) setInput(transcript);
    }, [transcript]);

    const sendMessage = useCallback((message?: string) => {
        const userMessage = message || input.trim();
        if (!userMessage) return;

        setMessages((prev) => [...prev, { text: userMessage, user: true }]);
        setInput("");

        if (!showOptions) {
            setShowOptions(true);
            return;
        }

        setTimeout(() => {
            let botResponse = t("chat.responses.defaultResponse");

            if (userMessage.includes(t("chat.options.services"))) {
                botResponse = t("chat.responses.services");
            } else if (userMessage.includes(t("chat.options.contact"))) {
                botResponse = t("chat.responses.contact");
            } else if (userMessage.includes(t("chat.options.pricing"))) {
                botResponse = t("chat.responses.pricing");
            } else if (userMessage.includes(t("chat.options.guidance"))) {
                botResponse = t("chat.responses.guidance");
            }

            setMessages((prev) => [...prev, { text: botResponse, user: false }]);

            setTimeout(() => {
                setMessages((prev) => [...prev, { text: t("chat.responses.assistance"), user: false }]);
            }, 1000);
        }, 1000);
    }, [input, showOptions, t]);

    const startListening = useCallback(() => {
        if (browserSupportsSpeechRecognition) {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true, language: i18n.language });
        }
    }, [browserSupportsSpeechRecognition, i18n.language, resetTranscript]);

    const stopListening = useCallback(() => {
        SpeechRecognition.stopListening();
        setInput(transcript);
    }, [transcript]);

    return (
        <>
            <ChatButton isOpen={isOpen} setIsOpen={setIsOpen} />
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-20 md:bottom-24 md:end-6 w-96 h-[500px] bg-white shadow-2xl rounded-lg flex flex-col overflow-hidden"
                >
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold flex justify-between items-center">
                        <span>{t("chat.title")}</span>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 my-1 rounded-lg ${msg.user ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800 mr-auto"} max-w-[80%]`}>
                                {msg.text}
                            </div>
                        ))}
                        {showOptions && (
                            <div className="mt-2">
                                {messageOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            sendMessage(option);
                                            setShowOptions(false);
                                        }}
                                        className="block w-full text-left bg-gray-200 text-gray-800 p-2 my-1 rounded-lg hover:bg-gray-300"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="p-3 border-t flex bg-white">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t("chat.placeholder")}
                            className="flex-1 p-3 border rounded-l-lg text-gray-800 focus:outline-none"
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-r-lg" onClick={() => sendMessage()}>
                            <Send size={20} />
                        </button>
                        <button onClick={listening ? stopListening : startListening} className="ml-2 p-3 bg-blue-500 text-white rounded-full">
                            {listening ? "Stop" : <Mic size={24} />}
                        </button>
                    </div>
                </motion.div>
            )}
        </>
    );
}
