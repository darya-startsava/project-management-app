import { FC } from 'react';
import { useGetAllUsersQuery } from '$services/api';

const Users: FC = () => {
  const { data } = useGetAllUsersQuery();
  console.log(data);

  return <div>Look in console</div>;
};

export default Users;
