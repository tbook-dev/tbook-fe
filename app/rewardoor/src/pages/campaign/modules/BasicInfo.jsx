import { Form, Input, Upload, DatePicker } from 'antd';
import uploadFile, { fileValidator } from '@/utils/upload';
import uploadIcon from '@/images/icon/upload.svg';
import Mce from '@/components/mce/FormItem';

const { RangePicker } = DatePicker;
export default function BasicInfo ({ form: setUpForm, isInOngoingEdit }) {
  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError);
  };
  const picUrl = Form.useWatch('picUrl', setUpForm);

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Form className='w-[520px]' form={setUpForm} layout='vertical'>
      <Form.Item
        label='Title'
        name='title'
        rules={[{ required: true, message: 'Title is required' }]}
      >
        <Input placeholder='Enter a campaign title' />
      </Form.Item>

      <Form.Item
        valuePropName='fileList'
        getValueFromEvent={normFile}
        label='Poster'
        name='picUrl'
        rules={[
          {
            required: true,
            message: 'Poster is required',
          },
          {
            validator: fileValidator,
          },
        ]}
      >
        <Upload.Dragger
          customRequest={hanleUpload}
          multiple={false}
          accept='image/*'
          maxCount={1}
        >
          {picUrl?.[0]?.response ? (
            <img
              src={picUrl?.[0]?.response}
              className='w-full h-[180px] object-contain object-center'
            />
          ) : (
            <>
              <p className='ant-upload-drag-icon flex justify-center'>
                <img src={uploadIcon} />
              </p>
              <p className='ant-upload-text'>Upload an image</p>
              <p className='ant-upload-hint'>359*172 or higher</p>
              <p className='ant-upload-hint'>recommended Max 20MB.</p>
            </>
          )}
        </Upload.Dragger>
      </Form.Item>
      <Form.Item
        label='Description'
        name='description'
        rules={[{ required: true, message: 'Description is required' }]}
      >
        {/* <Input.TextArea autoSize placeholder="Enter" /> */}
        <Mce placeholder='Enter' />
      </Form.Item>
      <Form.Item
        label='Schedule'
        name='schedule'
        rules={[{ required: true, message: 'Schedule is required' }]}
      >
        <RangePicker
          showTime
          className='w-full'
          format='YYYY-MM-DD HH:mm:ss (UTCZ)'
          disabled={isInOngoingEdit}
        />
      </Form.Item>
    </Form>
  );
}
