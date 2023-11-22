import { FC } from "react";

interface Props {
  label: string;
  onClick: () => Promise<void>;
}
export const Button: FC<Props> = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md shadow-sm bg-green-500 text-white p-4 uppercase text-xl hover:shadow-md hover:bg-green-600 active:bg-green-600"
    >
      {label}
    </button>
  );
};
