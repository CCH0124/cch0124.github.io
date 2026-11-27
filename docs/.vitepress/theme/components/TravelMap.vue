<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type * as LeafletTypes from 'leaflet'

type CategoryKey = 'all' | 'travel' | 'camp' | 'dive' | 'ski' | 'hike'

interface TravelSpot {
  id: string
  name: string
  category: Exclude<CategoryKey, 'all'>
  region: 'tw' | 'jp' | 'ph' | 'id' | 'kr'
  area: string
  date?: string
  lat: number
  lng: number
  icon?: string
  note?: string
}

const spots: TravelSpot[] = [
  // 日本旅行 - 關西 / 關東
  { id: 'osaka', name: '大阪', category: 'travel', region: 'jp', area: '日本 · 關西', lat: 34.6937, lng: 135.5023 },
  { id: 'nara', name: '奈良', category: 'travel', region: 'jp', area: '日本 · 關西', lat: 34.6851, lng: 135.8048 },
  { id: 'inari', name: '稻荷', category: 'travel', region: 'jp', area: '日本 · 京都', lat: 34.9671, lng: 135.7727 },
  { id: 'kyoto', name: '京都', category: 'travel', region: 'jp', area: '日本 · 關西', lat: 35.0116, lng: 135.7681 },
  { id: 'arashiyama', name: '嵐山', category: 'travel', region: 'jp', area: '日本 · 京都', lat: 35.0094, lng: 135.6668 },
  { id: 'tokyo', name: '東京', category: 'travel', region: 'jp', area: '日本 · 關東', lat: 35.6762, lng: 139.6503 },
  { id: 'asakusa', name: '淺草', category: 'travel', region: 'jp', area: '日本 · 東京', lat: 35.7148, lng: 139.7967 },
  { id: 'kaminarimon', name: '雷門', category: 'travel', region: 'jp', area: '日本 · 東京', lat: 35.7111, lng: 139.7964 },
  { id: 'akihabara', name: '秋葉原', category: 'travel', region: 'jp', area: '日本 · 東京', lat: 35.7023, lng: 139.7745 },
  // 日本旅行 - 2025/12 東北
  { id: 'zao', name: '藏王', category: 'ski', region: 'jp', area: '日本 · 山形', date: '2026/1', lat: 38.1653, lng: 140.3976, note: '藏王溫泉滑雪場' },
  { id: 'yamadera', name: '山寺', category: 'travel', region: 'jp', area: '日本 · 山形', date: '2025/12', lat: 38.3125, lng: 140.4375 },
  { id: 'kajo', name: '霞城公園', category: 'travel', region: 'jp', area: '日本 · 山形', date: '2025/12', lat: 38.2553, lng: 140.3264 },
  { id: 'ginzan', name: '銀山溫泉', category: 'travel', region: 'jp', area: '日本 · 山形', date: '2025/12', lat: 38.5703, lng: 140.5305 },
  { id: 'sendai', name: '仙台', category: 'travel', region: 'jp', area: '日本 · 宮城', date: '2025/12', lat: 38.2682, lng: 140.8694 },
  { id: 'umino-mori', name: '仙台海洋森林水族館', category: 'travel', region: 'jp', area: '日本 · 宮城', date: '2025/12', lat: 38.2718, lng: 140.9806 },
  { id: 'zao-fox', name: '宮城藏王狐狸村', category: 'travel', region: 'jp', area: '日本 · 宮城', date: '2025/12', lat: 38.0408, lng: 140.5333 },

  // 韓國旅行 - 2023/11 濟州島
  { id: 'jeju-ecoland', name: '森林小火車 (Eco Land)', category: 'travel', region: 'kr', area: '韓國 · 濟州島', date: '2023/11', lat: 33.455348, lng: 126.668853 },
  { id: 'jeju-nanta', name: '亂打秀 (NANTA)', category: 'travel', region: 'kr', area: '韓國 · 濟州島', date: '2023/11', lat: 33.445293, lng: 126.54792 },
  { id: 'jeju-aquaplanet', name: '濟州島水族館 (Aqua Planet)', category: 'travel', region: 'kr', area: '韓國 · 濟州島', date: '2023/11', lat: 33.4328, lng: 126.9278 },
  { id: 'jeju-brick', name: 'Brick Campus Jeju（濟州積木學園）', category: 'travel', region: 'kr', area: '韓國 · 濟州島', date: '2023/11', lat: 33.4794, lng: 126.4832 },
  { id: 'jeju-udo', name: '牛島', category: 'travel', region: 'kr', area: '韓國 · 濟州島', date: '2023/11', lat: 33.5063, lng: 126.9535 },
  { id: 'jeju-gwaneumsa', name: '觀音寺', category: 'travel', region: 'kr', area: '韓國 · 濟州島', date: '2023/11', lat: 33.4233, lng: 126.5587 },
  { id: 'jeju-alpaca', name: '羊駝牧場', category: 'travel', region: 'kr', area: '韓國 · 濟州島', date: '2023/11', lat: 33.4099, lng: 126.3666 },
  { id: 'jeju-dongmun', name: '東門水產市場', category: 'travel', region: 'kr', area: '韓國 · 濟州島', date: '2023/11', lat: 33.5122, lng: 126.5267 },
  { id: 'jeju-olle', name: '西歸浦每日偶來市場', category: 'travel', region: 'kr', area: '韓國 · 濟州島', date: '2023/11', lat: 33.2486, lng: 126.5643 },

  // 韓國旅行 - 2024/06 釜山
  { id: 'busan-songdo', name: '松島海上纜車站', category: 'travel', region: 'kr', area: '韓國 · 釜山', date: '2024/06/22-26', lat: 35.0762, lng: 129.018, note: '松島灣纜車站' },
  { id: 'busan-eggdrop', name: 'Egg Drop（南浦洞）', category: 'travel', region: 'kr', area: '韓國 · 釜山南浦洞', date: '2024/06/22-26', lat: 35.0985, lng: 129.0353, note: '早餐' },
  { id: 'busan-blueline', name: '海雲台藍線公園 · 尾浦站', category: 'travel', region: 'kr', area: '韓國 · 釜山', date: '2024/06/22-26', lat: 35.159, lng: 129.1663, note: '天空膠囊小火車' },
  { id: 'busan-xthesky', name: 'Busan X the SKY', category: 'travel', region: 'kr', area: '韓國 · 釜山', date: '2024/06/22-26', lat: 35.1603, lng: 129.169 },
  { id: 'busan-diamondbay', name: '鑽石灣遊艇碼頭', category: 'travel', region: 'kr', area: '韓國 · 釜山', date: '2024/06/22-26', lat: 35.1278, lng: 129.117, note: '夜景' },
  { id: 'busan-gamcheon', name: '甘川洞文化村', category: 'travel', region: 'kr', area: '韓國 · 釜山', date: '2024/06/22-26', lat: 35.097, lng: 129.009 },
  { id: 'busan-aquarium', name: 'SEA LIFE 釜山水族館', category: 'travel', region: 'kr', area: '韓國 · 釜山', date: '2024/06/22-26', lat: 35.1593, lng: 129.161 },
  { id: 'busan-gijang', name: '機張市場', category: 'travel', region: 'kr', area: '韓國 · 釜山', date: '2024/06/22-26', lat: 35.2443, lng: 129.2155 },

  // 台灣露營
  { id: 'hetian', name: '禾田', category: 'camp', region: 'tw', area: '台灣 · 露營', lat: 24.312, lng: 120.825 },
  { id: 'sophiekevin', name: '蘇菲凱文', category: 'camp', region: 'tw', area: '台灣 · 新竹五峰', lat: 24.618, lng: 121.119 },
  { id: 'xiangshan', name: '象山', category: 'camp', region: 'tw', area: '台灣 · 苗栗', lat: 24.426, lng: 120.916 },
  { id: 'laoguandao', name: '老官道', category: 'camp', region: 'tw', area: '台灣 · 苗栗大湖', lat: 24.374, lng: 120.858 },
  { id: 'qilin', name: '麒麟', category: 'camp', region: 'tw', area: '台灣 · 南投埔里', lat: 23.947, lng: 120.978 },
  { id: 'xiaoyeliu', name: '小野柳', category: 'camp', region: 'tw', area: '台灣 · 台東', lat: 22.796, lng: 121.196 },
  { id: 'cijin', name: '旗津', category: 'camp', region: 'tw', area: '台灣 · 高雄', lat: 22.596, lng: 120.273 },
  { id: 'islandcoffee', name: '島嶼咖啡', category: 'camp', region: 'tw', area: '台灣 · 屏東', lat: 22.256, lng: 120.654 },
  { id: 'yuanshan', name: '遠山望月', category: 'camp', region: 'tw', area: '台灣 · 高雄六龜', lat: 23.106, lng: 120.703 },
  { id: 'leyouyou', name: '樂悠悠露營區', category: 'camp', region: 'tw', area: '台灣 · 台中和平', date: '2026/05', lat: 24.163, lng: 120.955 },
  { id: 'xingkong', name: '星空幽谷', category: 'camp', region: 'tw', area: '台灣 · 高雄六龜', date: '2026/10', lat: 23.025, lng: 120.642 },

  // 潛水
  { id: 'liuqiu', name: '小琉球', category: 'dive', region: 'tw', area: '台灣 · 屏東', date: '2022/04', lat: 22.342, lng: 120.369 },
  { id: 'green-zhongliao', name: '綠島 · 中寮漁港', category: 'dive', region: 'tw', area: '台灣 · 台東綠島', date: '2024/05/03', lat: 22.6752, lng: 121.4716 },
  { id: 'green-shilang', name: '綠島 · 石朗', category: 'dive', region: 'tw', area: '台灣 · 台東綠島', date: '2024/05/03', lat: 22.654, lng: 121.4706 },
  { id: 'liuqiu-vase', name: '小琉球 · 花瓶岩', category: 'dive', region: 'tw', area: '台灣 · 屏東小琉球', date: '2024/11/29', lat: 22.3563, lng: 120.3821 },
  { id: 'liuqiu-dafu', name: '小琉球 · 大福', category: 'dive', region: 'tw', area: '台灣 · 屏東小琉球', date: '2024/11 - 12', lat: 22.3335, lng: 120.3712, note: '2024/11/29 大福 ×2｜2024/12/21-23 大福 / 7kg' },
  { id: 'liuqiu-houshi', name: '小琉球 · 厚石', category: 'dive', region: 'tw', area: '台灣 · 屏東小琉球', date: '2024/12/21-23', lat: 22.3263, lng: 120.3652, note: '厚石 ×2 / 7kg' },
  { id: 'liuqiu-wreck', name: '小琉球 · 阿吉掰沈船', category: 'dive', region: 'tw', area: '台灣 · 屏東小琉球', date: '2024/12/21-23', lat: 22.331, lng: 120.352, note: '船潛 ×2 / 7kg · 阿吉掰沈船' },
  { id: 'kenting-shore', name: '墾丁入水點', category: 'dive', region: 'tw', area: '台灣 · 屏東墾丁', date: '2025/04/16', lat: 21.939252, lng: 120.745819 },
  { id: 'kenting-boat', name: '墾丁船潛', category: 'dive', region: 'tw', area: '台灣 · 屏東墾丁', date: '2025/04/16', lat: 21.934742, lng: 120.754579, note: '船潛 ×1' },
  { id: 'penghu-hujing', name: '澎湖 · 虎井嶼', category: 'dive', region: 'tw', area: '台灣 · 澎湖馬公', date: '2026/06', lat: 23.482002, lng: 119.514511 },
  { id: 'penghu-tongpan', name: '澎湖 · 桶盤嶼', category: 'dive', region: 'tw', area: '台灣 · 澎湖馬公', date: '2026/06', lat: 23.491202, lng: 119.536607 },
  { id: 'penghu-hangwan', name: '澎湖 · 鎖港杭灣', category: 'dive', region: 'tw', area: '台灣 · 澎湖馬公', date: '2026/06', lat: 23.516128, lng: 119.605945, note: '海底郵筒海域' },
  { id: 'penghu-shanshui', name: '澎湖 · 山水海域', category: 'dive', region: 'tw', area: '台灣 · 澎湖馬公', date: '2026/06', lat: 23.51156, lng: 119.598729 },
  { id: 'green-shilang-2', name: '綠島 · 石朗 #2', category: 'dive', region: 'tw', area: '台灣 · 台東綠島', date: '2025/06', lat: 22.656899, lng: 121.474116 },
  { id: 'green-steel-reef', name: '綠島 · 鋼鐵礁 / 大白沙', category: 'dive', region: 'tw', area: '台灣 · 台東綠島', date: '2025/06', lat: 22.638999, lng: 121.487859 },
  { id: 'green-zhongliao-offshore', name: '綠島 · 中寮外海', category: 'dive', region: 'tw', area: '台灣 · 台東綠島', date: '2025/06', lat: 22.675876, lng: 121.462545 },
  { id: 'green-chaikou', name: '綠島 · 柴口', category: 'dive', region: 'tw', area: '台灣 · 台東綠島', date: '2025/06', lat: 22.687949, lng: 121.472338 },
  { id: 'green-gongguan', name: '綠島 · 公館外海', category: 'dive', region: 'tw', area: '台灣 · 台東綠島', date: '2025/06', lat: 22.691119, lng: 121.493872 },
  { id: 'bohol-1', name: 'Bohol 潛點 1', category: 'dive', region: 'ph', area: '菲律賓 · Bohol', date: '2025/05', lat: 9.542201, lng: 123.761694 },
  { id: 'bohol-2', name: 'Bohol 潛點 2', category: 'dive', region: 'ph', area: '菲律賓 · Bohol', date: '2025/05', lat: 9.55381, lng: 123.805982 },
  { id: 'bohol-3', name: 'Bohol 潛點 3', category: 'dive', region: 'ph', area: '菲律賓 · Bohol', date: '2025/05', lat: 9.516036, lng: 123.689086 },
  { id: 'bohol-4', name: 'Bohol 潛點 4', category: 'dive', region: 'ph', area: '菲律賓 · Bohol', date: '2025/05', lat: 9.514412, lng: 123.688026 },
  { id: 'bohol-5', name: 'Bohol 潛點 5', category: 'dive', region: 'ph', area: '菲律賓 · Bohol', date: '2025/05', lat: 9.544447, lng: 123.767599 },
  { id: 'bohol-6', name: 'Bohol 潛點 6', category: 'dive', region: 'ph', area: '菲律賓 · Bohol', date: '2025/05', lat: 9.490012, lng: 123.933575 },
  { id: 'bohol-7', name: 'Bohol 潛點 7', category: 'dive', region: 'ph', area: '菲律賓 · Bohol ', date: '2025/05', lat: 9.490379, lng: 123.933676 },
  { id: 'bohol-8', name: 'Bohol 潛點 8', category: 'dive', region: 'ph', area: '菲律賓 · Bohol Wrecked Plane Point', date: '2025/05', lat: 9.548343, lng: 123.795977 },
  { id: 'bali-karangsari-1', name: 'Nusa Penida · Karangsari #1', category: 'dive', region: 'id', area: '印尼 · Bali (Nusa Penida)', date: '2026/09', lat: -8.709292, lng: 115.588873 },
  { id: 'bali-karangsari-2', name: 'Nusa Penida · Karangsari #2', category: 'dive', region: 'id', area: '印尼 · Bali (Nusa Penida)', date: '2026/09', lat: -8.707105, lng: 115.586972 },
  { id: 'bali-manta-bay', name: 'Nusa Penida · Manta Bay', category: 'dive', region: 'id', area: '印尼 · Bali (Nusa Penida)', date: '2026/09', lat: -8.743849, lng: 115.451156 },
  { id: 'bali-manta-point', name: 'Nusa Penida · Manta Point', category: 'dive', region: 'id', area: '印尼 · Bali (Nusa Penida)', date: '2026/09', lat: -8.794425, lng: 115.5267 , note: 'Manta Ray'},
  { id: 'bali-crystal-bay', name: 'Nusa Penida · Crystal Bay', category: 'dive', region: 'id', area: '印尼 · Bali (Nusa Penida)', date: '2026/09', lat: -8.71515, lng: 115.456097 },

  // 爬山
  { id: 'guanshanling', name: '關山嶺山', category: 'hike', region: 'tw', area: '台灣 · 高雄 / 台東', date: '2025/03', lat: 23.268, lng: 120.961 },
  { id: 'mianyue', name: '眠月線', category: 'hike', region: 'tw', area: '台灣 · 嘉義阿里山', date: '2025/12', lat: 23.524, lng: 120.808 }
]

