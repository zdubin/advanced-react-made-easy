import * as React from "react";
import { connect } from "react-redux";
import './Echo.scss';

export class Echo extends React.Component<any, { messages: string[], sentMessages: string[] }> {

  private timerid: NodeJS.Timeout | undefined;  // stops a warning in DidMount
  private connection: WebSocket | null = null;

  constructor(props: any) {
    super(props);
    this.state = { messages: [], sentMessages: [] }
    this.timerid = undefined;
  }
  componentWillUnmount() {
    clearInterval(this.timerid);
    this.connection?.close();
  }
  componentDidMount() {
    // this is an "echo" websocket service
    /// Please set up a local web socket server from this page: https://www.lob.com/blog/websocket-org-is-down-here-is-an-alternative
    this.connection = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/');
    this.connection.onopen = () => console.log("ws opened");
    this.connection.onclose = () => console.log("ws closed");


    // listen to onmessage event

    this.connection.onmessage = evt => {
      console.log(evt);

      // add the new message to state
      this.setState({
        messages: this.state.messages.concat([evt.data]).slice(-5)
      })
    };

    // for testing purposes: sending to the echo service which will send it back back
    this.timerid = setInterval(() => {
      const randomNum: number = Math.random();
      this.connection?.send(`${randomNum}`);
      this.setState({
        sentMessages: this.state.sentMessages.concat([`${randomNum}`]).slice(-5)
      })

    }, 2000)
  }




  render() {
    return <div>
      <div className='row'>
        <div className='col-12'>
          <div className='curved-edges w-100' style={{ padding: '10px', margin: '10px', backgroundColor: 'lavender', }}> <strong>Redux total:</strong> {this.props.total}</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='echo curved-edges echo__section echo__section--sent'>
            <h2>Sent</h2>
            <ol >{this.state.sentMessages.slice(-5).map((msg, idx) => <li key={'sentmsg-' + idx}>{msg}</li>)}</ol>
          </div>
          <div className='echo curved-edges echo__section echo__section--received'>
            <h2>Received</h2>
            <ol >{this.state.messages.slice(-5).map((msg, idx) => <li key={'msg-' + idx}>{msg.substring(0, 30)}</li>)}</ol>
          </div>
        </div>
      </div>
    </div>
      ;
  }
};
function mapStateToProps(state: { calc: { total: number, articles: string[] } }) {
  console.log(state)
  const total = state.calc.total;
  const articles = state.calc.articles;;
  return {
    total,
    articles,
  };
}
export default connect(mapStateToProps)(Echo);
