import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      project: {
        title: "Welcome to Our Project",
        description:
          "This project demonstrates a chatbot with multilingual support.",
      },
      chat: {
        title: "Chatbot",
        welcome: "Hello! Please type your message to start the conversation.",
        options: {
          services: "What services do you offer?",
          contact: "How can I contact support?",
          pricing: "Tell me about pricing.",
          guidance: "Can you guide me?",
        },
        responses: {
          services:
            "We offer a range of services including tech support and consultation. What specific service are you interested in?",
          contact:
            "You can reach support via email or phone. Would you like me to provide contact details?",
          pricing:
            "Our pricing varies based on the plan you choose. Would you like to see a pricing table?",
          guidance:
            "Sure, I can guide you. What specific information or assistance do you need?",
          defaultResponse: "I'm only a chat bot simulation.",
          assistance:
            "I'm glad to help! Is there anything else I can assist you with?",
        },
        placeholder: "Type a message...",
        send: "Send",
      },
    },
  },
  ar: {
    translation: {
      project: {
        title: "مرحبًا في مشروعنا",
        description: "يُظهر هذا المشروع روبوت دردشة بدعم متعدد اللغات.",
      },
      chat: {
        title: "الدردشة",
        welcome: "مرحبًا! الرجاء كتابة رسالتك لبدء المحادثة.",
        options: {
          services: "ما هي الخدمات التي تقدمها؟",
          contact: "كيف يمكنني التواصل مع الدعم؟",
          pricing: "أخبرني عن الأسعار.",
          guidance: "هل يمكنك إرشادي؟",
        },
        responses: {
          services:
            "نحن نقدم مجموعة من الخدمات بما في ذلك الدعم الفني والاستشارات. ما هي الخدمة التي تهمك؟",
          contact:
            "يمكنك التواصل مع الدعم عبر البريد الإلكتروني أو الهاتف. هل تريد التفاصيل؟",
          pricing:
            "تختلف أسعارنا حسب الخطة التي تختارها. هل ترغب في رؤية جدول الأسعار؟",
          guidance:
            "بالطبع، يمكنني إرشادك. ما هي المعلومات أو المساعدة التي تحتاجها؟",
          defaultResponse: "أنا فقط محاكاة لروبوت دردشة.",
          assistance: "أنا سعيد بمساعدتك! هل هناك شيء آخر يمكنني مساعدتك به؟",
        },
        placeholder: "اكتب رسالة...",
        send: "إرسال",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
