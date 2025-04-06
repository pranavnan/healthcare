import axios from 'axios';
import type { IncomingMessage } from 'http';

interface BuildClientArgs {
  req?: IncomingMessage;
}

// Create a reusable API client that handles cookie forwarding for server-side requests
// and sets the base URL for client and server environments
const buildClient = ({ req }: BuildClientArgs = {}) => {
  if (typeof window === 'undefined' && req) {
    // We are on the server
    // Requests should be made to the external service
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // We are on the browser
    // Requests can be made with a base URL of ''
    return axios.create({
      baseURL: '/'
    });
  }
};

export default buildClient; 