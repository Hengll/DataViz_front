<template>
  <v-list>
    <v-list-item class="d-flex justify-end">
      <v-btn
        variant="text"
        icon="mdi-close"
        class="close-btn border"
        @click="$emit('close')"
      ></v-btn>
    </v-list-item>
    <v-list-item>
      <h3 class="mb-6">{{ $t('editDrawer.customOptions') }}</h3>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartTitle')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            density="compact"
            variant="outlined"
            :model-value="editor.dashboard.charts[indexOfChart].chartTitle"
            @change="editor.editChartTitle(indexOfChart, $event.target.value)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartPosX')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            v-maska="customOptionsPosXMask"
            suffix="grid"
            density="compact"
            variant="outlined"
            placeholder="grid"
            :model-value="editor.dashboard.charts[indexOfChart].chartPosX"
            @change="
              editor.moveChart(
                indexOfChart,
                $event.target.value * 1,
                editor.dashboard.charts[indexOfChart].chartPosY,
              )
            "
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartPosY')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            v-maska="customOptionsPosYMask"
            density="compact"
            variant="outlined"
            placeholder="grid"
            suffix="grid"
            :model-value="editor.dashboard.charts[indexOfChart].chartPosY"
            @change="
              editor.moveChart(
                indexOfChart,
                editor.dashboard.charts[indexOfChart].chartPosX,
                $event.target.value * 1,
              )
            "
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartWidth')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            :key="editKey"
            v-maska="customOptionsWidthMask"
            density="compact"
            variant="outlined"
            placeholder="grid"
            suffix="grid"
            :model-value="editor.dashboard.charts[indexOfChart].chartWidth"
            @change="
              changeSize(
                indexOfChart,
                $event.target.value * 1,
                editor.dashboard.charts[indexOfChart].chartHeight,
              )
            "
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartHeight')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            :key="editKey"
            v-maska="customOptionsHeightMask"
            density="compact"
            variant="outlined"
            placeholder="grid"
            suffix="grid"
            :model-value="editor.dashboard.charts[indexOfChart].chartHeight"
            @change="
              changeSize(
                indexOfChart,
                editor.dashboard.charts[indexOfChart].chartWidth,
                $event.target.value * 1,
              )
            "
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item
      v-for="(options, type) in editor.dashboard.charts[indexOfChart].chartOption"
      :key="type"
      class="border"
    >
      <h3 class="mb-6 mt-3">{{ $t(`editDrawer.${type}`) }}</h3>
      <v-row v-for="(optionValue, optionKey) in options" :key="optionKey">
        <!-- 不是物件或陣列 -->
        <template v-if="!(typeof optionValue === 'object')">
          <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
            $t(`editDrawer.${optionKey}`)
          }}</v-col>
          <v-col cols="7" class="py-0">
            <!-- 如果是布林值 -->
            <v-switch
              v-if="typeof optionValue === 'boolean'"
              v-model="options[optionKey]"
              color="primary"
              :label="`${options[optionKey]}`"
              hide-details
            ></v-switch>
            <!-- 如果是數字 -->
            <v-text-field
              v-else-if="typeof optionValue === 'number'"
              v-maska="numberMask"
              :model-value="options[optionKey]"
              density="compact"
              variant="outlined"
              placeholder="grid"
              suffix="grid"
              @change="changeNumber(indexOfChart, type, optionKey, $event.target.value * 1)"
              @wheel.prevent="wheelNumber(indexOfChart, type, optionKey, $event)"
            ></v-text-field>
            <!-- 如果是顏色 -->
            <v-text-field
              v-else-if="optionValue[0] === '#'"
              :key="editKey"
              v-maska="colorMask"
              :model-value="options[optionKey]"
              class="pa-0 ma-0"
              variant="outlined"
              density="compact"
              placeholder="#00000000"
              @change="changeColor(indexOfChart, type, optionKey, $event.target.value)"
            >
              <template #append-inner>
                <v-menu :close-on-content-click="false">
                  <template #activator="{ props: prop }">
                    <div
                      :style="{
                        backgroundColor: options[optionKey],
                        cursor: 'pointer',
                        height: '1.5rem',
                        width: '1.5rem',
                      }"
                      v-bind="prop"
                    ></div>
                  </template>
                  <v-color-picker
                    v-model="options[optionKey]"
                    flat
                    :modes="['rgba', 'hsla', 'hexa']"
                  ></v-color-picker>
                </v-menu>
              </template>
            </v-text-field>
            <!-- 如果是文字不是顏色 -->
            <v-switch
              v-else-if="optionKey === 'indexAxis'"
              v-model="options[optionKey]"
              color="primary"
              :label="`${options[optionKey]}-axis`"
              true-value="x"
              false-value="y"
              hide-details
            ></v-switch>
            <v-select
              v-else-if="positionItems.includes(optionValue)"
              v-model="options[optionKey]"
              variant="outlined"
              density="compact"
              :items="positionItems"
            >
            </v-select>
            <v-select
              v-else-if="alignItems.includes(optionValue)"
              v-model="options[optionKey]"
              variant="outlined"
              density="compact"
              :items="alignItems"
            >
            </v-select>
          </v-col>
        </template>
        <!-- 是物件或陣列 -->
        <template v-else>
          <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
            $t(`editDrawer.${optionKey}`)
          }}</v-col>
          <v-col cols="7" class="py-0 d-flex">
            <!-- 如果是陣列(顏色) -->
            <v-text-field
              v-if="Array.isArray(optionValue)"
              class="pa-0 ma-0"
              variant="outlined"
              density="compact"
              placeholder="#000000"
            >
              <template #append-inner>
                <v-menu :close-on-content-click="false">
                  <template #activator="{ props: prop }">
                    <div v-bind="prop"></div>
                  </template>
                  <v-card>
                    <v-color-picker flat :modes="['rgba', 'hsla', 'hexa']"></v-color-picker>
                    <v-card-actions>
                      <div class="d-flex ms-auto">
                        <v-btn class="border" variant="text" @click="console.log('新增顏色')"
                          >append color</v-btn
                        >
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
            <!-- 如果是物件 -->
            <v-text-field v-else density="compact" variant="outlined">
              <template #append-inner>
                <v-menu :close-on-content-click="false">
                  <template #activator="{ props: prop }">
                    <v-btn
                      icon="mdi-arrow-expand-all"
                      variant="text"
                      v-bind="prop"
                      class="expend-btn border"
                    >
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>{{ $t(`editDrawer.${optionKey}`) }}</v-card-title>
                    <v-card-text class="d-flex">
                      <v-text-field
                        v-for="(subValue, subOptionKey) in optionValue"
                        :key="subOptionKey"
                        variant="outlined"
                        class="mx-1"
                        :label="$t(`editDrawer.${subOptionKey}`)"
                        density="compact"
                      ></v-text-field>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
          </v-col>
        </template>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { vMaska } from 'maska/vue'

