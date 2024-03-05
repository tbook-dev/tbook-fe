import Button from '@/components/button';
import { useState } from 'react';
import SearchIcon from '@/images/icon/search.svg';
import { Modal, Form, Input, Tabs, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import x from '@/images/icon/x.svg';
import closeIcon from '@/images/icon/close.svg';
import { useCallback, useEffect } from 'react';
// import { twParttern, groupTypeMap } from '@/utils/conf';
import { parseLinkParams } from '@/api/incentive';
import {
  credential as credentialList,
  category as categoryList,
} from '@tbook/credential';
import credentialMap from '@/components/Credential/form.jsx';
import { merge, pick } from 'lodash';

const title = 'Set Up Credential Group';
const placeholder = 'Enter Credential Title to search for Cred';
const titleGroup = 'Edit Credential Group';
const emptyPrompt = 'The selected credential will be displayed here.';

export default function CredentialModal ({ open, setOpen, handleSave, conf }) {
  const [api, contextHolder] = notification.useNotification();

  const [confirmaLoading, setConfirmaLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchVal, setSearchVal] = useState('');
  const credentialsFormValues = Form.useWatch('credential', form);
  const credentialSet = credentialList.map(c => {
    const category = categoryList.find(v => v.groupType === c.groupType) || {};
    return {
      ...c,
      groupType: category.groupType,
      groupName: category.name,
    };
  });

  const formatCredential = categoryList
    .map(v => {
      return {
        id: v.groupType,
        groupType: v.groupType,
        name: v.name,
        credentialList: credentialList.filter(c => {
          return (
            c.groupType === v.groupType &&
            c?.name.toLowerCase().includes(searchVal?.toLowerCase()?.trim())
          );
        }),
      };
    })
    .filter(v => v.credentialList.length > 0);

  // console.log({ formatCredential });
  const handleOk = async () => {
    form
      .validateFields()
      .then(async values => {
        setConfirmaLoading(true);
        // parse
        const parseResult = await Promise.all(
          values.credential.map(async c => {
            console.log(values, c, '--->');
            const res = await parseLinkParams({
              ...c,
              url: c.link,
              labelType: c.labelType,
            });
            if (res.code === 200) {
              const fieldValues = pick(c, credentialMap[c.labelType]?.pick);
              // console.log({
              //   fieldValues,
              //   c,
              //   pick: credentialMap[c.labelType]?.pick,
              // });
              return {
                ...c,
                options: merge({}, fieldValues, res?.data),
              };
            } else {
              throw new Error(res.message);
            }
          })
        );
        // format
        values.credential = parseResult.map(v => {
          const credential = credentialSet.find(
            n => n.labelType === v.labelType
          );
          return {
            ...v,
            ...credential,
            // groupType: credential.groupType,
            // groupName: credential.groupName,
          };
        });
        handleSave(values);
        setConfirmaLoading(false);
        closeModal();
      })
      .catch(err => {
        // console.log(err);
        // form.setFields([
        //   {
        //     name: ['credential'],
        //     errors: [err.message], // 错误消息
        //   },
        // ]);
        if (err.message) {
          api.error({ message: err.message });
        }
        setConfirmaLoading(false);
      });
  };
  useEffect(() => {
    if (open) {
      const useDefaultValue = conf?.length === 0;
      form.setFieldsValue({ credential: useDefaultValue ? [] : conf });
    }
  }, [open]);

  const closeModal = useCallback(() => {
    setOpen(false);
    form.resetFields();
  }, []);
  console.log('user conf', conf);
  return (
    <Modal
      width={1160}
      title={
        <div className='text-2xl font-black font-zen-dot pt-3'>{title}</div>
      }
      open={open}
      onCancel={closeModal}
      maskStyle={{ backdropFilter: 'blur(7.5px)' }}
      maskClosable={false}
      centered
      footer={
        <div className='flex justify-end' onClick={handleOk}>
          <Button type='primary' loading={confirmaLoading}>
            Save
          </Button>
        </div>
      }
    >
      <div className='pt-8 grid grid-cols-2 gap-x-10'>
        <div>
          <div className='relative mb-5'>
            <Input
              type='text'
              placeholder={placeholder}
              className='pr-8 pl-4'
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <div className='absolute inset-y-0 right-1 flex items-center cursor-pointer'>
              <img src={SearchIcon} />
            </div>
          </div>

          <div>
            <Tabs
              defaultActiveKey={credentialList?.[0]?.id}
              items={formatCredential.map(v => {
                return {
                  key: v.id,
                  label: <span className='capitalize'>{v.name}</span>,
                  children: (
                    <div className='flex flex-wrap gap-x-4 gap-y-5 select-none'>
                      {v.credentialList?.map(c => {
                        return (
                          <div
                            key={c.labelType}
                            className='px-4 py-2.5 rounded-2.5xl bg-gray flex items-center gap-x-2 cursor-pointer hover:opacity-70'
                            onClick={() => {
                              form.setFieldsValue({
                                credential: [
                                  ...(form.getFieldValue('credential') ?? []),
                                  credentialSet.find(
                                    v => v.labelType === c.labelType
                                  ),
                                ],
                              });
                            }}
                          >
                            <img
                              src={c.picUrl || x}
                              className='w-5 h-5 object-contain'
                            />
                            {c.name}
                            <PlusOutlined />
                          </div>
                        );
                      })}
                    </div>
                  ),
                };
              })}
            />
          </div>
        </div>
        <div>
          <h2 className='text-xl font-black text-t-1 mb-5'>{titleGroup}</h2>
          <Form form={form} layout='vertical'>
            <Form.List
              name='credential'
              // rules={[
              //   {
              //     validator: async (x, values) => {
              //       console.log({ x, values });
              //     },
              //   },
              // ]}
            >
              {(fields, { remove }) => {
                return (
                  <div className='space-y-3'>
                    {fields.length > 0 ? (
                      fields.map(({ key, name, ...restField }) => {
                        const currentLabelType =
                          credentialsFormValues?.[name]?.labelType;
                        const credential = credentialSet.find(
                          v => v.labelType === currentLabelType
                        );
                        const CC =
                          credentialMap[currentLabelType]?.render ??
                          (() => <div>wait</div>);

                        return (
                          <div
                            key={key}
                            className='px-4 py-2.5 rounded-2.5xl bg-gray relative'
                          >
                            <img
                              src={closeIcon}
                              className='absolute right-4 top-4 w-2 h-2 object-contain cursor-pointer'
                              onClick={() => remove(name)}
                            />
                            <div>
                              <div className='flex items-center gap-x-2 mb-3'>
                                <img
                                  src={credential.picUrl || x}
                                  className='w-5 h-5 object-contain'
                                />
                                <p className='text-t-1 text-sm font-medium'>
                                  {credential.name}
                                </p>
                              </div>
                            </div>

                            <CC key={key} name={name} {...restField} />
                            {/* {credential.list.map((v, idx) => {
                              return v.component === 'HTML' ? (
                                <div
                                  key={name + v.name + idx}
                                  className='text-sm font-medium text-c-9 mb-3'
                                  dangerouslySetInnerHTML={{ __html: v.html }}
                                />
                              ) : (
                                <Form.Item
                                  {...restField}
                                  name={[name, v.name]}
                                  label={v.label}
                                  rules={v.rules}
                                  key={name + v.name + idx}
                                >
                                  {createElement(
                                    ComponentMap[v.component],
                                    v.componentProps
                                  )}
                                </Form.Item>
                              );
                            })} */}
                          </div>
                        );
                      })
                    ) : (
                      <div className='h-20 rounded-2.5xl flex items-center justify-center bg-gray text-center'>
                        {emptyPrompt}
                      </div>
                    )}
                  </div>
                );
              }}
            </Form.List>
          </Form>
        </div>
      </div>
      {contextHolder}
    </Modal>
  );
}
