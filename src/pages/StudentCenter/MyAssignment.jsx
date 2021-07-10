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
          <Upload
            name={"file"}
            showUploadList={false}
            action={"/api/StudentUploadAssignment"}
            data={{
              id: _this.state.userInfo.id,
              assignment_id: record.Assignment_id,
            }}
            onChange={onChange}
          >
            <Button
              type="primary"
              onClick={() => download(record)}
              style={{ marginRight: "5px" }}
              size="small"
              icon={<UploadOutlined />}
            >
              上传作业
            </Button>
          </Upload>
        ) : (
          <Button type="primary" style={{ marginRight: "5px" }} size="small">
            已上传
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
    .get("http://localhost:8000/api/StudentPersonalDownloadResource", {
      params: {
        name: row.Resource_name,
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
const onChange = ({ file }) => {
  const { status, response } = file;
  if (status !== "uploading") {
  }
  if (status === "done") {
    if (response.status != 200) {
      message.error(`${file.name} 上传失败,请查看提交日期`);
      return;
    }
    message.success(`${file.name} 上传成功.`);
    _this.getData();
  } else if (status === "error") {
    message.error(`${file.name} 上传失败.`);
  }
};

export default class PersonalResource extends Component {
  state = {
    userInfo: {},
    classID: 0,
    personalresource: [],
    loading: true,
    className: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentWillMount() {
    this.setState({
      classID: this.props.location.state.classID,
      className: this.props.location.state.name,
    });

    let userInfo = sessionStorage.getItem("userInfo");
    
    this.state.userInfo = JSON.parse(userInfo);
  }

  componentDidMount() {
    _this = this;

    this.getData();
  }

  getData = () => {
    this.setState({
      loading: true,
    });
    axios
      .get("http://localhost:8000/api/GetAssignmentList", {
        params: {
          id: this.state.userInfo.id,
          classID: this.state.classID,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            personalresource: response.data.personalresource,
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
            dataSource={this.state.personalresource}
            scroll={{ x: 2000 }}
          />
        </Spin>
      </div>
    );
  }
}
