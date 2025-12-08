interface SearchIconProps {
  className?: string;
}

export default function SearchIcon({ className = "" }: SearchIconProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6087 0C16.2775 0 20.8696 4.59214 20.8696 10.2609C20.8696 13.087 19.7674 15.6522 17.9579 17.5427L24.3478 23.9326L21.9131 24.3478L15.5145 17.9492C13.6332 19.4224 11.235 20.3217 8.60871 20.3217C2.93995 20.3217 0 15.7296 0 10.0609C0 4.39214 4.93995 0 10.6087 0ZM10.6087 3.13043C6.66826 3.13043 3.47826 6.32043 3.47826 10.2609C3.47826 14.2013 6.66826 17.3913 10.6087 17.3913C14.5491 17.3913 17.7391 14.2013 17.7391 10.2609C17.7391 6.32043 14.5491 3.13043 10.6087 3.13043Z"
        fill="currentColor"
      />
    </svg>
  );
}
