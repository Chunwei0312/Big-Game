import type { HTMLAttributes, ReactNode } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
}

export default function Panel({ children, className = "", eyebrow, title, ...props }: PanelProps) {
  return (
    <section className={`ui-panel ${className}`.trim()} {...props}>
      {eyebrow ? <span className="ui-panel__eyebrow">{eyebrow}</span> : null}
      {title ? <h2 className="ui-panel__title">{title}</h2> : null}
      {children}
    </section>
  );
}