const categoryMeta: Record<Exclude<CategoryKey, 'all'>, { label: string; icon: string; color: string }> = {
  travel: { label: '旅行', icon: '✈️', color: '#0284c7' },
  camp: { label: '露營', icon: '⛺', color: '#257a68' },
  dive: { label: '潛水', icon: '🤿', color: '#4f46e5' },
  ski: { label: '滑雪', icon: '⛷️', color: '#0891b2' },
  hike: { label: '爬山', icon: '⛰️', color: '#d97706' }
}

const activeCategory = ref<CategoryKey>('all')
const activeSpotId = ref<string | null>(null)
const mapContainer = ref<HTMLElement | null>(null)

let L: typeof LeafletTypes | null = null
let mapInstance: LeafletTypes.Map | null = null
let markersLayer: LeafletTypes.LayerGroup | null = null
const markerMap = new Map<string, LeafletTypes.Marker>()

const filteredSpots = computed(() => {
  if (activeCategory.value === 'all') return spots
  return spots.filter((s) => s.category === activeCategory.value)
})

const timelineGroups = computed(() => {
  const map = new Map<string, TravelSpot[]>()
  for (const spot of filteredSpots.value) {
    const match = spot.date?.match(/^(\d{4})\/(\d{1,2})/)
    const key = match ? `${match[1]}/${match[2].padStart(2, '0')}` : '過往足跡'
    const list = map.get(key)
    if (list) list.push(spot)
    else map.set(key, [spot])
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => {
      if (a === '過往足跡') return 1
      if (b === '過往足跡') return -1
      return b.localeCompare(a)
    })
    .map(([label, items]) => ({ label, items }))
})

