interface CURRENCY_UNIT {
  VND: string;
  WON: string;
  USD: string;
}

interface CURRENCY_UNIT_TRANSLATE {
  WON: string;
  USD: string;
  VND: string;
}

interface DELIVERY_TYPE {
  FREE: string;
  CARRIER: string;
  FEE: string;
}

interface DELIVERY_TYPE_TRANSLATE {
  FREE: string;
  CARRIER: string;
  FEE: string;
}

interface EMAIL_TYPE {
  NO_REPLY: string;
  SUPPORT: string;
}

interface HISTORY_OPERATION {
  ADD: string;
  REMOVE: string;
  REPLACE: string;
  COPY: string;
  MOVE: string;
  TEST: string;
}

interface HISTORY_OPERATION_TRANSLATE {
  ADD: string;
  REMOVE: string;
  REPLACE: string;
  COPY: string;
  MOVE: string;
  TEST: string;
}

interface PRODUCT_TYPE {
  TRADING: string;
  ADVERTISEMENT: string;
}

interface PRODUCT_TYPE_TRANSLATE {
  TRADING: string;
  ADVERTISEMENT: string;
}

interface BLOG_TYPE {
  EXP: string;
  NEW: string;
  PRO: string;
}

interface BLOG_TYPE_TRANSLATE {
  EXP: string;
  NEW: string;
  PRO: string;
}

interface API_TYPE {
  GRAPHQL: string;
  REST: string;
}

interface API_GRAPHQL_KIND {
  QUERY: string;
  MUTATION: string;
  SUBSCRIPTION: string;
}

interface API_REST_METHOD {
  GET: string;
  POST: string;
  PUT: string;
  PATCH: string;
  DELETE: string;
}

interface PERMISSION {
  CUSTOMER_CARE: string;
  WAREHOUSE: string;
  ORDER: string;
}

interface PERMISSION_TRANSLATE {
  CUSTOMER_CARE: string;
  WAREHOUSE: string;
  ORDER: string;
}

interface ROLE {
  ADMIN: string;
  STAFF: string;
  CUSTOMER: string;
}

interface ROLE_TRANSLATE {
  ADMIN: string;
  STAFF: string;
  CUSTOMER: string;
}

interface GRAPHQL_SUBSCRIPTION {
  PRODUCT_ADDED_TO_CART: string;
  PAYMENT_CHANGED: string;
  NOTIFICATION_USER_CREATED: string;
  NOTIFICATION_SYSTEM_CREATED: string;
}

interface ENVIRONMENT {
  DEVELOPMENT: string;
  STAGING: string;
  PRODUCTION: string;
}

interface REGEX {
  ADDRESS: {};
  IMAGE_URL: {};
  IMAGE_BASE64: {};
  NUMBER_ONLY: {};
  VN_PHONE: {};
  EMAIL: {};
  HTTP_URL: {};
}

interface AD_ORDER_STATUS {
  IN_CART: string;
  BOOKING: string;
  PAID: string;
  ON_DELIVERY: string;
  RECEIVED: string;
  CANCEL: string;
  COMPLAIN: string;
}

interface AD_ORDER_STATUS_TRANSLATE {
  IN_CART: string;
  BOOKING: string;
  PAID: string;
  ON_DELIVERY: string;
  RECEIVED: string;
  CANCEL: string;
  COMPLAIN: string;
}

interface ORDER_KIND {
  ORDER: string;
  AD_ORDER: string;
}

interface ORDER_STATUS {
  IN_CART: string;
  BOOKING: string;
  PAID: string;
  ORDERED: string;
  ORDER_FAILED: string;
  AT_WAREHOUSE: string;
  ON_DELIVERY: string;
  RECEIVED: string;
  CANCEL: string;
  COMPLAIN: string;
}

interface ORDER_STATUS_TRANSLATE {
  IN_CART: string;
  BOOKING: string;
  PAID: string;
  ORDERED: string;
  ORDER_FAILED: string;
  AT_WAREHOUSE: string;
  ON_DELIVERY: string;
  RECEIVED: string;
  CANCEL: string;
  COMPLAIN: string;
}

interface ORDER_STATUS_COLOR {
  IN_CART: string;
  BOOKING: string;
  PAID: string;
  ORDERED: string;
  ORDER_FAILED: string;
  AT_WAREHOUSE: string;
  ON_DELIVERY: string;
  RECEIVED: string;
  CANCEL: string;
  COMPLAIN: string;
}

interface DETAIL {
  background: string;
  color: string;
}

interface WHOLESALE {
  background: string;
  color: string;
  padding: string;
  border: string;
  borderRadius: string;
}

