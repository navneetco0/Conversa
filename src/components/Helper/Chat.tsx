const getSender = (logged: any, users: any) => {
  if(!users) return null;
  return users[0]?._id === logged?._id ? users?.[1] : users?.[0];
};
export { getSender };
