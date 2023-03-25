import { Axios } from "axios";

export class UploadService {
  #axios: Axios;
  constructor(axios: Axios = new Axios({})) {
    this.#axios = axios;
  }

  async put(url: string, file: File) {
    return this.#axios.request({
      url,
      data: file,
      headers: {
        "Content-Type": file.type,
      },
      method: "put",
    });
  }
}
