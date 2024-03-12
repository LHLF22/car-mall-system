<template>
  <div>
    <div class="flSB">
      <div></div>
      <div class="f">
        <el-icon @click="addShop" :color="layoutStore.defaultTheme"
          ><CirclePlus /></el-icon
        ><span style="padding: 0 5px; font-size: 15px">新建商品</span>
      </div>
    </div>
    <el-table
      ref="tableRef"
      row-key="date"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="商品编号" />
      <el-table-column prop="name" label="商品名称" width="200">
        <template #default="scope">
          <div class="f">
            <img
              v-if="scope.row.images"
              style="width: 50px"
              :src="scope.row.images[0].url"
              alt=""
            />
            <div>{{ scope.row.name }}</div>
          </div>
        </template></el-table-column
      >
      <el-table-column
        prop="status"
        label="商品状态"
        :filters="[
          { text: '上架', value:'1' },
          { text: '下架', value: '0' },
        ]"
        :filter-method="
          (value, row) => {
            return value === row.status;
          }
        "
        filter-placement="bottom-end"
        width="100"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.status === '1' ? 'success' : ''"
            disable-transitions
            >{{ scope.row.status === '1' ? "上架" : "下架" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="price" label="线上销售价格" width="140" sortable />
      <el-table-column prop="quantity" label="库存数量" width="110" sortable />
      <el-table-column
        prop="brand"
        label="品牌"
        :filters="brandFilter"
        :filter-method="
          (value, row) => {
            return value === row.brand;
          }
        "
        filter-placement="bottom-end"
      />
      <el-table-column
      width="100"
        prop="carType"
        label="车身类型"
        :filters="carTypeFilter"
        :filter-method="
          (value, row) => {
            return value === row.carType;
          }
        "
        filter-placement="bottom-end"
      />
      <el-table-column
      
        prop="seats"
        label="座位数"
        :filters="seatsFilter"
        :filter-method="
          (value, row) => {
            return value === row.seats;
          }
        "
        filter-placement="bottom-end"
      />
      <el-table-column
      width="100"
        prop="energyType"
        label="能源类型"
        :filters="energyTypeFilter"
        :filter-method="
          (value, row) => {
            return value === row.energyType;
          }
        "
        filter-placement="bottom-end"
      />
      <el-table-column
        prop="displacement"
        label="排量"
        :filters="displacementFilter"
        :filter-method="
          (value, row) => {
            return value === row.displacement;
          }
        "
        filter-placement="bottom-end"
      />
      <el-table-column
      
        prop="transmissionType"
        label="变速器类型"
        width="130"
        :filters="transmissionTypeFilter"
        :filter-method="
          (value, row) => {
            return value === row.transmissionType;
          }
        "
        filter-placement="bottom-end"
      />
      <el-table-column
      width="100"
        prop="productionMode"
        label="生产方式"
        :filters="productionModeFilter"
        :filter-method="
          (value, row) => {
            return value === row.productionMode;
          }
        "
        filter-placement="bottom-end"
      />
      <el-table-column
      width="100"
        prop="intakeForm"
        label="进气形式"
        :filters="intakeFormFilter"
        :filter-method="
          (value, row) => {
            return value === row.intakeForm;
          }
        "
        filter-placement="bottom-end"
      />

      <el-table-column prop="createdAt" label="创建时间" width="170" sortable />
      <el-table-column prop="updatedAt" label="更新时间" width="170" sortable />
      <el-table-column label="Operations" width="140">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      class="car-dialog"
      v-model="dialogFormVisible"
      title="Shipping address"
      width="500"
    >
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-button style="display: block" @click="pictureManage = true"
            >商品图片管理</el-button
          >
        </el-form-item>
        <el-form-item label="线上销售价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="库存数量" :label-width="formLabelWidth">
          <el-input v-model="form.quantity" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择商品状态">
            <el-option
              v-for="item in [
                { text: '上架', value: '1' },
                { text: '下架', value: '0' },
              ]"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-select v-model="form.brand" placeholder="请选择品牌">
            <el-option
              v-for="item in staticData.brand"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车身类型" :label-width="formLabelWidth">
          <el-select v-model="form.carType" placeholder="请选择车身类型">
            <el-option
              v-for="item in staticData.carType"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="座位数" :label-width="formLabelWidth">
          <el-select v-model="form.seats" placeholder="请选择座位数">
            <el-option
              v-for="item in staticData.seats"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="能源类型" :label-width="formLabelWidth">
          <el-select v-model="form.energyType" placeholder="请选择能源类型">
            <el-option
              v-for="item in staticData.energyType"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="排量" :label-width="formLabelWidth">
          <el-input v-model="form.displacement" autocomplete="off" />
        </el-form-item>
        <el-form-item label="变速器类型" :label-width="formLabelWidth">
          <el-select
            v-model="form.transmissionType"
            placeholder="请选择变速器类型"
          >
            <el-option
              v-for="item in staticData.transmissionType"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="生产方式" :label-width="formLabelWidth">
          <el-select v-model="form.productionMode" placeholder="请选择生产方式">
            <el-option
              v-for="item in staticData.productionMode"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="进气形式" :label-width="formLabelWidth">
          <el-select v-model="form.intakeForm" placeholder="请选择进气形式">
            <el-option
              v-for="item in staticData.intakeForm"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmAdd"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="pictureManage" title="Shipping address" width="800">
      <div>
        <el-upload
          v-model:file-list="form.productPicture"
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          multiple
          :http-request="uploadAction"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-button @click="pictureManage = false">取消</el-button
        ><el-button @click="pictureManage = false">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance } from "vue";
