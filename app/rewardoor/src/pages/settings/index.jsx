import {
  Form,
  Input,
  Typography,
  Upload,
  notification,
  Radio,
  ConfigProvider,
  Popover,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import useUserInfo from "@/hooks/queries/useUserInfo";
import { projectUrlPrefix } from "@/utils/conf";
import Button from "@/components/button";
import { useState } from "react";
import xGray from "@/images/icon/x-gray.svg";
import dcGray from "@/images/icon/dc-gray.svg";
import tgGray from "@/images/icon/tg-gray.svg";
import uploadFile from "@/utils/upload";
import { LoadingOutlined } from "@ant-design/icons";
import { updateProject, getTwLoginUrl } from "@/api/incentive";
import { useRef } from "react";

const pageTitle = "Settings";
const { Paragraph } = Typography;
const FormSection = ({ title, children }) => (
  <div className="flex items-center gap-x-6 py-3 px-5 border-b border-b-1">
    <h3 className="text-base font-medium text-c-9 w-[200px]">{title}</h3>
    <div>{children}</div>
  </div>
);
const popoverMap = {
  credentialCallback: (
    <p>
      If there is a need to validate the source IP of requests, our egress IPs
      are listed below. <br /> Please configure them as needed.
    </p>
  ),
  appId: (
    <>
      <p>
        TBOOK will perform parameter and signature verification based on the
        provided appId and appKey.
      </p>
      <p>Any inconsistencies will result in a rejection of the request.</p>
    </>
  ),
  appKey: (
    <>
      <p>
        TBOOK will perform parameter and signature verification based on the
        provided appId and appKey.
      </p>
      <p>Any inconsistencies will result in a rejection of the request.</p>
    </>
  ),
};
export default function Settings() {
  const [form] = Form.useForm();
  const [formAdvance] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { project, userDc, userTwitter, userTg } = useUserInfo();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [uplading, setUploading] = useState(false);
  const avatarUrl = Form.useWatch("avatarUrl", { form, preserve: true });
  const [twCallbackUrl, setTwCallbackUrl] = useState("");
  const twLinkRef = useRef();

  const curHost = new URL(window.location.href).host;
  const dcCallbackUrl = `https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2F${curHost}%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read`;

  const tgCallbackHost = import.meta.env.VITE_TG_CALLBACK_HOST;
  const tgBotId = import.meta.env.VITE_TG_BOT_ID;
  const tgCallbackUrl = `https://oauth.telegram.org/auth?bot_id=${tgBotId}&origin=https%3A%2F%2F${tgCallbackHost}%2Ftg_callback.html&return_to=https%3A%2F%2F${tgCallbackHost}%2Ftg_callback.html`;

  const hanleUpload = ({ onSuccess, onError, file }) => {
    setUploading(true);
    uploadFile(file)
      .then((res) => {
        form.setFieldValue("avatarUrl", res);
        onSuccess(res);
      })
      .catch(onError)
      .finally(() => setUploading(false));
  };
  const handleUpdate = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const fd = { ...project, ...values, avatarUrl };
        await updateProject(fd);
        api.success({ message: "Successfully Saved！" });
      })
      .catch((e) => {
        api.error({ message: "Saved Error！" });
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const twAuth = async (evt) => {
    evt.preventDefault();
    const res = await getTwLoginUrl();
    setTwCallbackUrl(() => res["url"]);
    location.href = res["url"];
  };

  return (
    <div className="text-white relative flex flex-col justify-between min-h-full w-[880px]">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#006EE9",
          },
        }}
      >
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#C8C8C8] mb-9">
            {pageTitle}
          </h2>

          <Form
            form={form}
            layout="inline"
            initialValues={{
              avatarUrl: project.avatarUrl,
              projectName: project.projectName,
              projectDescription: project.projectDescription,
              websiteUrl: project?.websiteUrl,
              telegramUrl: project?.telegramUrl,
            }}
          >
            <div className="bg-[#121212] w-full rounded-xl mb-4">
              <div className="py-4 px-5 text-[18px] font-medium border-b border-b-1">
                Project info
              </div>
              <FormSection title="Project logo">
                <div className="flex items-center gap-x-6">
                  <img
                    src={avatarUrl}
                    className="w-20 h-20 object-center object-cover rounded-full"
                  />
                  <Upload
                    maxCount={1}
                    customRequest={hanleUpload}
                    showUploadList={false}
                  >
                    <button className="px-6 py-2 bg-b-1 text-c-9 text-sm rounded-2.5xl shadow-s2">
                      Upload
                      {uplading && <LoadingOutlined className="ml-1" />}
                    </button>
                  </Upload>
                </div>
              </FormSection>

              <FormSection title="Project Name">
                <Form.Item name="projectName">
                  <Input className="w-[420px]" />
                </Form.Item>
              </FormSection>

              <FormSection title="Project URL">
                <Paragraph
                  style={{
                    marginBottom: 0,
                    color: "#C8C8C8",
                    fontWeight: 500,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                  }}
                  copyable={{
                    text: project?.projectUrl,
                  }}
                >
                  {projectUrlPrefix + project?.projectUrl}
                </Paragraph>
              </FormSection>

              <FormSection title="Project Category">
                <div className="flex items-center gap-2">
                  {project.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="px-4 py-0.5 rounded-xl border border-white"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </FormSection>

              <FormSection title="Project Introduction">
                <Form.Item name="projectDescription">
                  <Input.TextArea
                    placeholder="This is a project introduction"
                    className="w-[420px]"
                  />
                </Form.Item>
              </FormSection>

              <FormSection title="Website">
                <Form.Item name="websiteUrl">
                  <Input
                    placeholder="Enter website URL"
                    className="w-[420px]"
                  />
                </Form.Item>
              </FormSection>

              <FormSection title="Official Links">
                <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                  {userTwitter?.connected ? (
                    <button className="h-10 rounded-2.5xl flex items-center px-5 gap-x-2 bg-[#1DA1F2] text-white">
                      <img src={xGray} className="w-[18px] h-[18px]" />
                      {userTwitter?.twitterName}
                    </button>
                  ) : (
                    <a
                      href={twCallbackUrl}
                      target="_blank"
                      ref={twLinkRef}
                      className="h-10 rounded-2.5xl flex items-center px-5 bg-[#1A1A1A] text-[#C8C8C8] hover:text-[#C8C8C8] gap-x-2"
                      onClick={twAuth}
                    >
                      <img src={xGray} className="w-[18px] h-[18px]" />
                      Connect with Twitter
                    </a>
                  )}
                  {userDc?.connected ? (
                    <button className="h-10 rounded-2.5xl flex items-center px-5 gap-x-2 bg-[#5865F2] text-white">
                      <img src={dcGray} className="w-[18px] h-[18px]" />
                      {userDc?.username}
                    </button>
                  ) : (
                    <a
                      href={dcCallbackUrl}
                      className="h-10 rounded-2.5xl flex items-center px-5 bg-[#1A1A1A] text-[#C8C8C8] hover:text-[#C8C8C8] gap-x-2"
                    >
                      <img src={dcGray} className="w-[18px] h-[18px]" />
                      Connect with Discord
                    </a>
                  )}
                  {userTg?.connected ? (
                    <button className="h-10 rounded-2.5xl flex items-center px-5 gap-x-2 bg-[#00A2F3] text-white">
                      <img src={tgGray} className="w-[18px] h-[18px]" />@
                      {userTg?.username}
                    </button>
                  ) : (
                    <a
                      href={tgCallbackUrl}
                      target="_blank"
                      className="h-10 rounded-2.5xl flex items-center px-5 bg-[#1A1A1A] text-[#C8C8C8] hover:text-[#C8C8C8] gap-x-2"
                    >
                      <img src={tgGray} className="w-[18px] h-[18px]" />
                      Connect with Telegram
                    </a>
                  )}
                </div>
              </FormSection>
              <div className="flex justify-end py-3 px-5">
                <div className="max-content">
                  <Button
                    type="primary"
                    onClick={handleUpdate}
                    loading={confirmLoading}
                    className="w-full"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>

          <Form form={formAdvance} layout="inline">
            <div className="bg-[#121212] w-full rounded-xl">
              <div className="py-4 px-5 text-[18px] font-medium border-b border-b-1">
                Advanced settings
              </div>

              <FormSection
                title={
                  <div className="flex items-center gap-x-1">
                    Credential callback
                    <Popover
                      content={popoverMap.credentialCallback}
                      className="cursor-pointer"
                    >
                      <InfoCircleOutlined />
                    </Popover>
                  </div>
                }
              >
                <Form.Item name="credentialCallback">
                  <Radio.Group>
                    <Radio value={1}>Enable</Radio>
                    <Radio value={2}>Disable</Radio>
                  </Radio.Group>
                </Form.Item>
                <p className="text-xs text-[#A1A1A2]">
                  Disabling the credential callback means that no further
                  callback data will be received until it is enabled.
                </p>
              </FormSection>

              <FormSection title="Callback url">
                <Form.Item name="callbackUrl">
                  <Input
                    placeholder="Enter callback url"
                    className="w-[420px]"
                  />
                </Form.Item>
              </FormSection>

              <FormSection
                title={
                  <div className="flex items-center gap-x-1">
                    AppId
                    <Popover
                      content={popoverMap.appId}
                      className="cursor-pointer"
                    >
                      <InfoCircleOutlined />
                    </Popover>
                  </div>
                }
              >
                <Paragraph
                  style={{
                    marginBottom: 0,
                    color: "#F0F0F0",
                    fontWeight: 500,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                  }}
                  copyable={{
                    text: project?.appId,
                  }}
                >
                  217262530358
                </Paragraph>
              </FormSection>

              <FormSection
                title={
                  <div className="flex items-center gap-x-1">
                    AppKey
                    <Popover
                      content={popoverMap.appKey}
                      className="cursor-pointer"
                    >
                      <InfoCircleOutlined />
                    </Popover>
                  </div>
                }
              >
                <Paragraph
                  style={{
                    marginBottom: 0,
                    color: "#F0F0F0",
                    fontWeight: 500,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                  }}
                  copyable={{
                    text: project?.appId,
                  }}
                >
                  O-vk8nP-CB4gqY0HY9uQgSvTmJLc
                </Paragraph>
              </FormSection>

              <div className="flex justify-end py-3 px-5">
                <div className="max-content">
                  <Button
                    type="primary"
                    onClick={handleUpdate}
                    loading={confirmLoading}
                    className="w-full"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </ConfigProvider>

      {contextHolder}
    </div>
  );
}
