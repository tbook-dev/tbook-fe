import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function CampaignSwiper({ listData = [], ItemComponent }) {
  return (
    <div>
      <Swiper slidesPerView={1.1}  spaceBetween={10}>
        {listData.map((campaign) => {
          return (
            <SwiperSlide key={campaign.campaignId}>
              <div style={{ padding: "4px 4px" }}>
                <ItemComponent {...campaign} inSwiper />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
