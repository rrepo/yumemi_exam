<template>
    <div class="container mx-auto p-4">
        都道府県を選択するとグラフが表示されます。
        <br>
        <input type="checkbox" id="detailSwitch" v-model="detielSwich" class="mr-2">
        <label for="detailSwitch">詳細モード</label>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <SelectMap v-model="selectedPrefs"></SelectMap>
        </div>

        <div v-if="chartData" style="overflow-x: auto;">
            <div style="min-width: 500px;">
                <Line :data="chartData" :options="chartOptions" />
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'

export interface Prefecture {
    prefCode: number;
    prefName: string;
}

// API全体のレスポンス型
export interface PrefectureResponse {
    message: string | null;
    result: Prefecture[];
}

interface PopulationDataPoint {
    year: number
    value: number
    rate?: number
}

interface PopulationCategory {
    label: string
    data: PopulationDataPoint[]
}

interface PopulationResponse {
    message: string | null
    result: {
        boundaryYear: number
        data: PopulationCategory[]
    }
}

// グラフ描画に必要なチャート要素を登録
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const chartOptions = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: '都道府県別人口推移'
        }
    },
    scales: {
        y: {
            beginAtZero: false,
            title: {
                display: true,
                text: '人口（人）'
            }
        }
    }
}
const { data: prefecturesResponse, pending, error } = useFetch<PrefectureResponse>('/api/prefectures')
const prefectures = computed(() => prefecturesResponse.value?.result)
const selectedPrefs = ref<number[]>([])
const populations = ref<Record<number, any>>({})
const detielSwich = ref(false)

const chartData = ref<{ labels: number[]; datasets: any[] } | null>(null)

const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

watchEffect(() => {
    const newPrefs = selectedPrefs.value

    const loadData = async () => {
        for (const prefCode of newPrefs) {
            if (!populations.value[prefCode]) {
                try {
                    const data = await $fetch<PopulationResponse>(`/api/population?prefCode=${prefCode}`)
                    populations.value[prefCode] = data
                } catch (error) {
                    populations.value[prefCode] = { error: true }
                }
            }
        }

        // チェック解除されたデータを削除
        for (const code in populations.value) {
            if (!newPrefs.includes(Number(code))) {
                delete populations.value[code]
            }
        }

        // chartDataをセット
        // populations.valueに複数のprefCodeのデータが入っているのでそれらをまとめてchartDataを作る
        const labels: number[] = []

        // まず最初の都道府県データを取得
        const firstPrefData = populations.value[newPrefs[0]]
        if (!firstPrefData || firstPrefData.error) {
            chartData.value = null
            return
        }

        let populationLabels = ['総人口']  // 基本は「総人口」のみ
        if (detielSwich.value) {
            // 詳細スイッチONなら3つのラベルも追加
            populationLabels = ['総人口', '年少人口', '生産年齢人口', '老年人口']
        }

        // labels（年）を取得（「総人口」で取る想定）
        const populationData = firstPrefData.result.data.find((d: any) => d.label === '総人口')
        if (!populationData) {
            chartData.value = null
            return
        }
        for (const yearData of populationData.data) {
            labels.push(yearData.year)
        }

        // datasetsを作成
        const datasets = populationLabels.flatMap(label => {
            // newPrefs（都道府県コード）ごとにデータを取得
            return newPrefs.map((prefCode: number) => {
                const prefData = populations.value[prefCode]
                if (!prefData || prefData.error) return null

                const dataForLabel = prefData.result.data.find((d: any) => d.label === label)
                if (!dataForLabel) return null

                return {
                    label: `${prefectures.value?.find((f: any) => f.prefCode == prefCode)?.prefName} - ${label}`,
                    data: labels.map(year => {
                        const item = dataForLabel.data.find((d: any) => d.year === year)
                        return item ? item.value : null
                    }),
                    borderColor: getRandomColor(),
                    backgroundColor: 'transparent',
                }
            })
        }).filter(Boolean)

        chartData.value = {
            labels,
            datasets,
        }
    }

    loadData()
})



</script>


<style scoped>
.container {
    max-width: 1200px;
}
</style>