<template>
    <div class="container mx-auto p-4">
        都道府県を選択するとグラフが表示されます。

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
        // ここでは、例えば「総人口」のデータを使う例
        // ラベル（年）を最初に取得するために、どれか1つの都道府県のデータから取る（存在すれば）
        const firstPrefData = populations.value[newPrefs[0]]
        if (!firstPrefData || firstPrefData.error) {
            chartData.value = null
            return
        }
        const populationData = firstPrefData.result.data.find((d: any) => d.label === '総人口')
        if (!populationData) {
            chartData.value = null
            return
        }
        for (const yearData of populationData.data) {
            labels.push(yearData.year)
        }

        // datasetsを作る
        const datasets = newPrefs.map((prefCode: number) => {
            const prefData = populations.value[prefCode]
            if (!prefData || prefData.error) return null

            const totalPopData = prefData.result.data.find((d: any) => d.label === '総人口')
            if (!totalPopData) return null

            return {
                label: `${prefectures.value?.find((f: any) => f.prefCode == prefCode)?.prefName}`, // ここは実際の都道府県名があれば入れると良い
                data: labels.map(year => {
                    const item = totalPopData.data.find((d: any) => d.year === year)
                    return item ? item.value : null
                }),
                borderColor: getRandomColor(), // 色は適宜決める関数で
                backgroundColor: 'transparent',
            }
        }).filter(Boolean)  // nullを除去

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