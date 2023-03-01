import {Routes} from 'configs';
import {StyleProp, ViewStyle} from 'react-native';
import {
  CategoryItemProp,
  FacebookTemplate,
  HotDealsItemProp,
} from 'res/type/Home';
import {ImageSource} from 'react-native-image-viewing/dist/@types';
import {TypeScreen} from 'res/type/verifyPhone';
import {AllOrders, CartCategoryProps} from 'res/type/Cart';
import {Blog} from 'res/type/Post';
import {UserCustomerPaginate} from 'res/type/Customer';
import {MissionCampain} from 'res/type/Campain';
export interface MainParamList extends Record<string, object | undefined> {
  [Routes.MainTab]: MainTabParams;
  [Routes.LoginScreen]: LoginScreen;
  [Routes.ForgotPasswordScreen]: undefined;
  [Routes.RecoveryPassword]: undefined;
  [Routes.ChangePasswordScreen]: ChangePasswordScreen;
  [Routes.RegisterScreen]: undefined;

  [Routes.VerifyCodeScreen]: VerifyCodeScreen;
  [Routes.SignUpSuccessful]: undefined;

  //home
  [Routes.DetailSearchCategoryScreen]: DetailSearchCategoryScreen;

  // category
  [Routes.CategoryChildrenScreen]: CategoryChildrenScreen;
  [Routes.DetailCategoryScreen]: DetailCategoryScreen;
  [Routes.DetailCategoryColaboratorScreen]: DetailCategoryScreen;

  // order
  [Routes.DetailOrderScreen]: DetailOrderScreen;
  [Routes.DetailOrderColaboratorScreen]: DetailOrderScreen;

  //Image
  [Routes.ImageViewerScreen]: ImageViewerScreen;
  [Routes.DetailPostScreen]: DetailPostScreen;

  [Routes.ListCustomerScreen]: ListCustomerScreen;
  [Routes.ListRatingScreen]: ListRatingScreen;
  [Routes.DetailCampainScreen]: DetailCampainScreen;
  [Routes.PostProductScreen]: PostProductParam;
  [Routes.PaymentSuccessScreen]: PaymentSuccessScreen;
  [Routes.RatingScreen]: RatingScreen;
}
type RatingScreen = {
  item: CartCategoryProps;
};
type PaymentSuccessScreen = {
  id: string;
};
type PostProductParam = {
  facebookTemplates: FacebookTemplate[];
  slug: string;
};
type DetailCampainScreen = {
  item: MissionCampain;
  isEdit: boolean;
};
type ListRatingScreen = {
  productId: string;
  dataReviews: string[];
};
type ListCustomerScreen = {
  onSelected: (customer: UserCustomerPaginate) => void;
  isEdit?: boolean;
  idCart?: string;
  customer?: UserCustomerPaginate;
};
type DetailOrderScreen = {
  id: string;
};
type DetailPostScreen = {
  item: Blog;
};
type LoginScreen = undefined;
type DetailCategoryScreen = {
  item?: HotDealsItemProp;
  slug: string;
};
type ImageViewerScreen = {
  data: ImageSource[];
  index: number;
};
type CategoryChildrenScreen = {
  title: string;
  data: CategoryItemProp[];
  listParent: CategoryItemProp[];
  parent: CategoryItemProp[];
  item: CategoryItemProp;
};
type DetailSearchCategoryScreen = {
  keyword: string;
};
type ChangePasswordScreen = {
  username: string;
  code: string;
};
type VerifyCodeScreen = {
  type: string;
  value: string;
};
type MainTabParams = {
  screen: string;
};
