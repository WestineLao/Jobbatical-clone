import React from 'react';
import $ from 'jquery';

import styles from './JobsDemo.scss';

class JobApp extends React.Component {
  constructor(props) {
    super(props);
    //define initial state
    this.state = {
      jobsArr: []
    }
    this.queryKeyword = this.queryKeyword.bind(this)
    this.jobList = this.jobList.bind(this)
  }

  componentDidMount() {
    //request data after components mounts
    this.jobList();


  }

  queryKeyword(){
    var search = document.getElementById("keyword").value
    console.log(search)

    return $.getJSON('http://localhost:3000/api/job/keyword/'+search)
      .then((data) => {
        this.setState({ jobsArr: data });
      });
  }

  jobList() {
    return $.getJSON('http://localhost:3000/api/job')
      .then((data) => {
        this.setState({ jobsArr: data });
      });
  }

  render() {
    return (
      <div className = "container">
        <input type="text" id="keyword" placeholder=" keyword" />
        <button type="submit" onClick={this.queryKeyword}> Search Job Keyword </button>
        <button type="clear" onClick={this.jobList}> Show All Jobs </button>
        <Listjobs list = {this.state.jobsArr}/>
      </div>
    )
  }
}


class Header extends React.Component {


  render() {
    return(
      <div>

      </div>
    )
  }

}

class Listjobs extends React.Component {

  render() {
    const list = this.props.list
    console.log(list)
    const jobs = list.map((job)=>{
      return(
      <div className={styles.job_details} key={ job._id.toString() }>
        <a href={"/api/job/" + job._id }>
          <h4> {job.name} </h4>
          <p> Employment Type: {job.employmentType} </p>
          <p> Description: {job.description} </p>
        </a>
      </div>
      )
    })
    return (
      <div>
        <div className={styles.jobs}>{ jobs }</div>
      </div>
    );
  }
}

export default JobApp;
