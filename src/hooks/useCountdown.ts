/*
 * @Date: 2023-12-13 16:55:51
 * @LastEditTime: 2023-12-14 15:35:37
 * @FilePath: \car-mall-system\src\hooks\useCountdown.ts
 * @Description:
 */
import { onBeforeMount, ref, watch } from "vue";

const useCountdown = () => {
  let countdown = ref<number>(60);
  let isCounting = ref(false);
  let timer;
  const startCountdown = () => {
    if (isCounting.value) return;
    isCounting.value = true;
    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value === 0) {
        stopCountdown();
      }
    }, 1000);
  };
  const stopCountdown = () => {
    clearInterval(timer);
    timer = null;
    isCounting.value = false;
    countdown.value=60
  };
  watch(countdown, (newVal) => {
    if (newVal === 0) {
      countdown.value = 60;
    }
  }),
    onBeforeMount(() => {
      if (timer) {
        clearInterval(timer);
      }
    });

  return { countdown, isCounting, startCountdown, stopCountdown };
};

export default useCountdown;
