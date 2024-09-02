import Button from '@/components/button';
import { InputNumber, Select, Modal, Input, Form, Upload, Switch } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import closeIcon from '@/images/icon/close.svg';
import { useCallback, useEffect, useState } from 'react';
import { incentiveMethodList, incentiveAssetsTypeList } from '@/utils/conf';
import NFTModal from './NFTModal';
import uploadFile, { fileValidator } from '@/utils/upload';
import uploadIcon from '@/images/icon/upload.svg';
import clsx from 'clsx';
import SelectNFT from '@/components/SelectNFT';
import useSupportChains from '@/hooks/queries/useSupportChains';

const title = 'Set Up Reward';
const defaultIncentive = { rewardType: 1, limited: false, activityId: 371 };
const nftText = {
  title: 'NFT Contracts List',
  desc: 'You could use the TBOOK contract to mint NFT items for incentive, or deploy your own NFT contract.',
};
export default function CredentialModal({
  open,
  setOpen,
  handleSave,
  conf,
  NFTcontracts,
}) {
  const [rewardForm] = Form.useForm();
  const reward = Form.useWatch('reward', rewardForm);
  const [showContractModal, setShowContractModal] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const { data: supportChains } = useSupportChains();

  // console.log({ reward });
  const handleOk = async () => {
    rewardForm
      .validateFields()
      .then((values) => {
        handleSave(values);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError);
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  useEffect(() => {
    if (open) {
      const useDefaultValue = conf?.length === 0;
      rewardForm.setFieldsValue({
        reward: useDefaultValue ? [] : conf,
      });
    }
  }, [open]);
  const closeModal = useCallback(() => {
    setOpen(false);
    // rewardForm.resetFields()
  }, []);
  // console.log({ NFTcontracts })
  return (
    <Modal
      width={640}
      open={open}
      onCancel={closeModal}
      maskStyle={{ backdropFilter: 'blur(7.5px)' }}
      maskClosable={false}
      destroyOnClose
      centered
      title={
        <div className="text-2xl font-black text-white font-zen-dot mb-8">
          {title}
        </div>
      }
      footer={
        <div className="flex justify-end" onClick={handleOk}>
          <Button type="primary">Save</Button>
        </div>
      }
    >
      <div className="flex items-center gap-x-6 mb-5">
        {open &&
          incentiveAssetsTypeList.map((v, i) => {
            const rewards = rewardForm?.getFieldValue('reward') || [];
            // console.log({ rewards })
            const disabled =
              v.value === 2 &&
              rewards?.filter((v) => v.rewardType === 2).length > 0;

            return (
              <Button
                key={i}
                disabled={disabled}
                onClick={() => {
                  console.log({ disabled });
                  if (!disabled) {
                    rewardForm.setFieldsValue({
                      reward: rewardForm
                        .getFieldValue('reward')
                        ?.concat({ ...defaultIncentive, rewardType: v.value }),
                    });
                  }
                }}
                className={clsx(
                  'flex px-4 py-2.5 gap-x-4 items-center text-sm font-medium text-t-1',
                  disabled && 'cursor-not-allowed'
                )}
              >
                <div className="flex items-center gap-x-2">
                  <img src={v.icon} className="w-5 h-5" />
                  {v.text}
                </div>
                <PlusOutlined />
              </Button>
            );
          })}
      </div>

      <Form
        form={rewardForm}
        layout="vertical"
        // requiredMark={false}
        initialValues={{
          reward: [],
        }}
      >
        <Form.List name="reward">
          {(fields, { remove }, { errors }) => {
            return (
              <>
                {fields.map(({ key, name, ...restField }, idx) => {
                  const rewardType = rewardForm.getFieldValue([
                    'reward',
                    name,
                    'rewardType',
                  ]);
                  const limited = rewardForm.getFieldValue([
                    'reward',
                    name,
                    'limited',
                  ]);
                  const asset = incentiveAssetsTypeList.find(
                    (v) => v.value === rewardType
                  );
                  const picUrl = rewardForm.getFieldValue([
                    'reward',
                    name,
                    'picUrl',
                  ]);
                  return (
                    <div
                      key={key}
                      className="border border-c-3 rounded-2xl p-4 mb-5 relative"
                    >
                      <div className="text-xl text-t-1 mb-5 font-bold relative">
                        <div className="flex items-center gap-x-2">
                          <img src={asset.icon} className="w-5 h-5" />
                          <span>{asset.text}</span>
                        </div>
                        <img
                          src={closeIcon}
                          onClick={() => {
                            remove(name);
                          }}
                          className="object-contain w-4 h-4 cursor-pointer absolute top-3 right-3 z-10"
                        />
                      </div>

                      {rewardType === 1 && (
                        <>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            label="NFT Name"
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <Input placeholder="Enter NFT Name" />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'nftId']}
                            label="NFT Contract"
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <SelectNFT
                              placeholder="Select NFT Contract"
                              // open={selectOpen}
                              // onDropdownVisibleChange={setSelectOpen}
                              dropdownRender={(setSelectOpen) => (menu) => (
                                <div className="px-5 py-2.5">
                                  <div className="mb-5">
                                    <h2 className="text-sm font-bold">
                                      {nftText.title}
                                    </h2>
                                    <p className="text-sm text-c-9">
                                      {nftText.desc}
                                    </p>
                                  </div>
                                  {menu}
                                  <div className="flex justify-center">
                                    <Button
                                      onClick={() => {
                                        setSelectOpen(false);
                                        setShowContractModal(true);
                                      }}
                                      type="text"
                                      className="text-c-9 text-sm"
                                    >
                                      <PlusOutlined className="mr-3" />
                                      Deploy New NFT Contract
                                    </Button>
                                  </div>
                                </div>
                              )}
                            >
                              {NFTcontracts.map((item) => {
                                const icon = supportChains.find(
                                  (v) => item.chainId === v.chainId
                                )?.icon;
                                return (
                                  <Select.Option
                                    key={item.nftId}
                                    value={item.nftId}
                                    label={item.name}
                                  >
                                    <div className="flex items-center gap-x-1">
                                      <img src={icon} className="w-4 h-4" />
                                      <span className="ml-2">{item.name}</span>
                                    </div>
                                  </Select.Option>
                                );
                              })}
                            </SelectNFT>
                          </Form.Item>

                          <Form.Item
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            label="NFT Media File"
                            name={[name, 'picUrl']}
                            rules={[
                              {
                                required: true,
                                message: 'image is required',
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
                              {picUrl?.[0]?.response ? (
                                <img
                                  src={picUrl?.[0]?.response}
                                  className="w-full h-[180px] object-contain object-center"
                                />
                              ) : (
                                <>
                                  <p className="ant-upload-drag-icon flex justify-center">
                                    <img src={uploadIcon} />
                                  </p>
                                  <p className="ant-upload-text">
                                    Upload an image
                                  </p>
                                  <p className="ant-upload-hint">
                                    296*312 or higher
                                  </p>
                                  <p className="ant-upload-hint">
                                    recommended Max 20MB.
                                  </p>
                                </>
                              )}
                            </Upload.Dragger>
                          </Form.Item>
                        </>
                      )}

                      {rewardType === 2 && (
                        <>
                          <Form.Item
                            name={[name, 'number']}
                            label="Number of point for each participant"
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <InputNumber
                              placeholder="try a number"
                              className="w-full"
                              min={1}
                              step={1}
                            />
                          </Form.Item>
                        </>
                      )}
                      {rewardType === 3 && (
                        <>
                          <Form.Item
                            label="Activity id"
                            name={[name, 'activityId']}
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <Input
                              placeholder="Third party identifier, for example ton society is 371 "
                              className="w-full"
                            />
                          </Form.Item>
                          <Form.Item
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            label="SBT Media File"
                            name={[name, 'picUrl']}
                            rules={[
                              {
                                required: true,
                                message: 'image is required',
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
                              {picUrl?.[0]?.response ? (
                                <img
                                  src={picUrl?.[0]?.response}
                                  className="w-full h-[180px] object-contain object-center"
                                />
                              ) : (
                                <>
                                  <p className="ant-upload-drag-icon flex justify-center">
                                    <img src={uploadIcon} />
                                  </p>
                                  <p className="ant-upload-text">
                                    Upload an image
                                  </p>
                                  <p className="ant-upload-hint">
                                    296*312 or higher
                                  </p>
                                  <p className="ant-upload-hint">
                                    recommended Max 20MB.
                                  </p>
                                </>
                              )}
                            </Upload.Dragger>
                          </Form.Item>
                        </>
                      )}
                      <Form.Item
                        {...restField}
                        name={[name, 'methodType']}
                        label="Incentive Method"
                        rules={[{ required: true, message: 'Missing!' }]}
                      >
                        <Select placeholder="Select the category">
                          {incentiveMethodList.map((v) => {
                            return (
                              <Select.Option value={v.value} key={v.value}>
                                <p>{v.title}</p>
                                <p>{v.desc}</p>
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        name={[name, 'limited']}
                        label="Limited Number of Reward"
                        valuePropName="checked"
                        rules={[
                          {
                            required: true,
                            message: 'Missing!',
                          },
                        ]}
                      >
                        <Switch checkedChildren="on" unCheckedChildren="off" />
                      </Form.Item>
                      {limited && (
                        <>
                          {[1, 2].includes(rewardType) && (
                            <Form.Item
                              label="Minting Cap"
                              name={[name, 'mintCap']}
                              rules={[{ required: true, message: 'Missing!' }]}
                            >
                              <InputNumber
                                placeholder="try a number"
                                className="w-full"
                                min={1}
                                step={1}
                              />
                            </Form.Item>
                          )}

                          {rewardType === 1 && (
                            <Form.Item
                              label="Number of Reward"
                              name={[name, 'rewardNum']}
                              rules={[{ required: true, message: 'Missing!' }]}
                            >
                              <InputNumber
                                placeholder="try a number"
                                className="w-full"
                                min={1}
                                step={1}
                              />
                            </Form.Item>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
                <p style={{ color: '#dc4446', marginBottom: 12 }}>{errors}</p>
              </>
            );
          }}
        </Form.List>
      </Form>

      <NFTModal visible={showContractModal} setOpen={setShowContractModal} />
    </Modal>
  );
}
