import axios from 'axios';
import { API } from '../../constant';

let instance = null;

class HttpService {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;

    const http = axios.create({
      baseURL: API.baseURL,
    });

    this.http = http;
  }

  get(path) {
    return this.http.get(path).then(response => response);
  }
}

export default new HttpService();