import type { UploadProps, TableInstance } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import useLayoutStore from "../../store/layout";
import { onMounted } from "vue";
const formLabelWidth = "140px";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const layoutStore = useLayoutStore();
interface User {
  name: string;
  id: number;
  price: string;
  quantity: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  brand: string;
  carType: string;
  seats: string;
  energyType: string;
  displacement: string;
  transmissionType: string;
  productionMode: string;
  intakeForm: string;
}
const tableRef = ref<TableInstance>();
const tableData = ref([]);
const pictureManage = ref<boolean>(false);
const dialogFormVisible = ref<boolean>(false);
const form = ref({
  name: "",
  productPicture: [],
  id: "",
  price: "",
  quantity: "",
  status: "",
  createdAt: "",
  updatedAt: "",
  brand: "",
  carType: "",
  seats: "",
  energyType: "",
  displacement: "",
  transmissionType: "",
  productionMode: "",
  intakeForm: "",
});
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const seatsFilter = ref([]);
const brandFilter = ref([]);
const carTypeFilter = ref([]);
const energyTypeFilter = ref([]);
const displacementFilter = ref([]);
const transmissionTypeFilter = ref([]);
const productionModeFilter = ref([]);
const intakeFormFilter = ref([]);

const staticData = ref({
  brand: [],
  carType: [],
  seats: [],
  energyType: [],
  transmissionType: [],
  productionMode: [],
  intakeForm: [],
});

