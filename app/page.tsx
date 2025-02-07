"use client"
import { useTranslation } from "react-i18next";
import "./i18n";
import ChatArea from "./_components/ChatArea";
import LanguageButton from "./_components/LanguageButton";

export default function ChatWidget() {
  const { t } = useTranslation();
  console.log("hello");

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-blue-600 to-purple-800 flex flex-col items-center justify-center text-white text-center p-6">
      <h1 className="text-3xl font-bold mb-4">{t("project.title")}</h1>
      <p className="text-lg max-w-xl">{t("project.description")}</p>

      <LanguageButton />
      <ChatArea />
    </div>
  );
}
