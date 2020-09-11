// import axios from 'axios'

// export default axios.create({
//   baseURL: process.env.baseUrl,
//   timeout: 3,
//   withCredentials: true,
// })

import { cacheAdapterEnhancer } from 'axios-extensions';

export default function ({ $axios }) {
  $axios.defaults.adapter = cacheAdapterEnhancer($axios.defaults.adapter);
}