onMounted(() => {
  init();
});
const init = () => {
  proxy.$sellerApi.shop.getAllCarDeail().then((res) => {
    tableData.value = res.data;
  });
  proxy.$sellerApi.shop.getStaticCarDisposition().then((res) => {
    staticData.value = res.data;
  });
  proxy.$sellerApi.shop.getCarAllSeats().then((res) => {
    seatsFilter.value = res.data.map((el) => {
      return { text: el, value: el };
    });
  });
  proxy.$sellerApi.shop.getCarAllBrand().then((res) => {
    brandFilter.value = res.data.map((el) => {
      return { text: el, value: el };
    });
  });
  proxy.$sellerApi.shop.getCarAllCarType().then((res) => {
    carTypeFilter.value = res.data.map((el) => {
      return { text: el, value: el };
    });
  });
  proxy.$sellerApi.shop.getCarAllEnergyType().then((res) => {
    energyTypeFilter.value = res.data.map((el) => {
      return { text: el, value: el };
    });
  });
  proxy.$sellerApi.shop.getCarAllDisplacement().then((res) => {
    displacementFilter.value = res.data.map((el) => {
      return { text: el, value: el };
    });
  });
  proxy.$sellerApi.shop.getCarAllTransmissionType().then((res) => {
    transmissionTypeFilter.value = res.data.map((el) => {
      return { text: el, value: el };
    });
  });
  proxy.$sellerApi.shop.getCarAllProductionMode().then((res) => {
    productionModeFilter.value = res.data.map((el) => {
      return { text: el, value: el };
    });
  });
  proxy.$sellerApi.shop.getCarAllIntakeForm().then((res) => {
    intakeFormFilter.value = res.data.map((el) => {
      return { text: el, value: el };
    });
  });
};
const handleDelete = (index: number, row: User) => {
  // showDelete.value=true
  ElMessageBox.confirm("确定删除该商品吗?", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      proxy.$sellerApi.shop.deleteCarProduct({ id: row.id }).then((res) => {
        if (res.code == 0) {
          proxy.$sellerApi.shop.getAllCarDeail().then((res) => {
            tableData.value = res.data;
          });
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        } else {
          ElMessage({
            type: "error",
            message: "删除失败",
          });
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
  console.log(index, row);
};

const handleEdit = (row) => {
  dialogFormVisible.value = true;
  form.value = row;
  if (row.images) {
    form.value.productPicture = row.images.map((e) => {
      return {
        name: e.name,
        url: e.url,
      };
    });
  } else {
    form.value.productPicture = [];
  }

  console.log(form.value, "form.value");
};
const addShop = () => {
  form.value = {
    name: "",
    productPicture: [],
    id: "",
    price: "",
    quantity: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    brand: "",
    carType: "",
    seats: "",
    energyType: "",
    displacement: "",
    transmissionType: "",
    productionMode: "",
    intakeForm: "",
  };
  dialogFormVisible.value = true;
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const uploadAction = () => {};
const confirmAdd = () => {
  dialogFormVisible.value = false;
  const formData = new FormData();
  if (form.value.id) {
    //编辑
    console.log(form.value.productPicture, "hahaha");
    form.value.productPicture.forEach((file) => {
      console.log(file, "file");
      if (!file.raw) {
        formData.append("exitedFile", file.name);
      } else {
        formData.append("images[]", file.raw);
      }
    });
    proxy.$sellerApi.shop
      .setImg({ id: parseInt(form.value.id), formData })
      .then((res) => {
        if (res.code == 0) {
          proxy.$sellerApi.shop
            .editCarProduct({ form: form.value })
            .then((ress) => {
              if (res.code == 0) {
                console.log(ress);
                proxy.$sellerApi.shop.getAllCarDeail().then((res) => {
                  tableData.value = res.data;
                });
              } else {
                console.log("编辑失败");
              }
            });
        } else {
          console.log("上传图片失败");
        }
      });
  } else {
    //新增
    form.value.productPicture.forEach((file) => {
      formData.append("images[]", file.raw);
    });
    proxy.$sellerApi.shop.setImg({ id: -1, formData }).then((res) => {
      if (res.code == 0) {
        form.value.id = res.data.id;
        proxy.$sellerApi.shop
          .editCarProduct({ form: form.value })
          .then((ress) => {
            if (res.code == 0) {
              proxy.$sellerApi.shop.getAllCarDeail().then((res) => {
                tableData.value = res.data;
              });
              console.log(ress);
            } else {
              console.log("新增失败");
            }
          });
      } else {
        console.log("上传图片失败");
      }
    });
  }
  // console.log(form.value, "add value");
};
</script>

<style scoped lang="scss">
:deep(.el-dialog) {
  width: 50vw;
  max-height: 80vh;
  overflow-y: auto;
  @include scrollbar();
}
</style>
