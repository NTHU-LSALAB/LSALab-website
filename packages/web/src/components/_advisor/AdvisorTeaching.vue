<template>
  <div class="text-2xl font-bold">{{ t("advisor.teaching") }}</div>
  <extra-policy
    :show="showExtraPolicy"
    :type="tab"
    @update-show="showExtraPolicy = false"
  />
  <n-tabs
    type="segment"
    class="mt-4"
    v-model:value="tab"
    @update-value="handleChange"
  >
    <n-tab-pane
      :name="teaching.name"
      :tab="teaching.tab"
      v-for="teaching in teachings"
    >
      <div class="text-justify text-lg" v-for="lecture in teaching.lectures">
        <div class="flex"></div>
        <h2 class="text-xl font-bold">
          {{ lecture.title }}
        </h2>
        <app-list
          :items="lecture.children"
          :options="{ listStyles: ['disc', 'circle', 'decimal'] }"
        />
      </div>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { NTabs, NTabPane } from "naive-ui";
import OS1 from "@/assets/teaching/os/os-1.png";
import OS2 from "@/assets/teaching/os/os-2.jpg";
import PP1 from "@/assets/teaching/pp/pp-1.png";
import PP2 from "@/assets/teaching/pp/pp-2.png";
import PP3 from "@/assets/teaching/pp/pp-3.png";
import PP4 from "@/assets/teaching/pp/pp-4.png";
import PP5 from "@/assets/teaching/pp/pp-5.png";
import PP6 from "@/assets/teaching/pp/pp-6.png";
import PP7 from "@/assets/teaching/pp/pp-7.png";
import PP8 from "@/assets/teaching/pp/pp-8.png";
import PP9 from "@/assets/teaching/pp/pp-9.png";
import CP1 from "@/assets/teaching/cp/cp-1.png";
import CP2 from "@/assets/teaching/cp/cp-2.png";
import ExtraPolicy from "@/components/_advisor/ExtraPolicy.vue";
import { h, onMounted, ref } from "vue";
import { renderHref } from "@/utils/component";
import { useI18n } from "vue-i18n";
import AppList from "@/components/AppList.vue";
const { t } = useI18n();

const emits = defineEmits(["ready", "select"]);

emits("ready");
const tab = ref("os");

const showExtraPolicy = ref(false);
const handleChange = (tab: string) => {
  emits("select", teachings.find((t) => t.name === tab)?.images);
};
onMounted(() => {
  handleChange("os");
});

