import React from 'react'
var superagent = require('superagent');
export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    // superagent.get('/index')
    //   .end(function (err, sres) {
    //     console.log(sres);
    //   }
    const _this = this;
    superagent.get('/index')
      .end(function (err, sres) {
        if (err) {
          return next(err);
        }

        _this.setState({
          list: sres.body
        })
        console.log(sres.body);
      });
  }

  render() {
    console.log(111, this.state.list);
    return (
      <div>
        <h1>Change me</h1>
        <ul>
          {this.state.list.map((file, i) =>
            <li key={i}>{file.title}</li>
          ) }

        </ul>
      </div>
    )
  }
}
