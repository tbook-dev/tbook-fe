import homeBanner from '@/images/home-banner.png';
import homeBannerMoble from '@/images/home-banner-moble.png';
import tipImg from '@/images/tip.svg';

const pageConf = {
  title: [
    'Discover, participate,',
    'and promote',
    'authentic web3 opportunities',
  ],
  pic: homeBanner,
  picMoble: homeBannerMoble,
  tip: [
    `For any inquiries or feedbacks of TBook products, please don't hesitate to reach out to us via Telegram: `,
    `https://t.me/tbookincentive`,
  ],
  tipImg,
  contacts: [
    {
      name: 'Telegram Mini App',
      linkText: '@tbook_incentive_bot',
      url: 'https://t.me/tbook_incentive_bot',
      svg: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3.32723 10.8879C8.50982 8.62993 11.9657 7.14134 13.6948 6.42212C18.6319 4.36862 19.6578 4.0119 20.3265 4.00013C20.4735 3.99753 20.8024 4.03398 21.0154 4.20682C21.1952 4.35275 21.2447 4.5499 21.2684 4.68826C21.2921 4.82663 21.3215 5.14183 21.2981 5.38811C21.0306 8.1992 19.8729 15.021 19.284 18.1694C19.0348 19.5017 18.5441 19.9484 18.069 19.9921C17.0366 20.0871 16.2527 19.3098 15.2528 18.6543C13.6881 17.6287 12.8041 16.9902 11.2853 15.9893C9.53012 14.8327 10.668 14.1969 11.6683 13.158C11.93 12.8861 16.4788 8.74868 16.5668 8.37335C16.5778 8.32641 16.588 8.15143 16.4841 8.05904C16.3801 7.96664 16.2267 7.99824 16.116 8.02337C15.9591 8.05898 13.4595 9.71112 8.61724 12.9798C7.90773 13.467 7.26509 13.7044 6.6893 13.6919C6.05454 13.6782 4.83352 13.333 3.92582 13.038C2.81248 12.6761 1.92763 12.4847 2.00468 11.8701C2.04481 11.55 2.48566 11.2226 3.32723 10.8879Z'
            className='fill-white opacity-60 group-hover:opacity-100'
          />
        </svg>
      ),
    },
    {
      name: 'Telegram Channel',
      linkText: 'https://t.me/tbookincentive',
      url: 'https://t.me/tbookincentive',
      svg: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3.32723 10.8879C8.50982 8.62993 11.9657 7.14134 13.6948 6.42212C18.6319 4.36862 19.6578 4.0119 20.3265 4.00013C20.4735 3.99753 20.8024 4.03398 21.0154 4.20682C21.1952 4.35275 21.2447 4.5499 21.2684 4.68826C21.2921 4.82663 21.3215 5.14183 21.2981 5.38811C21.0306 8.1992 19.8729 15.021 19.284 18.1694C19.0348 19.5017 18.5441 19.9484 18.069 19.9921C17.0366 20.0871 16.2527 19.3098 15.2528 18.6543C13.6881 17.6287 12.8041 16.9902 11.2853 15.9893C9.53012 14.8327 10.668 14.1969 11.6683 13.158C11.93 12.8861 16.4788 8.74868 16.5668 8.37335C16.5778 8.32641 16.588 8.15143 16.4841 8.05904C16.3801 7.96664 16.2267 7.99824 16.116 8.02337C15.9591 8.05898 13.4595 9.71112 8.61724 12.9798C7.90773 13.467 7.26509 13.7044 6.6893 13.6919C6.05454 13.6782 4.83352 13.333 3.92582 13.038C2.81248 12.6761 1.92763 12.4847 2.00468 11.8701C2.04481 11.55 2.48566 11.2226 3.32723 10.8879Z'
            className='fill-white opacity-60 group-hover:opacity-100'
          />
        </svg>
      ),
    },
    {
      name: 'X',
      linkText: '@realtbook',
      url: 'https://twitter.com/realtbook',
      svg: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M17.6375 3.6001H20.4875L14.2612 10.7164L21.586 20.4001H15.8507L11.3586 14.527L6.21871 20.4001H3.36702L10.0267 12.7884L3 3.6001H8.88086L12.9413 8.96834L17.6375 3.6001ZM16.6373 18.6943H18.2165L8.02277 5.21634H6.32812L16.6373 18.6943Z'
            className='fill-white opacity-60 group-hover:opacity-100'
          />
        </svg>
      ),
    },
    {
      name: 'Medium',
      linkText: '@tbookcommunity',
      url: 'https://medium.com/@tbookcommunity',
      svg: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='group'
        >
          <path
            d='M13.5068 11.7928C13.5068 14.9921 10.9309 17.5857 7.7533 17.5857C4.57569 17.5857 2 14.9928 2 11.7928C2 8.59269 4.57589 6 7.7533 6C10.9307 6 13.5068 8.59347 13.5068 11.7928ZM19.8184 11.7928C19.8184 14.8045 18.5304 17.2458 16.9417 17.2458C15.353 17.2458 14.065 14.8037 14.065 11.7928C14.065 8.7818 15.353 6.33974 16.9417 6.33974C18.5304 6.33974 19.8184 8.7818 19.8184 11.7928ZM22.4 11.7928C22.4 14.4911 21.947 16.6784 21.3882 16.6784C20.8295 16.6784 20.3764 14.4904 20.3764 11.7928C20.3764 9.09517 20.8295 6.90708 21.3884 6.90708C21.9473 6.90708 22.4 9.09458 22.4 11.7928Z'
            className='fill-white opacity-60 group-hover:opacity-100'
          />
        </svg>
      ),
    },
  ],
};

export default pageConf;
