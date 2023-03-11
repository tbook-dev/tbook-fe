import { useState } from "react";
import { Input, Form } from "antd";
import DarkProvider from "@/theme/DarkProvider";
import { Button } from "@tbook/ui";
import { useResponsive } from "ahooks";
import { postSubscrible } from '@/api/incentive';


export default function Subscribe() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { pc } = useResponsive();
  const handleSumbit = () => {
    form.validateFields().then((values) => {
      console.log(values);
      postSubscrible(values).then(res => {

        console.log(res);
      })
    });
  };
  return (
    <div
      className="bx bg-[rgb(25,25,25)] px-8 py-10 lg:py-20 lg:mb-[144px] mb-10"
      style={{ borderRadius: pc ? "129px 20px 20px  20px" : "40px 6px 6px 6px" }}
    >
      <div className="lg:w-[990px] text-center mx-auto mb-5 lg:mb-20">
        <p className="font-medium text-white text-c11 lg:text-cwh5">
          Subscribe to get more information, latest news and other interesting offers
        </p>
      </div>

      <DarkProvider>
        <div className="flex flex-col items-center justify-center lg:flex-row">
          <Form form={form} layout={pc ? "inline" : "horizontal"}>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input the Email Address!",
                },
              ]}
            >
              <Input
                placeholder="Email address"
                type="email"
                style={pc ? { width: 366, height: 64 } : { width: "80vw", height: 40 }}
              />
            </Form.Item>
          </Form>

          <Button
            className="mt-5 lg:mt-0 h-10 w-[80vw] lg:h-16 lg:w-[180px] px-8 lg:ml-4 lg:bg-white lg:bg-none"
            loading={loading}
            loadingColor={pc ? "#69D0E5" : "white"}
            onClick={handleSumbit}
          >
            Subscribe
          </Button>
        </div>
      </DarkProvider>
    </div>
  );
}
