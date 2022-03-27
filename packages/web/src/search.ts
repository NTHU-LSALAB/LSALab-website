import algoliasearch from "algoliasearch";
// import moment from "moment";

export const searchClient = algoliasearch(
  import.meta.env.VITE_SEARCH_APP_ID,
  import.meta.env.VITE_SEARCH_API_KEY
);
export const searchIndex = searchClient.initIndex("lsalab");

// const objects = [
//   {
//     title:
//       "CAMIRA: A Consolidation-Aware Migration Avoidance Job Scheduling Strategy for Virtualized Parallel Computing Clusters",
//     field: "hpc",
//     venue: "journal",
//     venueName: "Journal of Supercomputing",
//     members: [
//       "Satyajit Padhy",
//       "Ming-Han Tsai",
//       "Shalini Sharma",
//       "Jerry Chou",
//     ],
//     year: 2022,
//   },
//   {
//     title:
//       "Gemini: Enabling Multi-Tenant GPU Sharing Based on Kernel Burst Estimation",
//     field: "cloud",
//     venue: "journal",
//     venueName: "IEEE Transactions on Cloud Computing",
//     members: ["Hung-Hsin Chen", "En-Te Lin", "Yu-Min Chou", "Jerry Chou"],
//     // date: moment("2021"),
//     code: "https://github.com/NTHU-LSALAB/Gemini_UM",
//     webpage: "https://ieeexplore.ieee.org/abstract/document/9566822",
//   },
//   {
//     title:
//       "Performance Benchmarking and Auto-tuning for Scientific Applications on Virtual Cluster",
//     field: "hpc",
//     venue: "journal",
//     venueName: "Journal of Supercomputing",
//     members: ["Ke-Jou Hsu", "Jerry Chou"],
//     date: moment("2021-10"),
//     webpage: "https://link.springer.com/article/10.1007/s11227-021-04103-w",
//   },
//   {
//     title:
//       "A Hybrid Virtual Network Function Placement Strategy for Maximizing the Profit of Network Service Deployment Over Time-Varying Workloads",
//     field: "network",
//     venue: "journal",
//     venueName: "IEEE Access",
//     members: ["Chi-Chen Yang", "Satyajit Padhy", "Jerry Chou"],
//     date: moment("2021-07"),
//     webpage: "https://ieeexplore.ieee.org/document/9474486",
//   },
//   {
//     title:
//       "MIRAGE: A Consolidation Aware Migration Avoidance Genetic Job Scheduling Algorithm for Virtualized DataCenters",
//     field: "cloud",
//     venue: "journal",
//     venueName:
//       "Journal of Parallel and Distributed Computing(JPDC), Volume 154, pages 106-118",
//     members: ["Satyajit Padhy", "Jerry Chou"],
//     date: moment("2021-05"),
//     webpage: "https://ieeexplore.ieee.org/document/9380313",
//   },
//   {
//     title:
//       "Reconfiguration Aware Orchestration for Network Function Virtualization with Time-varied Workload in Virtualized Datacenters",
//     field: "network",
//     venue: "journal",
//     venueName: "IEEE Access",
//     members: ["Satyajit Padhy", "Jerry Chou"],
//     date: moment("2021-03"),
//     webpage: "https://ieeexplore.ieee.org/document/9380313",
//   },
//   {
//     title:
//       "Distributed and Incremental Travelling Salesman Algorithm on Time Evolving Graphs",
//     field: "big-data",
//     topic: "time-evolving-graph-processing",
//     venue: "journal",
//     venueName: "Journal of Supercomputing",
//     members: ["Shalini Sharma", "Jerry Chou"],
//     date: moment("2021-03"),
//     webpage: "https://link.springer.com/article/10.1007%2Fs11227-021-03716-5",
//   },
//   {
//     title:
//       'Critique of "Computing Planetary Interior Normal Modes with a Highly Parallel Polynomial Filtering Eigensolver" by SCC Team from National Tsing Hua University',
//     field: "hpc",
//     // topic: "time-evolving-graph-processing",
//     venue: "journal",
//     venueName: "IEEE Transactions on Parallel and Distributed Systems (TPDS)",
//     members: [
//       "Wei-Fang Sun",
//       "Hung-Hsin Chen",
//       "Shao-Fu Lin",
//       "Yuan-Ching Lin",
//       "Jing-Wei Wu",
//       "En-Te Lin",
//       "Jerry Chou",
//     ],
//     date: moment("2021-01"),
//     webpage: "https://ieeexplore.ieee.org/document/9314242",
//   },
//   {
//     title: "A Survey of Computation Techniques on Time Evolving Graphs",
//     field: "big-data",
//     topic: "time-evolving-graph-processing",
//     venue: "journal",
//     venueName:
//       "International Journal of Big Data and Intelligence, Vol 7. No 1",
//     members: ["Shalini Sharma", "Jerry Chou"],
//     date: moment("2020-03"),
//     webpage: "https://www.inderscience.com/info/inarticle.php?artid=106151",
//   },
//   {
//     title:
//       "Student Cluster Competition 2018, Team NTHU: Reproducing Performance of Multi-Physics Simulations of the Tsunamigenic 2004 Sumatra Megathrust Earthquake on the Intel Skylake architecture",
//     field: "hpc",
//     venue: "journal",
//     venueName:
//       "Journal of Parallel Computing, Elsevier, Special Issue of SC18 Student Cluster Competition Reproducibility Initiative, Volume 90",
//     members: [
//       "ShaoFu Lin",
//       "ChiChen Yang",
//       "YuHsuan Cheng",
//       "KengJui Hsu",
//       "HungHsin Chen",
//       "YuanChing Lin",
//       "Jerry Chou",
//     ],
//     date: moment("2019-12"),
//     webpage:
//       "https://www.sciencedirect.com/science/article/abs/pii/S0167819119301607",
//   },
//   {
//     title:
//       "Student cluster competition 2017, team NTHU: Reproducing vectorization of the tersoff multi-body potential on the Intel Skylake and Nvidia P100 architecture",
//     field: "hpc",
//     venue: "journal",
//     venueName:
//       "Journal of Parallel Computing, Special Issue of SC17 Student Cluster Competition Reproducibility Initiative, Volume 78, pp 72-78",
//     members: [
//       "ChanJung Chang",
//       "YungChing Lin",
//       "YuHsuan Cheng",
//       "YuCheng Wang",
//       "LiYu Yu",
//       "TienChi Yang",
//       "Jerry Chou",
//     ],
//     date: moment("2018-10"),
//     webpage:
//       "https://www.sciencedirect.com/science/article/abs/pii/S0167819119301607",
//   },
//   {
//     title:
//       "GEODIS: towards the optimization of data locality-aware job scheduling in geo-distributed data centers",
//     field: "hpc",
//     topic: "hpc-on-cloud",
//     venue: "journal",
//     venueName: "Journal of Computing, Springer, pages 1-26",
//     members: [
//       "Moïse W. Convolbo",
//       "Jerry Chou",
//       "Ching-Hsien Hsu",
//       "Yeh Ching Chung",
//     ],
//     date: moment("2017-07"),
//     tags: [
//       "Scheduling",
//       "90C05 Linear programming",
//       "Geo-distributed",
//       "Data locality",
//       "Data center",
//       "Big data analysis",
//       "Batch jobs",
//       "90C46 Optimality conditions",
//       "90C27 Combinatorial optimization",
//       "duality",
//     ],
//     webpage: "https://link.springer.com/article/10.1007/s00607-017-0564-7",
//   },
//   {
//     title:
//       "Cost-aware DAG Scheduling Algorithms for Minimizing Execution Cost on Cloud Resources",
//     field: "hpc",
//     topic: "hpc-on-cloud",
//     venue: "journal",
//     venueName: " Journal of Supercomputing Vol. 72(3), pages 985-1012",
//     members: ["Moïse W. Convolbo", "Jerry Chou"],
//     date: moment("2016-01"),
//     webpage:
//       "https://link.springer.com/article/10.1007/s11227-016-1637-7?noAccess=true",
//   },
//   {
//     title: "Exploiting Replication for Energy-Aware Scheduling",
//     field: "cloud",
//     topic: "",
//     venue: "journal",
//     venueName: "IEEE Transactions on Parallel and Distributed Systems (TPDS)",
//     members: [
//       "Jerry Chi-Tuan Chou",
//       "Ting-Hsuan Lai",
//       "Jinoh Kim",
//       "Doron Rotem",
//     ],
//     date: moment("2014-09"),
//     webpage: "https://ieeexplore.ieee.org/document/6902814",
//   },
//   {
//     title:
//       "iPACS: Power-aware covering sets for energy proportionality and performance in data parallel computing clusters",
//     field: "cloud",
//     venue: "journal",
//     venueName:
//       "Journal of Parallel and Distributed Computing (JPDC) Vol.74, Iss. 1, pages 1762-1774",
//     members: ["Jinoh Kim", "Jerry Chou", "Doron Rotem"],
//     date: moment("2017-01"),
//     webpage:
//       "http://www.sciencedirect.com/science/article/pii/S0743731513002025",
//   },
//   {
//     title: "Birkhoff-von Neumann Switching with Statistical Traffic Profiles",
//     field: "network",
//     venue: "journal",
//     venueName:
//       "Computer Communications Research Letter Vol. 33, Iss. 7, pages 848-851",
//     members: ["Jerry Choud", "Biil Lin"],
//     date: moment("2010-05"),
//     webpage: "https://dl.acm.org/doi/10.1016/j.comcom.2009.12.005",
//   },
//   {
//     title:
//       "Proactive Surge Protection: A Defense Mechanism for Bandwidth-Based Attacks",
//     field: "network",
//     venue: "journal",
//     venueName:
//       "IEEE/ACM Transaction on Networking (ToN) Vol. 17, Iss. 6, pages 1711-1723",
//     members: ["Jerry Chou", "Bill Lin", "Subhabrata Sen", "Oliver Spatscheck"],
//     date: moment("2009-12"),
//     webpage: "https://ieeexplore.ieee.org/document/5208213?arnumber=5208213",
//   },
//   {
//     title:
//       "Coarse Optical Circuit Switching By Default, Re-Routing Over Circuit For Adaptation",
//     field: "network",
//     venue: "journal",
//     venueName:
//       "Journal of Optical Networking (JON) Vol. 8, Iss. 1, pages 33-50",
//     members: ["Jerry Chou", "Bill Lin"],
//     date: moment("2009-01"),
//     webpage:
//       "http://citeseerx.ist.psu.edu/viewdoc/summary;jsessionid=5AF6B2F7A9301CB4C441A555E2FD9E67?doi=10.1.1.184.305",
//   },
//   {
//     title: "SCALLOP: A Scalable and Load-Balanced Peer-to-Peer Lookup Protocol",
//     field: "network",
//     venue: "journal",
//     venueName:
//       "IEEE Transactions on Parallel and Distributed Systems (TPDS), Vol. 17, Iss. 5, pages 419-433",
//     members: ["Jerry Chou", "Tai-Yi Huang", "Kuang-Li Huang"],
//     date: moment("2004-04"),
//     webpage: "https://ieeexplore.ieee.org/document/1336544",
//   },
//   // conference
//   {
//     title:
//       "Evaluations of Network Performance Enhancement on Cloud-native Network Function",
//     field: "network",
//     venue: "conference",
//     venueName:
//       "Proceedings of the 3rd International Workshop on Systems and Network Telemetry and Analytic (SNTA) in conjunction with ACM International Symposium on High-Performance Parallel and Distributed Computing (HPDC), pages 3-8",
//     members: ["Yong-Xuan Huang", "Jerry Chou"],
//     date: moment("2021-06"),
//     webpage: "https://dl.acm.org/doi/10.1145/3452411.3464442",
//   },
//   {
//     title:
//       "A Hybrid Virtual Network Function Placement Strategy for Maximizing the Profit of Network Service Deployment over Dynamic Workload",
//     field: "network",
//     venue: "conference",
//     venueName:
//       "Proceedings of the 3rd International Workshop on Systems and Network Telemetry and Analytic (SNTA) in in conjunction with ACM International Symposium on High-Performance Parallel and Distributed Computing (HPDC), pages 17-20",
//     members: ["Chi-Chen Yang", "Jerry Chou"],
//     date: moment("2021-06"),
//     webpage: "https://dl.acm.org/doi/abs/10.1145/3452411.3464440",
//   },
//   {
//     title:
//       "DynamoML: Dynamic Resource Management Operators for Machine Learning Workloads",
//     field: "sys-for-ai",
//     venue: "conference",
//     venueName:
//       "11th International Conference on Cloud Computing and Service Science (CLOSER)",
//     members: ["Min-Chi Chiang", "Jerry Chou"],
//     date: moment("2021-04"),
//     award: "Best Paper Award",
//     webpage: "https://www.scitepress.org/Papers/2021/104834/",
//   },
//   {
//     title:
//       "A Deep Reinforcement Learning Method for Solving Task Mapping Problems with Dynamic Traffic on Parallel Systems",
//     field: "ai-for-sys",
//     venue: "conference",
//     venueName:
//       "International Conference on High Performance Computing in Asia-Pacific Region (HPC Asia), pages 1-10",
//     members: ["Yu-Cheng Wang", "Jerry Chou", "I-Hsin Chung"],
//     date: moment("2021-01"),
//     webpage: "https://dl.acm.org/doi/10.1145/3432261.3432262",
//   },
//   {
//     title:
//       "Finding the Optimal Reconfiguration for Network Function Virtualization Orchestration with Time-varied Workload",
//     field: "network",
//     venue: "conference",
//     venueName:
//       "Proceedings of the 3rd International Workshop on Systems and Network Telemetry and Analytic (SNTA) in in conjunction with ACM International Symposium on High-Performance Parallel and Distributed Computing (HPDC), pages 49-52",
//     members: ["Satyajit Padhy", "Jerry Chou"],
//     date: moment("2020-06"),
//     webpage: "https://dl.acm.org/doi/10.1145/3391812.3396275",
//   },
//   {
//     title:
//       "ECS2: A Fast Erasure Coding Library for GPU-Accelerated Storage Systems With Parallel & Direct IO",
//     field: "cloud",
//     venue: "conference",
//     venueName: "IEEE Cluster Conference",
//     members: ["Chan-Jung Chang", "Jerry Chou", "Yu-Ching Chou", "I-Hsin Chung"],
//     code: "https://github.com/NTHU-LSALAB/ECS2",
//     date: moment("2020-09"),
//     webpage: "https://ieeexplore.ieee.org/document/9229486",
//   },
//   {
//     title:
//       "KubeShare: A Framework to Manage GPUs as First-Class and Shared Resources in Container Cloud",
//     field: "ai-for-sys",
//     venue: "conference",
//     venueName:
//       "The 29th International Symposium on High-Performance Parallel and Distributed Computing (HPDC), pages 173-184",
//     members: ["Ting-An Yeh", "Hung-Hsin Chen", "Jerry Chou"],
//     date: moment("2020-06"),
//     code: "https://github.com/NTHU-LSALAB/KubeShare",
//     video: "https://www.youtube.com/watch?v=1WQMKCGN9j4",
//     webpage: "https://dl.acm.org/doi/abs/10.1145/3369583.3392679",
//   },
//   {
//     title:
//       "Using Inaccurate Job Prediction for Detecting Machine Failures in Parallel Computing Cluster",
//     field: "sys-for-ai",
//     venue: "conference",
//     venueName:
//       "IEEE International Conference on Big Data Intelligence and Computing (DataCom)",
//     members: ["Ting-Yu Lin", "Jerry Chou"],
//     date: moment("2019-11"),
//   },
//   {
//     title:
//       "Unsupervised Online Anomaly Detection on Multivariate Sensing Time Series Data for Smart Manufacturing",
//     field: "sys-for-ai",
//     venue: "conference",
//     venueName:
//       "IEEE International Conference on Service Oriented Computing and Applications (SOCA)",
//     members: ["Ruei-Jie Hsieh", "Jerry Chou", "Chih-Hsiang Ho"],
//     date: moment("2019-11"),
//     webpage: "https://ieeexplore.ieee.org/document/8953015",
//   },
//   {
//     title:
//       "DRAGON: A Dynamic Scheduling and Scaling Controller Managing Distributed Deep Learning Jobs in Kubernetes Cluster",
//     field: "ai-for-sys",
//     venue: "conference",
//     venueName:
//       "The 9th International Conference on Cloud Computing and Service Science (CLOSER), pages 569-577",
//     members: ["Chan-Yi Lin", "Ting-An Yeh", "Jerry Chou"],
//     date: moment("2019-05"),
//     webpage: "https://www.scitepress.org/Papers/2019/77076/77076.pdf",
//   },
//   {
//     title: "A Computation Workload Characteristic Study of C-RAN",
//     field: "sys-for-ai",
//     venue: "conference",
//     venueName:
//       "Proceedings of the 1st International Workshop on Systems and Network Telemetry and Analytic (SNTA) in conjunction with IEEE 38th International Conference on Distributed Computing Systems (ICDCS), Vienna, pages 1599-1603",
//     members: ["Yu-Cing Luo", "Shih-Chun Huang", "Jerry Chou"],
//     date: moment("2018-07"),
//     webpage: "https://ieeexplore.ieee.org/abstract/document/8416442",
//   },
//   {
//     title:
//       "A Deep Learning Application-oriented Performance Evaluation for Cloud Resource Orchestration Comparison between Bare-metal, Container and VM",
//     field: "ai-for-sys",
//     venue: "conference",
//     venueName:
//       "The 8th International Conference on Cloud Computing and Service Science (CLOSER)",
//     members: ["Chan-Yi Lin", "Hsin-Yu Pai", "Jerry Chou"],
//     date: moment("2018-03"),
//     slides: "https://lsalab.cs.nthu.edu.tw/home/publication/CLOSER18.pdf",
//     webpage: "https://www.scitepress.org/Papers/2018/66806/66806.pdf",
//   },
//   {
//     title:
//       "Using Deep Learning to Predict and Optimize Hadoop Data Analytic Service in a Cloud Platform",
//     field: "sys-for-ai",
//     venue: "conference",
//     venueName:
//       "IEEE International Conference on Big Data Intelligence and Computing (DataCom)",
//     members: [
//       "Chen-Chun Chen",
//       "Yu-Tung Hsaio",
//       "Chan-Yi Lin",
//       "Shihyu Lu",
//       "Hsin-Tse Lu",
//       "Jerry Chou",
//     ],
//     date: moment("2017-11"),
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/DataCom17_slides.pdf",
//     webpage: "https://ieeexplore.ieee.org/document/8328497/",
//   },
//   {
//     title: "A Dynamic Module Deployment Framework for M2M Platforms",
//     field: "network",
//     venue: "conference",
//     venueName:
//       "IEEE International Symposium on Cloud and Services Computing(SC2)",
//     members: [
//       "Bing-Liang Chen",
//       "Shih-Chun Huang",
//       "Yu-Cing Luo",
//       "Yeh-Ching Chung",
//       "Jerry Chou",
//     ],
//     date: moment("2017-11"),
//     slides: "https://lsalab.cs.nthu.edu.tw/home/publication/2018_SC2_M2M.pdf",
//     webpage: "https://ieeexplore.ieee.org/document/8315377/",
//   },
//   {
//     title:
//       "Application-aware Traffic Redirection: A Mobile Edge Computing Implementation toward Future 5G Networks",
//     field: "network",
//     venue: "conference",
//     venueName:
//       "IEEE International Symposium on Cloud and Services Computing(SC2)",
//     award: "Outstanding Paper Award",
//     members: [
//       "Shih-Chun Huang",
//       "Yu-Cing Luo",
//       "Bing-Liang Chen",
//       "Yeh-Ching Chung",
//       "Jerry Chou",
//     ],
//     date: moment("2017-11"),
//     webpage: "https://ieeexplore.ieee.org/document/8315351/",
//   },
//   {
//     title:
//       "Optimizing the Query Performance of Block Index Through Data Analysis and I/O Modeling",
//     field: "hpc",
//     topic: "index-query-system",
//     venue: "conference",
//     venueName: "IEEE Supercomputing Conference (SC)",
//     webpage: "https://dl.acm.org/citation.cfm?id=3126908.3126934",
//     members: [
//       "Tzuhsien Wu",
//       "Jerry Chou",
//       "Shyng Hao",
//       "Bin Dong",
//       "Scott Klasky",
//       "Kesheng Wu",
//     ],
//     date: moment("2017-11"),
//     slides: "https://lsalab.cs.nthu.edu.tw/home/publication/SC17_Slides.pdf",
//   },
//   {
//     title:
//       "Apply Block Index Technique to Scientific Data Analysis and I/O Systems",
//     field: "hpc",
//     topic: "index-query-system",
//     venue: "conference",
//     venueName: "IEEE CCGrid DBDM Workshop",
//     members: [
//       "Tsuhsien Wu",
//       "Jerry Chou",
//       "Norbert Podhorszki",
//       "Junmin Gu",
//       "Yuan Tian",
//       "Scott Klasky",
//       "Kesheng Wu",
//     ],
//     date: moment("2017-05"),
//     webpage: "https://ieeexplore.ieee.org/document/7973792",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/CloudCom2016_DRASH_slides.pdf",
//   },
//   {
//     title:
//       "DRASH: A Data Replication-Aware Scheduler in Geo-distributed Data Centers",
//     field: "hpc",
//     venue: "conference",
//     venueName: "IEEE CloudCom",
//     members: [
//       "Moise W. Convolbo",
//       "Jerry Chou",
//       "Shihyu Lu",
//       "Yeh Ching Chung",
//     ],
//     date: moment("2016-12"),
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/CloudCom2016_DPS.pdf",
//     webpage: "https://ieeexplore.ieee.org/document/7830697/",
//   },
//   {
//     title: "Dynamic Block Partitioning Strategy for Cloud-backed File Systems",
//     field: "cloud",
//     venue: "conference",
//     venueName: "IEEE CloudCom",
//     members: ["Lung-Hsiang Chung", "Chin Feng Lee", "Jerry Chou"],
//     date: moment("2016-12"),
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/CloudCom2016_DPS.pdf",
//     webpage: "https://ieeexplore.ieee.org/document/7830691/",
//   },
//   {
//     title:
//       "A Middleware Solution for Optimal Sensor Management of IoT Applications on LTE Devices",
//     field: "network",
//     venue: "conference",
//     venueName:
//       "The 12th EAI International Conference on Heterogeneous Networking for Quality, Reliability, Security and Robustness",
//     members: [
//       "Satyajit Padhy, Hsin-Yu Chang, Ting-Fang Hou, Jerry Chou, Chung-Ta King and Cheng-Hsin,Hsu",
//     ],
//     date: moment("2016-07"),
//     webpage: "http://qshine.org/2016/show/accepted-papers",
//   },
//   {
//     title: "Performance Evaluations of Cloud Radio Access Networks",
//     field: "network",
//     venue: "conference",
//     venueName:
//       "The 12th EAI International Conference on Heterogeneous Networking for Quality, Reliability, Security and Robustness",
//     members: [
//       "Mu-Han Huang",
//       "Yu-Cing Lou",
//       "Chen-Nien Mao",
//       "Bing-Liang Chen",
//       "Shih-Chun Huang",
//       "Jerry Chou",
//       "Shun-Ren Yang",
//       "Yeh-Ching Chung",
//       "Cheng-Hsin Hsu",
//     ],
//     date: moment("2016-07"),
//     webpage: "http://qshine.org/2016/show/accepted-papers",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/Qshine16_MuHan_slides.pdf",
//   },
//   {
//     title: "Distributed Incremental Pattern Matching on Streaming Graphs",
//     field: "big-data",
//     topic: "time-evolving-graph-processing",
//     webpage: "https://dl.acm.org/doi/10.1145/2915516.2915519",
//     venue: "conference",
//     venueName:
//       "The 1st High Performance Graph Processing workshop of HPDC, pages 43-50",
//     members: ["Jyun-Sheng Kao", "Jerry Chou"],
//     date: moment("2016-05"),
//     slides: "https://lsalab.cs.nthu.edu.tw/home/publication/HPGP16_slides.pdf",
//   },
//   {
//     title:
//       "Indexing Blocks to Reduce Space and Time Requirements for Searching Large Data Files",
//     field: "hpc",
//     topic: "index-query-system",
//     venue: "conference",
//     venueName:
//       "IEEE/ACM International Symposium on Cluster Computing and the Grid(CCGrid), pages 398-402",
//     members: [
//       "Tzuhsien Wu",
//       "Shyng Hao",
//       "Jerry Chou",
//       "Bin Dong",
//       "Kesheng Wu",
//     ],
//     date: moment("2016-05"),
//     webpage: "https://ieeexplore.ieee.org/document/7515714/",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/CCGrid16_slides.pdf",
//   },
//   {
//     title:
//       "A Patient-Centered Medical Environment with Wearable Sensors and Cloud Monitoring",
//     field: "network",
//     venue: "conference",
//     venueName: "IEEE World Forum on Internet of Things WF-IoT, pages 628-633",
//     members: [
//       "Yu-Jung Ko",
//       "Hui-Ming Huang",
//       "Wei-Han Hsing",
//       "Jerry Chou",
//       "Hung-Chih Chiu",
//       "Hsi-Pin Ma",
//     ],
//     date: moment("2015-12"),
//     webpage: "http://dl.acm.org/citation.cfm?id=2924890",
//   },
//   {
//     title: "In-memory Query System for Scientific Datasets",
//     field: "hpc",
//     venue: "conference",
//     venueName:
//       "IEEE International Conference on Parallel and Distributed Systems (ICPADS), pages 362-371",
//     members: ["Hsuan-Te Chiu", "Jerry Chou", "Venkat Vishwanath", "Kesheng Wu"],
//     date: moment("2015-12"),
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/ICPADS15_slides.pdf",
//     webpage: "http://dl.acm.org/citation.cfm?id=2922165",
//   },
//   {
//     title:
//       "pNFS-based Software-Defined Storage for Information Lifecycle Management",
//     field: "cloud",
//     venue: "conference",
//     venueName:
//       "International Conference on Cloud Computing and Big Data (CCBD), pages 89-92",
//     members: [
//       "Kuo Sheng Deng",
//       "Chin Feng Lee",
//       "Jerry Chou",
//       "Yi Chen Shih",
//       "Shang Hao Chuang",
//       "Po Hsuan Wu",
//     ],
//     date: moment("2015-11"),
//     webpage: "http://ieeexplore.ieee.org/document/7450535/",
//     slides: "https://lsalab.cs.nthu.edu.tw/home/publication/CCBD15_slides.pdf",
//   },
//   {
//     title:
//       "Simplifying Index File Structure to Improve I/O Performance of Parallel Indexing",
//     field: "hpc",
//     topic: "index-query-system",
//     venue: "conference",
//     venueName:
//       "IEEE International Conference on Parallel and Distributed Systems (ICPADS), pages 576-583",
//     members: [
//       "Hsuan-Te Chiu",
//       "Jerry Chou",
//       "Venkat Vishwanath",
//       "Surendra Byna",
//       "Kesheng Wu",
//     ],
//     date: moment("2014-12"),
//     webpage:
//       "http://ieeexplore.ieee.org/xpl/articleDetails.jsp?reload=true&arnumber=7097856",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/ICPADS14_slides.pdf",
//   },
//   {
//     title: "Taiwan UniCloud: A Cloud Testbed with Collaborative Cloud Services",
//     field: "ai-for-sys",
//     venue: "conference",
//     venueName:
//       "IEEE International Conference on Cloud Engineering (IC2E), pages 107-116",
//     members: [
//       "Wu-Chun Chung",
//       "Po-Chi Shih",
//       "Kuan-Chou Lai",
//       "Kuan-Ching Li",
//       "Che-Rung Lee",
//       "Jerry Chou",
//       "Ching-Hsien Hsu",
//       "Yeh-Ching Chung",
//     ],
//     date: moment("2014-03"),
//     webpage: "http://dl.acm.org/citation.cfm?id=2624669",
//   },
//   {
//     title:
//       "Prevent VM Migration in Virtualized Clusters via Deadline Driven Placement Policy",
//     field: "hpc",
//     venue: "conference",
//     venueName: "IEEE CloudCom, pages 599-606",
//     members: ["Ming-Han Tsai", "Jerry Chou"],
//     date: moment("2013-12"),
//     webpage: "http://dl.acm.org/citation.cfm?id=2568583",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/CloudCom13_slides.pdf",
//   },
//   {
//     title: "Optimizing FastQuery Performance on Lustre File System",
//     field: "hpc",
//     topic: "index-query-system",
//     venue: "conference",
//     venueName:
//       "International Conference on Scientific and Statistical Database Management (SSDBM), pages 29:1-29:12",
//     members: ["Kuan-Wu Lin", "Surendra Byna", "Jerry Chou", "Kesheng Wu"],
//     date: moment("2013-07"),
//     webpage: "https://dl.acm.org/doi/10.1145/2484838.2484853",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/SSDBM13_FQ_slides.pdf",
//   },
//   {
//     title: "Automated Hash-based Elastic Cloud Storage",
//     field: "cloud",
//     venue: "conference",
//     venueName: "Symposium on Cloud and Services Computing (SCC)",
//     members: ["Cheng-Han Wu", "Ming-Ji Wu", "Jerry Chou"],
//     date: moment("2013-03"),
//     webpage: "https://lsalab.cs.nthu.edu.tw/home/publication/SCC13.pdf",
//     slides: "https://lsalab.cs.nthu.edu.tw/home/publication/SCC13_slides.pdf",
//   },
//   {
//     title:
//       "Value-Based Tiering Management on Heterogeneous Block-Level Storage System",
//     field: "cloud",
//     venue: "conference",
//     venueName: "IEEE CouldCom, pages 393-398",
//     members: ["Chai-Hao Tsai", "Jerry Chou", "Yeh-Ching Chung"],
//     date: moment("2012-12"),
//     webpage: "http://dl.acm.org/citation.cfm?id=2469266",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/CloudCom12_slides.pdf",
//   },
//   {
//     title:
//       "Parallel IO, Analysis, and Visualization of a Trillion Particle Simulation",
//     field: "hpc",
//     topic: "index-query-system",
//     venue: "conference",
//     venueName: "IEEE Supercomputing Conference (SC), pages 59:1-59:12",
//     date: moment("2012-11"),
//     members: [
//       "Surendra Byna",
//       "Jerry Chou",
//       "Oliver Ruebel",
//       "Mr Prabhat",
//       "Homa Karimabadi",
//       "William Daughton",
//       "Vadim Roytershteyn",
//       "Wes Bethel",
//       "Mark Howison",
//       "Ke-Jou Hsu",
//       "Kuan-Wu Lin",
//       "Arie Shoshani",
//       "Andrew Uselton",
//       "Kesheng Wu",
//     ],
//     webpage: "http://dl.acm.org/citation.cfm?id=2389077",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/SC12_VPIC_slides.pdf",
//   },
//   {
//     title:
//       "FastQuery: A General Indexing and Querying System for Scientific Data",
//     field: "hpc",
//     venue: "conference",
//     venueName:
//       "Workshop on Interfaces and Abstractions for Scientific Data Storage (IASDS)",
//     members: ["Jerry Chou", "Kesheng We", "Prabhat"],
//     date: moment("2011-09"),
//     webpage: "https://ieeexplore.ieee.org/document/6061134",
//   },
//   {
//     title: "Parallel Index and Query for Large Scale Data Analysis",
//     field: "hpc",
//     topic: "index-query-system",
//     venue: "conference",
//     venueName: "IEEE Supercomputing Conference (SC), pages 30:1-30:11",
//     webpage: "https://ieeexplore.ieee.org/document/6114446",
//     members: [
//       "Jerry Chou",
//       "John Wu",
//       "Oliver Rübel",
//       "Mark Howison",
//       "Ji Qiang",
//       "Prabhat",
//       "Brian Austin",
//       "E. Wes Bethel",
//       "Rob D. Ryne",
//       "Arie Shoshani",
//     ],
//     date: moment("2011-11"),
//   },
//   {
//     title: "Energy-Aware Scheduling in Disk Storage Systems",
//     field: "cloud",
//     venue: "conference",
//     venueName:
//       "IEEE International Conference on Distributed Computing Systems (ICDCS), pages 423-433,",
//     members: ["Jerry Chou", "Jinoh Kim", "Doron Rotem"],
//     date: moment("2011-06"),
//     webpage: "http://dl.acm.org/citation.cfm?id=2014773",
//     slides: "https://lsalab.cs.nthu.edu.tw/home/publication/ICDCS11_slides.pdf",
//   },
//   {
//     title:
//       "Energy Proportionality and Performance in Data Parallel Computing Clusters",
//     field: "cloud",
//     venue: "conference",
//     venueName:
//       "International Conference on Scientific and Statistical Database Management (SSDBM), pages 414-431",
//     members: ["Jinoh Kim", "Jerry Chou", "Doron Rotem"],
//     date: moment("2011-07"),
//     webpage: "http://dl.acm.org/citation.cfm?id=2032397.2032431",
//   },
//   {
//     title:
//       "Adaptive Re-Routing Over Circuits: An Architecture for an Optical Backbone Network",
//     field: "network",
//     venue: "conference",
//     venueName: "IEEE INFOCOM Work-in-Progress, pages 1-5",
//     members: ["Jerry Chou", "Bill Lin"],
//     date: moment("2010-03"),
//     webpage: "http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=5466636",
//   },
//   {
//     title:
//       "Optimal Utility Max-Min Fair Bandwidth Allocation under Multi-path Routing",
//     field: "network",
//     venue: "conference",
//     venueName: "IEEE IWQoS, pages 1-9",
//     members: ["Jerry Chou", "Bill Lin"],
//     date: moment("2009-07"),
//     webpage: "http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=5201396",
//   },
//   {
//     title:
//       "Proactive Surge Protection: A Defense Mechanism for Bandwidth-Based Attacks",
//     field: "network",
//     venue: "conference",
//     venueName: "17th USENIX Security Symposium, pages 123-138",
//     members: ["Jerry Chou", "Bill Lin", "Subhabrata Sen", "Oliver Spatscheck"],
//     date: moment("2008-08"),
//     webpage: "http://dl.acm.org/citation.cfm?id=1496720",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/USENIS08_PSP_slides.pdf",
//   },
//   {
//     title: "Minimizing Collateral Damage by Proactive Surge Protection",
//     field: "network",
//     venue: "conference",
//     venueName:
//       "ACM SIGCOMM Workshop on Large Scale Attack Defense (LSAD), pages 97-104",
//     members: ["Jerry Chou", "Bill Lin", "Subhabrata Sen", "Oliver Spatscheck"],
//     date: moment("2007-08"),
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/lsad07_PSP_slides.pdf",
//     webpage: "http://dl.acm.org/citation.cfm?id=1352667",
//   },
//   {
//     title:
//       "LessLog: A Logless File Replication Algorithm for Peer-to-Peer Distributed Systems",
//     field: "cloud",
//     venue: "conference",
//     venueName:
//       "IEEE/ACM International Parallel and Distributed Processing Symposium (IPDPS), pages 82-93",
//     members: ["Kuang-Li Huang", "Tai-Yi Huang", "Jerry Chou"],
//     date: moment("2004-04"),
//     webpage: "https://ieeexplore.ieee.org/document/1303021",
//     slides:
//       "https://lsalab.cs.nthu.edu.tw/home/publication/IPDPS03_LessLog_slides.pdf",
//   },
//   {
//     title:
//       "A Scalable and Load-Balanced Lookup Protocol for High-Performance Peer-to-Peer Distributed Systems",
//     field: "network",
//     venue: "conference",
//     venueName:
//       "International Conference on Parallel and Distributed Processing Techniques and Applications (PDPTA), pages 708-712",
//     members: ["Jerry Chou", "Tai-Yi Huang"],
//     date: moment("2003-06"),
//     webpage: "https://lsalab.cs.nthu.edu.tw/home/publication/PDPTA03.pdf",
//     slides: "https://lsalab.cs.nthu.edu.tw/home/publication/PDPTA03_slides.pdf",
//   },
//   // thesis & book chapter
//   {
//     title: "DDoS Defense Systems and Techniques",
//     field: "network",
//     venue: "thesis",
//     venueName: "PhD Research Exam, Univeristy of California San Diego",
//     members: ["Jerry Chou"],
//     date: moment("2007-07"),
//     webpage: "https://lsalab.cs.nthu.edu.tw/home/publication/DDoS_survey.pdf",
//   },
//   {
//     title:
//       "New Routing Paradigm for Future Optical Networks: Coarse Optical Circuit Switching By Default, Rerouting Over Circuits for Adaptation",
//     field: "network",
//     venue: "thesis",
//     venueName: "PhD Thesis, Univeristy of California San Diego",
//     members: ["Jerry Chou"],
//     date: moment("2009-07"),
//     webpage: "http://portal.acm.org/citation.cfm?id=1714068",
//   },
//   {
//     title:
//       "SCALLOP: A Scalable and Load-Balanced Peer-to-Peer Lookup Protocol for High-Performance Distributed Systems",
//     field: "network",
//     venue: "thesis",
//     venueName: "Master Thesis, Taiwan TsingHua Univeristy",
//     members: ["Jerry Chou"],
//     date: moment("2004-07"),
//     webpage: "https://lsalab.cs.nthu.edu.tw/home/publication/Master_Thesis.pdf",
//   },
//   {
//     title: "Energy Saving Techniques for Disk Storage Systems",
//     field: "network",
//     venue: "thesis",
//     venueName:
//       "Handbook of Energy-Aware and Green Computing (Editor: Sanjay Ranka and Ishfaq Ahmad), Chapman & Hall/CRC",
//     members: ["Jerry Chou", "Jinoh Kim", "Doron Rotem"],
//     year: 2011,
//   },
//   // patent
// ];

// index.saveObjects(objects.map((object, id) => ({ ...object, objectID: id.toString() }))).then(({ objectIDs }) => {
//   console.log(objectIDs);
// }).catch(err => {
//   console.log(err)
// });
