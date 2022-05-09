import { FC } from 'react';
import { useGetAllUsersQuery } from '$services/api';

// this component needs as a sample to show that rtk query with prepareHeaders is working

const Users: FC = () => {
  const { data } = useGetAllUsersQuery();
  console.log(data);

  return <div>There are should be list of all users in the console</div>;
};

export default Users;
