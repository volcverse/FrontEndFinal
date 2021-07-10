import React, { Component } from "react";
import { Table, Button, Spin, Modal, Form, Input, Card } from "antd";
import axios from "axios";
import * as echarts from "echarts";
import "./common.css";

let _this = this;

let chartDom;
let myChart;
let option;

const columns = [
  {
    title: "测试名称",
    dataIndex: "Quiz_id",
    key: "Quiz_id",
  },
  {
    title: "测试成绩",
    dataIndex: "Quiz_score",
    key: "Quiz_score",
  },
  {
    title: "测验标题",
    dataIndex: "Quiz_title",
    key: "content",
  },
  {
    title: "测试内容",
    dataIndex: "Quiz_content",
    key: "Quiz_content",
  },
  {
    title: "学号",
    dataIndex: "Student_id",
    key: "Quiz_content",
  },
  {
    title: "教师号",
    dataIndex: "Teacher_id",
    key: "Teacher_id",
  },
  {
    title: "班级号",
    dataIndex: "Class_id",
    key: "Class_id",
  },
  {
    title: "测试时间",
    dataIndex: "Quiz_time",
    key: "Quiz_time",
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
    width: 200,
    render: (text, record) => (
      <span>
        <Button type="primary" onClick={() => showGrade(record)} size="small">
          查看分析结果
        </Button>
      </span>
    ),
  },
];

const columnsRank = [
  {
    title: "排名",
    dataIndex: "rankNumber",
    key: "rankNumber",
  },
  {
    title: "姓名",
    dataIndex: "studentName",
    key: "studentName",
  },
  {
    title: "分数",
    dataIndex: "Quiz_score",
    key: "Quiz_score",
  },
];

const showGrade = (row) => {
  _this.showModal(row.Student_id);
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export default class Quiz extends Component {
  state = {
    username: this.props.location.state.username,
    classID: 0,
    quiz: [],
    loading: true,
    className: "",
    isModalVisible: false,
    rank:[],
    grade: {
      student_name: "",
      total_credit: 0,
      average_score: 0,
      gpa: 0,
    },
  };
  componentDidMount() {
    _this = this;
    this.state.classID = this.props.location.state.classID;
    this.setState({
      className:this.props.location.state.className
    })
    chartDom = document.getElementById("chart");
    myChart = echarts.init(chartDom);
    myChart.showLoading();


    this.getData();
  }

  getData = () => {
    this.setState({
      loading: true,
    });
    axios
      .get("http://localhost:8000/api/Quizanalysis", {
        params: {
          classID: this.state.classID,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            quiz: response.data.quiz,
            rank:response.data.chart.rank,
            loading: false,
          });

          this.chart(response.data.chart);
          
          myChart.hideLoading();
        }
      });
  };

  showModal = (id) => {
    this.setState({
      loading: true,
    });
    axios
      .get("http://localhost:8000/api/GetGradeInfo", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            grade: response.data.grade,
            loading: false,
            isModalVisible: true,
          });
        }
      });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  chart = (data) => {
    option = {
      title: {
        text: "成绩分布",
        subtext: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "成绩分布",
          type: "pie",
          radius: "50%",
          data: [
            { value: data.level1, name: "60以下" },
            { value: data.level2, name: "60-70" },
            { value: data.level3, name: "71-80" },
            { value: data.level4, name: "81-90" },
            { value: data.level5, name: "91-100" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  };

  render() {
    return (
      <div>
        <span style={{ color: "black", fontSize: "2em" }}>
          {this.state.className} 课堂测验 {this.state.grade.student_name}
        </span>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <Spin tips="加载中..." spinning={this.state.loading}>
          <div className="analysis">
            <Card title="成绩分布" className="chart-content">
              <div id="chart"> </div>
            </Card>

            <div id="rank">
              <Card title="成绩排名（前10）">
                <div class="rank-content">
                  <Table
                    rowKey="3190100123"
                    columns={columnsRank}
                    dataSource={this.state.rank}
                    pagination={false}
                  />
                </div>
              </Card>
            </div>
          </div>

          <Table
            rowKey="Quiz_id"
            columns={columns}
            dataSource={this.state.quiz}
          />
        </Spin>

        <Modal
          title="查看分析结果"
          cancelText="返回"
          okText="确定"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form {...layout} name="control-hooks">
            <Form.Item name="student_name" label="姓名">
            {this.state.grade.student_name}
            </Form.Item>
            <Form.Item name="total_credit" label="总分">
            {this.state.grade.total_credit} 
            </Form.Item>
            <Form.Item name="average_score" label="平均分">
            {this.state.grade.average_score}
            </Form.Item>
            <Form.Item name="gpa" label="gpa">
            {this.state.grade.gpa}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
