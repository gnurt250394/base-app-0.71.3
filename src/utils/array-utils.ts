import _ from "lodash";
import { CategoryItemProp } from "res/type/Home";

export const formatData = (list: any[], page: number) => (data: any[]) => {
  if (list.length == 0) {
    if (page == 1) {
      return [];
    } else {
      return data;
    }
  } else {
    if (page == 1) {
      return list;
    } else {
      return [...data, ...list];
    }
  }
};
export const groupBy = (arr: CategoryItemProp[]) => {
  let parentList = arr.filter(item => !item.parentId);
  let childrenList = arr.filter(item => !!item.parentId);
  return {
    parentList,
    childrenList,
  };
};

const recursive = (
  rootList: any,
  childList: any,
  startLevel: any,
  stopLevel: any,
) => {
  if (startLevel === stopLevel) {
    return;
  }

  return rootList.map((rootCat: any) => {
    const parentNotFound: any = [];

    childList.forEach((child: any) => {
      if (
        rootCat.children &&
        rootCat.children.find((cat: any) => cat.id === child.id)
      ) {
        return;
      }
      if (child.parentId === rootCat.id) {
        if (!rootCat.children) {
          rootCat.children = [];
        }
        rootCat.expanded = true;
        rootCat.children = [...rootCat.children, { expanded: true, ...child }];
      } else {
        parentNotFound.push(child);
      }
    });

    if (
      rootCat.children &&
      rootCat.children.length > 0 &&
      parentNotFound &&
      parentNotFound.length > 0
    ) {
      recursive(rootCat.children, parentNotFound, startLevel + 1, stopLevel);
    }
    return rootCat;
  });
};

export const flattenArray = (arr: CategoryItemProp[], key: keyof CategoryItemProp) => {
  return arr?.reduce(function flatten(
    total: any[],
    curr,
  ) {
    if (curr[key]) total.push(curr[key]);
    if (curr.children?.length) {
      let arr = curr.children.reduce(flatten, []);
      total.push(...arr);
    }
    return total.flat();
  }, [])
}
export const generateCategories = (list: any): {
  rootList: any[]
  childList: any[]
  parentList: any[]
  categoryList: any[]
} => {
  const rootList = list.filter((cat: any) => !cat.parentId);
  const childList = list.filter((cat: any) => !!cat.parentId);
  const parentList = recursive(_.cloneDeep(rootList), childList, 1, 2);
  const categoryList = recursive(_.cloneDeep(rootList), childList, 1, 3);

  return {
    rootList,
    childList,
    parentList,
    categoryList,
  };
};