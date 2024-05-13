import {
  Form,
  Space,
  Input,
  Button,
  Card,
  InputNumber,
  Divider,
  Spin,
  message,
} from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import useTopProjects from '@/hooks/queries/useTopProjects';
import { useEffect, useRef } from 'react';
import { updateTopProjects } from '@/api/incentive';

export default function () {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: remoteData, isLoading } = useTopProjects();
  const formLoadedRef = useRef(false);
  const handleSubmit = values => {
    updateTopProjects({
      projectIds: values.projectList.join(','),
      campaignList: values.campaignList.map(v => ({
        campaignTitle: v.campaignTitle,
        campaignIds: v.campaigns.join(','),
      })),
    }).then(res => {
      if (res.code === 200) {
        messageApi.success('update sucess!');
      } else {
        messageApi.error('update error!');
      }
    });
  };

  useEffect(() => {
    if (remoteData && !formLoadedRef.current) {
      formLoadedRef.current = true;
      form.setFieldsValue({
        projectList: remoteData?.projects?.map(p => p.projectId),
        campaignList: remoteData?.campaigns?.map(c => {
          return {
            campaignTitle: c.campaignTitle,
            campaigns: c.campaigns?.map(c => c.campaignId),
          };
        }),
      });
    }
  }, [remoteData]);
  return (
    <Spin spinning={isLoading}>
      {contextHolder}
      <Form
        layout='horizontal'
        className='space-y-4 pb-20'
        form={form}
        onFinish={handleSubmit}
      >
        <Card title='Preferred Projects'>
          <Form.List
            name='projectList'
            rules={[{ required: true, message: 'Missing Projects' }]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    align='baseline'
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      label={`Project${name + 1} ID`}
                      rules={[
                        { required: true, message: 'Missing Project ID' },
                      ]}
                    >
                      <InputNumber
                        placeholder='Enter a Project ID'
                        className='w-[420px]'
                      />
                    </Form.Item>
                    <CloseOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                {errors && <p className='text-[#dc4446]'>{errors}</p>}

                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add a Project
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>

        <Card title='Campaign Category'>
          <Form.List
            name='campaignList'
            rules={[{ required: true, message: 'Missing Categorires' }]}
          >
            {(fields, { add, remove }, { errors }) => (
              <div
                style={{
                  display: 'flex',
                  rowGap: 16,
                  flexDirection: 'column',
                }}
              >
                {fields.map(field => (
                  <Card
                    size='small'
                    title={`Category ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item
                      label='Category Title'
                      name={[field.name, 'campaignTitle']}
                      rules={[
                        { required: true, message: 'Missing Category Title' },
                      ]}
                    >
                      <Input placeholder='Enter a Category' />
                    </Form.Item>
                    <Divider />

                    {/* Nest Form.List */}
                    <Form.List
                      name={[field.name, 'campaigns']}
                      rules={[{ required: true, message: 'Missing Campaigns' }]}
                    >
                      {(subFields, subOpt, { errors: subErrors }) => (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: 16,
                          }}
                        >
                          {subFields.map(subField => (
                            <Space key={subField.key}>
                              <Form.Item
                                label={`Campaign${subField.name + 1} ID`}
                                name={[subField.name]}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Campaign ID',
                                  },
                                ]}
                              >
                                <InputNumber
                                  placeholder='Enter a Campaign ID'
                                  className='w-[420px]'
                                />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          {subErrors && (
                            <p className='text-[#dc4446]'>{subErrors}</p>
                          )}

                          <Button
                            type='dashed'
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Add a Campaign
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Card>
                ))}
                {errors && <p className='text-[#dc4446]'>{errors}</p>}

                <Button type='dashed' onClick={() => add()} block>
                  + Add a Campaign Category
                </Button>
              </div>
            )}
          </Form.List>
        </Card>

        <div className='flex justify-end'>
          <Button
            type='primary'
            htmlType='submit'
            className='border border-[#440cce] w-40'
          >
            Save
          </Button>
        </div>
      </Form>
    </Spin>
  );
}
