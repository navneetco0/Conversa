export const isProduction = false;
const apis = ['http://localhost:4000', 'https://conversa.onrender.com'];
export const api = apis[Number(isProduction)];