const teachings = [
  {
    tab: "作業系統",
    name: "os",
    images: [[OS1, OS2]],
    lectures: [
      {
        title:
          "CS 342301 Operating Systems (作業系統) [Hot: Offering in 109 semester]",
        children: [
          {
            title: "Instructor: Jerry Chou",
          },
          {
            title: "Course level: Higher level undergrade",
          },
          {
            title:
              "Prerequisites: data structures, computer organization, and C/C++",
          },
          {
            title: "Offered: Fall, 2011~2020",
          },
          {
            title: () =>
              h(
                "span",
                {
                  class: "text-blue-400 cursor-pointer",
                  onClick: () => (showExtraPolicy.value = true),
                },
                { default: () => "Extra Enrollment Policy" }
              ),
          },
          {
            title:
              "Time: Monday 10:10 a.m. – 12:00 p.m.; Wednesday 9:00 a.m. – 9:50 p.m.",
          },
          {
            title: "Location: Delta Building (台達館) xxx",
          },
          {
            title: h("span", null, [
              h("span", null, { default: () => "TA Email: " }),
              renderHref(
                "os@lsablab.cs.nthu.edu.tw",
                "mailto:os@lsalab.cs.nthu.edu.tw"
              ),
            ]),
          },
          {
            title:
              "Textbooks: Operating System Concepts by Silberschatz, Galvin, and Gagne. John Wiley & Sons, INC",
          },
          {
            title: "Course Description",
            children: [
              {
                title:
                  "Operating systems (OS) are an essential part of any computer system. This course introduces the fundamentals of Operating Systems, including OS structure, and OS management for process, memory and storage/file. The fundamental concepts and algorithms covered in the course are often based on those used in both commercial and open-source operating systems. Our aim is to present them in a general setting that is not tied to one particular operating system. Besides teaching the fundamental knowledge from the textbook in lectures, we design four coding assignments for students to study and implement real OS code in NachOS, which is an instructional software designed by designed by Prof. Thomas Anderson for teaching operating systems courses in many countries, especially in US. The coding assignments will help students to connect concepts with real implementation, and understand the detailed operations and code structure of a real OS in practice. It also offers an opportunity for students to get familiar with the programming environment in Linux systems.",
              },
            ],
          },
          {
            title: "Evaluations (Tentative)",
            children: [
              {
                title: "Midterm Exam: 30~35%",
              },
              {
                title: "Final Exam: 30~35%",
              },
              {
                title: "4 Coding Assignments: 30%",
              },
              {
                title: "Course Participation(Quiz): 5%",
              },
            ],
          },
          {
            title: "Syllabus (Tentative)",
            children: [
              {
                title: "Week1 Chap0: OS Historical Prospective",
              },
              {
                title: "Week2 Chap1: OS Introduction",
              },
              {
                title: "Week3 Chap2: OS Structure",
              },
              {
                title: "Week4 Chap3: Process Concept",
              },
              {
                title: "Week5 Chap4: Multithreaded Programming",
              },
              {
                title: "Week6~7 Chap8: Memory Management",
              },
              {
                title: "Week7~8 Chap9: Virtual Memory Management",
              },
              {
                title: "Week9 Midterm",
              },
              {
                title: "Week10 Chap5: Process Scheduling",
              },
              {
                title: "Week11~12 Chap6: Process Synchronization",
              },
              {
                title: "Week13 Chap7: Deadlocks",
              },
              {
                title: "Week14 Chap10: File System Interface",
              },
              {
                title: "Week14~15 Chap11: File System Implementation",
              },
              {
                title: "Week16 Chap12: Mass Storage Systems",
              },
              {
                title: "Week17 Chap13: IO Systems",
              },
              {
                title: "Week18 Final Exam",
              },
            ],
          },
          {
            title: "Reference",
            children: [
              {
                title: renderHref(
                  "Tom's Nachos Website",
                  "https://homes.cs.washington.edu/~tom/nachos/"
                ),
              },
              {
                title: renderHref(
                  "The Nachos Instructional Operating System",
                  "https://www2.eecs.berkeley.edu/Pubs/TechRpts/1993/CSD-93-739.pdf"
                ),
              },
              {
                title: renderHref(
                  "Text editor: vim",
                  "https://www.radford.edu/~mhtay/CPSC120/VIM_Editor_Commands.htm"
                ),
              },
              {
                title: renderHref(
                  "Shell script tutorial",
                  "https://www.shellscript.sh/"
                ),
              },
            ],
          },
          {
            title: "Course Links",
            children: [
              {
                title: renderHref(
                  "NTHU OpenCourseWare (2016 Fall)",
                  "http://ocw.nthu.edu.tw/ocw/index.php?page=course&cid=141"
                ),
              },
              {
                title: renderHref(
                  "ILMS (2020 Fall)",
                  "https://lms.nthu.edu.tw/course/46250"
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    tab: "平行程式設計",
    name: "pp",
    images: [
      [PP1, PP2],
      [PP3, PP4],
      [PP5, PP6, PP7, PP8, PP9],
    ],
    lectures: [
      {
        title:
          "CS 542200 Parallel Programming (平行程式設計) [Hot: Offering in 109 semester]",
        children: [
          {
            title: "Instructor: Jerry Chou",
          },
          {
            title: "Course level: Higher level undergrad; Lower level graduate",
          },
          {
            title:
              "Prerequisites: data structures , computer organization, algorithm, C, operating systems (preferred)",
          },
          {
            title: "Offered: Spring, 2011~2012; Fall 2013~2020",
          },
          {
            title: () =>
              h(
                "span",
                {
                  class: "text-blue-400 cursor-pointer",
                  onClick: () => (showExtraPolicy.value = true),
                },
                { default: () => "Extra Enrollment Policy" }
              ),
          },
          {
            title:
              "Time: Monday 3:30 p.m. – 5:20 p.m.; Thursday 2:20 p.m. – 3:10 p.m.",
          },
          {
            title: "Location: Delta Building (台達館) xxx",
          },
          {
            title: h("span", null, [
              h("span", null, { default: () => "TA Email: " }),
              renderHref(
                "pp@lsablab.cs.nthu.edu.tw",
                "mailto:pp@lsalab.cs.nthu.edu.tw"
              ),
            ]),
          },
          {
            title: "Textbooks: Online materials",
          },
          {
            title: "Course Description",
            children: [
              {
                title:
                  "In order to achieve higher application performance, parallel programming is an essential technique to harness the massive computing power from modern computer systems. This course introduces the fundamental concepts of parallel computing, and teaches parallel programming skills on various parallel computing systems from multi-core CPUs, GPUs, to distributed systems. The course is organized in three parts. First part teaches parallel programming on CPUs, including MPI, Pthread, and OpenMP. Second part teaches CUDA programming on GPUs. The last part extends parallel programming to distributed computing by discussing how the modern computing frameworks/libraries (Hadoop, Spark, and Tensorflow) are designed to enable parallel data processing for specific application domains, such as Big data and deep learning. Four coding assignments and multiples labs are designed to let students practice the skills of parallel programming and performance optimization. The students are asked to showcase their learning outcomes by applying parallel programming on a self-defined problem in the final course project.",
              },
            ],
          },
          {
            title: "Evaluations (Tentative)",
            children: [
              {
                title: "Labs: 10%",
              },
              {
                title: "Coding Assignments: 75%",
              },
              {
                title: "Final Project: 15%",
              },
            ],
          },
          {
            title: "Syllabus (Tentative)",
            children: [
              {
                title: "Week1~2 Chap1: Introduction to Parallel Computing",
              },
              {
                title: "Week3 Chap2: MPI Programming",
              },
              {
                title: "Week4 Chap4: Pthread Programming",
              },
              {
                title: "Week5 Chap5: OpenMP Programming",
              },
              {
                title: "Week5 Chap4: Multithreaded Programming",
              },
              {
                title: "Week6~7 Chap6: Parallel Computations and Applications",
              },
              {
                title: "Week8 Chap6: Introduction to Heterogeneous Computing",
              },
              {
                title: "Week9~10 Chap7: CUDA Introduction",
              },
              {
                title: "Week11 Chap8: GPU Architecture Introduction",
              },
              {
                title: "Week12~13 Chap9: CUDA Optimization",
              },
              {
                title: "Week14~15 Chap10: Distributed Computing for BigData",
              },
              {
                title:
                  "Week16~17 Chap11: Distributed Computing for Deep Learning",
              },
              {
                title: "Week18 Final Project Presentation & Demo",
              },
            ],
          },
          {
            title: "Reference",
            children: [
              {
                title: renderHref(
                  "LLNL High-Performance Computing Training",
                  "https://computing.llnl.gov/?set=training&page=index"
                ),
              },
              {
                title: "NVIDIA CUDA C++ Programming Guide",
              },
            ],
          },
          {
            title: "Course Links",
            children: [
              {
                title: renderHref(
                  "NTHU OpenCourseWare (2018 Fall)",
                  "http://ocw.nthu.edu.tw/ocw/index.php?page=course&cid=231&"
                ),
              },
              {
                title: renderHref(
                  "ILMS (2020 Fall)",
                  "https://lms.nthu.edu.tw/course/46274"
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    tab: "雲端程式設計",
    name: "cp",
    images: [[CP1], [CP2]],
    lectures: [
      {
        title: "CS/ISA 542000 Cloud Programming (雲端程式設計)",
        children: [
          {
            title: "Instructor: Jerry Chou",
          },
          {
            title: "Higher level undergrade; Lower level graduate",
          },
          {
            title:
              "Prerequisites: High level programming languages (Python, Javascript, Java)",
          },
          {
            title: "Offered: Fall 2011; Spring, 2012~2019",
          },
          {
            title: () =>
              h(
                "span",
                {
                  class: "text-blue-400 cursor-pointer",
                  onClick: () => (showExtraPolicy.value = true),
                },
                { default: () => "Extra Enrollment Policy" }
              ),
          },
          {
            title: "Time: Monday 2:20 p.m. – 5:20 p.m.",
          },
          {
            title: "Location: Delta Building (台達館) xxx",
          },
          {
            title: h("span", null, [
              h("span", null, { default: () => "TA Email: " }),
              renderHref(
                "cp@lsablab.cs.nthu.edu.tw",
                "mailto:cp@lsalab.cs.nthu.edu.tw"
              ),
            ]),
          },
          {
            title: "Online materials",
          },
          {
            title: "Course Description",
            children: [
              {
                title:
                  "The emergence of cloud computing has revolutionized modern IT industry. It is estimated that more than 90% of enterprises have already adapted cloud solutions. Clouds have also become the platforms to drive IoT, Mobile and AI solutions. This course introduces cloud computing concepts and cloud programming skills. Through a series of hands-on labs based on real cloud platforms (i.e., AWS), we teach how to use various kind of cloud services from the fundamental IaaS (Infrastructure as a Service) for launching on-demand compute instances to advanced SaaS (Software as a Service) for building AI solutions, such as Chatbot. At the end of the course, we expect the students to have the ability to design and implement a product combing cloud, IoT devices (Raspberry Pi), mobile devices, and AI. An one-day hackathon event toward the end of the semester is arranged to evaluate learning progress and to experience the strength of clouds for building modern, intelligent applications in much shorter development time.",
              },
            ],
          },
          {
            title: "Evaluations (Tentative)",
            children: [
              {
                title: "Labs: 20%",
              },
              {
                title: "Homework: 30%",
              },
              {
                title: "Hackathon: 15%",
              },
              {
                title: "Final Project: 35%",
              },
            ],
          },
          {
            title: "Syllabus (Tentative)",
            children: [
              {
                title: "Week1~2 Chap1: Introduction to Cloud Computing",
              },
              {
                title: "Week3 Chap2: Introduction to Cloud Platform",
              },
              {
                title: "Week4 Lab1: IAM (Identity and Access Management)",
              },
              {
                title:
                  "Week5 Lab2: EC2 (Elastic Compute Instance, Elastic Block Storage)",
              },
              {
                title:
                  "Week6 Lab3: Elastic Web Architecture (Elastic Load Balancer, Auto-scaling Group)",
              },
              {
                title: "Week7 Lab4: Multi-Tier Web Architecture (SQS, S3, SNS)",
              },
              {
                title: "Week8 Lab5: Elastic Beanstalk (Deployment)",
              },
              {
                title:
                  "Week9 Lab6: Programming SDK-1 (AWS SDK & Eclipse AWS Toolkits)",
              },
              {
                title:
                  "Week10 Lab7: Programming SDK-2 (Javascript, NodeJS, Python)",
              },
              {
                title: "Week11 Lab8: Serverless Architecture (Lambda)",
              },
              {
                title: "Week12 Lab9: Mobile Application (Amplify)",
              },
              {
                title: "Week13 Lab10: IoT Application (IoT core)",
              },
              {
                title: "Week14 Hackathon",
              },
              {
                title: "Week15 Lab11: Chatbot (Lex)",
              },
              {
                title: "Week16 Lab12: Container/Kubernetes",
              },
              {
                title: "Week17 Final Project Presentation",
              },
            ],
          },
          {
            title: "Reference",
            children: [
              {
                title: renderHref("AWS", "https://aws.amazon.com/"),
              },
              {
                title: renderHref("GCP", "https://cloud.google.com/"),
              },
              {
                title: renderHref("Kubernetes", "https://kubernetes.io/"),
              },
              {
                title: renderHref("Azure", "https://azure.microsoft.com/"),
              },
            ],
          },
          {
            title: "Course Links",
            children: [
              {
                title: renderHref(
                  "ILMS (2019 Spring)",
                  "https://lms.nthu.edu.tw/course.php?courseID=44249"
                ),
              },
              {
                title: renderHref(
                  "Final Project Showcase",
                  "https://lsalab.cs.nthu.edu.tw/web/"
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    tab: "其他課程",
    name: "other",
    lectures: [
      {
        title:
          "EECS 201000 Introduction to Programming Laboratory (計算機程式設計實作)",
        children: [
          {
            title: "Instructor: Jerry Chou",
            children: [],
          },
          {
            title: "Offered: Summer 2017, 2019",
          },
          {
            title: "Course Description: This is a course offered for EECS",
          },
        ],
      },
      {
        title:
          "EMIM 500100 Introduction to AI and Big Data (人工智慧與大數據技術概論)",
        children: [
          {
            title: "Instructor: Von-Wun Soo, Chuan-Kang Ting, Jerry Chou",
          },
          {
            title: "Offered: Fall 2019~2020",
          },
          // {
          //   title: "Course Description: This is a course offered for EECS",
          // },
        ],
      },
      {
        title: "ISA 582000 The Cutting Edge of Deep Learning (前瞻深度學習)",
        children: [
          {
            title:
              "Instructor: Min Sun, Hwann-Tzong Chen, Che-Rung Lee, Jerry Chou",
          },
          {
            title: "Offered: Summer 2017, 2019",
          },
          // {
          //   title: "Course Description: This is a course offered for EECS",
          // },
        ],
      },
      {
        title: "CS 565100 Machine Learning (機器學習理論)",
        children: [
          {
            title: "Instructor: Da-Cheng Juan, Jerry Chou",
          },
          {
            title: "Offered: Fall 2017",
          },
          {
            title:
              "Course Description: This course aims at equipping students with the theory foundation and the best practice (as well as applications) of machine learning. The course contains four major parts: 1. Theory foundation and algorithms of machine learning 2. Theory and practice of deep learning 3. Semester-long projects 4. Paper presentation.",
          },
        ],
      },
      {
        title: "CS 591000 Seminar (資工所書報討論)",
        children: [
          {
            title: "Instructor: Jerry Chou",
          },
          {
            title: "Offered: Spring 105, Fall 2020",
          },
          // {
          //   title: "Course Description: This is a course offered for EECS",
          // },
        ],
      },
      {
        title: "ISA 565100 Seminar (資應所書報討論)",
        children: [
          {
            title: "Instructor: Jerry Chou",
          },
          {
            title: "Offered: Spring 105, Fall 2020",
          },
          // {
          //   title: "Course Description: This is a course offered for EECS",
          // },
        ],
      },
    ],
  },
];
</script>

<style scoped lang="scss">
ul {
  list-style-type: initial;
  ul {
    list-style-type: circle;
    ul {
      list-style-type: square;
    }
  }
}
</style>
