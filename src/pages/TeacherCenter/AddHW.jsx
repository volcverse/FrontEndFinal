import { Input, Button, Form, message, DatePicker } from "antd";
import axios from "axios";
import React from "react";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default class AddHW extends React.Component {
  //teacher id and class id
  state = {
    Assignment_title: "",
    Assignment_content: "",
    teacherID: 0,
    start_date: "",
    end_date: "",
    Score_percent: "",
    loading: false,
    classID: 0,
    className:""
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onDateChange = (date, dateString) => {
    this.setState({
      start_date: dateString[0],
      end_date: dateString[1],
    });
  };
  componentDidMount() {
    this.state.classID = this.props.location.state.classID;
    this.setState({
      className:this.props.location.state.name
    })
    let userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) {
      this.props.history.push({ pathname: "/LoginInterface" });
    }
    this.state.teacherID = JSON.parse(userInfo).id;
  }
  saveAssignment = async (e) => {
    this.setState({
      loading: true,
    });

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/AssignmentAdd`,
      data: this.state,
    })
      .then((response) => {
        if (response.data.status === 200) {
          message.success(`发布作业成功`);
        }
      })
      .catch(function (error) {
        message.error(`发布作业失败`);
      });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4, offset: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    return (
      <>
        <br />
        <br />
        <br />
        <span style={{ color: "#000", fontSize: "1.9em" }}>{this.state.className} 发 布 作 业</span>
        <br />
        <br />
        <Form onFinish={this.saveAssignment}>
          <Form.Item {...formItemLayout} label="作业名">
            <Input
              type="text"
              onChange={this.handleInput}
              name="Assignment_title"
              value={this.state.Assignment_title}
            ></Input>
          </Form.Item>

          <Form.Item {...formItemLayout} label="占平时成绩百分比">
            <Input
              type="text"
              onChange={this.handleInput}
              name="Score_percent"
              value={this.state.Score_percent}
            ></Input>
          </Form.Item>
          <Form.Item {...formItemLayout} label="时间">
            <RangePicker
              style={{ width: "100%" }}
              onChange={this.onDateChange}
              locale={locale}
              //defaultOpen={[this.state.start_date,this.state.end_date]}
            />
          </Form.Item>
          <Form.Item label="作业描述" {...formItemLayout}>
            <TextArea
              showCount
              maxLength={500}
              autoSize={{ minRows: 6, maxRows: 6 }}
              onChange={this.handleInput}
              name="Assignment_content"
              value={this.state.Assignment_content}
            ></TextArea>
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: 200 }}
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              loading={this.state.loading}
            >
              添加
            </Button>
          </Form.Item>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Form>
      </>
    );
  }
}

function handleinput(value) {
  console.log(`selected ${value}`);
}
