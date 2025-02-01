"use client"
import { useTranslation } from "react-i18next";
import "./i18n";
import ChatWidget from "./_components/ChatWidget";
import LanguageButton from "./_components/LanguageButton";

export default function MainPage() {
  const { t } = useTranslation();
  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-blue-600 to-purple-800 flex flex-col items-center justify-center text-white text-center p-6">
      <h1 className="text-3xl font-bold mb-4">{t("project.title")}</h1>
      <p className="text-lg max-w-xl">{t("project.description")}</p>
      <LanguageButton />
      <ChatWidget />
    </div>
  );
}
