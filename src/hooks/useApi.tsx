import axios, { AxiosError, AxiosHeaders } from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { hideLoader, showLoader } from "../redux/appSettings";
import { APP_LANG } from "@/langs";
import { API_URL } from "@/utils/endpoints";

type requestProps = {
  url: string;
  headers?: AxiosHeaders | object;
  data?: object;
  params?: object;
  requireAuth?: boolean;
  removeHost?: boolean;
  load?: boolean;
};

export default () => {
  const logedUser = useSelector(
    (state: RootState) => state.user || { token: "" },
    shallowEqual
  );
  const token = logedUser?.token;
  const dispatch = useDispatch();
  // const navigation = useNavigation<ScreenNavigationProp>();
  // console.log( logedUser?.token);
  // console.log({logedUser});
  const onCatchError = (error: AxiosError) => {
    console.log("on chatch error: ", error);
    if (error.response) {
      // const { status, data }: any = error.response;
      console.log("error.response: ", error.response);

      return error.response;
      // switch (status) {
      //   case 404:
      //     return { error: "Server Error " + status, message: data?.message };
      //   case 401:
      //     // navigation.replace('Login');
      //     return { error: "Unauthorized " + status, message: data?.message };
      //   case 403:
      //     return { error: "Forbidden" + status, message: data?.message };
      //   default:
      //     return { error: "Server Error " + status, message: data?.message };
      // }
    } else if (error.request) {
      // console.log('error.request: ', error.request);
      // return {error: i18next.t('Make sure about internet')};
    }
    return { error: "Connection Error.", data: "Connection Error." };
  };

  const getDataAndParams = ({ data, params }: any) => ({
    data: JSON.stringify(data),
    params: { lang: APP_LANG(), ...params },
  });
  const getDataAndParamsGet = ({ params }: any) => ({
    params: { lang: APP_LANG(), ...params },
  });

  const validateUser = () => {
    if (!token) {
      console.log("go to login");
    }
    return false;
  };
  const postWithoutAuth = async ({
    url,
    headers = {},
    data = {},
    params = {},
    removeHost,
    load = true,
  }: requestProps) => {
    // console.log({data: data, url, userId: logedUser?.user.id});
    // console.log("Call Post Request " + API_URL + url);
    // console.log("Post data ", data);
    // console.log("Post params ", params);
    if (load) dispatch(showLoader());
    return await axios({
      url: removeHost ? url : `${API_URL}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        lang: APP_LANG(),
        "Content-type": "Application/json",
        ...headers,
      },
      method: "POST",
      ...getDataAndParams({ data, params }),
    })
      .then(({ data }) => data)
      .catch(onCatchError)
      .finally(() => load && dispatch(hideLoader()));
  };
  const post = async ({
    url,
    headers = {},
    data = {},
    params = {},
    removeHost,
    load = true,
  }: requestProps) => {
    // console.log({data: data, url, userId: logedUser?.user.id});
    // console.log('Call Post Request ' + API_URL + url);
    // console.log('Post data ', data);
    // console.log('Post params ', params);
    if (validateUser()) return;
    if (load) dispatch(showLoader());

    return await axios({
      url: removeHost ? url : `${API_URL}${url}`,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        lang: APP_LANG(),
        "Content-type": "Application/json",
        ...headers,
      },
      method: "POST",
      ...getDataAndParams({ data, params }),
    })
      .then(({ data }) => data)
      .catch(onCatchError)
      .finally(() => load && dispatch(hideLoader()));
  };
  const put = async ({
    url,
    headers = {},
    data = {},
    params = {},
    removeHost,
    load = true,
  }: requestProps) => {
    // console.log({data: data, url, userId: logedUser?.user.id});
    // console.log('Call Post Request ' + API_URL + url);
    // console.log('Post data ', data);
    // console.log('Post params ', params);
    if (validateUser()) return;
    if (load) dispatch(showLoader());

    return await axios({
      url: removeHost ? url : `${API_URL}${url}`,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        lang: APP_LANG(),
        "Content-type": "Application/json",
        ...headers,
      },
      method: "PUT",
      ...getDataAndParams({ data, params }),
    })
      .then(({ data }) => data)
      .catch(onCatchError)
      .finally(() => load && dispatch(hideLoader()));
  };
  const postFormData = async ({
    url,
    headers = {},
    data = {},
    load = true,
  }: requestProps) => {
    // console.log({data: data, url, userId: logedUser?.user.id});
    // console.log('Call Post form data Request ' + API_URL + url);
    // console.log('Post data ', data);
    // console.log('Post params ', params);
    if (validateUser()) return;
    if (load) dispatch(showLoader());

    return await axios({
      url: `${API_URL}${url}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        lang: APP_LANG(),
        ...headers,
      },
      method: "POST",
      data,
    })
      .then(({ data }) => data)
      .catch(onCatchError)
      .finally(() => load && dispatch(hideLoader()));
  };
  const deleteMethod = async ({
    url,
    headers = {},
    data = {},
    params = {},
    load = true,
  }: requestProps) => {
    // console.log('Call Post Request ' + API_URL + url);
    // console.log('Post data ', data);
    // console.log('Post params ', params);
    if (load) dispatch(showLoader());

    return await axios({
      url: `${API_URL}${url}`,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        "Content-type": "Application/json",
        lang: APP_LANG(),
        ...headers,
      },
      method: "DELETE",
      ...getDataAndParams({ data, params }),
    })
      .then(({ data }) => data)
      .catch(onCatchError)
      .finally(() => load && dispatch(hideLoader()));
  };

  const get = async ({
    url,
    headers = {},
    data = {},
    params = {},
    removeHost,
    load = true,
  }: requestProps) => {
    // console.log('Call Post Request ' + API_URL + url);
    // console.log('Post data ', data);
    // console.log('Post params ', params);
    if (load) dispatch(showLoader());

    return await axios({
      url: removeHost ? url : `${API_URL}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        lang: APP_LANG(),
        ...headers,
      },
      ...getDataAndParamsGet({ data, params }),
    })
      .then(({ data }) => data)
      .catch(onCatchError)
      .finally(() => load && dispatch(hideLoader()));
  };

  return { get, post, put, postFormData, deleteMethod, postWithoutAuth };
};