interface ORDER_BUTTON_STYLE {
  DETAIL: DETAIL;
  STAFF: DETAIL;
  COMPLAIN: DETAIL;
  CANCEL: DETAIL;
  WHOLESALE: WHOLESALE;
  HISTORY_PAYMENT: WHOLESALE;
}

export interface METHOD {
  VA: string;
  MOMO: string;
}

interface STATUS {
  PENDING: string;
  SUCCESS: string;
  FAILED: string;
  CANCEL: string;
}

interface CONDITION {
  NONE: string;
  EQUAL_OR_GREATER: string;
  EQUAL: string;
  EQUAL_OR_LESSER: string;
}

interface RESULT_CODE {
  '11': string;
  '13': string;
  '99': string;
  '102': string;
  '103': string;
  '110': string;
  '124': string;
  '125': string;
  '200': string;
  '00': string;
  '01': string;
  '02': string;
  '03': string;
  '04': string;
  WAITING_FOR_PAYMENT: string;
  EXPIRED: string;
  CANCEL: string;
}

interface RESULT_CODE_DESCRIPTION {
  '11': string;
  '13': string;
  '99': string;
  '102': string;
  '103': string;
  '110': string;
  '124': string;
  '125': string;
  '200': string;
  '00': string;
  '01': string;
  '02': string;
  '03': string;
  '04': string;
  WAITING_FOR_PAYMENT: string;
  EXPIRED: string;
  CANCEL: string;
}

interface VA {
  CONDITION: CONDITION;
  RESULT_CODE: RESULT_CODE;
  RESULT_CODE_DESCRIPTION: RESULT_CODE_DESCRIPTION;
}

interface RESULT_CODE2 {
  '0': number;
  '10': number;
  '11': number;
  '12': number;
  '13': number;
  '20': number;
  '22': number;
  '40': number;
  '41': number;
  '42': number;
  '43': number;
  '99': number;
  '1000': number;
  '1001': number;
  '1002': number;
  '1003': number;
  '1004': number;
  '1005': number;
  '1006': number;
  '1007': number;
  '1026': number;
  '1080': number;
  '1081': number;
  '2001': number;
  '2007': number;
  '3001': number;
  '3002': number;
  '3003': number;
  '3004': number;
  '4001': number;
  '4010': number;
  '4011': number;
  '4015': number;
  '4100': number;
  '7000': number;
  '8000': number;
  '9000': number;
  CANCEL: string;
}

interface RESULT_CODE_DESCRIPTION {
  '0': string;
  '10': string;
  '11': string;
  '12': string;
  '13': string;
  '20': string;
  '22': string;
  '40': string;
  '41': string;
  '42': string;
  '43': string;
  '99': string;
  '1000': string;
  '1001': string;
  '1002': string;
  '1003': string;
  '1004': string;
  '1005': string;
  '1006': string;
  '1007': string;
  '1026': string;
  '1080': string;
  '1081': string;
  '2001': string;
  '2007': string;
  '3001': string;
  '3002': string;
  '3003': string;
  '3004': string;
  '4001': string;
  '4010': string;
  '4011': string;
  '4015': string;
  '4100': string;
  '7000': string;
  '8000': string;
  '9000': string;
  CANCEL: string;
}

interface RESULT_CODE_RECOMMEND_ACTIONS {
  '0': string;
  '10': string;
  '11': string;
  '12': string;
  '13': string;
  '20': string;
  '22': string;
  '40': string;
  '41': string;
  '42': string;
  '43': string;
  '99': string;
  '1000': string;
  '1001': string;
  '1002': string;
  '1003': string;
  '1004': string;
  '1005': string;
  '1006': string;
  '1007': string;
  '1026': string;
  '1080': string;
  '1081': string;
  '2001': string;
  '2007': string;
  '3001': string;
  '3002': string;
  '3003': string;
  '3004': string;
  '4001': string;
  '4010': string;
  '4011': string;
  '4015': string;
  '4100': string;
  '7000': string;
  '8000': string;
  '9000': string;
  CANCEL: string;
}

interface PRODUCT_ATTRIBUTE_TYPE {
  TEXT: string;
  COLOR: string;
}

interface PRODUCT_AFFILIATE_TYPE {
  UNIT: string;
  PERCENT: string;
}

interface PRODUCT_SCHEDULER_DISCOUNT_TYPE {
  UNIT: string;
  PERCENT: string;
}

interface DATE_OF_WEEK {
  MONDAY: string;
  TUESDAY: string;
  WEDNESDAY: string;
  THURSDAY: string;
  FRIDAY: string;
  SATURDAY: string;
  SUNDAY: string;
}

interface FEE_TYPE {
  PURCHASE: string;
  REFERRER: string;
  HQ_SHIPPING: string;
  VN_SHIPPING: string;
  EXTRA: string;
}

