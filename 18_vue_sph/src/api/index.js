import requests from '@/api/request'

export const getTypeNav = () => requests({ url: "/product/getBaseCategoryList", method: "GET" })