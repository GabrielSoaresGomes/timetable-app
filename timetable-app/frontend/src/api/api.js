class BaseApi {
    constructor() {
        this.baseUrl = process.env.REACT_APP_BASEURL;
    }
}

export default BaseApi;