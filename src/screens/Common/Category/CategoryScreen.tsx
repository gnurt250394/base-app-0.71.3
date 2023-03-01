import {useQuery} from '@apollo/client';
import {PRODUCT_CATTEGORIES_QUERY} from 'apollo/query/ApiCategory';
import CategoryLeft from 'components/Category/CategoryLeft';
import CategoryRight from 'components/Category/CategoryRight';
import Container from 'elements/Layout/Container';
import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Theme from 'res/style/Theme';
import {CategoryItemProp} from 'res/type/Home';
import {generateCategories} from 'utils/array-utils';

interface CategoryScreenProps {}

const CategoryScreen = (props: CategoryScreenProps) => {
  const [children, setChildren] = useState<CategoryItemProp>();

  const {
    data: data2,
    error,
    loading,
  } = useQuery(PRODUCT_CATTEGORIES_QUERY, {
    variables: {
      filters: {
        pagination: false,
        query: {
          isDel: false,
          orderKind: 'AD_ORDER',
        },
      },
    },
  });

  const data = React.useMemo(() => {
    let result = generateCategories(
      data2?.getProductCategories?.result?.docs || [],
    );
    return result;
  }, [data2]);

  return (
    <Container style={styles.container}>
      <View style={[Theme.flexDirection, {alignItems: 'flex-start'}]}>
        <CategoryLeft
          data={data.categoryList}
          onSelected={item => {
            console.log('item: ', item);
            setChildren(item);
          }}
        />
        <CategoryRight
          data={children?.children || []}
          item={children}
          parent={data.categoryList}
        />
      </View>
    </Container>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {flex: 1, zIndex: 10000},
});
