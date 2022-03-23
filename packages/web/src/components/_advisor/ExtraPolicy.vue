<template>
  <n-modal :show="props.show" @update-show="emits('update-show', $event)">
    <n-card
      style="width: 600px"
      title="Extra Enrollment Policy"
      :bordered="true"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <!-- <template #header-extra> Oops! </template> -->
      <ul v-if="type === 'os'">
        <li class="text-base">
          Every year we offer 30~50 extra quota for enrollment. To apply for
          enrollment, you must：
        </li>
        <ol class="ml-5 mt-2 list-outside list-decimal">
          <li>
            Send an email to
            <a class="text-blue-400" href="mailto:jchou@lsalab.cs.nthu.edu.tw">
              jchou@lsalab.cs.nthu.edu.tw
            </a>
            with the subject “OS Enrollment”, and the contents (1) Name, (2)
            Study status (清大資工三年級, 清大資應所一年級, 社會人士), and (3)
            reason for enrollment.
          </li>
          <li>
            Come to the first class of the semester, and take the quiz which
            covering the prerequisite subjects
          </li>
        </ol>
        <li class="mt-2 text-base">
          Only the students who pass the cut-off score of the quiz are eligible
          for enrollment. Due to quota limit, students from NTHU Computer
          Science Department has the highest priority. Then we will distribute
          the rest of quota for students among different categories, such as
          EECS, non-EECS, non-NTHU, M.S./Ph.D., etc. So everyone has a chance to
          enroll this class no matter what your background is. However, for
          non-EECS students, it is strongly recommended to enroll the OS class
          in Spring semester.
        </li>
      </ul>
      <ul v-else-if="type === 'pp'">
        <li class="text-base">
          Every year we offer 10~15 extra quota for enrollment. To apply, send
          an email to
          <a class="text-blue-400" href="mailto:jchou@lsalab.cs.nthu.edu.tw">
            jchou@lsalab.cs.nthu.edu.tw
          </a>
          with the subject <b>"PP Enrollment"</b>, and the contents (1) Name,
          (2) Study status (清大資工三年級, 清大資應所一年級, 社會人士), and (3)
          reason for enrollment.
        </li>

        <li class="mt-2 text-base">
          CS major graduate students, especially for the second grades, have the
          highest priority. Non-CS major students have lower priority, but still
          the opportunity as long as you have strong reasons for enrollment.
        </li>
      </ul>
      <ul v-else>
        <li class="text-base">
          Every year we offer 10~15 extra quota for enrollment. To apply, send
          an email to
          <a class="text-blue-400" href="mailto:jchou@lsalab.cs.nthu.edu.tw">
            jchou@lsalab.cs.nthu.edu.tw
          </a>
          with the subject <b>"CP Enrollment"</b>, and the contents (1) Name,
          (2) Study status (清大資工三年級, 清大資應所一年級, 社會人士), and (3)
          reason for enrollment.
        </li>
        <li class="mt-2 text-base">
          CS major graduate students, especially for the second grades, have the
          highest priority. Non-CS major students have lower priority, but still
          the opportunity as long as you have strong reasons for enrollment.
        </li>
      </ul>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NCard } from "naive-ui";

const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    required: true,
    readonly: true,
  },
});
const emits = defineEmits(["update-show"]);
</script>

<style>
ul,
ol {
  list-style-position: inside;
  list-style-type: initial;
}
</style>
