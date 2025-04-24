/**
 * * 通用表单分页
 * @param response
 */
export function storePagination(response: any) {
  // 返回成功为其赋值
  if (response.code === 200) {
    this.datalist = response.data.list;
    this.pagination.currentPage = response.data.pageNo;
    this.pagination.pageSize = response.data.pageSize;
    this.pagination.total = response.data.total;
    return true;
  }
  return false;
}
