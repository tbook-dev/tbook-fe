import { Select } from 'antd'
import { useState } from 'react'

export default function SelectNFT (props) {
  const [selectOpen, setSelectOpen] = useState(false)
  const reProps = {
    ...props,
    open: selectOpen,
    onDropdownVisibleChange: setSelectOpen,
    dropdownRender: props?.dropdownRender(setSelectOpen)
  }
  return <Select {...reProps} />
}
