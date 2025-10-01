export default function TickAnimation() {
  return (
    <>
      <style>
        {`
          @keyframes pulseTick {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <div className="flex  rounded-full items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16    rounded-full text-blue-600 animate-[pulseTick_1s_ease-in-out_infinite]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </>
  );
}
