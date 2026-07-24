import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement>;

export function OpenAILogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="14" fill="#10A37F" />
      <path d="M10 16a6 6 0 0112 0" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" fill="white" />
    </svg>
  );
}

export function AnthropicLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="14" fill="#D97757" />
      <path
        d="M12 22l4-12 4 12"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DeepSeekLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="14" fill="#4F46E5" />
      <path d="M8 16h16M16 8v16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function GoogleAILogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="16" cy="16" r="14" fill="#4285F4" />
      <path d="M10 14h12l-6 8z" fill="white" />
    </svg>
  );
}
