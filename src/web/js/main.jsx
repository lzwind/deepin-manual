import React, { Component } from 'react';
import $ from 'jquery';

import Nav from './nav.jsx';
import Article from './article.jsx';
import m2h from './mdToHtml.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      bTest:true
    };
    let { file, hash } = this.props.match.params;
    this.init(decodeURIComponent(file), hash ? decodeURIComponent(hash) : null);
    var showFloatTimer=null;
  }
  init(file, hash) {
    console.log("main init==>file:",file," hash:",hash);
    var filePath = file;
    if (filePath.indexOf('/') == -1) {
      filePath = `${global.path}/${file}/${global.lang}/index.md`;
    }
  
    global.readFile(filePath, data => {
      console.log("main init===>readfile finish...");
      let { html, hlist } = m2h(filePath, data);
      this.setState({
        file,
        html,
        hlist,
        init: true,
        hash: hash ? hash : hlist[0].id
      });
    });
  }

  setHash(hash) {
    console.log("main setHash: " + hash);
    if (global.isLinkClicked) {
      console.log("main --setHash");
      global.hash = hash;
      global.isLinkClicked = false;
    }
    console.log("main*********setHash");
    this.setState({ hash });
  }

  // setScrollTitle(hash){
  //   console.log("main setScrollTitle: " + hash);
  //   setTimeout(() => {
  //     global.hash = hash;
  //     global.oldHash = hash;
  //     global.isMouseClickNav = true;
  //     global.isMouseScrollArticle = false;
  //     this.setState({ hash });
  //   },800);
  // }

  setScroll(hash) {
    console.log("main setScroll:" + hash);
    global.hash = hash;
    this.setState({ hash });
  }

  //处理Nav类的Over Out Move事件,自定义Title框
  handleNavOver(e){
    var value =  e.currentTarget.innerHTML;
    clearTimeout(this.showFloatTimer);
    this.showFloatTimer=setTimeout(function(){
        $('.tooltip-wp').attr('data-title', value); //动态设置data-title属性
        $('.tooltip-wp').fadeIn(200);//浮动框淡出
    },300);
  }

  handleNavOut(e){
    clearTimeout(this.showFloatTimer);
    $('.tooltip-wp').hide();
  }

  handleNavMove(e){
    var xPage = e.pageX;
    var yPage = e.pageY + 20;
    setTimeout(function(){
        $('.tooltip-wp').css({
            'top' : yPage + 'px',
            'left': xPage+ 'px'
        });
    },150);
  }

  componentWillReceiveProps(nextProps) {
    let { file, hash } = nextProps.match.params;
    console.log("main componentWillReceivePropss: "+file+" "+hash+"  this.file:"+ this.state.file);
    //仅当页面文件发生改变时(文件改变或hash值发生改变),才刷新页面.
    if (file != this.state.file || ((file == this.state.file) && (hash != this.state.hash)))
    {
      this.init(decodeURIComponent(file), hash ? decodeURIComponent(hash) : null);
    }
  }

  componentWillUpdate(){
    console.log("main componentWillUpdate..");
  }

  componentWillUnmount(){
    global.hash = '';
    global.isMouseClickNav = false;
    global.isMouseScrollArticle = false;
    global.isLinkClicked = false;
  }

  render() {
    console.log("main render....hash:",this.state.hash);
    console.log("main render....hList:",this.state.hlist);
    return (
      this.state.init && (
        <div id="main">
          <Nav
            hlist={this.state.hlist}
            hash={this.state.hash}
            setHash={this.setHash.bind(this)}
            onNavOver={(e)=>this.handleNavOver(e)}
            onNavOut={(e)=>this.handleNavOut(e)}
            onNavMove={(e)=>this.handleNavMove(e)}
          />
          <Article
            file={this.props.match.params.file}
            hlist={this.state.hlist}
            html={this.state.html}
            hash={this.state.hash}
            setHash={this.setHash.bind(this)}
            setScroll={this.setScroll.bind(this)}
          />
          <div className="support-div" onClick={() =>{console.log("support click...")}}><img className="support" src="./pic.svg"></img></div>
          <div className="tooltip-wp"></div>
        </div>
      )
    );
  }
}