interface FEE_TYPE_TRANSLATE {
  PURCHASE: string;
  REFERRER: string;
  HQ_SHIPPING: string;
  VN_SHIPPING: string;
  EXTRA: string;
}

interface FEE_VALUE_TYPE {
  VALUE: string;
  PERCENT: string;
}

interface FEE_WEIGHT_UNIT {
  KG: string;
}

interface LOG_TYPE {
  EXTENSION: string;
  USER_WEB: string;
  ADMIN_WEB: string;
  CORE_API: string;
  THIRD_PARTY_SERVICES: string;
}

interface LOG_PRIORITY {
  LOW: string;
  MEDIUM: string;
  HIGH: string;
  URGENT: string;
}

interface LOG_PRIORITY_COLOR {
  LOW: string;
  MEDIUM: string;
  HIGH: string;
  URGENT: string;
}

interface NOTIFICATION_TARGET {
  SYSTEM: string;
  USER: string;
}

interface NOTIFICATION_TYPE {
  BLOG: string;
  ORDER: string;
  USER: string;
  MISSION: string;
  WITHDRAWAL: string;
}

interface CLOUD_IMAGE_CATEGORY {
  PRODUCT_RATING: string;
  MISSION_CLAIM: string;
  CONTENT_BANNER: string;
  CONTENT_BLOG: string;
  CONTENT_CATEGORY: string;
  CONTENT_PARTNER: string;
  CONTENT_POPUP: string;
  SYSTEM_USER: string;
  SYSTEM_WEB: string;
  PRODUCT_IMAGES: string;
  PRODUCT_DOWNLOAD_IMAGES: string;
  PRODUCT_BRAND: string;
  EMAIL_EXTERNAL: string;
}

interface STAFF {
  CUSTOMER_CARE: string;
  WAREHOUSE: string;
  ORDER: string;
}

interface TOPIC_BY_ROLE {
  ADMIN: string;
  STAFF: STAFF;
  CUSTOMER: string;
  WHOLESALE: string;
}

interface MESSAGING {
  TOPIC_BY_ROLE: TOPIC_BY_ROLE;
}

interface FIREBASE {
  MESSAGING: MESSAGING;
}

interface MISSION_TYPE {
  DUTY: string;
  BONUS: string;
}

interface MISSION_CLAIM_STATUS {
  PENDING: string;
  APPROVED: string;
  REJECTED: string;
}

interface PAYMENT {
  METHOD: METHOD;
  METHOD_TRANSLATE: METHOD;
  STATUS: STATUS;
  STATUS_TRANSLATE: STATUS;
  VA: VA;
  MOMO: {
    RESULT_CODE: RESULT_CODE2;
    RESULT_CODE_RECOMMEND_ACTIONS: RESULT_CODE_RECOMMEND_ACTIONS;
    RESULT_CODE_DESCRIPTION: RESULT_CODE_DESCRIPTION;
  };
}

