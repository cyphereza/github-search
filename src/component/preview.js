import React from 'react';
import { Modal } from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import { Base64 } from 'js-base64';
import ReactMarkdown from 'react-markdown';
import { httpService } from '../services';
import { API } from '../constant';

class Preview extends React.Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      data,
      readme: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show !== this.props.show && this.props.show) {
      this.handleReadmeFetch();
    }
  }

  parseDate = unparsedDate => {
    let returnedDate = new Date(Date.parse(unparsedDate));
    return <TimeAgo date={returnedDate} />;
  };

  handleReadmeFetch = async () => {
    const { data } = this.state;
    let url = API.baseURL + API.endpoints.repositoryReadme;
    url = url.replace('theUser/theRepo', data.full_name);

    // console.log(url);

    let response = await httpService.get(url).catch(error => error);

    if (response.status === 200) {
      // console.log(Base64.decode(response.data.content));
      this.setState({ readme: Base64.decode(response.data.content) });
    } else {
      console.log('Error fetching readme');
      this.setState({
        readme: '### This repository does not have a readme. Try visiting the repository page.',
      });
    }
  };

  handleReadmeDisplay = () => {
    return (
      <div className="p-3">{this.state.readme && <ReactMarkdown source={this.state.readme} escapeHtml={false} />}</div>
    );
  };

  render() {
    const { data } = this.state;

    return (
      <Modal {...this.props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
        <Modal.Header className="bg-dark">
          <Modal.Title id="contained-modal-title-vcenter" className="w-100">
            <div className="text-white">
              <div className="d-inline-block float-left">
                <h4 className="small text-white">{data.language}</h4>
                <h4>
                  {data.full_name}
                  <span className="pl-2 text-muted small">last updated {this.parseDate(data.updated_at)}</span>
                </h4>
              </div>
              <a
                href={data.html_url}
                onClick={e => {
                  e.preventDefault();
                  window.open(data.html_url);
                }}
                className="d-inline-block float-right p-3"
              >
                VIEW ON GITHUB
              </a>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{data && this.props.show && this.handleReadmeDisplay()}</Modal.Body>
      </Modal>
    );
  }
}

export default Preview;
