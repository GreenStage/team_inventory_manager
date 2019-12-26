const BASE_SERVER = 'https://localhost:8000';
export const GROUP_ENDPOINT = (groupname) => `${BASE_SERVER}/group/${groupname}`;
export const SIGNIN_ENDPOINT = `${BASE_SERVER}/signin`;
export const SIGNUP_ENDPOINT = `${BASE_SERVER}/signup`;
export const NEWGROUP_ENDPOINT = `${BASE_SERVER}/newgroup`;
export const PIC_ENDOINT = (picurl) => `${BASE_SERVER}/pics/${picurl}`;
export const INVENTORY_ENDPOINT = (groupname) => `${GROUP_ENDPOINT(groupname)}/inventory`;
export const INVENTORY_SEARCH = (groupname) => `${INVENTORY_ENDPOINT(groupname)}/search`;