export interface Enums {
  CURRENCY_UNIT: CURRENCY_UNIT;
  CURRENCY_UNIT_TRANSLATE: CURRENCY_UNIT_TRANSLATE;
  DELIVERY_TYPE: DELIVERY_TYPE;
  DELIVERY_TYPE_TRANSLATE: DELIVERY_TYPE_TRANSLATE;
  EMAIL_TYPE: EMAIL_TYPE;
  HISTORY_OPERATION: HISTORY_OPERATION;
  HISTORY_OPERATION_TRANSLATE: HISTORY_OPERATION_TRANSLATE;
  PRODUCT_TYPE: PRODUCT_TYPE;
  PRODUCT_TYPE_TRANSLATE: PRODUCT_TYPE_TRANSLATE;
  BLOG_TYPE: BLOG_TYPE;
  BLOG_TYPE_TRANSLATE: BLOG_TYPE_TRANSLATE;
  API_TYPE: API_TYPE;
  API_GRAPHQL_KIND: API_GRAPHQL_KIND;
  API_REST_METHOD: API_REST_METHOD;
  PERMISSION: PERMISSION;
  PERMISSION_TRANSLATE: PERMISSION_TRANSLATE;
  ROLE: ROLE;
  ROLE_TRANSLATE: ROLE_TRANSLATE;
  GRAPHQL_SUBSCRIPTION: GRAPHQL_SUBSCRIPTION;
  DEFAULT_WEEKDAY_DATE_TIME_FORMAT: string;
  DEFAULT_WEEKDAY_DATE_TIME_FORMAT_FULL: string;
  DEFAULT_DATE_TIME_FORMAT: string;
  DEFAULT_DATE_TIME_FORMAT_FULL: string;
  DEFAULT_DATE_FORMAT: string;
  DEFAULT_TIME_FORMAT: string;
  DEFAULT_TIME_FORMAT_SHORT_12: string;
  DEFAULT_TIME_FORMAT_SHORT_24: string;
  DEFAULT_DATE_FORMAT_SERVER: string;
  DEFAULT_TIME_FORMAT_SERVER: string;
  SELECT_OPTION_ALL: string;
  SELECT_OPTION_ALL_TRANSLATE: string;
  IMAGE_FALLBACK: string;
  ENVIRONMENT: ENVIRONMENT;
  REGEX: REGEX;
  AD_ORDER_STATUS: AD_ORDER_STATUS;
  AD_ORDER_STATUS_TRANSLATE: AD_ORDER_STATUS_TRANSLATE;
  ORDER_KIND: ORDER_KIND;
  ORDER_KIND_TRANSLATE: ORDER_KIND;
  ORDER_STATUS: ORDER_STATUS;
  ORDER_STATUS_TRANSLATE: ORDER_STATUS;
  ORDER_STATUS_COLOR: ORDER_STATUS_COLOR;
  ORDER_BUTTON_STYLE: ORDER_BUTTON_STYLE;
  PAYMENT: PAYMENT;
  PRODUCT_ATTRIBUTE_TYPE: PRODUCT_ATTRIBUTE_TYPE;
  PRODUCT_ATTRIBUTE_TYPE_TRANSLATE: PRODUCT_ATTRIBUTE_TYPE;
  PRODUCT_AFFILIATE_TYPE: PRODUCT_AFFILIATE_TYPE;
  PRODUCT_AFFILIATE_TYPE_TRANSLATE: PRODUCT_AFFILIATE_TYPE;
  PRODUCT_SCHEDULER_DISCOUNT_TYPE: PRODUCT_SCHEDULER_DISCOUNT_TYPE;
  PRODUCT_SCHEDULER_DISCOUNT_TYPE_TRANSLATE: PRODUCT_SCHEDULER_DISCOUNT_TYPE;
  DATE_OF_WEEK: DATE_OF_WEEK;
  DATE_OF_WEEK_TRANSLATE: DATE_OF_WEEK;
  DATE_OF_WEEK_TRANSLATE_SHORT: DATE_OF_WEEK;
  FEE_TYPE: FEE_TYPE;
  FEE_TYPE_TRANSLATE: FEE_TYPE;
  FEE_VALUE_TYPE: FEE_VALUE_TYPE;
  FEE_VALUE_TYPE_TRANSLATE: FEE_VALUE_TYPE;
  FEE_WEIGHT_UNIT: FEE_WEIGHT_UNIT;
  FEE_WEIGHT_UNIT_TRANSLATE: FEE_WEIGHT_UNIT;
  LOG_TYPE: LOG_TYPE;
  LOG_TYPE_TRANSLATE: LOG_TYPE;
  LOG_PRIORITY: LOG_PRIORITY;
  LOG_PRIORITY_TRANSLATE: LOG_PRIORITY;
  LOG_PRIORITY_COLOR: LOG_PRIORITY_COLOR;
  NOTIFICATION_TARGET: NOTIFICATION_TARGET;
  NOTIFICATION_TYPE: NOTIFICATION_TYPE;
  CLOUD_IMAGE_CATEGORY: CLOUD_IMAGE_CATEGORY;
  CLOUD_IMAGE_ALLOWED_TYPE: string[];
  CLOUD_IMAGE_ALLOWED_MIME_TYPE: string;
  CLOUD_VIDEO_ALLOWED_TYPE: string[];
  CLOUD_FILE_ALLOWED_TYPE: string[];
  CLOUD_FILE_ALLOWED_MIME_TYPE: string;
  FIREBASE: FIREBASE;
  GHTK_GET_SHIPPING_FEE: string;
  VA_DASHBOARD_URL: string;
  MISSION_TYPE: MISSION_TYPE;
  MISSION_TYPE_TRANSLATE: MISSION_TYPE;
  MISSION_CLAIM_STATUS: MISSION_CLAIM_STATUS;
  MISSION_CLAIM_STATUS_TRANSLATE: MISSION_CLAIM_STATUS;
  MISSION_CLAIM_STATUS_COLOR: MISSION_CLAIM_STATUS;
  WITHDRAWAL_STATUS: MISSION_CLAIM_STATUS;
  WITHDRAWAL_STATUS_TRANSLATE: MISSION_CLAIM_STATUS;
  WITHDRAWAL_STATUS_COLOR: MISSION_CLAIM_STATUS;
  WITHDRAWAL_MINIMUM_AMOUNT: number;
}
