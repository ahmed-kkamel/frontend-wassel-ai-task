import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "regenerator-runtime/runtime";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import ChatButton from "./ChatButton";
import { Message } from "../_types/chatWedgitTypes";

export default function ChatWidget() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [showOptions, setShowOptions] = useState(true);
    const [showSecondryOptions, setShowSecondryOptions] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showAssistanceForm, setShowAssistanceForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const feedbackContainerRef = useRef<HTMLDivElement>(null);

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
    const isArabic = i18n.language === "ar";

    // const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const messageOptions = useMemo(() => [
        t("chat.options.services"),
        t("chat.options.contact"),
        t("chat.options.pricing"),
        t("chat.options.guidance"),
    ], [t]);

    const secondryOptions = ["What is GAMI?", "Key initiatives?", "Partnership process?"]


    const sendMessage = useCallback((message?: string) => {
        const userMessage = message || input.trim();
        if (!userMessage) return;

        if (userMessage.includes(t("chat.options.pricing"))) {
            setShowAssistanceForm(true);
            setShowOptions(false);
            setShowSecondryOptions(false);
            setShowFeedback(false);
            setInput("");
            return;
        }

        setMessages((prev) => [...prev, { text: userMessage, user: true }]);
        setInput("");
        setShowOptions(false);
        setShowSecondryOptions(true);
        setShowFeedback(false);
        setShowAssistanceForm(false);

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

        }, 1000);
    }, [input, t]);

    const handleCloseAssistanceForm = () => {
        setShowAssistanceForm(false);
        setShowOptions(true)
    }
    const handleFeedback = () => {
        setShowFeedback(true);
        setShowOptions(false);
        setShowSecondryOptions(false);
        setShowAssistanceForm(false);
    }
    const handleReset = () => {
        setMessages([]);
        setInput("");
        setShowOptions(true);
        setShowSecondryOptions(false);
        setShowAssistanceForm(false);
        setShowFeedback(false)
    }
    const switchLanguage = () => {
        i18n.changeLanguage(isArabic ? "en" : "ar");
    };

    const scrollChatToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    const scrollFeedbackToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollChatToBottom();
        scrollFeedbackToBottom();
    }, [messages, showFeedback]);

    return (
        <>
            <ChatButton isOpen={isOpen} setIsOpen={setIsOpen} />
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-20 md:bottom-20 md:end-6 w-96 h-[550px] rounded-xl flex flex-col overflow-hidden outline outline-[#FFFFFF]"
                >
                    {/* chat header */}
                    <div className="bg-gradient-to-r from-[#0C4A4D] to-[#083032] relative">
                        <div className="bg-[url(/header-background.png)] bg-no-repeat bg-left bg-contain flex flex-col gap-2 items-center">
                            <Image src="/chat-icon.svg" alt="chat icon" width={66} height={66} className="outline outline-white rounded-full mt-3" />
                            <Image src="/header-icon.svg" alt="chat icon" width={24} height={24} className=" absolute end-[154px] bottom-10" />
                            <p className="font-semibold text-base mb-3">Welcome to GIVA</p>
                        </div>
                        <div className="flex gap-1 absolute start-[135px] bottom-[-12px]">
                            <button onClick={switchLanguage} className="text-[#FFFFFF] text-[8px] bg-[#0C4A4D] border border-[#F5F5F5] rounded-full px-2 py-1">{isArabic ? "En" : "Ar"}</button>
                            <button onClick={handleReset}
                                className="text-[8px] bg-[#0C4A4D] border border-[#F5F5F5] rounded-full px-2 py-1">
                                <Image src="/refresh.svg" alt="chat icon" width={9} height={9} />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="text-[8px] bg-[#0C4A4D] border border-[#F5F5F5] rounded-full px-2 py-1">
                                <Image src="/close-white.svg" alt="chat icon" width={9} height={9} />
                            </button>
                            <button onClick={handleFeedback} className="text-[8px] bg-[#0C4A4D] border border-[#F5F5F5] rounded-full px-2 py-1">
                                <Image src="/star-white.svg" alt="chat icon" width={9} height={9} />
                            </button>
                        </div>
                    </div>
                    {/* chat messages */}
                    <div ref={chatContainerRef} className="flex-1 p-3 overflow-auto bg-[#EFF1F1] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        {showAssistanceForm ? <>
                            <p className="text-[#3C3C3C] text-xs my-2 px-5">
                                I&apos;m sorry, but I don&apos;t have the answer to that right now. However, I can connect you with our team for further assistance.
                            </p>
                            <div className="bg-[#FFFFFF] p-2 rounded-lg flex flex-col gap-2">
                                <input type="text" placeholder="Query" className="w-full p-2 border rounded text-sm placeholder:text-sm text-[#676767] placeholder:text-[#676767] focus:outline-none" />

                                <input type="text" placeholder="Name" className="w-full p-2 border rounded text-sm placeholder:text-sm text-[#676767] placeholder:text-[#676767] focus:outline-none" />

                                <input type="text" placeholder="Company" className="w-full p-2 border rounded text-sm placeholder:text-sm text-[#676767] placeholder:text-[#676767] focus:outline-none" />

                                <input type="email" placeholder="Email" className="w-full p-2 border rounded text-sm placeholder:text-sm text-[#676767] placeholder:text-[#676767] focus:outline-none" />

                                <input type="datetime-local" className="w-full p-2 border rounded text-sm placeholder:text-sm text-[#676767] placeholder:text-[#676767] focus:outline-none" />

                                <div className="flex justify-center items-center gap-2">
                                    <button className="bg[#FFFFFF] px-3 py-1 rounded-xl border border-[#083032] text-[#083032] text-sm min-w-[70px]" onClick={handleCloseAssistanceForm}>Cancel</button>
                                    <button className="bg-gradient-to-r from-[#0C4A4D] to-[#083032] px-3 py-1 rounded-xl text-sm min-w-[70px]">Ok</button>
                                </div>
                            </div>
                        </> : <>
                            <p className="text-[#3C3C3C] text-xs my-2 px-5">I&apos;m here to help you with all your policy-related questions. Ask away!</p>
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.user ? "flex-col " : "flex-row gap-2 items-end"}`}>
                                    <div className={`text-start p-2 my-2 text-sm rounded-t-xl max-w-[80%] ${msg.user ? "bg-[#FFFFFF] text-[#000000] rounded-br-xl me-auto" : "bg-gradient-to-r from-[#0C4A4D] to-[#083032] text-[#FFFFFF] ms-auto rounded-bl-xl flex flex-col gap-2"}`}>
                                        <p>{msg.text}</p>
                                        {!msg.user && (
                                            <div className="flex items-center gap-2">
                                                <p className="text-[#FFFFFF] text-xs">{time}</p>
                                                <Image src="/thumb-up.svg" alt="chat icon" width={12} height={12} className={`${msg.user && "hidden"} cursor-pointer`} onClick={() => setShowFeedback(true)} />
                                                <Image src="/thumb-down.svg" alt="chat icon" width={12} height={12} className={`${msg.user && "hidden"} cursor-pointer`}
                                                    onClick={() => setShowFeedback(true)} />
                                            </div>
                                        )}
                                    </div>
                                    <span className={`text-[#797C7B] text-xs ${msg.user ? "me-auto" : "hidden"}`}>{time}</span>
                                    <Image src="/chat-icon.svg" alt="chat icon" width={24} height={24} className={`${msg.user && "hidden"} mb-2`} />
                                </div>
                            ))}
                        </>}
                        {showOptions && (
                            <div className="flex flex-col gap-1">
                                {messageOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => sendMessage(option)}
                                        className="text-left w-fit text-sm bg-[#FFFFFF] text-[#000000] p-2 rounded-xl my-[2px]"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                        {showFeedback && (
                            <div className="flex flex-col gap-2 items-center justify-center bg-[#FFFFFF] p-3 rounded-lg" ref={feedbackContainerRef}>
                                <Image src="/close.svg" alt="close icon" width={12} height={12} onClick={() => setShowFeedback(false)} className="cursor-pointer self-end" />
                                <p className="text-[#3C3C3C] text-base font-medium">Submit Your Feedback</p>
                                <div className="flex justify-center gap-1">
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <button
                                                key={index}
                                                className={`rounded p-1 transition duration-200 ${starValue <= (hoveredRating || rating) ? "bg-yellow-400" : "bg-[#F4F4F4]"}`}
                                                onClick={() => setRating(starValue)}
                                                onMouseEnter={() => setHoveredRating(starValue)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                            >
                                                <Image src="/star.svg" alt="star icon" width={18} height={18} />
                                            </button>
                                        );
                                    })}
                                </div>
                                <textarea className="w-full p-2 border border-[#F0F0F0] rounded-xl text-xs text-[#333333] focus:outline-none placeholder:text-[#333333] placeholder:text-xs" placeholder="Type here..."></textarea>
                                <button className="bg-gradient-to-r from-[#0C4A4D] to-[#083032] p-2 rounded-lg">Submit</button>
                            </div>
                        )}
                    </div>

                    {/* chat input */}
                    <div className="flex flex-col p-3 gap-2 bg-[#FFFFFF]">
                        {showSecondryOptions && (<div className="flex gap-1 p-1">
                            {secondryOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => sendMessage(option)}
                                    className="w-fit text-xs bg-[#EFF1F1] text-[#000000] p-2 rounded-lg"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>)}
                        <div className="flex items-center relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t("chat.placeholder")}
                                className="flex-1 p-3 border-[.5px] border-[#E4E7E7] focus:outline-none bg-[#EFF1F1] rounded-2xl text-[#A0A0A0] placeholder:text-[#A0A0A0]"
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button className="absolute end-5 " onClick={() => sendMessage()}>
                                <Image src="/send.svg" alt="chat icon" width={24} height={24} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}


        </>
    );
}
