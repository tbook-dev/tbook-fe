import React from 'react';

const HomeIcon = ({ color = 'white' }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5612 5.0412C13.9825 4.74478 14.4849 4.5857 15 4.5857C15.5151 4.5857 16.0175 4.74478 16.4387 5.0412L23.9387 10.3187C24.2667 10.5495 24.5343 10.8557 24.719 11.2117C24.9037 11.5676 25.0001 11.9627 25 12.3637V22.4999C25 23.163 24.7366 23.7989 24.2678 24.2677C23.7989 24.7366 23.163 24.9999 22.5 24.9999H20V17.4999C20 16.5054 19.6049 15.5516 18.9017 14.8483C18.1984 14.145 17.2446 13.7499 16.25 13.7499H13.75C12.7554 13.7499 11.8016 14.145 11.0983 14.8483C10.3951 15.5516 10 16.5054 10 17.4999V24.9999H7.5C6.83696 24.9999 6.20107 24.7366 5.73223 24.2677C5.26339 23.7989 5 23.163 5 22.4999V12.3624C5.00012 11.9617 5.0966 11.5668 5.28129 11.2111C5.46599 10.8554 5.73349 10.5493 6.06125 10.3187L13.5612 5.0412ZM12.5 24.9999V17.4999C12.5 17.1684 12.6317 16.8505 12.8661 16.6161C13.1005 16.3816 13.4185 16.2499 13.75 16.2499H16.25C16.5815 16.2499 16.8995 16.3816 17.1339 16.6161C17.3683 16.8505 17.5 17.1684 17.5 17.4999V24.9999H12.5ZM17.8775 2.9962C17.0351 2.40337 16.0301 2.08521 15 2.08521C13.9699 2.08521 12.9649 2.40337 12.1225 2.9962L4.6225 8.2737C3.96664 8.73524 3.43142 9.34777 3.06201 10.0596C2.6926 10.7715 2.49984 11.5617 2.5 12.3637V22.4999C2.5 23.826 3.02678 25.0978 3.96447 26.0355C4.90215 26.9732 6.17392 27.4999 7.5 27.4999H22.5C23.8261 27.4999 25.0979 26.9732 26.0355 26.0355C26.9732 25.0978 27.5 23.826 27.5 22.4999V12.3624C27.4998 11.5609 27.3068 10.7711 26.9374 10.0598C26.568 9.34838 26.033 8.73625 25.3775 8.27495L17.8775 2.9962Z" fill={color} />
    </svg>
  );
};

export default HomeIcon;
