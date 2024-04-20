import axios from "axios"

const getStr = () => {
  let url = "fastapi/str"
  return axios({
    url: url,
    method: "get",
  })
}

const getWs = () => {
  let url = "fastapi/ws"
  return axios({
    url: url,
    method: "get",
  })
}

export { getStr, getWs }
