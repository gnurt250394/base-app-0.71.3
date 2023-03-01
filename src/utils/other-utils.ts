import moment from 'moment';
import {Alert} from 'react-native';
import colors from 'res/colors';
import {
  AdvertisementProduct,
  AllOrders,
  CartCategoryProps,
  StatusOrderType,
} from 'res/type/Cart';
import {AdvertisementProductScheduler, HotDealsItemProp} from 'res/type/Home';
import short from 'short-uuid';

export const uuidTranslator = short();
export const checkPhoneNumberVietnamese = /^(\+?84|0|\(\+?84\))[1-9]\d{8,9}$/g;
const addDate = (endDate: string, endTime: string) => {
  var secondsToMinutes = endTime; //='3:20';

  var seconds = secondsToMinutes.split(':')[2];
  var minutes = secondsToMinutes.split(':')[1];
  var hours = secondsToMinutes.split(':')[0];

  var date = new Date(endDate);
  date.setHours(hours, minutes, seconds);
  return date;
};
export const isVoucher = (e: AdvertisementProductScheduler) => {
  if (e?.endDate) {
    let date = addDate(e?.endDate, e?.endTime);
    let isEndDate = moment(date).diff(moment(), 'second');
    if (isEndDate > 0) {
      return true;
    }

    return false;
  }
  return true;
};
export const getSlug = (url: string) => {
  let slug = '';
  slug = url.split('/').pop() || '';

  return slug;
};
export const getPriceVoucher = (item: AdvertisementProduct) => {
  let price = (item?.schedulers || [])?.reduce((total, curr) => {
    if (isVoucher(curr)) {
      if (curr.discountType.toLowerCase() == 'percent') {
        total = item?.price - (item.price * curr.discountValue) / 100;
      } else if (curr.discountType.toLowerCase() == 'unit') {
        total = item.price - curr.discountValue;
      }
    } else {
      total = 0;
    }
    return parseInt(String(total));
  }, 0);
  return price;
};
export const getPriceVoucherColaborator = (item: CartCategoryProps) => {
  let price = (item?.schedulers || [])?.reduce((total, curr) => {
    if (curr.discountType.toLowerCase() == 'percent') {
      total =
        item?.product?.price -
        (item?.product?.price * curr.discountValue) / 100;
    } else if (curr.discountType.toLowerCase() == 'unit') {
      total = item?.product?.price - curr.discountValue;
    }
    return parseInt(String(total));
  }, 0);
  return price;
};
export const getColor = (status: StatusOrderType, isOpacity?: boolean) => {
  let color = '';
  switch (status) {
    case 'COMPLAIN':
    case 'RECEIVED':
      color = colors.Blue;
      break;
    case 'PAID':
      color = colors.borderFocus;
      break;
    case 'ON_DELIVERY':
      color = colors.inactive;
      break;
    case 'CANCEL':
    case 'ORDER_FAILED':
      color = colors.error;
      break;
    case 'BOOKING':
    case 'AT_WAREHOUSE':
      color = colors.warning;
      break;

    default:
      color = colors.borderFocus;
      break;
  }
  if (isOpacity) {
    color += '20';
  }
  return color;
};
export const getNameStatus = (status: StatusOrderType) => {
  let data = {
    ['COMPLAIN']: 'Khiếu nại',
    ['IN_CART']: '',
    ['BOOKING']: 'Chờ thanh toán',
    ['PAID']: 'Đã thanh toán',
    ['ORDERED']: '',
    ['ORDER_FAILED']: '',
    ['AT_WAREHOUSE']: '',
    ['ON_DELIVERY']: 'Đang gửi hàng',
    ['RECEIVED']: 'Đã nhận',
    ['CANCEL']: 'Đã hủy',
  };
  return data[status];
};
export const getFileName = (key: string): string => {
  let fileName = `${key + new Date().getTime()}.jpg`;
  return fileName;
};

export const createCode = (id: string) => {
  if (!id) {
    return '';
  }
  return `OH-${uuidTranslator.fromUUID(id)}`;
};
export const getCode = (id: string) => {
  if (!id) {
    return;
  }
  let code = id.split('-')[1];
  return uuidTranslator.toUUID(String(code));
};
export const getPriceProduct = (
  data: any[],
  key: 'priceWholeSale' | 'price' | 'feeResale',
) => {
  return data.reduce((total, cur) => {
    if (key == 'feeResale') {
      total += cur?.[key] * cur.amount || 0;
    } else {
      total += cur.product?.[key] * cur.amount || 0;
    }
    return total;
  }, 0);
};

export function hasOnlyBrChildren(node: any) {
  return node.children.every(
    (child: any) => child.type === 'text' && child.data === 'Froala Editor',
  );
}

export function alterChildren(node: any) {
  return node.children.filter(
    (child: any) =>
      !(child.type == 'text' && child.data == 'Powered by ') &&
      !(child.name === 'a' && hasOnlyBrChildren(child)),
  );
}

export const htmltoText = (html: string) => {
  let text = html;
  text = text.replace(/\n/gi, '');
  text = text.replace(/<style([\s\S]*?)<\/style>/gi, '');
  text = text.replace(/<script([\s\S]*?)<\/script>/gi, '');
  text = text.replace(/<a.*?href="(.*?)[\?\"].*?>(.*?)<\/a.*?>/gi, ' $2 $1 ');
  text = text.replace(/<\/div>/gi, '\n\n');
  text = text.replace(/<\/li>/gi, '\n');
  text = text.replace(/<li.*?>/gi, '  *  ');
  text = text.replace(/<\/ul>/gi, '\n\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<br\s*[\/]?>/gi, '\n');
  text = text.replace(/<[^>]+>/gi, '');
  text = text.replace(/^\s*/gim, '');
  text = text.replace(/ ,/gi, ',');
  text = text.replace(/ +/gi, ' ');
  text = text.replace(/\n+/gi, '\n\n');
  return text;
};

export const ENVIRONMENT = {
  DEVELOPMENT: 'DEVELOPMENT',
  STAGING: 'STAGING',
  PRODUCTION: 'PRODUCTION',
};
export const FIREBASE = {
  MESSAGING: {
    TOPIC_BY_ROLE: {
      ADMIN: 'ADMIN',
      STAFF: {
        CUSTOMER_CARE: 'CUSTOMER_CARE',
        WAREHOUSE: 'WAREHOUSE',
        ORDER: 'ORDER',
      },
      CUSTOMER: 'CUSTOMER',
      WHOLESALE: 'WHOLESALE',
    },
  },
};
interface FirebaseTopicParams {
  forSale?: boolean;
  forWholeSale?: boolean;
}

export const getFirebaseTopics = ({
  forSale,
  forWholeSale,
}: FirebaseTopicParams) => {
  const currentEnvironment = ENVIRONMENT.STAGING;

  let mappedTopics = '';

  if (forSale && forWholeSale) {
    mappedTopics = `'${currentEnvironment}_${FIREBASE?.MESSAGING?.TOPIC_BY_ROLE?.CUSTOMER}' in topics && '${currentEnvironment}_${FIREBASE?.MESSAGING?.TOPIC_BY_ROLE?.WHOLESALE}' in topics`;
  } else if (forSale) {
    mappedTopics = `${currentEnvironment}_${FIREBASE?.MESSAGING?.TOPIC_BY_ROLE?.CUSTOMER}`;
  } else if (forWholeSale) {
    mappedTopics = `${currentEnvironment}_${FIREBASE?.MESSAGING?.TOPIC_BY_ROLE?.WHOLESALE}`;
  }

  return mappedTopics;
};
