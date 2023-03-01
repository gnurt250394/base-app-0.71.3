import DeviceInfo from 'react-native-device-info';
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Dimensions } from "react-native";
import { getFlag } from './resources/flags';
import { FlagType, TcodeArea } from 'res/type/codeArea';
import Countries from './resources/countries.json'
const Constants = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  FONTS_APP: "Mulish",
};
export default Constants;
export const AppName = DeviceInfo.getApplicationName()
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export const HEADER_HEIGHT = 108 - getStatusBarHeight();

export const getListCoutry = (): TcodeArea[] => {
  return Countries.map((item) => ({
    ...item,
    image: getFlag(item.iso2 as FlagType)
  }))
}
export const getCountry = (code: FlagType): TcodeArea | undefined => {
  let data = getListCoutry()
  let obj = data.find(e => e.iso2 == (code || 'vn'))
  return obj
}
export enum ConsultsType {
  LiveChat = "LiveChat",
  Message = "Message",
  VoiceCall = "VoiceCall",
  Appointment = "Appointment",
  VideoCall = "VideoCall",
}
export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum ConsultsStatus {
  stillInProgress = 1,
  accepted = 2,
  unConFirmed = 3,
  completed = 4,
  canceled = 5,
}


export const SocketType = {
  OFFER: 'OFFER',
  ANSWER: 'ANSWER',
  INCOMING_CALL: 'INCOMING_CALL',
  CANDIDATE: 'CANDIDATE',
  LEAVE: 'LEAVE',
  REJECT: 'REJECT',
  DELINE: 'DELINE',
  DISCONNECT: 'DISCONNECT',
  CONNECT: 'connectFirebase',
  CHECKING: 'CHECKING',
  GET_LIST_GROUP: 'GET_LIST_GROUP',
  SEND_MESSAGE: 'SEND_MESSAGE',
  CREATE_ROOM: 'CREATE_ROOM',
  JOIN_ROOM: 'JOIN_ROOM',
  USER_JOIN: 'USER_JOIN',
  MESSAGE: 'MESSAGE',
  TYPING: 'TYPING',
  QUESTION: 'QUESTION_',
  ERROR: 'ERROR',
  SET_PEER_ID: 'SET_PEER_ID',
  REGISTER: 'REGISTER',
  USER_CHANGE: 'USER_CHANGE',
  ACCEPTED_CALL: 'ACCEPTED_CALL',
  REJECTED_CALL: 'REJECTED_CALL',
  CALL: 'CALL'
}