const editor = useEditorStore()

const props = defineProps({
  indexOfChart: {
    type: Number,
    default: 0,
  },
  gridWidth: {
    type: Number,
    default: 0,
  },
  gridHight: {
    type: Number,
    default: 0,
  },
  gridSizeDivisorX: {
    type: Number,
    default: 0,
  },
  gridSizeDivisorY: {
    type: Number,
    default: 0,
  },
})
defineEmits(['close'])

const customOptionsPosXMask = computed(() => {
  return {
    mask: '##',
    eager: true,
    preProcess: (val) => {
      const num = parseInt(val, 10)

      if (isNaN(num)) return 0
      if (num > props.gridSizeDivisorX - editor.dashboard.charts[props.indexOfChart].chartWidth)
        return props.gridSizeDivisorX - editor.dashboard.charts[props.indexOfChart].chartWidth
      if (num < 0) return 0

      return num
    },
  }
})

const customOptionsPosYMask = computed(() => {
  return {
    mask: '##',
    eager: true,
    preProcess: (val) => {
      const num = parseInt(val, 10)

      if (isNaN(num)) return 0
      if (num > props.gridSizeDivisorY - editor.dashboard.charts[props.indexOfChart].chartHeight)
        return props.gridSizeDivisorY - editor.dashboard.charts[props.indexOfChart].chartHeight
      if (num < 0) return 0

      return num
    },
  }
})

const customOptionsWidthMask = computed(() => {
  return {
    mask: '##',
    eager: true,
    preProcess: (val) => {
      const num = parseInt(val, 10)

      if (isNaN(num)) return 0
      if (num > props.gridSizeDivisorX - editor.dashboard.charts[props.indexOfChart].chartPosX)
        return props.gridSizeDivisorX - editor.dashboard.charts[props.indexOfChart].chartPosX
      if (num < 0) return 0

      return num
    },
  }
})

const customOptionsHeightMask = computed(() => {
  return {
    mask: '##',
    eager: true,
    preProcess: (val) => {
      const num = parseInt(val, 10)

      if (isNaN(num)) return 0
      if (num > props.gridSizeDivisorY - editor.dashboard.charts[props.indexOfChart].chartPosY)
        return props.gridSizeDivisorY - editor.dashboard.charts[props.indexOfChart].chartPosY
      if (num < 0) return 0

      return num
    },
  }
})

const numberMask = computed(() => {
  return {
    mask: 'XDX',
    eager: true,
    tokens: {
      X: {
        pattern: /[0-9]/,
        multiple: true,
      },
      D: {
        pattern: /[.]/,
      },
    },
  }
})

const colorMask = computed(() => {
  return {
    mask: '!#HHHHHHHH',
    eager: true,
    tokens: {
      H: {
        pattern: /[0-9a-fA-F]/,
      },
    },
    preProcess: (val) => {
      if (val === '') return '#'

      return val
    },
  }
})

// 渲染參數
const editKey = ref(0)

const changeSize = (index, chartWidth, chartHeight) => {
  editor.resizeChart(index, chartWidth > 10 ? chartWidth : 10, chartHeight > 10 ? chartHeight : 10)
  editKey.value++
}

const changeNumber = (index, type, key, value) => {
  if (value < 0) editor.editChartOption(index, type, key, 0)
  else if (value > 1000) editor.editChartOption(index, type, key, 1000)
  else editor.editChartOption(index, type, key, value)
  editKey.value++
}

const changeColor = (index, type, key, value) => {
  if (value.length === 7 || value.length === 9) {
    editor.editChartOption(index, type, key, value)
  }
  editKey.value++
}

const positionItems = ['top', 'left', 'bottom', 'right']
const alignItems = ['start', 'center', 'end']

// 滾輪條數值
const wheelNumber = (index, type, key, event) => {
  if (event.target.__vueParentComponent.props.focused) {
    if (event.deltaY < 0) {
      editor.dashboard.charts[index].chartOption[type][key]++
    } else if (event.deltaY > 0 && editor.dashboard.charts[index].chartOption[type][key] !== 0) {
      editor.dashboard.charts[index].chartOption[type][key]--
    }
  }
}
</script>

<style lang="scss" scoped>
.close-btn {
  border-radius: 5px;
  width: 30px;
  height: 30px;
}

.expend-btn {
  border-radius: 5px;
  width: 25px;
  height: 25px;
}
</style>
