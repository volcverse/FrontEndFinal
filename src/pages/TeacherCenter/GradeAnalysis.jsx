import React, { Component } from "react";
import { Table, Select, Button,Spin } from "antd";
import { message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
const { Option } = Select;

let _this;
let username;

const columns = [
  {
    title: "课程编号",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "课名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "作业成绩",
    dataIndex: "hwgrade",
    key: "hwgrade",
    render: (text, record) => (
      <Link
        to={{
          pathname: "/TeacherCenter/HWanalysis",
          state: { classID: record.ID, name: record.name,username },
        }}
      >
        <Button>查看</Button>
      </Link>
    ),
  },
  {
    title: "课堂测验成绩",
    dataIndex: "quiz",
    key: "quiz",
    render: (text, record) => (
      <Link
        to={{ pathname: "/TeacherCenter/Quiz", state: { classID: record.ID } }}
      >
        <Button>查看</Button>
      </Link>
    ),
  },
  {
    title: "在线测验成绩",
    dataIndex: "exam",
    key: "exam",

    render: (text, record) => (
      <Link
    
      >
        <Button>查看</Button>
      </Link>
    ),
  },
  {
    title: "分析学生成绩",
    dataIndex: "index",
    key: "index",
    render: (text, record) => (
      <Link
        to={{ pathname: "/TeacherCenter/Analysischarts", state: { classID: record.ID,className:record.name } }}
      >
        <Button>查看</Button>
      </Link>
    )
  },
];

const data = [
  {
    key: "1",
    id: "M00001",
    name: "微积分",
    hwgrade: (
      <Link to="/TeacherCenter/HWanalysis">
        <a>查看</a>
      </Link>
    ),
    quiz: (
      <Link to="/TeacherCenter/Quizanalysis">
        <a>查看</a>
      </Link>
    ),
    exam: <a>查看</a>,
    grade: (
      <Link to="/TeacherCenter/Analysischarts">
        <a>查看</a>
      </Link>
    ),
    index: (
      <space>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a studentID"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option>3190100001</Option>
          <Option>3190100002</Option>
          <Option>3190100003</Option>
        </Select>
        <Link to="/TeacherCenter/Studentanalysis">
          <Button>查看</Button>
        </Link>
      </space>
    ),
  },
  {
    key: "2",
    id: "M00002",
    name: "线性代数",
    hwgrade: (
      <Link to={{ pathname: '/TeacherCenter/HWanalysis', state: { username} }}>
        <a>查看</a>
      </Link>
    ),
    quiz: (
      <Link to="/TeacherCenter/Quizanalysis">
        <a>查看</a>
      </Link>
    ),
    exam: <a>查看</a>,
    grade: (
      <Link to="/TeacherCenter/Analysischarts">
        <a>查看</a>
      </Link>
    ),
    index: (
      <space>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a studentID"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option>3190100001</Option>
          <Option>3190100002</Option>
          <Option>3190100003</Option>
        </Select>
        <Link to="/TeacherCenter/Studentanalysis">
          <Button>查看</Button>
        </Link>
      </space>
    ),
  },
  {
    key: "3",
    id: "M00003",
    name: "常微分方程",
    hwgrade: (
      <Link to="/TeacherCenter/HWanalysis">
        <a>查看</a>
      </Link>
    ),
    quiz: (
      <Link to="/TeacherCenter/Quizanalysis">
        <a>查看</a>
      </Link>
    ),
    exam: <a>查看</a>,
    grade: (
      <Link to="/TeacherCenter/Analysischarts">
        <a>查看</a>
      </Link>
    ),
    index: (
      <space>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a studentID"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option>3190100001</Option>
          <Option>3190100002</Option>
          <Option>3190100003</Option>
        </Select>
        <Link to="/TeacherCenter/Studentanalysis">
          <Button>查看</Button>
        </Link>
      </space>
    ),
  },
];



export default class GradeAnalysis extends Component {
  state = {
    classID: 0,
    teacherID: this.props.location.state.username,
    data: [],
    loading: true,
  };
  componentWillMount(){
    username=this.props.location.state.username;
  }
  componentDidMount() {
    _this = this;

    // let userInfo = sessionStorage.getItem("userInfo");
    // if (!userInfo) {
    //   this.props.history.push({ pathname: "/LoginInterface" });
    // }
    // this.state.teacherID = JSON.parse(userInfo).id;

    this.getData();
  }

  getData = () => {
    this.setState({
      loading: true,
    });
    axios
      .get("http://localhost:8000/api/show", {
        params: {
          key: this.state.teacherID,
          type: "teacher_ID",
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response.data.data);
          this.setState({
            data: response.data.data,
            loading: false,
          });
        }
      });
  };
  render() {
    return (
      <div>
          <Spin tips="加载中..." spinning={this.state.loading}>
        <Table rowKey="ID" columns={columns} dataSource={this.state.data} />
        </Spin>
      </div>
    );
  }
}

function confirm(e) {
  console.log(e);
  message.success("操作确认");
}

function cancel(e) {
  console.log(e);
  message.error("操作取消");
}
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}
