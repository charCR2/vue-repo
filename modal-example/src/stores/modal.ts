import { ref, markRaw, nextTick } from "vue";
import { defineStore } from "pinia";
import TodoListAdd from "@/components/modal/TodoListAdd.vue";

export enum ModalType {
    TODO_LIST,
}

export interface ModalDataType {
    [ModalType.TODO_LIST]: {
        onSubmit: (value: string) => void;
    };
}

interface ModalInstance<T extends ModalType> {
    type: T;
    component: any;
    data?: ModalDataType[T];
    onEnter?: (data: ModalDataType[T]) => void;
    onExit?: (data: ModalDataType[T]) => void;
}

const modalComponents: { [key in ModalType]: any } = {
    [ModalType.TODO_LIST]: markRaw(TodoListAdd),
};

type modalInstanceMapItem = { [key in ModalType]: ModalInstance<ModalType> };

export const useModalStore = defineStore("modal", () => {
    const modalInstanceMap = ref({} as modalInstanceMapItem);
    const showModalList = ref<ModalType[]>([]);
    const showModal = <T extends ModalType>(
        modalType: T,
        data?: ModalDataType[T]
    ) => {
        if (!modalInstanceMap.value[modalType]) {
            modalInstanceMap.value[modalType] = {
                type: modalType,
                component: modalComponents[modalType],
                data,
            };
        } else {
            modalInstanceMap.value[modalType].data = data;
        }
        showModalList.value.push(modalType);
        nextTick(() => {
            modalInstanceMap.value[modalType].onEnter?.(
                modalInstanceMap.value[modalType].data as ModalDataType[T]
            );
        });
    };

    const hideModal = (modalType: ModalType) => {
        modalInstanceMap.value[modalType].onExit?.(
            modalInstanceMap.value[modalType].data as ModalDataType[ModalType]
        );
        const index = showModalList.value.findIndex(
            (item) => item === modalType
        );
        showModalList.value.splice(index, 1);
    };

    const onEnter = <T extends ModalType>(
        modalType: T,
        fn: (data: ModalDataType[T]) => void
    ) => {
        modalInstanceMap.value[modalType].onEnter = fn;
    };

    const onExit = <T extends ModalType>(
        modalType: T,
        fn: (data: ModalDataType[T]) => void
    ) => {
        modalInstanceMap.value[modalType].onExit = fn;
    };

    return {
        modalInstanceMap,
        showModalList,
        showModal,
        hideModal,
        onEnter,
        onExit,
    };
});
