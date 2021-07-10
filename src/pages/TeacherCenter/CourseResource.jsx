import React, { Component } from "react";
import { Table, Button, Input, Upload, message, Spin, Popconfirm } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";

import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

let _this;

const columns = [
  {
    title: "资源路径",
    dataIndex: "Path",
    key: "Path",
    width: 200,
    ellipsis: true,
  },
  {
    title: "资源名称",
    key: "OriginalName",
    dataIndex: "OriginalName",
    width: 240,
    ellipsis: true,
  },
  {
    title: "上传时间",
    key: "Submit_time",
    dataIndex: "Submit_time",
    width: 150,
    ellipsis: true,
  },
  {
    title: "资源大小",
    key: "Resource_space",
    dataIndex: "Resource_space",
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
    width: 200,
    render: (text, record) => (
      <span>
        <Button
          type="primary"
          onClick={() => download(record)}
          style={{ marginRight: "5px" }}
          size="small"
          icon={<DownloadOutlined />}
        >
          下载
        </Button>
        <Popconfirm
          title="您确定要删除此资源吗"
          onConfirm={() => deleteData(record)}
          onCancel={cancel}
          okText="是"
          cancelText="否"
        >
          <a>
            <Button type="danger" size="small" icon={<DeleteOutlined />}>
              删除
            </Button>
          </a>
        </Popconfirm>
      </span>
    ),
  },
];

function cancel(e) {
  message.error("操作取消");
}

const download = (row) => {
  axios
    .get("http://localhost:8000/api/CourseDownloadResource", {
      params: {
        name: row.Resource_name,
      },
    })
    .then((response) => {
      if (response.data.status === 200) {
        let url = "http://localhost:8000" + response.data.url;

        var a = document.createElement("a");
        a.className = "download";
        a.download = row.OriginalName;
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

export default class resource extends Component {
  state = {
    username: this.props.location.state.username,
    resource: [],
    loading: true,
    name: "",
    classID: 0,
    className: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    _this = this;
    this.state.classID = this.props.location.state.classID;
    this.state.className = this.props.location.state.name;
    this.getData();
  }

  getData = () => {
    this.setState({
      loading: true,
    });

    const res = axios
      .get("http://localhost:8000/api/StudentCourseResource", {
        params: {
          classID: this.state.classID,
          name: this.state.name,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            resource: response.data.courseresource,
            loading: false,
          });
        }
      });
  };

  doDelete = (row) => {
    this.setState({
      loading: true,
    });

    axios({
      method: "post",
      url: `http://127.0.0.1:8000/TeacherDeleteCourseResource`,
      data: {
        classID: this.state.classID,
        name: row.Resource_name,
      },
    })
      .then((response) => {
        if (response.data.status === 200) {
          message.success(`删除成功.`);
          this.getData();
        }
      })
      .catch(function (error) {
        message.error(`删除失败.`);
      });
  };

  render() {
    let props = {
      name: "file",
      className: "file-uploader",
      showUploadList: false,
      data: { classID: this.state.classID },
      action: "/api/TeacherUpload",
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
          {this.state.className} 课堂资源
        </span>
        <br></br>
        <br></br>
        <Input.Search
          placeholder="关键字"
          name="name"
          value={this.state.name}
          onChange={this.handleInput}
          onSearch={this.getData}
          allowClear
          style={{ width: "25%" }}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Upload {...props}>
          <Button type="primary" icon={<UploadOutlined />}>
            上传
          </Button>
        </Upload>
        <br></br>
        <br></br>
        <Spin tips="加载中..." spinning={this.state.loading}>
          <Table
            rowKey="Resource_name"
            columns={columns}
            dataSource={this.state.resource}
          />
        </Spin>
      </div>
    );
  }
}
