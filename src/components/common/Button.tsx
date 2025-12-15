/* eslint-disable @typescript-eslint/no-explicit-any */
import { type LucideIcon } from "lucide-react";

interface Button {
  disabled: boolean;
  process: boolean;
  text: string;
  click?: () => any;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  icon: LucideIcon;
}

function Button({ disabled, process, text, type, icon, click }: Button) {
  const Icon = icon;
  return (
    <button
      onClick={click}
      type={type}
      className="base-btn flex items-center justify-center"
      disabled={disabled}
    >
      {process ? (
        <Icon size={30} strokeWidth={3} className="animate-spin" />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}

export default Button;
