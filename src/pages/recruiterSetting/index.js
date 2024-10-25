import {useEffect, useState} from "react";
import {Card, Col, Divider, Flex, Form, Input, Row, Typography} from "antd";
import CustomTabs from "../../components/customTabs";
import CommonInput from "../../components/commonInput";
import {useSelector} from "react-redux";
import CustomButton from "../../components/customButton";


const RecruiterSetting = () => {
    let [manageAcountForm] = Form.useForm()
    const {user} = useSelector((state) => state.profile);

    const handleSubmitManageAccount = () => {
        const value = manageAcountForm.getFieldsValue()
    }

    const items = [
        {
            key: "1",
            label: "Manage Account",
            children: <Card title={'Change Email Address'}>
                <Form layout={"vertical"} size={'large'}>
                    <Row gutter={[12, 12]}>
                        <Col flex={1}>
                            <Form.Item name={'primaryEmail'} label={'Primary Email'}>
                                <CommonInput placeholder="Enter Primary Email"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={1}>
                            <Form.Item name={'secondaryEmail'} label={'Secondary Email'}>
                                <CommonInput placeholder="Enter Secondary Email"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Typography.Title level={5}>
                        Change Password
                    </Typography.Title>
                    <Divider/>
                    <Row gutter={[12, 12]}>
                        <Col span={12}>
                            <Form.Item name={'currentPassword'} label={'Current Password'}>
                                <Input.Password placeholder="Enter current Password"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[12, 12]}>
                        <Col flex={'1'}>
                            <Form.Item name={'currentPassword'} label={'Current Password'}>
                                <Input.Password placeholder="Enter current Password"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={'1'}>
                            <Form.Item name={'currentPassword'} label={'Current Password'}>
                                <Input.Password placeholder="Enter current Password"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Typography.Title level={5}>
                    Profile Actions
                </Typography.Title>
                <Divider/>
                <Flex gap={6}>
                    <CustomButton category="plain" name="Deactivate" classes="deactivate"
                                  style={{backgroundColor: "#E9F0F3"}}/>
                    <CustomButton category="plain" name="Delete" classes="delete"
                                  style={{backgroundColor: "#E8381A", color: "white"}}/>
                </Flex>
                <Flex justify={'end'}>
                    <CustomButton category="primary" name="Save" classes="save" handleClick={() => {
                    }}/>
                </Flex>
            </Card>,
        },
        {
            key: "2",
            label: "Account Admin",
            children: <Card></Card>,
        },
        {
            key: "3",
            label: "Payment Details",
            children: <Card></Card>,
        },
    ];

    return (
        <div style={{maxWidth: '969px', margin: '0 auto', width: '100%'}}>
            <Typography.Title level={3} style={{fontWeight: "400", color: "#333333"}}>Settings</Typography.Title>
            <CustomTabs defaultActiveKey="1" items={items}/>
        </div>
    );
};

export default RecruiterSetting;
