import { Modal } from 'antd';
import sucessIcon from '@/images/icon/sucess.svg';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import ShareLink from '../info/shareLink';

const sucessText = 'Successfully released!';
const desc = `Share the campaign with your community and motivate them to actively participate!`;
export default function sucessModal({
  open,
  setOpen,
  shareLink,
  TMALink,
  jumpLink,
  TMAshareLink,
  hideShare = false,
}) {
  const navigate = useNavigate();
  const links = useMemo(() => {
    return [
      {
        type: 'telegram',
        pic: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#A1A1A2] group-hover:fill-white"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.23741 11.4217C9.06923 9.31657 12.2912 7.92873 13.9033 7.25819C18.5063 5.34367 19.4627 5.0111 20.0861 5.00012C20.2232 4.9977 20.5298 5.03168 20.7284 5.19282C20.8961 5.32888 20.9422 5.51268 20.9643 5.64168C20.9864 5.77068 21.0139 6.06455 20.992 6.29416C20.7426 8.91499 19.6633 15.2751 19.1142 18.2104C18.8818 19.4525 18.4244 19.869 17.9815 19.9097C17.0189 19.9983 16.288 19.2736 15.3558 18.6625C13.897 17.7063 13.0729 17.111 11.6569 16.1779C10.0205 15.0995 11.0813 14.5068 12.0139 13.5382C12.258 13.2847 16.4988 9.42728 16.5809 9.07735C16.5912 9.03359 16.6007 8.87046 16.5038 8.78432C16.4069 8.69818 16.2639 8.72764 16.1606 8.75106C16.0143 8.78427 13.6839 10.3246 9.16938 13.372C8.5079 13.8262 7.90875 14.0476 7.37193 14.036C6.78013 14.0232 5.64175 13.7013 4.79548 13.4263C3.75749 13.0888 2.93252 12.9105 3.00436 12.3374C3.04178 12.039 3.45279 11.7337 4.23741 11.4217Z"
            />
          </svg>
        ),
        displayLink: TMALink,
        jumpLink: TMAshareLink,
      },
      {
        type: 'twitter',
        pic: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#A1A1A2] group-hover:fill-white"
          >
            <path d="M16.4332 5H18.854L13.5653 11.0446L19.787 19.27H14.9155L11.0999 14.2814L6.73399 19.27H4.31174L9.96852 12.8046L4 5H8.99523L12.4442 9.55981L16.4332 5ZM15.5836 17.821H16.925L8.26636 6.37285H6.82692L15.5836 17.821Z" />
          </svg>
        ),
        displayLink: shareLink,
        jumpLink: `https://twitter.com/intent/tweet?text=${shareLink}`,
      },
      {
        type: 'web',
        pic: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#A1A1A2] group-hover:fill-white"
          >
            <path d="M13.9849 10.1651C13.8623 10.0425 13.7317 9.93211 13.5971 9.82971L13.5969 9.82993C13.4583 9.69669 13.2702 9.61462 13.0628 9.61462C12.6371 9.61462 12.2921 9.95969 12.2921 10.3853C12.2921 10.5737 12.3598 10.7462 12.472 10.8801C12.472 10.8801 12.472 10.8801 12.4721 10.8801C12.526 10.9444 12.5901 10.9999 12.6622 11.0438C12.7348 11.1037 12.8062 11.1627 12.8729 11.2294L12.9364 11.293C13.7352 12.0908 13.4967 13.4653 12.6979 14.2641L9.28939 17.6716C8.49063 18.4694 7.19204 18.4694 6.39324 17.6716L6.32919 17.6075C5.53038 16.8087 5.53038 15.5092 6.32919 14.7124L7.83506 13.207C8.02827 13.0537 8.15231 12.817 8.15231 12.5512C8.15231 12.0888 7.77753 11.7141 7.31522 11.7141C7.14076 11.7141 6.97882 11.7675 6.84472 11.8588C6.84429 11.8579 6.84385 11.857 6.8434 11.8561L6.82735 11.8711C6.76807 11.9137 6.71448 11.9637 6.66819 12.0201L5.10327 13.4844C3.63224 14.9565 3.63224 17.364 5.10327 18.834L5.16681 18.8975C6.63783 20.3675 9.04433 20.3675 10.5154 18.8975L13.9229 15.4889C15.3919 14.018 15.5164 11.6976 14.0475 10.2276L13.9849 10.1651Z" />
            <path d="M18.8988 5.16681L18.8352 5.10327C17.3642 3.63224 14.9577 3.63224 13.4867 5.10327L10.0792 8.5118C8.60815 9.98282 8.52715 12.1071 9.99817 13.579L10.0607 13.6406C10.1275 13.7074 10.1968 13.7704 10.2676 13.8308C10.3189 13.888 10.3791 13.937 10.446 13.9757C10.4465 13.9761 10.447 13.9765 10.4475 13.9769L10.4477 13.9767C10.5544 14.0381 10.6779 14.0733 10.8098 14.0733C11.2116 14.0733 11.5374 13.7476 11.5374 13.3458C11.5374 13.2323 11.5114 13.125 11.4651 13.0293C11.3689 12.8133 11.1888 12.6818 11.0643 12.5573L11.0018 12.4957C10.203 11.697 10.5063 10.5365 11.3051 9.73776L14.7146 6.33021C15.5114 5.53141 16.8105 5.53141 17.6093 6.33021L17.6728 6.39273C18.4716 7.19155 18.4716 8.4916 17.6728 9.28939L16.1719 10.7913C15.9677 10.9426 15.8353 11.1853 15.8353 11.4589C15.8353 11.9175 16.207 12.2892 16.6656 12.2892C16.8252 12.2892 16.9743 12.2441 17.1008 12.1661C17.1018 12.1677 17.1027 12.1692 17.1036 12.1708L17.1269 12.1493C17.1986 12.1013 17.2623 12.0424 17.3159 11.975L18.8977 10.5154C20.3698 9.04435 20.3698 6.63781 18.8988 5.16681Z" />
          </svg>
        ),
        displayLink: shareLink,
        jumpLink: shareLink,
      },
    ];
  }, [shareLink, TMALink, jumpLink, TMAshareLink]);
  return (
    <Modal
      centered
      width={580}
      footer={null}
      open={open}
      maskClosable={false}
      onCancel={() => {
        setOpen(null);
        navigate(jumpLink);
      }}
    >
      <div className="flex flex-col gap-y-6 my-6 mx-1">
        <div className="flex items-center gap-x-4 mb-10">
          <img src={sucessIcon} className="size-10" />
          <div className="sapce-y-2">
            <p className="font-medium text-lg text-white">{sucessText}</p>
            <p className="text-sm text-[#A1A1A2]">{desc}</p>
          </div>
        </div>
        {!hideShare && (
          <ShareLink
            shareLink={shareLink}
            TMALink={TMALink}
            jumpLink={jumpLink}
            TMAshareLink={TMAshareLink}
          />
        )}
      </div>
    </Modal>
  );
}
