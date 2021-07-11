import {Table, Button,Row,Col,Layout, Menu, Descriptions,Card,Badge} from 'antd';

import{DesktopOutlined,IdcardOutlined,ReadOutlined,MailOutlined,SettingOutlined,PlayCircleOutlined,BorderOutlined}from'@ant-design/icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { Tag,Image } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  HighlightOutlined,
  BookOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import reactDom from 'react-dom';
const { Header, Content, Footer, Sider } = Layout;




// let datasource=[];
// window.onload=function(){
//   let k=0;
//   axios
//     .get('http://127.0.0.1:8000/show_choose_questionbyid/',
//       { 
//         headers:{'content-type':'application/x-www-form-urlencoded'},

//       }
//     ).then((res)=>{
//       console.log(res.data);
//       for(let i=0;i<res.data.length;i++){
//         datasource.push({
//           key:i,
//           id:res.data[i].choose_id,
//           type:'选择',
//           stem:res.data[i].stem,
//           optionA:res.data[i]['optionA'],
//           optionB:res.data[i].optionB,
//           optionC:res.data[i].optionC,
//           optionD:res.data[i].optionD,
//           correct_answer:res.data[i].correct_answer,
//           value:res.data[i].value,
//         })
//         k=i;
//       }
//     })

//     axios
//     .get('http://127.0.0.1:8000/show_judge_questionbyid/',
//       { 
//         headers:{'content-type':'application/x-www-form-urlencoded'},

//       }
//     ).then((res)=>{
//       console.log(res.data);
//       for(let i=0;i<res.data.length;i++){
//         datasource.push({
//           key:i+k+1,
//           id:res.data[i].judge_id,
//           type:'判断',
//           stem:res.data[i].stem,
//           optionA:'/',
//           optionB:'/',
//           optionC:'/',
//           optionD:'/',
//           correct_answer:res.data[i].correct_answer,
//           value:res.data[i].value,

//         })
//       }
//     })  
// }
let datasource=[];

function bac(sid){
  console.log(123);
  axios
    .get('http://127.0.0.1:8000/examstateupdate',
      { 
        headers:{'content-type':'application/x-www-form-urlencoded'},

      }
    ).then((res)=>{

    })
  if(datasource.length==0)
  axios
    .get('http://127.0.0.1:8000/examstu/query/'+sid,
      { 
        headers:{'content-type':'application/x-www-form-urlencoded'},

      }
    ).then((res)=>{
      let texamid=res.data;
      console.log(texamid);
      datasource=[];
      datasource.length=0;
      for(let i=0;i<=texamid.length-1;i++){
          datasource.push({
            tid:i,
            name:texamid[i].exam_name,
            eid:texamid[i].exam_id,
            time:texamid[i].end_time,
            states:texamid[i].state,
            teacher:texamid[i].teacher_id,
            course:texamid[i].course_id
          })
      }
    })
}



export default class onlineteststu extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username:this.props.location.state.username,
      psw:this.props.location.state.psw,
      sid:this.props.location.state.username,
      current:'mail',
      btnClassName:' ',
      btnClassNameArry: [ ],
      y:bac(this.props.location.state.username),
      columns:[
        {
          title: '',
          dataIndex: 'tid',
          width:'100%',
          render:text=>
          <Card title={<div><DesktopOutlined />  <Link to={{pathname:"/StudentCenter/testcenter_stu/testpaper/",state:{eid:datasource[text]['eid']}}}>{datasource[text]['name']}</Link></div>} extra={<div><Tag color="blue">{datasource[text]['states']}</Tag></div>} style={{ marginRight: 0,marginLeft: 0 }}>
                    <div class='row1'><div>结束时间：{datasource[text]['time']}</div> <div style={{ textAlign:'right'}}><ReadOutlined /> {datasource[text]['course']}  &nbsp;&nbsp;&nbsp; <IdcardOutlined />{datasource[text]['teacher']}</div></div>
          </Card>
        },
      ],
      testt:1
    };
  }
  componentDidMount() {
    

    
    this.timer = setInterval(function () {
      this.setState({
        columns:this.state.columns,
      });

    }.bind(this), 100);
  
  }
  handleClick = e => {
    console.log('click ', e);
    console.log(datasource);
    this.setState({ current: e.key });
    this.setState({ testt: 3 });
    this.setState({ columns: this.state.columns });
    console.log(this.state.columns);
  };
  render() {
    const { current } = this.state;
    return (

          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
            <Table columns={this.state.columns} dataSource={datasource}/>
            </div>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </Content>

        
    )
  }


}
