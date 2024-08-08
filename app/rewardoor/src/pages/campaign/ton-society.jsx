import Breadcrumb from '@/components/breadcrumb';
import useCampaign, {
  useSyncTONSocietyMutation,
} from '@/hooks/queries/useCampaign';
import { useParams, Link } from 'react-router-dom';
import { Form, Input, Upload, notification } from 'antd';
import { campaignStatus } from '@/utils/conf';
import Button from '@/components/button';
import uploadFile, { fileValidator } from '@/utils/upload';
import uploadIcon from '@/images/icon/upload.svg';

export default function SyncTonSociety() {
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();
  const { data: pageInfo = {}, isLoading } = useCampaign(id);
  const [form] = Form.useForm();
  const campaignCurrentStatus = campaignStatus.find(
    (v) => v.value === pageInfo?.campaign?.status
  );
  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError);
  };
  const SBTImageLink = Form.useWatch('SBTImageLink ', form);

  const syncTONSocietyMutation = useSyncTONSocietyMutation();
  // console.log({ syncTONSocietyMutation });
  console.log({ api });
  const handleSync = () => {
    form.validateFields().then(async (values) => {
      // syncTONSocietyMutation.mutate
      const res = await syncTONSocietyMutation.mutateAsync(values);
      if (res.success) {
        api.success({
          message: 'Successfully submit!',
          description:
            'Your campaign has submitted to the TON Society for review. ',
        });
      } else {
        api.error({
          message: 'Submit Error!',
          description: res.message ?? 'Unkown error!',
        });
      }
    });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const canSync = true;
  return (
    <main>
      <Breadcrumb
        items={[
          {
            title: 'Incentive Campaign',
            href: '/',
          },
          {
            title: pageInfo?.campaign?.name,
            href: `/campaign/${id}/detail`,
          },
          {
            title: 'Sync Campaign to TON Society',
          },
        ]}
      />
      <div className="space-y-1 mb-5">
        <h2
          className={
            isLoading
              ? 'h-12 w-[200px] bg-[#1f1f1f] animate-pulse'
              : 'font-bold text-5xl text-white'
          }
        >
          {pageInfo?.campaign?.name}
        </h2>
        <div
          className={
            isLoading ? 'h-5 w-20 bg-[#1f1f1f] animate-pulse' : 'text-white/60'
          }
        >
          Status: {campaignCurrentStatus?.label}
        </div>
      </div>

      <Form className="w-[520px]" form={form} layout="vertical">
        <Form.Item
          label="Link to Registration/Details (TON Society Button Link)"
          name="link"
          rules={[{ required: true, type: 'url' }]}
        >
          <Input placeholder="http://t.me/tbook_incentive_bot/campaignDeepLink" />
        </Form.Item>
        <Form.Item
          label="SBT Collection Title"
          name="SBTCollectionTitle"
          rules={[{ required: true }]}
        >
          <Input placeholder="SBT Collection Title will show on TonSociety page and NFT Marketplace" />
        </Form.Item>
        <Form.Item
          label="SBT Collection Description"
          name="SBTCollectionDescription"
          rules={[{ required: true }]}
        >
          <Input placeholder="SBT Collection Description will show on TonSociety page and NFT Marketplace" />
        </Form.Item>
        {/* <Form.Item
          label="Link to SBT Image"
          name="SBTImageLink"
          rules={[{ required: true }]}
        >
          <Input placeholder="If you have an image that you want to use as SBT, please give us a link to it" />
        </Form.Item> */}
        <Form.Item
          valuePropName="fileList"
          getValueFromEvent={normFile}
          label="Link to SBT Image"
          name="SBTImageLink"
          rules={[
            {
              required: true,
            },
            {
              validator: fileValidator,
            },
          ]}
        >
          <Upload.Dragger
            customRequest={hanleUpload}
            multiple={false}
            accept="image/*"
            maxCount={1}
          >
            {SBTImageLink?.[0]?.response ? (
              <img
                src={picUrl?.[0]?.response}
                className="w-full h-[180px] object-contain object-center"
              />
            ) : (
              <>
                <p className="ant-upload-drag-icon flex justify-center">
                  <img src={uploadIcon} />
                </p>
                <p className="ant-upload-text">Upload an image</p>
              </>
            )}
          </Upload.Dragger>
        </Form.Item>
        <Form.Item
          label="SBT Description"
          name="SBTDescription"
          rules={[{ required: true }]}
        >
          <Input placeholder="If you have an image that you want to use as SBT, please give us a link to it" />
        </Form.Item>
      </Form>
      <footer className="fixed bottom-0 inset-x-0 pl-[280px] flex">
        <div className="w-[1080px] mx-auto h-20 flex items-center gap-x-10 backdrop-blur justify-end">
          <div className="flex justify-between items-center gap-x-10">
            <Link to={`/campaign/${id}/detail`}>
              <Button>Cancel</Button>
            </Link>

            <Button
              type="primary"
              onClick={handleSync}
              loading={syncTONSocietyMutation.isLoading}
              disabled={!canSync}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </footer>

      {contextHolder}
    </main>
  );
}
