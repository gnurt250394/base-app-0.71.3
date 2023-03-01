import colors from "res/colors";
import images from "res/images";
import strings from "res/strings";
import Routes from "./Routes";
export const DataStatus = [
  {
    value: 'Chờ thanh toán',
    id: 1,
  },
  {
    id: 2,
    value: 'Đã thanh toán'
  },
  {
    id: 3,
    value: 'Đang đặt hàng'
  },
  {
    id: 4,
    value: 'Đặt hàng thất bại'
  },
  {
    id: 5,
    value: 'Đã nhập kho'
  },
  {
    id: 6,
    value: 'Đã gửi hàng'
  },
  {
    id: 7,
    value: 'Đã nhận hàng'
  },
  {
    id: 8,
    value: 'Đã huỷ đơn'
  },
  {
    id: 9,
    value: 'Đang khiếu nại'
  },
]
export const DataCategory = [
  {
    "id": "1d41309c-8571-4663-93a1-ddd65f26e373",
    "slug": "San-pham-4",
    "name": "Sản phẩm 4",
    "categoryIds": [
      "b9ef8a8c-177a-408a-8f53-3ad7047767d8"
    ],
    "images": [
      "https://res.cloudinary.com/cyberskill/image/upload/v1631090971/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban1-1631090970203.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1631090972/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban2-1631090970221.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1631090972/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban3-1631090970229.jpg"
    ],
    "type": "TRADING",
    "price": 5000000,
    "availableForShopping": true,
    "hasShippingFee": false,
    "estimateShippingTimeFrom": null,
    "estimateShippingTimeTo": null,
    "isSpecialOffer": null,
    "link": null,
    "schedulers": [
      {
        "id": "b9992cec-bfe3-4069-924c-4e161ec312b4",
        "name": "giàm 50,000",
        "advertisementProductType": "TRADING",
        "discountType": "unit",
        "discountValue": 50000,
        "startTime": "00:00:00",
        "endTime": "23:55:00",
        "selectedDay": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "advertisementProductIds": [
          "1d41309c-8571-4663-93a1-ddd65f26e373"
        ],
        "isSpecialOffer": true,
        "createdAt": "2021-08-10T10:30:06.748Z",
        "updatedAt": "2021-09-08T08:55:24.203Z",
        "isDel": false,
        "__typename": "AdvertisementProductScheduler"
      }
    ],
    "attributes": [

    ],
    "isDel": false,
    "__typename": "AdvertisementProduct"
  },
  {
    "id": "423d079a-16fd-454b-904d-c4be9f396e3a",
    "slug": "Hong-Sam-Tre-Em",
    "name": "Hồng Sâm Trẻ Em ",
    "categoryIds": [
      "b9ef8a8c-177a-408a-8f53-3ad7047767d8"
    ],
    "images": [
      "https://res.cloudinary.com/cyberskill/image/upload/v1630811564/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/baner2-1630811562658.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1630811564/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/baner3-1630811562676.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1630811564/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/baner4-1630811562697.jpg"
    ],
    "type": "ADVERTISEMENT",
    "price": 5000000,
    "availableForShopping": true,
    "hasShippingFee": false,
    "estimateShippingTimeFrom": null,
    "estimateShippingTimeTo": null,
    "isSpecialOffer": null,
    "link": null,
    "schedulers": [

    ],
    "attributes": [

    ],
    "isDel": false,
    "__typename": "AdvertisementProduct"
  },
  {
    "id": "76926ec2-fd98-4052-8f60-203937bee9ca",
    "slug": "Hong-Sam-2",
    "name": "Hồng Sâm 2",
    "categoryIds": [
      "b9ef8a8c-177a-408a-8f53-3ad7047767d8"
    ],
    "images": [
      "https://res.cloudinary.com/cyberskill/image/upload/v1630770821/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban1-1630770819944.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1630770821/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban2-1630770820005.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1630770822/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban3-1630770820142.jpg"
    ],
    "type": "TRADING",
    "price": 2350000,
    "availableForShopping": true,
    "hasShippingFee": false,
    "estimateShippingTimeFrom": null,
    "estimateShippingTimeTo": null,
    "isSpecialOffer": null,
    "link": null,
    "schedulers": [
      {
        "id": "e36a50de-5149-48a8-b029-36f2d0d753a6",
        "name": "Giảm giá 13%",
        "advertisementProductType": "TRADING",
        "discountType": "percent",
        "discountValue": 13,
        "startTime": "00:05:00",
        "endTime": "23:55:00",
        "selectedDay": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "advertisementProductIds": [
          "76926ec2-fd98-4052-8f60-203937bee9ca"
        ],
        "isSpecialOffer": true,
        "createdAt": "2021-09-08T07:31:45.404Z",
        "updatedAt": "2021-09-08T07:33:17.852Z",
        "isDel": false,
        "__typename": "AdvertisementProductScheduler"
      }
    ],
    "attributes": [
      {
        "name": "Kích thước",
        "type": "text",
        "value": [
          "100ml",
          "200ml",
          "300 ml"
        ],
        "__typename": "AdvertisementProductAttribute"
      },
      {
        "name": "Màu sắc",
        "type": "text",
        "value": [
          "Xanh",
          "Đỏ",
          "Vàng"
        ],
        "__typename": "AdvertisementProductAttribute"
      }
    ],
    "isDel": false,
    "__typename": "AdvertisementProduct"
  },
  {
    "id": "34a43ae5-917f-4d0a-b37a-f4a53aaa39de",
    "slug": "Hong-Sam-1",
    "name": " Hồng Sâm 1",
    "categoryIds": [
      "62956298-c1bc-4d1b-a4bc-8aab5471bc09",
      "6e540d15-bd36-4069-91a4-78e5e0ce8320",
      "0d7441b5-d49d-47f5-a73f-2fd6446fef7d",
      "40c2fe84-0c5d-42f8-949f-37d3f8bf6088"
    ],
    "images": [
      "https://res.cloudinary.com/cyberskill/image/upload/v1630770197/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban2-1630770196306.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1630770198/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban3-1630770196379.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1630770197/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban1-1630770196390.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1630770199/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban4-1630770196549.jpg",
      "https://res.cloudinary.com/cyberskill/image/upload/v1630770198/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban5-1630770196540.jpg"
    ],
    "type": "TRADING",
    "price": 1500000,
    "availableForShopping": true,
    "hasShippingFee": false,
    "estimateShippingTimeFrom": null,
    "estimateShippingTimeTo": null,
    "isSpecialOffer": null,
    "link": null,
    "schedulers": [
      {
        "id": "d2d73793-3367-4def-b403-5375910f7ddb",
        "name": "Giảm giá 10%",
        "advertisementProductType": "TRADING",
        "discountType": "percent",
        "discountValue": 10,
        "startTime": "00:00:00",
        "endTime": "23:55:00",
        "selectedDay": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "advertisementProductIds": [
          "47c108e7-2425-471d-970f-650d63eb3c76",
          "058da343-6dd5-4ece-b31d-55e663ce4e6a",
          "34a43ae5-917f-4d0a-b37a-f4a53aaa39de"
        ],
        "isSpecialOffer": false,
        "createdAt": "2021-08-10T10:23:04.992Z",
        "updatedAt": "2021-09-05T08:00:59.137Z",
        "isDel": false,
        "__typename": "AdvertisementProductScheduler"
      }
    ],
    "attributes": [

    ],
    "isDel": false,
    "__typename": "AdvertisementProduct"
  }
]

