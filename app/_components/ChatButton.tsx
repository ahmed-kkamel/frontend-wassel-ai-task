import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { ChatButtonProps } from "../_types/chatWedgitTypes";

const ChatButton = ({ isOpen, setIsOpen }: ChatButtonProps) => {
    return (
        <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`fixed bottom-6 end-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all`}
            whileTap={{ scale: 0.9 }}
        >
            <MessageCircle size={28} />
        </motion.button>
    )
}

export default ChatButton