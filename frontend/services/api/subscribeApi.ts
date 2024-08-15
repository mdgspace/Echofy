import axios from "axios";
import { subscribeURLbuildr } from "../url-builder/url-builder";

interface SubscribeResponse {
  code: number;
  message: string;
}

interface SubscribeRequestData {
  email: string;
  username: string;
  userId: string;
  channel: string;
  timestamp: number;
}

const subscribe = async (
  requestData: SubscribeRequestData
): Promise<SubscribeResponse> => {
  const url = subscribeURLbuildr();

  try {
    const response = await axios.post<SubscribeResponse>(
      url,
      requestData, // Pass the requestData object directly
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data;
  }
};

export default subscribe;