export const DataCategory2 = [
  {
    image:
      'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
    name: 'Danh muc 1',
    id: '1',
    isSelected: true,
  },
  {
    image:
      'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
    name: 'Danh muc 1.2',
    id: '2'
  },
  {
    image:
      'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
    name: 'Danh muc 1.3',
    id: '3'
  },
  {
    image:
      'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
    name: 'Danh muc 1.4',
    id: '4'
  },
  {
    image:
      'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
    name: 'Danh muc 1.5',
    id: '5'
  },
]
export const DataDetailCategory = {
  "id": "34a43ae5-917f-4d0a-b37a-f4a53aaa39de",
  "slug": "Hong-Sam-1",
  "name": " Hồng Sâm 1",
  "categoryIds": [
    "62956298-c1bc-4d1b-a4bc-8aab5471bc09",
    "6e540d15-bd36-4069-91a4-78e5e0ce8320",
    "0d7441b5-d49d-47f5-a73f-2fd6446fef7d",
    "40c2fe84-0c5d-42f8-949f-37d3f8bf6088"
  ],
  "images": [
    "https://res.cloudinary.com/cyberskill/image/upload/v1630770197/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban2-1630770196306.jpg",
    "https://res.cloudinary.com/cyberskill/image/upload/v1630770198/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban3-1630770196379.jpg",
    "https://res.cloudinary.com/cyberskill/image/upload/v1630770197/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban1-1630770196390.jpg",
    "https://res.cloudinary.com/cyberskill/image/upload/v1630770199/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban4-1630770196549.jpg",
    "https://res.cloudinary.com/cyberskill/image/upload/v1630770198/seoullife/stag/product/90f3ffde3d4cd11ab3602170672bbe7ddf90cae7959aec4cb6cdccd424bd2f90ecbf3a68d110529ad492a168fd8ea4c6/ban5-1630770196540.jpg"
  ],
  "type": "TRADING",
  "price": 1500000,
  "availableForShopping": true,
  "hasShippingFee": false,
  "estimateShippingTimeFrom": null,
  "estimateShippingTimeTo": null,
  "isSpecialOffer": null,
  "link": null,
  "schedulers": [
    {
      "id": "d2d73793-3367-4def-b403-5375910f7ddb",
      "name": "Giảm giá 10%",
      "advertisementProductType": "TRADING",
      "discountType": "percent",
      "discountValue": 10,
      "startTime": "00:00:00",
      "endTime": "23:55:00",
      "selectedDay": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "advertisementProductIds": [
        "47c108e7-2425-471d-970f-650d63eb3c76",
        "058da343-6dd5-4ece-b31d-55e663ce4e6a",
        "34a43ae5-917f-4d0a-b37a-f4a53aaa39de"
      ],
      "isSpecialOffer": false,
      "createdAt": "2021-08-10T10:23:04.992Z",
      "updatedAt": "2021-09-05T08:00:59.137Z",
      "isDel": false,
      "__typename": "AdvertisementProductScheduler"
    }
  ],
  "attributes": [

  ],
  "isDel": false,
  "__typename": "AdvertisementProduct"
}