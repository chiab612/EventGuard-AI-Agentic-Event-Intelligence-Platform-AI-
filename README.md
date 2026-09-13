# EventGuard AI — Agentic Event Intelligence Platform
> **AI 活動智慧分析與報名者決策輔助平台**  
> *Better Applicants. Better Events. Better Connections.*  
> *(更適合的參與者，更好的活動，更有價值的連結)*

---

## 🌟 專案概述 (Project Overview)

**EventGuard AI** 是一個專為企業活動、科技峰會與高階商務社群主辦方設計的 **Multi-Agent 智慧活動決策平台**。

### 解決的核心痛點
在舉辦大型論壇、VIP 交流會或高階企業活動時，主辦方經常收到海量報名資料，然而面臨以下關鍵難題：
1. **人工審核耗時繁瑣**：無法在短時間內判斷數百甚至上千名報名者中，誰最符合本次活動目標。
2. **缺乏整體受眾結構洞察**：難以即時掌握整體參與者的產業、職位與資歷配比。
3. **招募缺口 (Recruitment Gap) 後知後覺**：常在活動當天才發現「技術開發者過剩，但關鍵企業決策者 (CIO/CTO) 嚴重不足」。
4. **資料品質異常混亂**：重複登記、機構簡稱未填、代報名等問題耗費大量查證成本。
5. **黑箱 AI 風險**：主辦方無法信任缺乏決策理由與可解釋性的自動拒絕系統。

EventGuard AI 透過 **5 大專屬 Agent 協同架構 (Agentic Workflow)**、**可解釋性 AI (Explainable AI)** 與嚴格的 **人機協同 (Human-in-the-loop)** 機制，協助主辦方在保有最終決定權的前提下，最大化活動商業連結價值。

---

## 🏆 評審亮點 (Key Highlights)

| 評審核心指標 | EventGuard AI 實現方式 |
| :--- | :--- |
| **1. Agentic Workflow** | 非單一聊天機器人。由 Orchestrator 自主調度 4 大專屬 Agent 執行工具呼叫與鏈式推論。 |
| **2. Explainable AI** | 每位報名者皆具備「Why this recommendation?」雷達評分、六大維度 breakdown 與具體決策背書。 |
| **3. Human-in-the-loop** | AI 僅扮演「決策輔助 (Decision Support)」，絕不自動拒絕。最終邀請由主辦方一鍵裁決。 |
| **4. Recruitment Gap** | 主動比對活動目標受眾與現有結構，診斷出 **Enterprise Decision Makers (-11%) 赤字**並提供處方。 |
| **5. Data Quality Protection** | 專屬 Data Quality Agent 偵測異常或缺漏資料，自動歸類至待查核清單，避免誤判。 |
| **6. Mobile Simulator** | 內建免安裝的沉浸式手機 App 模擬器，評審在桌面瀏覽器即可體驗完整的雙平台操作。 |
| **7. IBM Granite / watsonx Ready** | 具備松耦合的 `AIProvider` 介面，預留 IBM Granite 3.0 與 watsonx 治理層轉接器。 |

---

## 🤖 核心 Multi-Agent 系統架構

系統由中央調度器與 4 大專業功能 Agent 組成：

```
                              ┌───────────────────────────────────┐
                              │     EventGuard Orchestrator       │
                              │ (任務分解、意圖解析、工具調度引導)   │
                              └─────────────────┬─────────────────┘
                                                │
         ┌──────────────────────┬───────────────┴───────────────┬──────────────────────┐
         ▼                      ▼                               ▼                      ▼
┌──────────────────┐  ┌──────────────────┐            ┌──────────────────┐  ┌──────────────────┐
│Applicant Screen- │  │  Data Quality    │            │Event Intelligence│  │  Event Strategy  │
│   ing Agent      │  │     Agent        │            │     Agent        │  │     Agent        │
├──────────────────┤  ├──────────────────┤            ├──────────────────┤  ├──────────────────┤
│• 6 維度加權配對  │  │• 欄位完整度掃描  │            │• 產業與職級分佈  │  │• 受眾赤字偵測    │
│• 分層推薦歸類    │  │• 疑似重複辨識    │            │• 資歷與嘉賓層級  │  │• 席位調度建議    │
│• 可解釋理由生成  │  │• 人工覆核標記    │            │• 跨界合作綜效    │  │• 具體行動方案    │
└──────────────────┘  └──────────────────┘            └──────────────────┘  └──────────────────┘
```