const counts = computed(() => ({
  all: spots.length,
  travel: spots.filter((s) => s.category === 'travel').length,
  camp: spots.filter((s) => s.category === 'camp').length,
  dive: spots.filter((s) => s.category === 'dive').length,
  ski: spots.filter((s) => s.category === 'ski').length,
  hike: spots.filter((s) => s.category === 'hike').length
}))

function createPinIcon(cat: Exclude<CategoryKey, 'all'>, customIcon?: string) {
  if (!L) return undefined
  const meta = categoryMeta[cat]
  const pinIcon = customIcon || meta.icon
  return L.divIcon({
    className: 'custom-travel-pin',
    html: `<div class="pin-bubble" style="--pin-color: ${meta.color}"><span>${pinIcon}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 30],
    popupAnchor: [0, -28]
  })
}

function renderMarkers() {
  if (!L || !mapInstance || !markersLayer) return
  markersLayer.clearLayers()
  markerMap.clear()

  for (const spot of filteredSpots.value) {
    const meta = categoryMeta[spot.category]
    const displayIcon = spot.icon || meta.icon
    const dateHtml = spot.date ? `<span class="popup-date">${spot.date}</span>` : ''
    const noteHtml = spot.note ? `<div class="popup-note">${spot.note}</div>` : ''
    const popupHtml = `
      <div class="travel-popup">
        <div class="popup-badge" style="color:${meta.color}">${displayIcon} ${meta.label} ${dateHtml}</div>
        <div class="popup-title">${spot.name}</div>
        <div class="popup-area">${spot.area}</div>
        ${noteHtml}
      </div>
    `
    const marker = L.marker([spot.lat, spot.lng], { icon: createPinIcon(spot.category, spot.icon) })
      .bindPopup(popupHtml)
      .on('click', () => {
        activeSpotId.value = spot.id
      })

    marker.addTo(markersLayer)
    markerMap.set(spot.id, marker)
  }
}

function fitToSpots(targetSpots: TravelSpot[]) {
  if (!L || !mapInstance || targetSpots.length === 0) return
  const bounds = L.latLngBounds(targetSpots.map((s) => [s.lat, s.lng] as [number, number]))
  mapInstance.fitBounds(bounds, { padding: [42, 42], maxZoom: 11 })
}

function jumpRegion(region: 'tw' | 'jp' | 'kr' | 'ph' | 'id' | 'all') {
  if (region === 'all') {
    fitToSpots(filteredSpots.value)
    return
  }
  const regionSpots = spots.filter((s) => s.region === region)
  fitToSpots(regionSpots)
}

function focusSpot(spot: TravelSpot) {
  if (!mapInstance) return
  activeSpotId.value = spot.id
  mapInstance.flyTo([spot.lat, spot.lng], 11, { duration: 0.7 })
  const marker = markerMap.get(spot.id)
  if (marker) {
    setTimeout(() => marker.openPopup(), 350)
  }
}

watch(activeCategory, () => {
  renderMarkers()
  fitToSpots(filteredSpots.value)
})

onMounted(async () => {
  if (!mapContainer.value) return
  const leafletModule = await import('leaflet')
  await import('leaflet/dist/leaflet.css')
  L = leafletModule.default

  mapInstance = L.map(mapContainer.value, {
    scrollWheelZoom: true,
    zoomSnap: 0.25,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 120
  }).setView([23.7, 121.0], 7)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(mapInstance)

  markersLayer = L.layerGroup().addTo(mapInstance)
  renderMarkers()
  fitToSpots(spots)
})

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})
</script>

<template>
  <div class="travel-map-wrapper">
    <div class="map-toolbar">
      <div class="filter-group">
        <button
          type="button"
          :class="['filter-btn', { active: activeCategory === 'all' }]"
          @click="activeCategory = 'all'"
        >
          全部 ({{ counts.all }})
        </button>
        <button
          type="button"
          :class="['filter-btn', { active: activeCategory === 'travel' }]"
          @click="activeCategory = 'travel'"
        >
          ✈️ 旅遊 ({{ counts.travel }})
        </button>
        <button
          type="button"
          :class="['filter-btn', { active: activeCategory === 'camp' }]"
          @click="activeCategory = 'camp'"
        >
          ⛺ 台灣露營 ({{ counts.camp }})
        </button>
        <button
          type="button"
          :class="['filter-btn', { active: activeCategory === 'dive' }]"
          @click="activeCategory = 'dive'"
        >
          🤿 潛水 ({{ counts.dive }})
        </button>
        <button
          type="button"
          :class="['filter-btn', { active: activeCategory === 'ski' }]"
          @click="activeCategory = 'ski'"
        >
          ⛷️ 滑雪 ({{ counts.ski }})
        </button>
        <button
          type="button"
          :class="['filter-btn', { active: activeCategory === 'hike' }]"
          @click="activeCategory = 'hike'"
        >
          ⛰️ 爬山 ({{ counts.hike }})
        </button>
      </div>

      <div class="region-group">
        <button type="button" class="region-btn" @click="jumpRegion('tw')">🇹🇼 台灣</button>
        <button type="button" class="region-btn" @click="jumpRegion('jp')">🇯🇵 日本</button>
        <button type="button" class="region-btn" @click="jumpRegion('kr')">🇰🇷 韓國</button>
        <button type="button" class="region-btn" @click="jumpRegion('ph')">🇵🇭 菲律賓</button>
        <button type="button" class="region-btn" @click="jumpRegion('id')">🇮🇩 峇里島</button>
        <button type="button" class="region-btn" @click="jumpRegion('all')">🌏 總覽</button>
      </div>
    </div>

    <div class="map-body">
      <div ref="mapContainer" class="map-canvas" />

      <div class="spot-timeline">
        <div v-for="group in timelineGroups" :key="group.label" class="timeline-group">
          <div class="timeline-dot" />
          <div class="timeline-head">
            <span class="timeline-date">{{ group.label }}</span>
            <span class="timeline-count">{{ group.items.length }} 個足跡</span>
          </div>
          <div class="spot-chips">
            <button
              v-for="spot in group.items"
              :key="spot.id"
              type="button"
              :class="['spot-chip', { active: activeSpotId === spot.id }]"
              @click="focusSpot(spot)"
            >
              <span>{{ spot.icon || categoryMeta[spot.category].icon }}</span>
              <span>{{ spot.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.travel-map-wrapper {
  margin: 1.5rem 0 2.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 1.1rem;
}

.map-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 0.9rem;
}

.filter-group,
.region-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.filter-btn,
.region-btn {
  padding: 0.34rem 0.72rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover,
.region-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.filter-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #ffffff;
}

.map-body {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.15rem;
  align-items: stretch;
}

.map-canvas {
  width: 100%;
  height: 680px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  z-index: 1;
}

.spot-timeline {
  height: 680px;
  overflow-y: auto;
  padding: 0.25rem 0.5rem 0.25rem 1.15rem;
  margin-left: 0.35rem;
  border-left: 2px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-group {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -1.52rem;
  top: 0.32rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-bg-soft);
}

.timeline-head {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.45rem;
}

.timeline-date {
  font-size: 0.84rem;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

.timeline-count {
  font-size: 0.74rem;
  color: var(--vp-c-text-2);
}

.spot-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
}

.spot-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  font-size: 0.78rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.spot-chip:hover,
.spot-chip.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.spot-date {
  font-size: 0.7rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
}

@media (max-width: 960px) {
  .map-body {
    grid-template-columns: 1fr;
  }

  .spot-timeline {
    height: auto;
    max-height: 360px;
  }
}

@media (max-width: 640px) {
  .map-canvas {
    height: 380px;
  }
}
</style>

<style>
.life-wide-page {
  --vp-layout-max-width: 100%;
}

.life-wide-page .VPDoc .container,
.life-wide-page .VPDoc:not(.has-aside) .content-container,
.life-wide-page .VPDoc .content {
  max-width: 100% !important;
  width: 100% !important;
}

@media (min-width: 960px) {
  .life-wide-page .VPContent.has-sidebar {
    padding-right: 1.5rem !important;
  }

  .life-wide-page .VPDoc .content {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}
.custom-travel-pin {
  background: transparent;
  border: none;
}

.pin-bubble {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: var(--pin-color, #257a68);
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.28);
  border: 2px solid #ffffff;
}

.pin-bubble span {
  transform: rotate(45deg);
  font-size: 14px;
  line-height: 1;
}

.travel-popup {
  min-width: 120px;
}

.popup-badge {
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 2px;
}

.popup-date {
  color: #64748b;
  font-weight: 500;
  margin-left: 4px;
}

.popup-title {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.popup-area {
  font-size: 12px;
  color: #64748b;
}

.popup-note {
  margin-top: 3px;
  font-size: 12px;
  color: #334155;
}
</style>
