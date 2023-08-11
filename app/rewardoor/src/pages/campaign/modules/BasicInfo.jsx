import { Form, Input, Upload, DatePicker } from 'antd'
import uploadFile from '@/utils/upload'
import uploadIcon from '@/images/icon/upload.svg'

const { RangePicker } = DatePicker
export default function BasicInfo ({ form: setUpForm }) {
  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError)
  }
  const normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  return (
    <Form
      className='w-[520px]'
      form={setUpForm}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item
        label='Title'
        name='title'
        rules={[{ required: true, message: 'Title is required' }]}
      >
        <Input placeholder='Enter a campaign title' />
      </Form.Item>

      <Form.Item label='Poster'>
        <Form.Item
          valuePropName='fileList'
          getValueFromEvent={normFile}
          noStyle
          name='picUrl'
          rules={[
            {
              required: true,
              message: 'Poster is required'
            }
          ]}
        >
          <Upload.Dragger
            customRequest={hanleUpload}
            multiple={false}
            accept='image/*'
            maxCount={1}
          >
            <p className='ant-upload-drag-icon flex justify-center'>
              <img src={uploadIcon} />
            </p>
            <p className='ant-upload-text'>Upload an image</p>
            <p className='ant-upload-hint'>296*312 or higher</p>
            <p className='ant-upload-hint'>recommended Max 20MB.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label='Description'
        name='description'
        rules={[{ required: true, message: 'Description Title is required' }]}
      >
        <Input placeholder='Enter' />
      </Form.Item>
      <Form.Item
        label='Schedule'
        name='schedule'
        rules={[{ required: true, message: 'Schedule is required' }]}
      >
        <RangePicker className='w-full' />
      </Form.Item>
    </Form>
  )
}
