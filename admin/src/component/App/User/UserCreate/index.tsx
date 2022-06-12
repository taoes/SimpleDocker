import {Button, Form, Input, Select} from "antd";


const {Option} = Select
/**
 * 创建用户组件
 * @constructor
 */
export default function UserCreate() {

  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };
  const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  const [form] = Form.useForm();
  return (
      <div>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="note" label="Note" rules={[{required: true}]}>
            <Input/>
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{required: true}]}>
            <Select
                placeholder="Select a option and change input text above"
                allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({getFieldValue}) =>
                getFieldValue('gender') === 'other' ? (
                    <Form.Item name="customizeGender" label="Customize Gender"
                               rules={[{required: true}]}>
                      <Input/>
                    </Form.Item>
                ) : null
            }
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button>
          </Form.Item>
        </Form></div>
  )
}