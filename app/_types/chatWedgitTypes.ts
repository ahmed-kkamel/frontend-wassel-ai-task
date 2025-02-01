export interface Message {
  text: string;
  user: boolean;
}
export interface ChatButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
