<template>
  <div class="mx-auto px-4 py-10 sm:w-4/5 sm:px-0">
    <div class="text-2xl font-bold">{{ t("nav.connection") }}</div>
    <ul class="mt-4 list-inside list-disc text-2xl">
      <li class="hover:underline">
        <a
          href="https://lsalab.cs.nthu.edu.tw/acts_alliance/home/"
          target="_blank"
        >
          {{ t("connection.acts") }}
        </a>
      </li>
      <ul class="list-[circle] sm:ml-8">
        <li class="mt-4 text-xl text-blue-400">
          {{ t("connection.vision") }}
        </li>
        <p class="mt-2 text-base">
          {{ t("connection.visionText") }}
        </p>
        <li class="mt-4 text-xl text-blue-400">
          {{ t("connection.member") }}
        </li>
        <div class="mt-2 text-lg text-primary">
          {{ t("connection.academicMember") }}
        </div>
        <div class="mt-2 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <n-card v-for="(member, mid) in members" :key="mid" size="small">
            <div class="text-base font-bold hover:underline">
              <a :href="member.link" target="_blank">{{ member.name }}</a>
            </div>
            <div class="my-2 flex items-center">
              <n-icon size="22" class="mr-2"><school-outlined /></n-icon
              >{{ member.school }}
            </div>
            <div v-for="(tech, tid) in member.tech" :key="tid">
              <n-ellipsis class="list-inside">
                <div class="flex items-center text-blue-400">
                  <n-icon size="22" class="mr-2"><cloud28-regular /></n-icon
                  >{{ tech }}
                </div>
              </n-ellipsis>
            </div>
          </n-card>
        </div>
        <div class="mt-2 text-lg text-primary">
          {{ t("connection.industrialMember") }}
        </div>
        <div class="mt-2 grid gap-4 md:grid-cols-2">
          <n-card v-for="(industry, i) in industries" :key="i" size="small">
            <div
              class="table text-base font-bold text-[#FFA726] hover:underline"
            >
              <a :href="industry.link" target="_blank">{{ industry.name }}</a>
            </div>
            <n-ellipsis line-clamp="4" tooltip>
              {{ industry.desc }}
              <template #tooltip>
                <div class="w-[400px]">
                  {{ industry.desc }}
                </div>
              </template>
            </n-ellipsis>
          </n-card>
        </div>
        <li class="mt-4 text-xl text-blue-400">
          {{ t("connection.activity") }}
        </li>
        <div class="mt-2 grid grid-cols-3 gap-4">
          <n-card size="small">
            <div class="mb-2 text-base font-bold text-[#FFA726]">聯盟推廣</div>
            <div><b>內容：</b>簡介聯盟運作、服務項目、與聯盟技術</div>
            <div><b>預計日期：</b>四月底</div>
            <div><b>服務對象：</b>公開所有廠商</div>
          </n-card>
          <n-card size="small">
            <div class="mb-2 text-base font-bold text-[#FFA726]">研討會</div>
            <div><b>內容：</b>專題演講、技術課程</div>
            <div><b>預計日期：</b>六月底</div>
            <div><b>服務對象：</b>公開所有廠商(一般會員及貴賓會員免費優惠)</div>
          </n-card>
          <n-card size="small">
            <div class="mb-2 text-base font-bold text-[#FFA726]">
              成果發表會
            </div>
            <div><b>內容：</b>專題演講、技術課程</div>
            <div><b>預計日期：</b>九月底</div>
            <div><b>服務對象：</b>公開所有廠商</div>
          </n-card>
        </div>
      </ul>
      <li class="mt-4">
        {{ t("connection.collaboration") }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { NCard, NEllipsis, NIcon } from "naive-ui";
import { SchoolOutlined } from "@vicons/material";
import { Cloud28Regular } from "@vicons/fluent";
import { useI18n } from "vue-i18n";
const emits = defineEmits(["ready"]);
emits("ready");
const { t } = useI18n();
const members = [
  {
    name: "周志遠教授(主持人)",
    link: "https://lsalab.cs.nthu.edu.tw/next",
    school: "清華大學",
    tech: ["雲運算", "儲存技術"],
  },
  {
    name: "陳煥宗教授",
    link: "http://www.cs.nthu.edu.tw/~htchen/",
    school: "清華大學",
    tech: ["Computer Vision", "Machine Learning"],
  },
  {
    name: "李哲榮教授",
    link: "http://www.cs.nthu.edu.tw/~cherung/",
    school: "清華大學",
    tech: ["虛擬化技術", "資料分析技術"],
  },
  {
    name: "邱維辰教授",
    link: "http://people.cs.nctu.edu.tw/~walon/",
    school: "交通大學",
    tech: ["Computer Vision", "Machine Learning"],
  },
  {
    name: "孫　民教授",
    link: "http://aliensunmin.github.io/",
    school: "清華大學",
    tech: ["Computer Vision", "Machine Learning"],
  },
  {
    name: "李濬屹教授",
    link: "http://cymaxwelllee.wixsite.com/elsa",
    school: "清華大學",
    tech: [
      "Intelligent Embedded Systems and Robotics",
      "Deep Reinforcement Learning",
    ],
  },
  {
    name: "朱宏國教授",
    link: "http://cgv.cs.nthu.edu.tw/hkchu/",
    school: "清華大學",
    tech: ["智慧互動服務"],
  },
  {
    name: "張永儒教授",
    link: "http://people.cs.nctu.edu.tw/~armuro/",
    school: "交通大學",
    tech: ["智慧互動服務"],
  },
  {
    name: "賴冠州教授",
    link: "http://www.ntcu.edu.tw/kclai/",
    school: "台中教大",
  },
  {
    name: "吳尚鴻教授",
    link: "http://www.cs.nthu.edu.tw/~shwu",
    school: "清華大學",
  },
  {
    name: "鐘武君教授",
    link: "http://uip.cycu.edu.tw/UIPWeb/wSite/public/Attachment/f1550806454040.pdf",
    school: "中原大學",
  },
  {
    name: "胡敏君教授",
    link: "http://mislab.cs.nthu.edu.tw/",
    school: "清華大學",
    tech: ["多媒體運算", "電腦視覺"],
  },
];
const industries = [
  {
    name: "雲核科技",
    link: "http://www.nebulatek.com/",
    desc: "提供最有效的平台進行資料管理與分析，整合多元性的資料來源和多樣性的異質資料，做為企業資料庫整合的儲存平台，以幫助客戶從所有數據中獲得最有價值的關鍵資料。",
  },
  {
    name: "源思科技",
    link: "https://www.juiker.tw/",
    desc: "推出Juiker揪科企業即時通訊軟體，以優質穩定的通話品質、專屬企業通訊錄、智慧通話判別、安全資料保密傳輸機制等功能，吸引媒體與網友的熱情關注與支持，並創下三個月內百萬下載量，刷新國產APP的紀錄。",
  },
  {
    name: "和沛科技",
    link: "https://www.hopebaytech.com/",
    desc: "提供最有效的平台進行資料管理與分析，整合多元性的資料來源和多樣性的異質資料，做為企業資料庫整合的儲存平台，以幫助客戶從所有數據中獲得最有價值的關鍵資料。",
  },
  {
    name: "雙子星雲端運算",
    link: "http://www.geminiopencloud.com/",
    desc: "雲端系統軟體與雲端應用服務整合平台，將資料中心的大量實體資源轉換為虛擬化的雲端系統架構，雲端應用服務整合平台等加值服務更整合了企業常用的應用服務軟體，更為企業節省成本也帶來競爭力。",
  },
  {
    name: "迎棧科技",
    link: "http://www.inwinstack.com/",
    desc: "雲端平台「OpenStack」、分散式儲存「Ceph」及雲端檔案系統「OwnCloud」之研發並將其成果貢獻給開放社群；更結合國內外硬體大廠，導入全套式雲端計畫，提供跨平台且人性化之使用環境、安全、易於佈署及維護的完整應用方案，期望建立台灣自我OpenStack技術能量並與世界最新雲端技術接軌。",
  },
  {
    name: "亦思科技",
    link: "http://www.is-land.com.tw/",
    desc: "提供製造業工程資料分析系統研發及整合、 工廠自動化相關系統的研發及整合、供應鏈管理相關系統的研發及整合、晶片設計產業資訊系統研發及整合等， 涵蓋的範圍遍及高科技製造業的上下游，特別在cloud computing新技術的導入上有傑出的成果。",
  },
  {
    name: "微程式資訊科技",
    link: "http://www.program.com.tw/",
    desc: "產業科技服務商，從使用者研究、終端感應裝置、行動APP、雲端維運平台到大數據分析，掌握垂直整合核心技術，協助交通、金融、零售、製造、自行車等產業創新升級。微程式以優勢的技術能量獲得宏碁、神通、寶錄等大廠及悠遊卡、一卡通、愛金卡等票證公司的青睞，在電子支付浪潮來臨時一躍成為台灣智慧辨識及電子支付領導品牌，服務領域從YouBike公共自行車租借、公車、捷運、鐵路等交通電子票證，到可口可樂/統一速邁自動販賣機、台灣大車隊悠遊卡支付、麗寶樂園/劍湖山電子售票、家樂福愛金卡支付、悠遊卡/一卡通停車場電子收費系統等，生活中處處可見微程式的影子。",
  },
  {
    name: "Skymizer",
    link: "https://skymizer.com/",
    desc: "Skymizer 致力於加速手機與電腦效能。我們擁有來自世界各大知名軟硬體公司（Andes, Google, HTC, MediaTek, Yahoo）的工程師，並特別擅長於編譯技術與雲端優化。 摩爾定律已接近物理極限，半導體要將0.28奈米製程提升至0.22奈米，至少要花費新台幣2億多元的建置成本。 若採用Skymizer的編譯器作為橋梁或口譯官，讓機器語言和程式語言溝通更順暢，就可省下9成的成本。 Skymizer的編譯器技術類似軟體加速器，就像沒有錢換iPhone6，但加了這套軟體，iPhone4也可像iPhone6速度狂飆。",
  },
  {
    name: "Viscovery",
    link: "http://www.viscovery.co/zh-tw",
    desc: "創意引晴公司以影像辨識為基礎，提供專利之離線辨識丶影音辨識等加值服務。 Viscovery研究移動端的影像辨識技術，經過了多年技術研發的累積，及實地操作大量客戶應用場景的基礎上，成功開發並推出智能視頻探索平台VDS服務。 透過影像辨識，消費者只需利用智慧型手機攝影鏡頭對準有興趣的商品、圖片，便可即時辨識提供評論丶價格等資訊， 滿足消費者行動時代中快速連結數位內容的需求，透過與手機應用程式及商業行銷結合，提供更便利的生活。 技術開發團隊來自中國大陸、美國、台灣的電腦視覺、深度學習及人工智慧業界頂尖專家。",
  },
  {
    name: "宜鼎國際",
    link: "https://www.innodisk.com/",
    desc: "宜鼎國際是一家以服務為導向的工業用儲存裝置供應商，專注於企業級、工業、航太與國防等應用市場， 提供工業用嵌入式儲存裝置與工業用動態隨機記憶體模組與相關技術服務。",
  },
  {
    name: "Appier",
    link: "https://www.appier.com/zh/",
    desc: "Appier是一家專注於人工智慧的科技公司，藉由開發各種人工智慧應用平台，協助企業解決最棘手的商業挑戰。 成立於2012年的Appier是由一群充滿熱情的電腦科學家與資訊工程師所組成，技術團隊專長涵蓋人工智慧、資料分析與分散式系統等領域。 Appier的總部設於台北，在新加坡、東京、大阪、吉隆坡、胡志明市、馬尼拉、香港、孟買、新德里、雅加達、首爾、雪梨與曼谷等亞洲14個市場設有據點， 為超過1,000家知名品牌與代理商提供優質服務。",
  },
  {
    name: "盾心科技",
    link: "https://umbocv.ai/",
    desc: "專注於開發智慧安控的台灣新創公司 Umbo CV 盾心科技，研發擁有自我學習與分析能力的影像辨識技術， 所打造出的軟體平台 Aqua SmartCloud，可透過監控畫面學習並辨識影像中人、車、動植物等物件，以及侵入、群眾聚集、火災等特殊事件， 隨著所蒐集影像的增加，Aqua SmartCloud 會有更深度的學習，可辨別的事件與物件也會更加多元而複雜。 為了銜接雲端系統 Aqua SmartCloud，Umbo CV 也開發出搭配用的硬體攝影機 Umbo SmartDome， 企業從此不需再耗費人力以肉眼 24 HR 監控畫面，可大幅降低維護成本。",
  },
  {
    name: "安仲科技",
    link: "http://www.anaglobe.com/",
    desc: "專業之半導體設計自動化軟體廠商；公司以一流之研發和經營團隊，開發及行銷－半導體設計、製造與測試輔助軟體工具。 客戶包括台積電、聯電、世界先進、力晶、旺宏、聯發科、中芯、nVidia、Xilinx、Applied Materials、SK hynix等國內外大廠。",
  },
  {
    name: "台灣雪豹科技有限公司",
    link: "https://www.linkedin.com/company/9549268/",
    desc: "雪豹科技成立於2014年，自主研發各種移動應用，包含Android/iOS的防毒以及照相軟體， 代理包含Google Play上下載次數破億的清理工具產品以及在台灣深受歡迎的直播App， 矢志成為全台灣第一家真正的移動互聯網公司。",
  },
  {
    name: "廣達電腦",
    link: "http://www.quantatw.com/Quanta/chinese/Default.aspx",
    desc: "筆記型電腦、AIO、Chromebook、智慧型手機、平板電腦、POS機、穿載式裝置、智慧家庭系統、健康照護系統、物聯網裝置、車用系統、4G連網設備 、雲端產品如Server、 Storage、Switch 等。",
  },
  {
    name: "美超微電腦股份有限公司",
    link: "https://www.supermicro.com.tw/index_home.cfm",
    desc: "Super Micro Computer, Inc. or Supermicro® (NASDAQ: SMCI)，係全球高效能、高效率伺服器科技與創新的領導廠商， 亦是全球專門針對 HPC、資料運算中心、雲端運算、企業 IT、Hadoop / 巨量資料處理及嵌入式系統從最完整到最精簡化綠能運算解決方案的先驅。",
  },
];
</script>
