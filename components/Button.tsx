"use client";
import { HTMLAttributes, useRef } from "react";
export default function Button({ className = "", children, ...props }: HTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  const createRipple = (event: any) => {
    const button = ref.current; if (!button) return;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.getBoundingClientRect().left + radius)}px`;
    circle.style.top = `${event.clientY - (button.getBoundingClientRect().top + radius)}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0]; if (ripple) ripple.remove();
    button.appendChild(circle);
  };
  return <button ref={ref} onClick={createRipple} className={"btn " + className} {...props}>{children}</button>;
}
