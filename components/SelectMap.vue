<template>
    <ul class="jp_map" style="width: 100%;">
        <li v-for="pref in prefectures" :key="pref.prefCode">
            <label :for="'pref' + pref.prefCode"
                style="display: block; cursor: pointer; padding: 10px; border: 1px solid #ccc; margin: 5px; border-radius: 5px;">
                <input type="checkbox" :id="'pref' + pref.prefCode" :checked="selectedPrefs.includes(pref.prefCode)"
                    style="display: none;" @change="togglePref(pref.prefCode)" />
                {{ pref.prefName }}
            </label>
        </li>
    </ul>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{ modelValue: number[] }>()
const emit = defineEmits(['update:modelValue'])

const prefectures = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
    { prefCode: 3, prefName: "岩手県" },
    { prefCode: 4, prefName: "宮城県" },
    { prefCode: 5, prefName: "秋田県" },
    { prefCode: 6, prefName: "山形県" },
    { prefCode: 7, prefName: "福島県" },
    { prefCode: 8, prefName: "茨城県" },
    { prefCode: 9, prefName: "栃木県" },
    { prefCode: 10, prefName: "群馬県" },
    { prefCode: 11, prefName: "埼玉県" },
    { prefCode: 12, prefName: "千葉県" },
    { prefCode: 13, prefName: "東京都" },
    { prefCode: 14, prefName: "神奈川県" },
    { prefCode: 15, prefName: "新潟県" },
    { prefCode: 16, prefName: "富山県" },
    { prefCode: 17, prefName: "石川県" },
    { prefCode: 18, prefName: "福井県" },
    { prefCode: 19, prefName: "山梨県" },
    { prefCode: 20, prefName: "長野県" },
    { prefCode: 21, prefName: "岐阜県" },
    { prefCode: 22, prefName: "静岡県" },
    { prefCode: 23, prefName: "愛知県" },
    { prefCode: 24, prefName: "三重県" },
    { prefCode: 25, prefName: "滋賀県" },
    { prefCode: 26, prefName: "京都府" },
    { prefCode: 27, prefName: "大阪府" },
    { prefCode: 28, prefName: "兵庫県" },
    { prefCode: 29, prefName: "奈良県" },
    { prefCode: 30, prefName: "和歌山県" },
    { prefCode: 31, prefName: "鳥取県" },
    { prefCode: 32, prefName: "島根県" },
    { prefCode: 33, prefName: "岡山県" },
    { prefCode: 34, prefName: "広島県" },
    { prefCode: 35, prefName: "山口県" },
    { prefCode: 36, prefName: "徳島県" },
    { prefCode: 37, prefName: "香川県" },
    { prefCode: 38, prefName: "愛媛県" },
    { prefCode: 39, prefName: "高知県" },
    { prefCode: 40, prefName: "福岡県" },
    { prefCode: 41, prefName: "佐賀県" },
    { prefCode: 42, prefName: "長崎県" },
    { prefCode: 43, prefName: "熊本県" },
    { prefCode: 44, prefName: "大分県" },
    { prefCode: 45, prefName: "宮崎県" },
    { prefCode: 46, prefName: "鹿児島県" },
    { prefCode: 47, prefName: "沖縄県" }
]

const selectedPrefs = ref<number[]>([])

watch(() => props.modelValue, (newVal: any) => {
    selectedPrefs.value = [...newVal]
})

// 子コンポーネント内でのトグル関数
function togglePref(code: number) {
    const newValue = selectedPrefs.value.includes(code)
        ? selectedPrefs.value.filter((c: number) => c !== code)
        : [...selectedPrefs.value, code]

    selectedPrefs.value = newValue
    emit('update:modelValue', newValue)
}
</script>

<style scoped>
@media screen and (max-width: 767px) {
    ul.jp_map {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /* 中央揃えしたい場合 */
    }

    .jp_map li {
        width: 20%;
        box-sizing: border-box;
        padding: 5px;
    }

    .jp_map li label {
        width: 100%;
        float: none;
        /* float解除 */
    }
}


ul.jp_map {
    position: relative;
    list-style-type: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
}

