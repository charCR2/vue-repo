<template>
    <div class="about">
        <el-button class="todo-list--add-btn" @click="showModal">
            添加任务
        </el-button>
        <ul>
            <li
                class="todo-list--item-box"
                v-for="(item, index) in list"
                :key="item.title"
            >
                <div>{{ item.title }}</div>
                <div
                    class="todo-list--add-btn"
                    @click="handleDelToDoList(index)"
                >
                    删除
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useModalStore, ModalType } from "@/stores/modal";

interface TodoList {
    title: string;
}
const modalStore = useModalStore();
const list = ref<TodoList[]>([]);

function showModal() {
    modalStore.showModal(ModalType.TODO_LIST, {
        onSubmit: handleAddToDolist,
    });
}

function handleAddToDolist(value: string) {
    if (value) {
        list.value.push({
            title: value,
        });
    }
    modalStore.hideModal(ModalType.TODO_LIST);
}

function handleDelToDoList(index: number) {
    list.value.splice(index, 1);
}
</script>

<style lang="less">
.todo-list--add-btn {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
}

.todo-list--item-box {
    display: flex;
    align-items: center;
}
</style>
