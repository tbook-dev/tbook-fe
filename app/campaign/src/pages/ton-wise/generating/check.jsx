import { motion } from 'framer-motion';
import { random } from 'lodash';

export default function Check({ title }) {
  const duration = random(1, 3, true);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base">{title}</h2>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M7.5 10.625L9.375 12.5L12.5 8.125M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z"
            stroke="#904BF6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{
              opacity: 0,
              pathLength: 0,
            }}
            animate={{
              opacity: 1,
              pathLength: 1,
            }}
            transition={{ ease: 'easeOut', duration }}
          />
        </svg>
      </div>

      <div className="relative w-full h-1 rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#904BF6] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ ease: 'easeOut', duration }}
        />
      </div>
    </div>
  );
}
