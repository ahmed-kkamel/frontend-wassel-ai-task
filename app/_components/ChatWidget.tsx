import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
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

    // const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

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

    // useEffect(() => {
    //     if (transcript) setInput(transcript);
    // }, [transcript]);

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

    // const startListening = useCallback(() => {
    //     if (browserSupportsSpeechRecognition) {
    //         resetTranscript();
    //         SpeechRecognition.startListening({ continuous: true, language: i18n.language });
    //     }
    // }, [browserSupportsSpeechRecognition, i18n.language, resetTranscript]);

    // const stopListening = useCallback(() => {
    //     SpeechRecognition.stopListening();
    //     setInput(transcript);
    // }, [transcript]);

    return (
        <>
            <ChatButton isOpen={isOpen} setIsOpen={setIsOpen} />
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-20 md:bottom-24 md:end-6 w-96 h-[550px] rounded-xl flex flex-col overflow-hidden outline outline-[#FFFFFF]"
                >
                    {/* chat header */}
                    <div className="bg-gradient-to-r from-[#0C4A4D] to-[#083032] relative">
                        <div className="bg-[url(/header-background.png)] bg-no-repeat bg-left bg-contain flex flex-col gap-2 items-center">
                            <Image src="/chat-icon.svg" alt="chat icon" width={66} height={66} className="outline outline-white rounded-full mt-3" />
                            <Image src="/header-icon.svg" alt="chat icon" width={24} height={24} className=" absolute end-[154px] bottom-10" />
                            <p className="font-semibold text-base mb-3">Welcome to GIVA</p>
                        </div>
                        <div className="flex gap-1 absolute start-[135px] bottom-[-12px]">
                            <button className="text-[#083032] text-[8px] bg-white border border-[#F5F5F5] rounded-full px-2 py-1">En</button>
                            <button className="text-[8px] bg-white border border-[#F5F5F5] rounded-full px-2 py-1"><Image src="/refresh.svg" alt="chat icon" width={9} height={9} /></button>
                            <button className="text-[8px] bg-white border border-[#F5F5F5] rounded-full px-2 py-1"><Image src="/close.svg" alt="chat icon" width={9} height={9} /></button>
                            <button className="text-[8px] bg-white border border-[#F5F5F5] rounded-full px-2 py-1"><Image src="/star.svg" alt="chat icon" width={9} height={9} /></button>
                        </div>
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-[#EFF1F1]">
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
                    {/* chat input */}
                    <div className="p-3 flex items-center bg-[#EFF1F1] relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t("chat.placeholder")}
                            className="flex-1 p-3 border-[.5px] border-[#E4E7E7] focus:outline-none bg-[#FFFFFF] rounded-2xl text-[#A0A0A0] placeholder:text-[#A0A0A0]"
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="absolute end-7 " onClick={() => sendMessage()}>
                            <Image src="/send.svg" alt="chat icon" width={24} height={24} />
                        </button>
                    </div>
                </motion.div>
            )}
        </>
    );
}