1. **EventGuard Orchestrator**：接收主辦方的自然語言指令（如：「找出最值得優先邀請的 20 位參與者，並分析目前活動還缺少什麼類型的人」），協調工具調用與跨 Agent 資料流。
2. **Applicant Screening Agent**：根據活動目標與 6 大維度權重（產業關聯度、職位契合度、活動目的匹配度、工作經驗與年資、社群或商業影響力、資料完整度），計算 Overall Match Score (0~100)。
3. **Data Quality Agent**：保護資料品質，針對未填公司、測試字串、重複報名等進行異常標記，歸類至 Data Quality Review，交由人工確認，嚴禁一刀切自動刪除。
4. **Event Intelligence Agent**：統計整場活動報名者的產業結構 (AI/Software 42%, IT 28%)、職務階層 (Developer 31%, Executive 18%) 與資深程度分佈。
5. **Event Strategy Agent (Recruitment Gap Engine)**：比對活動設定的目標受眾與實際報名結構，精準偵測 **Enterprise Decision Makers Gap (-11%)**，自動提出 4 條具備 Reason、Expected Impact 與 Suggested Action 的策略。

---

## ⚡ 2 分鐘 Hackathon Demo 操作流程 (Demo Flow)

點擊系統頂部導覽列的 **「2-Minute Demo」** 按鈕即可開啟引導視窗，逐步體驗 12 個核心展示步驟：

1. **Step 1: Load Demo Event**：載入預設活動「AI Enterprise Networking」及 126 位企業報名者資料。
2. **Step 2: Ask EventGuard Agent**：在首頁 Ask Bar 輸入指令，體驗自然語言語意解析。
3. **Step 3: Agent Orchestrator 開始工作**：切換至 Agent Activity 查看 Orchestrator 動態調度流程。
4. **Step 4: Applicant Screening Agent**：檢視 126 位報名者之智能分層 (High Priority, General, Review)。
5. **Step 5: Data Quality Agent**：查看標記出的 15 筆需人工核實資料。
6. **Step 6: Event Intelligence Agent**：切換至 Intelligence 頁籤，檢視產業與職級圖表。
7. **Step 7: 發現：Enterprise Decision Maker Gap**：切換至 Gap 頁籤，查看 -11% 核心缺口警訊。
8. **Step 8: Event Strategy Agent**：查看系統自動提出的 4 條招募補強策略。
9. **Step 9: 顯示 Top 20 Applicants**：查看推薦的高階決策者名單 (平均 89+ 分)。
10. **Step 10: 點擊其中一位報名者**：點開任一卡片開啟抽屜式決策面板。
11. **Step 11: 查看 Explainable AI**：檢視「Why this recommendation?」具體決策理由與雷達圖。
12. **Step 12: Organizer 做最後決定**：主辦方點擊「Priority Invite」，實踐 Human-in-the-loop。

---

## 🌐 桌面 / 手機 App 雙模式 (Mobile Simulator)

- 點擊頂部導覽列右側的 **「Desktop / Mobile」** 切換按鈕。
- 在桌面瀏覽器中即可即時呈現高仿真手機外框（含動態島、狀態列與 5 大底層導航：`Home`, `Events`, `Applicants`, `Agents`, `Insights`）。
- 手機模擬器中所有按鈕皆具備真實響應，狀態與主系統完全連動。

