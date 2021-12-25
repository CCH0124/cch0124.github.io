---
title: microservice - 單體地獄
date: 2021-12-11
description: "單體地獄"
tags: [book. microservice]
draft: true
---

## 單體架構好處
- 開發容易
    - IDE 或其它工具只須建構此單一的應用程式
- 易於做大規模更改
- 測試相對簡單
- 部署簡單容易
- 橫向擴展方便
    - 一個 LoadBlance 即可調度

## 單體地獄
在同一個應用程式之上進行開發，使得程式碼不斷膨脹，相對管理成本也提高。從書中圖可以看出其缺點，如下

![](https://i.imgur.com/JO0l6Nm.png)

源代碼隨著時間推移越來越肥，在溝通上成本隨之提升，IDE 運行時變得越來越慢，部署或建構也隨之影響。應用程式複雜維護隨之提高，想要理解該應用程式變得不大可能，這就影響了對該應用程式修復問題或新增功能的成本，交付時間變得越來越長。同時存在牽一髮動全身後果。

以擴展角度來看，模組之間的資源需求是相互衝突，每一次都需要滿足這些需求。如果某一模組發生了一些不可預期的動作時應用程式將一次性崩潰。

## 微服務架構

下方模型名稱為 scale cube，是 The Art of Scalability 的啟發。
![](https://i.imgur.com/VdtBrTn.png)

X 軸擴展，多個實例間實現請求負載均衡。負載均衡器在 N 個實例間分配請求，這是提高應用程式*吞吐量*和*可用性*的方發。

```

                                                            _________________________            
                                                            |       ____________    |          
                                                          --|----->|            |   |
 _________                         ______________        /  |      |  instance1 |   |
|　　　　　|                       |              |     /    |      |____________|   |
|  Client | -------Request------->|  LoadBalance |------    |       ____________    |
|_________|                       |______________|      \   |      |            |   |
                                                         \ -|----->| instance2  |   |
                                                          \ |      |____________|   |
                                                           \|       ____________    |
                                                            |\---->|            |   |
                                                            |      | instance3  |   |
                                                            |      |____________|   |
                                                            |                       |
                                                            |_______________________|

```

Z 軸擴展，根據請求的屬性路由請求
與 X 軸同樣的運行多個實例，但每個實例僅負責數據的一個子集。當中路由器(Route) 使用 UserId 來決定路由到哪個實例，可能 instance1 負責使用者 a-h；instance2 負責 i-p 等。*對於需要處理增加事務和數據量*
時，這是一個不錯的方式。
```

                                                              _________________________            
                                                              |       ____________    |          
                                                            --|----->|            |   |
 _________      GET/POST             ______________        /  |      |  instance1 |   |
|　　　　　| Authorization: UserId...|              |     /    |      |____________|   |
|  Client | -------Request------->  |     Route    |------    |       ____________    |
|_________|                         |______________|      \   |      |            |   |
                                                           \ -|----->| instance2  |   |
                                                            \ |      |____________|   |
                                                             \|       ____________    |
                                                              |\---->|            |   |
                                                              |      | instance3  |   |
                                                              |      |____________|   |
                                                              |                       |
                                                              |_______________________|

```

Y 軸擴展，根據功能把應用拆分為服務

X、Z 軸無法解決開發增長和應用複雜性。因此須採用 Y 軸功能性分解。Client 會針對不同服務做請求，而每個服務都實現 X、Z 軸。

```       
                                                                                         ____Order service____                                                                                        
                                                                                        |                     |
                                                                                        |     ___________     |
                                                                                        |    |           |    |
                             _________________________                           ----------->| instance1 |    |
                            |                         |                         /       |    |___________|    |
                            |    _________________    |         _____________  /        |     ___________     |
                            |   |                 |   |        |             |/         |    |           |    |
                --------------->|  Order Service  |----------->| LoadBalance |-------------->| instance2 |    |
               /            |   |_________________|   |        |_____________|\         |    |___________|    |
              /             |                         |                        \        |     ___________     |
             /              |                         |                         \       |    |           |    |
 _________  /               |    _________________    |                          ----------->| instance3 |    |
|         |/                |   |                 |   |                                 |    |___________|    |
| Client  |-------------------->| Customer Service|   |                                 |_____________________|
|_________|\                |   |_________________|   |
            \               |                         |
             \              |                         |
              \             |    _________________    |
               \            |   |                 |   |
                --------------->| Review Service  |   |
                            |   |_________________|   | 
                            |_________________________|
```

大體上可以定義成，把應用程式功能分解為一組服務的架構風格。模組化，是開發大型、複雜應用程式的基礎，使得服務可以獨立部署或擴展，而服務之間也就松耦合。

## 微服務架構好與壞
- 使大型的複雜應用程式可以持續交付和持續部署