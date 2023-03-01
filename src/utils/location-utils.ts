import apis from 'controllers/apis';
import {Platform, Alert, Linking} from 'react-native';
import GetLocation from 'react-native-get-location';
import RNLocation from 'react-native-location';

import strings from 'res/strings';
const getCurrentLocation = (callAgain) => {
  return RNLocation.getLatestLocation()
    .then((region) => {
      return region;
    })
    .catch(() => {});
};
export function getRegionForCoordinates(points) {
  console.log('points: ', points);
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  console.log('midX: ', midX);
  const midY = (minY + maxY) / 2;
  console.log('midY: ', midY);
  const deltaX = maxX - minX;
  console.log('deltaX: ', deltaX);
  const deltaY = maxY - minY;
  console.log('deltaY: ', deltaY);

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  };
}
const openGps = () => {
  Alert.alert(
    'Bạn chưa bật định vị vị trí',
    'Vui lòng vào Cài đặt > Quyền riêng tư > Vị trí để bật định vị',
    [
      {
        text: 'Cài đặt',
        onPress: () => {
          Linking.openSettings();
        },
      },
      {
        text: 'Quay lại',
        onPress: () => {},
      },
    ],
    {cancelable: true},
  );
};
const getLocation = (callAgain) => {
  return new Promise((resolve, reject) => {
    let getLocation = () => {
      RNLocation.requestPermission({
        ios: 'whenInUse', // or 'always'
        android: {
          detail: 'coarse', // or 'fine'
          rationale: {
            title: strings.booking.location_premmission,
            message: strings.booking.location_premission_content,
            buttonPositive: strings.actionSheet.accept,
            buttonNegative: strings.actionSheet.cancel,
          },
        },
      }).then((granted) => {
        if (granted) {
          RNLocation.getLatestLocation()
            .then((region) => {
              locationProvider.saveCurrentLocation(
                region.latitude,
                region.longitude,
              );
              resolve(region);
            })
            .catch((e) => {
              locationProvider
                .getCurrentLocationHasSave()
                .then((s) => {
                  if (s && s.latitude && s.longitude) {
                    s.latitudeDelta = 0.1;
                    s.longitudeDelta = 0.1;
                    resolve(s);
                  }
                })
                .catch(async (e) => {
                  if (!callAgain) {
                    console.log('callAgain');
                    let s = await getCurrentLocation(true);
                    resolve(s);
                  }
                });
            });
        }
      });
    };

    // if (Platform.OS == 'android') {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((region) => {
        resolve(region);
      })
      .catch(async (error) => {
        console.log('error: ', error);
        const {code, message} = error;
        if (code == 'UNAVAILABLE') {
          try {
            await requestPermission();
            let region = await GetLocation.getCurrentPosition({
              enableHighAccuracy: true,
              timeout: 15000,
            });

            resolve(region);
          } catch (error) {
            reject();
          }
        } else {
        }
      });
    // } else {
    //   try {
    //     LocationSwitch.isLocationEnabled(
    //       () => {
    //         getLocation();
    //       },
    //       () => {
    //         openGps();
    //         reject();
    //       },
    //     );
    //   } catch (error) {
    //     console.log('error: 2', error);
    //   }
    // }
  });
};
const requestPermission = () => {
  return new Promise((resolve, reject) => {
    LocationSwitch.enableLocationService(
      1000,
      true,
      () => {
        resolve();
      },
      () => {
        reject();
      },
    );
  });
};
function decode(t, e) {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return (d = d.map(function (t) {
    return {
      latitude: t[0],
      longitude: t[1],
    };
  }));
}

function getLocationDirection(origin, destination, mode) {
  const url = `https://maps.googleapis.com/maps/api/directions/json`;
  return apis.fetch(url, {
    origin,
    language: 'vi',
    destination,
    key: strings.API_KEY,
    mode,
  });
}
export default {
  getLocation,
  requestPermission,
  getLocationDirection,
  decode
};