---

## 🛡️ Responsible AI 倫理守則與防護 (AI Ethics Guardrails)

EventGuard AI 堅持「**AI 是決策輔助，不是自動裁判**」：

- **嚴禁敏感特徵篩選**：系統在演算法與特徵工程中，**嚴格禁止**採納性別、種族、宗教信仰、政治傾向、健康隱私或其他敏感個人特徵作為任何篩選維度。
- **無負面標籤**：系統僅使用中性、客觀的決策支持詞彙（`High Priority`、`Human Review`、`General`、`Data Quality Review`），杜絕歧視性詞彙。
- **系統聲明**：  
  > *「AI 分析僅提供活動報名審核與活動規劃的輔助建議，不代表對個人的價值、品格或能力做出判定。」*

---

## 🚀 IBM Granite & watsonx 整合路徑 (IBM Integration Roadmap)

EventGuard AI 在架構設計上全面考量 IBM 企業級 AI 生態系統，透過松耦合的 `AIProvider` 介面 (`src/services/aiProvider.ts`)，可隨時將現行的 Mock / Local AI Engine 無縫切換為 IBM 企業級服務：

```
                    ┌──────────────────────────────────────┐
                    │      EventGuard Multi-Agent Core     │
                    └──────────────────┬───────────────────┘
                                       │ (AIProvider Interface)
          ┌────────────────────────────┼────────────────────────────┐
          ▼                            ▼                            ▼
┌──────────────────┐         ┌───────────────────┐        ┌───────────────────┐
│ Mock / Local AI  │         │ IBM Granite 3.0   │        │   watsonx.ai      │
│   (Hackathon)    │         │  Model Adapter    │        │    Agent Lab      │
├──────────────────┤         ├───────────────────┤        ├───────────────────┤
│• 確定性推論模擬  │         │• granite-3.0-8b-  │        │• 多 Agent 流程編排│
│• 即時前端演示    │         │  instruct 語意分析│        │• 工具呼叫與調度   │
│• 零環境配置相依  │         │• 多維權重推論與綜效│        │• 外部 API 串接    │
└──────────────────┘         └───────────────────┘        └───────────────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │ watsonx.governance│
                             │ Guardrails Layer  │
                             ├───────────────────┤
                             │• 偏差檢測 (Fairness)│
                             │• 可解釋性稽核追蹤  │
                             │• 模型生命週期監控  │
                             └───────────────────┘
```

### 1. IBM Granite 3.0 Adapter
- **接入模型**：`ibm/granite-3.0-8b-instruct`
- **應用場景**：專門負責「Applicant Screening Agent」與「Event Strategy Agent」的自然語言理解、候選人背景深度特徵提煉與策略建議生成。
- **切換方式**：將 `aiProvider.ts` 中的實例指向實作好的 `IBMGraniteAdapter`，傳入 IBM Cloud API Key 與 Project ID。

### 2. watsonx.ai Agent Lab
- **接入功能**：利用 watsonx.ai 的 Agent 編排能力，直接接管 `AgentOrchestrator`，實現企業級的 Tool Calling、動態記憶與長期狀態追蹤。

### 3. watsonx.governance 治理層
- **接入功能**：為系統加上公平性 (Fairness) 與合規性監控，確保六大評分維度在統計學上對多元背景參與者保持公正無偏，並將所有 AI 審核記錄納入企業審計日誌。

---

## 🛠️ 本地開發與構建 (Local Setup)

```bash
# 1. 安裝依賴
npm install

# 2. 啟動開發伺服器 (Port 3000)
npm run dev

# 3. 程式碼驗證與編譯
npm run build
```

---

## 📝 結語

**EventGuard AI** 展現了現代企業活動在邁向 AI Agentic 時代的全新工作範式：以數據驅動洞察、以 AI 輔助人腦、以可信倫理守護體驗。  
讓每一場活動，都能聚集真正對的人。