ul.jp_map label {
    color: #000;
    text-shadow: #fff 2px 0px,
        #fff -2px 0px,
        #fff 0px -2px,
        #fff 0px 2px,
        #fff 2px 2px,
        #fff -2px 2px,
        #fff 2px -2px,
        #fff -2px -2px,
        #fff 1px 2px,
        #fff -1px 2px,
        #fff 1px -2px,
        #fff -1px -2px,
        #fff 2px 1px,
        #fff -2px 1px,
        #fff 2px -1px,
        #fff -2px -1px;
    text-decoration: none;
}

.jp_map li label {
    box-sizing: border-box;
    float: left;
    padding: 7px 0;
    border-radius: 10px;
    text-align: center;
    margin: 3px;
}

.jp_map li label:hover {
    text-decoration: none;
}

.jp_map li:nth-child(1) label {
    background-color: #7f7eda;
}

.jp_map li:nth-child(1) label {
    background-color: #7f7eda;
}

.jp_map li:nth-child(2) label {
    background-color: #759ef4;
}

.jp_map li:nth-child(3) label {
    background-color: #759ef4;
}

.jp_map li:nth-child(4) label {
    background-color: #759ef4;
}

.jp_map li:nth-child(5) label {
    background-color: #759ef4;
}

.jp_map li:nth-child(6) label {
    background-color: #759ef4;
}

.jp_map li:nth-child(7) label {
    background-color: #759ef4;
}

.jp_map li:nth-child(8) label {
    background-color: #7ecfea;
}

.jp_map li:nth-child(9) label {
    background-color: #7ecfea;
}

.jp_map li:nth-child(10) label {
    background-color: #7ecfea;
}

.jp_map li:nth-child(11) label {
    background-color: #7ecfea;
}

.jp_map li:nth-child(12) label {
    background-color: #7ecfea;
}

.jp_map li:nth-child(13) label {
    background-color: #7ecfea;
}

.jp_map li:nth-child(14) label {
    background-color: #7ecfea;
}

.jp_map li:nth-child(15) label {
    background-color: #7cdc92;
}

.jp_map li:nth-child(16) label {
    background-color: #7cdc92;
}

.jp_map li:nth-child(17) label {
    background-color: #7cdc92;
}

.jp_map li:nth-child(18) label {
    background-color: #7cdc92;
}

.jp_map li:nth-child(19) label {
    background-color: #7cdc92;
}

.jp_map li:nth-child(20) label {
    background-color: #7cdc92;
}

.jp_map li:nth-child(21) label {
    background-color: #7cdc92;
}

.jp_map li:nth-child(22) label {
    background-color: #7cdc92;
}

.jp_map li:nth-child(23) label {
    background-color: #7cdc92;
}

.jp_map li:nth-child(24) label {
    background-color: #ffe966;
}

.jp_map li:nth-child(25) label {
    background-color: #ffe966;
}

.jp_map li:nth-child(26) label {
    background-color: #ffe966;
}

.jp_map li:nth-child(27) label {
    background-color: #ffe966;
}

.jp_map li:nth-child(28) label {
    background-color: #ffe966;
}

.jp_map li:nth-child(29) label {
    background-color: #ffe966;
}

.jp_map li:nth-child(30) label {
    background-color: #ffe966;
}

.jp_map li:nth-child(31) label {
    background-color: #ffcc66;
}

.jp_map li:nth-child(32) label {
    background-color: #ffcc66;
}

.jp_map li:nth-child(33) label {
    background-color: #ffcc66;
}

.jp_map li:nth-child(34) label {
    background-color: #ffcc66;
}

.jp_map li:nth-child(35) label {
    background-color: #ffcc66;
}

.jp_map li:nth-child(36) label {
    background-color: #ffbb9c;
}

.jp_map li:nth-child(37) label {
    background-color: #ffbb9c;
}

.jp_map li:nth-child(38) label {
    background-color: #ffbb9c;
}

.jp_map li:nth-child(39) label {
    background-color: #ffbb9c;
}

.jp_map li:nth-child(40) label {
    background-color: #ffbdbd;
}

