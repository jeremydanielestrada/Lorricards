import { type LucideIcon } from "lucide-react";

interface Button {
  disabled: boolean;
  process: boolean;
  text: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  icon: LucideIcon;
}

function Button({ disabled, process, text, type, icon }: Button) {
  const Icon = icon;
  return (
    <button
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
