import { ChildrenType } from "../types";

type Props = {
  children: ChildrenType;
};

export default function Header({ children }: Props) {
  return (
    <header className="w-full max-w-5xl px-3 pt-7 pb-5 justify-start items-start gap-3.5 inline-flex">
      {children}
    </header>
  );
}
