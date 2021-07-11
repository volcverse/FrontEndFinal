import React, { Component } from "react";
import { Table, Button, Input, Upload, message, Spin, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

let _this;

const columns = [
  {
    title: "课程名称",
    dataIndex: "className",
    key: "className",
    width: 200,
  },
  {
    title: "学号",
    dataIndex: "Student_id",
    key: "Student_id",
  },
  {
    title: "老师ID",
    dataIndex: "Teacher_id",
    key: "Teacher_id",
  },
  {
    title: "作业名称",
    dataIndex: "Assignment_title",
    key: "Assignment_title",
  },
  {
    title: "作业内容",
    dataIndex: "Assignment_content",
    key: "Assignment_content",
  },
  {
    title: "作业占比",
    dataIndex: "Score_percent",
    key: "Score_percent",
  },
  {
    title: "提交状况",
    dataIndex: "Submit_state",
    key: "Submit_state",
  },
  {
    title: "提交内容",
    dataIndex: "Submit_content",
    key: "Submit_content",
  },
  {
    title: "作业分数",
    dataIndex: "Assignment_score",
    key: "Assignment_score",
  },
  {
    title: "开放时间",
    dataIndex: "Start_time",
    key: "Start_time",
  },
  {
    title: "截止时间",
    dataIndex: "End_time",
    key: "End_time",
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
    width: 200,
    fixed: "right",
    render: (text, record) => (
      <span>
        {record.Submit_state == "未提交" ? (
          <Button
            type="primary"
            style={{ marginRight: "5px" }}
            size="small"
          >
            未上传
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => download(record)}
            style={{ marginRight: "5px" }}
            size="small"
          >
            下载
          </Button>
        )}
      </span>
    ),
  },
];

function cancel(e) {
  message.error("操作取消");
}

const download = (row) => {
  axios
    .get("http://localhost:8000/api/TeacherAssignmentDownloadResource", {
      params: {
        name: row.Submit_content,
      },
    })
    .then((response) => {
      if (response.data.status === 200) {
        let url = "http://localhost:8000" + response.data.url;

        var a = document.createElement("a");
        a.className = "download";
        a.download = row.Resource_name;
        a.href = url;
        document.querySelector("body").append(a);

        a.click();
        document.querySelector("a.download").remove(a);
      }
    });
};

const deleteData = (row) => {
  _this.doDelete(row);
};

export default class data extends Component {
  state = {
    username: this.props.location.state.username,
    classID: this.props.location.state.classID,
    data: [],
    loading: true,
    className: "",
  };

  componentWillMount(){
    console.log(this.props.location.state.username);
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    _this = this;
    this.state.classID = this.props.location.state.classID;
    this.state.className = this.props.location.state.name;

    // let userInfo = sessionStorage.getItem("userInfo");
    // if (!userInfo) {
    //   this.props.history.push({ pathname: "/LoginInterface" });
    // }
    // this.state.userInfo = JSON.parse(userInfo);
    this.getData();
  }

  getData = () => {
    this.setState({
      classID: 0,
      loading: true,
    });

    const res = axios
      .get("http://localhost:8000/api/GetTeacherAssignmentList", {
        params: {
          teacherID: this.state.username,
          classID: this.state.classID,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            data: response.data.data,
            loading: false,
          });
        }
      });
  };

  render() {
    let props = {
      action: "/api/StudentUploadAssignment",
      onChange({ file }) {
        const { status } = file;

        if (status !== "uploading") {
        }
        if (status === "done") {
          message.success(`${file.name} 上传成功.`);
          _this.getData();
        } else if (status === "error") {
          message.error(`${file.name} 上传失败.`);
        }
      },
    };

    return (
      <div>
        <span style={{ color: "black", fontSize: "2em" }}>
          {this.state.className} 课堂作业
        </span>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <Spin tips="加载中..." spinning={this.state.loading}>
          <Table
            rowKey="Assignment_id"
            columns={columns}
            dataSource={this.state.data}
            scroll={{ x: 2000 }}
          />
        </Spin>
      </div>
    );
  }
}
