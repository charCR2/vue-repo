<template>
    <el-dialog :model-value="show" title="添加任务" width="30%">
        <el-input v-model="todoListAddInput" placeholder="请输入" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modalStore.hideModal(ModalType.TODO_LIST)">
                    取消
                </el-button>
                <el-button type="primary" @click="handleAddToDolist">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ModalType, useModalStore, type ModalDataType } from "@/stores/modal";
import { computed, ref } from "vue";

const modalStore = useModalStore();
const todoListAddInput = ref();
const show = computed(() =>
    modalStore.showModalList.includes(ModalType.TODO_LIST)
);

let props: ModalDataType[ModalType.TODO_LIST];

modalStore.onEnter(ModalType.TODO_LIST, (data) => {
    props = data;
});

modalStore.onExit(ModalType.TODO_LIST, () => {
    todoListAddInput.value = "";
});

function handleAddToDolist() {
    if (todoListAddInput.value) {
        props.onSubmit(todoListAddInput.value);
    }
}
</script>