.jp_map li:nth-child(41) label {
    background-color: #ffbdbd;
}

.jp_map li:nth-child(42) label {
    background-color: #ffbdbd;
}

.jp_map li:nth-child(43) label {
    background-color: #ffbdbd;
}

.jp_map li:nth-child(44) label {
    background-color: #ffbdbd;
}

.jp_map li:nth-child(45) label {
    background-color: #ffbdbd;
}

.jp_map li:nth-child(46) label {
    background-color: #ffbdbd;
}

.jp_map li:nth-child(47) label {
    background-color: #f5c9ff;
}

@media screen and (min-width: 768px) {
    ul.jp_map {
        padding: 100% 0 0;
    }


    .jp_map li label {
        width: 7%;
        height: 10%;
        border: solid #ffffff 2px;
        box-sizing: border-box;
        padding: 7px 0;
        float: none;
        font-size: 14px;
        margin: 0;

    }

    .jp_map li label:hover {
        text-decoration: none;
    }

    .jp_map li:nth-child(1) label {
        position: absolute;
        top: 0;
        left: 85%;
        width: 15%;
        background-color: #7f7eda;
    }

    .jp_map li:nth-child(2) label {
        position: absolute;
        top: 11%;
        left: 85%;
        width: 14%;
        height: 5.5%;
        background-color: #759ef4;

    }

    .jp_map li:nth-child(3) label {
        position: absolute;
        top: 16.5%;
        left: 92%;
        background-color: #759ef4;
    }

    .jp_map li:nth-child(4) label {
        position: absolute;
        top: 26.5%;
        left: 92%;
        background-color: #759ef4;
    }

    .jp_map li:nth-child(5) label {
        position: absolute;
        top: 16.5%;
        left: 85%;
        background-color: #759ef4;
    }

    .jp_map li:nth-child(6) label {
        position: absolute;
        top: 26.5%;
        left: 85%;
        background-color: #759ef4;
    }

    .jp_map li:nth-child(7) label {
        position: absolute;
        top: 36.5%;
        left: 92%;
        background-color: #759ef4;
    }

    .jp_map li:nth-child(8) label {
        position: absolute;
        top: 46.5%;
        left: 92%;
        background-color: #7ecfea;
    }

    .jp_map li:nth-child(9) label {
        position: absolute;
        top: 46.5%;
        left: 85%;
        background-color: #7ecfea;
    }

    .jp_map li:nth-child(10) label {
        position: absolute;
        top: 46.5%;
        left: 78%;
        background-color: #7ecfea;
    }

    .jp_map li:nth-child(11) label {
        position: absolute;
        top: 56.5%;
        left: 85%;
        background-color: #7ecfea;
    }

    .jp_map li:nth-child(12) label {
        position: absolute;
        top: 56.5%;
        left: 92%;
        background-color: #7ecfea;
    }

    .jp_map li:nth-child(13) label {
        left: 85%;
        position: absolute;
        top: 66.5%;
        background-color: #7ecfea;
    }

    .jp_map li:nth-child(14) label {
        left: 78%;
        position: absolute;
        top: 66.5%;
        background-color: #7ecfea;
    }

    .jp_map li:nth-child(15) label {
        position: absolute;
        top: 36.5%;
        left: 78%;
        width: 14%;
        background-color: #7cdc92;
    }

    .jp_map li:nth-child(16) label {
        position: absolute;
        top: 36.5%;
        left: 71%;
        background-color: #7cdc92;
    }

    .jp_map li:nth-child(17) label {
        position: absolute;
        top: 36.5%;
        left: 64%;
        background-color: #7cdc92;
    }

    .jp_map li:nth-child(18) label {
        left: 64%;
        position: absolute;
        top: 46.5%;
        background-color: #7cdc92;
    }

    .jp_map li:nth-child(19) label {
        position: absolute;
        top: 56.5%;
        left: 78%;
        background-color: #7cdc92;
    }

    .jp_map li:nth-child(20) label {
        left: 71%;
        position: absolute;
        top: 46.5%;
        height: 20%;
        background-color: #7cdc92;
    }

    .jp_map li:nth-child(21) label {
        left: 64%;
        position: absolute;
        top: 56.5%;
        background-color: #7cdc92;
    }

    .jp_map li:nth-child(22) label {
        left: 71%;
        position: absolute;
        top: 66.5%;
        background-color: #7cdc92;
    }

    .jp_map li:nth-child(23) label {
        left: 64%;
        position: absolute;
        top: 66.5%;
        background-color: #7cdc92;
    }

    .jp_map li:nth-child(24) label {
        left: 57%;
        position: absolute;
        top: 66.5%;
        background-color: #ffe966;
    }

    .jp_map li:nth-child(25) label {
        left: 57%;
        position: absolute;
        top: 46.5%;
        background-color: #ffe966;
    }

    .jp_map li:nth-child(26) label {
        left: 50%;
        position: absolute;
        top: 46.5%;
        background-color: #ffe966;
    }

    .jp_map li:nth-child(27) label {
        left: 50%;
        position: absolute;
        top: 56.5%;
        background-color: #ffe966;
    }

    .jp_map li:nth-child(28) label {
        left: 43%;
        position: absolute;
        top: 46.5%;
        height: 20%;
        background-color: #ffe966;
    }

    .jp_map li:nth-child(29) label {
        left: 57%;
        position: absolute;
        top: 56.5%;
        background-color: #ffe966;
    }

    .jp_map li:nth-child(30) label {
        left: 50%;
        position: absolute;
        top: 66.5%;
        background-color: #ffe966;
    }

    .jp_map li:nth-child(31) label {
        left: 36%;
        position: absolute;
        top: 46.5%;
        background-color: #ffcc66;
    }

    .jp_map li:nth-child(32) label {
        left: 29%;
        position: absolute;
        top: 46.5%;
        background-color: #ffcc66;
    }

    .jp_map li:nth-child(33) label {
        left: 36%;
        position: absolute;
        top: 56.5%;
        background-color: #ffcc66;
    }

    .jp_map li:nth-child(34) label {
        left: 29%;
        position: absolute;
        top: 56.5%;
        background-color: #ffcc66;
    }

    .jp_map li:nth-child(35) label {
        left: 22%;
        position: absolute;
        top: 51.5%;
        background-color: #ffcc66;
    }

    .jp_map li:nth-child(36) label {
        left: 36%;
        position: absolute;
        top: 78.5%;
        background-color: #ffbb9c;
    }

    .jp_map li:nth-child(37) label {
        left: 36%;
        position: absolute;
        top: 68.5%;
        background-color: #ffbb9c;
    }

    .jp_map li:nth-child(38) label {
        left: 29%;
        position: absolute;
        top: 68.5%;
        background-color: #ffbb9c;
    }

    .jp_map li:nth-child(39) label {
        left: 29%;
        position: absolute;
        top: 78.5%;
        background-color: #ffbb9c;
    }

    .jp_map li:nth-child(40) label {
        left: 14%;
        position: absolute;
        top: 46.5%;
        background-color: #ffbdbd;
    }

    .jp_map li:nth-child(41) label {
        left: 7%;
        position: absolute;
        top: 46.5%;
        background-color: #ffbdbd;
    }

    .jp_map li:nth-child(42) label {
        left: 0;
        position: absolute;
        top: 46.5%;
        background-color: #ffbdbd;
    }

    .jp_map li:nth-child(43) label {
        left: 7%;
        position: absolute;
        top: 56.5%;
        background-color: #ffbdbd;
    }

    .jp_map li:nth-child(44) label {
        left: 14%;
        position: absolute;
        top: 56.5%;
        background-color: #ffbdbd;
    }

    .jp_map li:nth-child(45) label {
        left: 14%;
        position: absolute;
        top: 66.5%;
        background-color: #ffbdbd;
    }

    .jp_map li:nth-child(46) label {
        left: 7%;
        position: absolute;
        top: 66.5%;
        background-color: #ffbdbd;
    }

    .jp_map li:nth-child(47) label {
        left: 0;
        position: absolute;
        top: 76.5%;
        background-color: #f5c9ff;
    }
}
</style>