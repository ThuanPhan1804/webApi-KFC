import instance from "./customAxios"
export const addInvoices = (data) =>{
    return instance.post(`/api/Carts/Pay?ShippingAddress=${data.address}&ShippingPhone=${data.phone}&userId=${data.userId}&promotion=${data.promotion}`)
}
export const getInvoiceById = (id) =>{
    return instance.get(`/api/Invoices/${id}`)
}
export const getAllInvoice = (page) =>{
    return instance.get(`/api/Invoices/page?page=${page}`)
}
export const putStatusInvoice = (data) =>{
    return instance.put(`/api/Invoices/${data.id}?statusId=${data.statusId}`)
}
export const deleteInvoiceById = (id) =>{
    return instance.delete(`/api/Invoices/${id}`);
}