import PostProductScreen from 'screens/Colaborator/Post/PostProductScreen';
import PaymentSuccessScreen from 'screens/Common/payment/PaymentSuccessScreen';
import RatingScreen from 'screens/Common/Rating/RatingScreen';

enum Routes {
  MainTab = 'MainTab',
  PaymentSuccessScreen = 'PaymentSuccessScreen',
  CustomerStack = 'CustomerStack',
  ColaboratorStack = 'ColaboratorStack',
  // SplashScreen
  SplashScreen = 'SplashScreen',
  // Login & Sign Up
  LoginScreen = 'LoginScreen',
  ForgotPasswordScreen = 'ForgotPasswordScreen',
  RecoveryPassword = 'RecoveryPassword',
  ChangePasswordScreen = 'ChangePasswordScreen',
  ChangePasswordOldScreen = 'ChangePasswordOldScreen',
  RegisterScreen = 'RegisterScreen',
  VerifyCodeScreen = 'VerifyCodeScreen',
  SignUpSuccessful = 'SignUpSuccessful',
  // Home Dashboard
  HomeStack = 'HomeStack',
  HomeScreen = 'HomeScreen',
  NotificationStack = 'NotificationStack',
  NotificationScreen = 'NotificationScreen',
  SearchCategoryScreen = 'SearchCategoryScreen',
  ListCustomerScreen = 'ListCustomerScreen',
  DetailSearchCategoryScreen = 'DetailSearchCategoryScreen',
  CategoryChildrenScreen = 'CategoryChildrenScreen',
  DetailCategoryScreen = 'DetailCategoryScreen',
  DetailCategoryColaboratorScreen = 'DetailCategoryColaboratorScreen',
  // Search
  CategoryStack = 'CategoryStack',
  CategoryScreen = 'CategoryScreen',
  // Setting
  AccountStack = 'AccountStack',
  SettingScreen = 'SettingScreen',
  //Account
  InfoAccountCustomerScreen = 'InfoAccountCustomerScreen',
  InfoAccountScreen = 'InfoAccountScreen',
  InfoAccountColaboratorScreen = 'InfoAccountColaboratorScreen',
  // Cart
  CartScreen = 'CartScreen',
  PostProductScreen = 'PostProductScreen',
  CartColaboratorScreen = 'CartColaboratorScreen',

  //Order
  OrderScreen = 'OrderScreen',
  OrderColaboratorScreen = 'OrderColaboratorScreen',
  DetailOrderColaboratorScreen = 'DetailOrderColaboratorScreen',
  DetailOrderScreen = 'DetailOrderScreen',
  TabOrderColaborator = 'TabOrderColaborator',
  //Image
  ImageViewerScreen = 'ImageViewerScreen',

  ListPostScreen = 'ListPostScreen',
  DetailPostScreen = 'DetailPostScreen',
  PostStack = 'PostStack',
  WithDrawalRequestScreen = 'WithDrawalRequestScreen',
  ListRatingScreen = 'ListRatingScreen',

  ListCampaignScreen = 'ListCampaignScreen',
  DetailCampainScreen = 'DetailCampainScreen',
  RatingScreen = 'RatingScreen',
}

export default Routes;
