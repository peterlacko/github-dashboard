interface MoonIconProps {
  className?: string;
}

export default function MoonIcon({ className = "" }: MoonIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.5136 10.3209C19.2927 15.7102 14.7591 19.9999 9.24565 19.7942C3.64039 19.5848 -0.516832 14.6854 0.0703263 9.11802C0.47423 5.0334 3.50501 1.6394 7.48972 0.609863C4.29349 2.81018 3.03555 7.05939 4.52702 10.5334C6.01849 14.0074 9.68866 15.9961 13.4957 15.2969C14.9785 14.999 16.2988 14.2698 17.3228 13.2458C17.0844 11.8995 17.3228 10.5334 19.5136 10.3209Z"
        fill="currentColor"
      />
    </svg>
  );
}
