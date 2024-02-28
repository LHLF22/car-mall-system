<template>
  <div>
    <el-button @click="resetDateFilter">reset date filter</el-button>
    <el-button @click="clearFilter">reset all filters</el-button>
    <el-table
      ref="tableRef"
      row-key="date"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        prop="date"
        label="订单创建时间"
        sortable
        width="180"
        column-key="date"
      />
      <el-table-column prop="user" label="下单用户" />
      <el-table-column prop="address" label="收货地址" :formatter="formatter" />
      <el-table-column prop="goumaishangpinid" label="购买商品id" />
      <el-table-column prop="goumaishangpinCount" label="购买商品数量" />
      <el-table-column prop="goumaishangpinName" label="购买商品名称" />

      <el-table-column
        prop="tag"
        label="Tag"
        width="100"
        :filters="[
          { text: 'Home', value: 'Home' },
          { text: 'Office', value: 'Office' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.tag === 'Home' ? '' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TableColumnCtx, TableInstance } from "element-plus";

interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}

const tableRef = ref<TableInstance>();

const resetDateFilter = () => {
  tableRef.value!.clearFilter(["date"]);
};
// TODO: improvement typing when refactor table
const clearFilter = () => {
  tableRef.value!.clearFilter();
};
const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address;
};
const filterTag = (value: string, row: User) => {
  return row.tag === value;
};
const filterHandler = (
  value: string,
  row: User,
  column: TableColumnCtx<User>
) => {
  const property = column["property"];
  return row[property] === value;
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    tag: "Office",
  },
];
</script>

<style scoped lang="scss"></style>
