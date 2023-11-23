import { FC } from "react";
import clsx from "clsx";

interface Props {
  label: string;
  onClick: () => Promise<void>;
  className?: string;
  disabled?: boolean;
}
export const Button: FC<Props> = ({
  label,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        className,
        "rounded-md shadow-sm bg-green-500 text-white p-4 uppercase text-xl hover:shadow-md hover:bg-green-600 active:bg-green-600",
        "disabled:cursor-progress",
      )}
    >
      {label}
    </button>
  );
};
