const getSender = (logged: string, users: any) => {
  return users[0]._id === logged ? users[1] : users[0];
};

export { getSender };
