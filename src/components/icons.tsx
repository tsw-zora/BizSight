import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12h3M7 12h2M12 3v3M12 7v2" />
      <path d="M12 12L7 7" />
      <path d="M12 12l5 5" />
      <path d="M21 12h-3M17 12h-2M12 21v-3M12 17v-2" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
