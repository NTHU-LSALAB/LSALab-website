import { createI18n } from "vue-i18n";
import { useSettingStore } from "@/store";
const initI18n = () => {
  const settingStore = useSettingStore();
  const locale = settingStore.locale || "en";
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: "en",
    messages: {
      en: {
        auth: {
          signIn: "Sign in",
          signOut: "Sign out",
        },
        page: {
          member: "Lab members",
          server: "Server Info",
        },
        nav: {
          members: "Members",
          advisor: "Advisor",
          student: "Students",
          research: "Research",
          field: "Fields",
          pub: "Publications",
          achievement: "Achievement",
          competition: "Comp. & Project",
          software: "Software",
          other: "Others",
          server: "Servers",
          connection: "Connection",
          calendar: "Calendar",
          album: "Album",
          resource: "Resource",
        },
        footer: {
          info: "INFO",
          location: "Location",
          phone: "Phone",
          link: "LINKS",
          contact: "CONTACT US",
        },
        home: {
          welcome: {
            title: "Welcome to Large-scale System Lab",
            text: "The Large-scale System Architecture (LSA) is a research lab found by {prof} since 2011 in the Department of Computer Science at National Tsing Hua University (NTHU), Hsinchu, Taiwan. We are interested in the board areas of {dist}, especially for cloud/edge computing, high performance computing, big data, storage systems, and resource or data management. Our mission is to design, implement and evaluate new algorithms, system components, and software tools for distributed systems in order to meet the user/application requirements and achieve system management objectives, such as performance, service quality, cost, and energy efficiency. We aim to address practical problems from real systems, and actively collaborating with both domestic and foreign {collaboration} to achieve our goals. Many of our prototype systems are based on open source projects, commodity servers, and public cloud platforms. You may find our work in published papers and open-source {repo}.",
            prof: "Prof. Jerry Chou",
            dist: "distributed systems",
            collaboration: "industrial companies and research institutions",
            paper: "papers",
            repo: "GitHub repository",
          },
          student: {
            title: "For prospective students",
            items: [
              {
                text: "We are recruiting graduate and undergraduate students who are interested in: {children}",
                items: [
                  "Performance profiling and optimization for applications and computing frameworks",
                  "Parallel programming on GPUs and clusters",
                  "Container technology (Docker, Kubernetes), Cloud Services and Platforms (AWS, Azure, Google Cloud Platform)",
                  "Building system software, like scheduler, resource allocator, monitor, etc",
                  "Hands-on Linux system administrations and operations",
                  "Studying and participating open source projects",
                ],
              },
              {
                text: "If you are graduate students, checkout our {research} and {software}. If you are undergraduate students, checkout our {competition} and {project}.",
              },
              {
                text: "Prospective students are welcome to have a chat with me to better understand our topics and projects. Please {email} your resume (including transcript and project experiences) to make an appointment.",
              },
            ],
            research: "research projects",
            software: "software",
            competition: "student cluster competition",
            project: "graduation projects",
            email: "email me",
          },
          news: {
            title: "News",
          },
        },
        advisor: {
          about: "About Me",
          sketch: "Biographical Sketches",
          pub: "Publications",
          teaching: "Teaching",
          cv: "CV",
        },
        server: {
          basic: "Basic info",
          hardware: "Hardware info",
        },
        dev: {
          note: "Note",
          content:
            "Since this site is still under development, there might be some incomplete parts and translation works.",
          action: "Got It",
        },
        button: {
          create: "Create",
          upload: "Upload",
          confirm: "Confirm",
          cancel: "Cancel",
        },
        connection: {
          acts: "Alliance of Cloud Technology and Services (ACTS)",
          vision: "Vision",
          visionText:
            "本聯盟是在科技部產學小聯盟計畫的推動與支助之下成立。在第一期計畫執行中即致力於透過雲運算技術連結國內軟體產業，包括國內在系統開發和人工智慧的龍頭廠商，廣達、Appier，都是本聯盟的會員並有密切的技術合作。因此在第二期的計畫執行中，我們希望延續目前聯盟長期的耕耘，彌補國內人工智慧產業發展在計算平台與服務的技術缺口，並作為政府在建置國內人工智慧計算平台所需結合產、學、研、官力量的媒合平台。",
          member: "Alliance member",
          academicMember: "Academic",
          industrialMember: "Industrial",
          activity: "Co-organized activities",
          collaboration: "Collaborations",
        },
        competition: {
          scc: "Student Cluster Comp.",
          project: "Graduation project",
          intro: "Introduction",
          way: "How it goes",
          recruit: "Admission session",
          info: "Information",
          history: "History",
          news: "News & Highlights",
        },
      },
      zh: {
        auth: {
          signIn: "登入",
          signOut: "登出",
        },
        page: {
          member: "實驗室成員",
          server: "伺服器資訊",
        },
        nav: {
          members: "成員",
          advisor: "指導教授",
          student: "學生",
          research: "研究",
          field: "研究領域",
          pub: "發表著作",
          achievement: "成就",
          competition: "競賽與專題",
          software: "軟體",
          other: "其他",
          server: "伺服器",
          connection: "產學合作",
          calendar: "行事曆",
          album: "相簿",
          resource: "其他資源",
        },
        footer: {
          info: "資訊",
          location: "地點",
          phone: "聯絡電話",
          link: "相關連結",
          contact: "聯絡我們",
        },
        home: {
          welcome: {
            title: "歡迎來到超大型系統架構實驗室 (LSA Lab)",
            text: "超大型系統架構實驗室由清華大學資工系{prof}於2011年所創辦。我們對於{dist}的各種領域有著極大的興趣，尤其是 Cloud/Edge Computing、High Performance Computing (HPC)、Big Data、Storage systems 以及 Resource or Data Management。我們致力於設計、實作出各種全新的演算法、系統架構及資源管理方法並評估它。我們注重於找出生活中可被解決的問題，並透過許多與國內外的{collaboration}的合作來達成我們的目標。我們有許多的系統設計專案都是基於Open Source Project、Commodity servers 以及 public cloud platforms。你可以透過已經發佈的{paper}以及我們的 {repo} 來找到更多相關的成果。",
            prof: "周志遠教授",
            dist: "分散式系統",
            collaboration: "合作企業與研究單位",
            paper: "論文",
            repo: "GitHub",
          },
          student: {
            title: "有興趣加入嗎？",
            items: [
              {
                text: "我們正在招募對於以下幾點有興趣的大學部與碩士班的學生： {children}",
                items: [
                  "對於應用及計算框架的效能分析及優化",
                  "GPUs 與 Clusters 上的平行程式設計",
                  "Container技術 (Docker, Kubernetes)、雲端服務及平台 (AWS, Azure, Google Cloud Platform)",
                  "建造系統層面的軟體，像是Scheduler、Resource Allocator、Monitor等",
                  "熟悉於Linux系統的介面與操作",
                  "研究及參與Open source專案",
                ],
              },
              {
                text: "如果你是碩士班學生，請參考我們的{research}及{software}。如果你是大學部學生，請參考我們的{competition}及{project}。",
              },
              {
                text: "任何有對我們實驗室有興趣的學生都可以找我聊聊看，更能加深你對我們領域的認識。你可以{email}預約並附上你的履歷（包含成績單與任何Project的相關經驗）",
              },
            ],
            research: "研究領域",
            software: "軟體實作",
            competition: "學生競賽",
            project: "實作專題",
            email: "寄信給我",
          },
          news: {
            title: "最新消息",
          },
        },
        advisor: {
          about: "關於我",
          sketch: "生平簡介",
          pub: "發表著作",
          teaching: "教學",
          cv: "CV",
        },
        server: {
          basic: "基本資訊",
          hardware: "硬體規格",
        },
        dev: {
          note: "註",
          content: "因為此網站仍在開發中，可能會出現翻譯不全及內容缺失的情況。",
          action: "收到",
        },
        button: {
          create: "新增",
          upload: "上傳",
          confirm: "確認",
          cancel: "取消",
        },
        connection: {
          acts: "雲運算技術與服務產學聯盟",
          vision: "聯盟宗旨",
          visionText:
            "本聯盟是在科技部產學小聯盟計畫的推動與支助之下成立。在第一期計畫執行中即致力於透過雲運算技術連結國內軟體產業，包括國內在系統開發和人工智慧的龍頭廠商，廣達、Appier，都是本聯盟的會員並有密切的技術合作。因此在第二期的計畫執行中，我們希望延續目前聯盟長期的耕耘，彌補國內人工智慧產業發展在計算平台與服務的技術缺口，並作為政府在建置國內人工智慧計算平台所需結合產、學、研、官力量的媒合平台。",
          member: "產業聯盟會員",
          academicMember: "學界成員",
          industialMember: "業界成員",
          activity: "協辦活動",
          collaboration: "合作企業與研究單位",
        },
        competition: {
          scc: "學生叢集競賽",
          project: "系統專題實作",
          intro: "比賽簡述",
          way: "賽事進行方式",
          recruit: "招生說明",
          info: "賽事資訊",
          history: "歷年比賽隊員與成績",
          news: "相關報導與活動集錦",
        },
      },
    },
  });
};

export default initI18n;
