import grante403 from "@/images/incentive/grantee403.png";

export default function () {
  return (
    <div
      className="absolute inset-0 flex items-center bg-center bg-cover"
      style={{ backgroundImage: `url(${grante403})` }}
    >
      <div className="lg:w-[700px] lg:ml-[120px]">
        <span className="py-px px-4 mb-1 border border-[#69D0E5] rounded text-c5 text-colorful1">
          Error
        </span>
        <h2 className="font-extrabold text-white text-cwh4 lg:mb-6">
          <span className="mr-4 text-colorful1">Switch</span>
          to another address to check your access.
        </h2>
      </div>
    </div>
  );
}
