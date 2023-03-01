import {gql, useQuery} from '@apollo/client';
import {ParamsBase} from 'res/type/Home';
import {Enums} from 'res/type/Enums';
import {useDispatch} from 'react-redux';
import {onSaveEnums} from 'middlewares/actions/enums/actionEnums';

const QUERY = gql(`query getEnums {
    getEnums {
        success
        result
        message
    }
}
`);

interface Response {
  getEnums: {
    success: boolean;
    message: string;
    result: Enums;
  };
}

const useEnums = (): Response | undefined => {
  const dispatch = useDispatch();
  const {data} = useQuery<Response, ParamsBase<any>>(QUERY, {
    onCompleted: data => {
      if (data?.getEnums?.success) {
        dispatch(onSaveEnums(data.getEnums.result));
      }
    },
  });

  return data;
};
export default useEnums;
