import { Select } from 'antd';

// wrap values with ,
export default function SelectWraper ({ value, onChange, ...props }) {
  const wraperOnChange = v => {
    onChange(Array.isArray(v) ? v.join(',') : v);
  };
  const wraperValue = value => {
    return value?.includes(',')
      ? value.split(',').filter(v => v !== '')
      : !value
      ? []
      : [value];
  };
  return (
    <Select {...props} onChange={wraperOnChange} value={wraperValue(value)} />
  );
}
