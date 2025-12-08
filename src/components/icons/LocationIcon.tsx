interface LocationIconProps {
  className?: string;
}

export default function LocationIcon({ className = "" }: LocationIconProps) {
  return (
    <svg
      width="14"
      height="20"
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.99999 0C3.13399 0 0 3.13398 0 7C0 12.25 6.99999 20 6.99999 20C6.99999 20 14 12.25 14 7C14 3.13398 10.866 0 6.99999 0ZM6.99999 9.5C5.61928 9.5 4.5 8.38069 4.5 6.99999C4.5 5.61928 5.61928 4.5 6.99999 4.5C8.38069 4.5 9.5 5.61928 9.5 6.99999C9.5 8.38069 8.38069 9.5 6.99999 9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
