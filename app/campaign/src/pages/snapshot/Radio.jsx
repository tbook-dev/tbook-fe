export default function Radio({ disabled = false, checked }) {
  if (disabled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <circle
          cx="11"
          cy="11"
          r="10"
          fill="white"
          stroke="#A1A1A2"
          stroke-width="2"
        />
      </svg>
    );
  }
  if (checked) {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="11"
          cy="11"
          r="10"
          fill="white"
          stroke="#006EE9"
          stroke-width="2"
        />
        <circle cx="11" cy="11" r="8" fill="#006EE9" />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <circle
          cx="11"
          cy="11"
          r="10"
          fill="white"
          stroke="#006EE9"
          stroke-width="2"
        />
        <circle cx="11" cy="11" r="8" fill="white" />
      </svg>
    );
  }
}
