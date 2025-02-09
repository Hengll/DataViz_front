<template>
  <v-progress-circular
    v-if="progress"
    class="progress-circular"
    indeterminate
  ></v-progress-circular>
  <Bar id="my-chart-id" :style="style" :options="chartOptions" :data="chartData"></Bar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { useEditorStore } from '@/stores/editor'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
})

const progress = ref(true)

const data = computed(() => {
  const Variables0 = editor.dashboard.dataSet?.data.map(
    (row) => row[editor.dashboard.charts[props.indexOfChart].useVariables[0]],
  )
  const Variables1 = editor.dashboard.dataSet?.data.map(
    (row) => row[editor.dashboard.charts[props.indexOfChart].useVariables[1]],
  )
  const data = {}

  for (let i = 0; i < Variables0.length; i++) {
    if (!data[Variables0[i]]) {
      data[Variables0[i]] = Variables1[i] * 1
    } else {
      data[Variables0[i]] += Variables1[i] * 1
    }
  }

  return data
})

const chartData = computed(() => {
  return {
    labels: Object.keys(data.value),
    datasets: [
      {
        label: editor.dashboard.charts[props.indexOfChart].useVariables[1],
        data: Object.values(data.value),
      },
    ],
  }
})

if (!editor.dashboard.charts[props.indexOfChart].chartOption) {
  const chart = editor.dashboard.charts[props.indexOfChart]
  chart.chartOption = {
    typography: {
      fontSize: 1,
      color: '#666666',
      backgroundColor: '#FFFFFF',
      borderColor: 'rgba(0,0,0,0.12)',
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    barChart: {
      indexAxis: 'x',
      barColor: ['lightblue'],
      barBorderWidth: 0,
      barBorderColor: 'rgba(0,0,0,0.12)',
      barBorderRadius: {
        topLeft: 0,
        topRight: 0,
        bottomLeft: 0,
        bottomRight: 0,
      },
      inflateAmount: 'auto',
    },
    title: {
      titleDisplay: true,
      titlePosition: 'top',
      titleAlign: 'center',
      titleColor: '#666666',
      titleFont: {
        weight: 'bold',
      },
    },
    label: {
      labelDisplay: true,
      labelPosition: 'top',
      labelAlign: 'center',
      labelMaxHeight: 0,
      labelMaxWidth: 0,
      labelColor: '#666666',
    },
  }
  editor.createChartOption(props.indexOfChart, chart)
}

const style = computed(() => {
  return {
    backgroundColor:
      editor.dashboard.charts[props.indexOfChart].chartOption.typography.backgroundColor,
    outline:
      '1px solid ' + editor.dashboard.charts[props.indexOfChart].chartOption.typography.borderColor,
  }
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      onComplete: function () {
        progress.value = false
      },
    },
    devicePixelRatio: 2,

    indexAxis: editor.dashboard.charts[props.indexOfChart].chartOption.barChart.indexAxis,

    layout: {
      padding: {
        left:
          editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.left *
          props.gridWidth,
        right:
          editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.right *
          props.gridWidth,
        top:
          editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.top *
          props.gridWidth,
        bottom:
          editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.bottom *
          props.gridWidth,
      },
    },

    elements: {
      bar: {
        backgroundColor: editor.dashboard.charts[props.indexOfChart].chartOption.barChart.barColor,
        borderWidth:
          editor.dashboard.charts[props.indexOfChart].chartOption.barChart.barBorderWidth *
          props.gridWidth,
        borderColor:
          editor.dashboard.charts[props.indexOfChart].chartOption.barChart.barBorderColor,
        borderRadius:
          editor.dashboard.charts[props.indexOfChart].chartOption.barChart.barBorderRadius,
        inflateAmount:
          editor.dashboard.charts[props.indexOfChart].chartOption.barChart.inflateAmount,
      },
    },

    scales: {
      x: {
        ticks: {
          font: {
            size:
              editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
              props.gridWidth,
          },
          color: editor.dashboard.charts[props.indexOfChart].chartOption.typography.color,
        },
      },
      y: {
        ticks: {
          font: {
            size:
              editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
              props.gridWidth,
          },
          color: editor.dashboard.charts[props.indexOfChart].chartOption.typography.color,
        },
      },
    },

    plugins: {
      legend: {
        display: editor.dashboard.charts[props.indexOfChart].chartOption.label.labelDisplay,
        position: editor.dashboard.charts[props.indexOfChart].chartOption.label.labelPosition,
        align: editor.dashboard.charts[props.indexOfChart].chartOption.label.labelAlign,
        maxHeight:
          editor.dashboard.charts[props.indexOfChart].chartOption.label.labelMaxHeight *
          props.gridWidth,
        maxWidth:
          editor.dashboard.charts[props.indexOfChart].chartOption.label.labelMaxWidth *
          props.gridWidth,
        labels: {
          font: {
            size:
              editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
              props.gridWidth,
          },
          color: editor.dashboard.charts[props.indexOfChart].chartOption.label.labelColor,
        },
      },
      title: {
        display: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleDisplay,
        align: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleAlign,
        color: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleColor,
        position: editor.dashboard.charts[props.indexOfChart].chartOption.title.titlePosition,
        font: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleFont,
        text: editor.dashboard.charts[props.indexOfChart].chartTitle,
      },
      tooltip: {
        titleFont: {
          size:
            editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
            props.gridWidth,
        },
        bodyFont: {
          size:
            editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
            props.gridWidth,
        },
      },
    },
  }
})
</script>

<style lang="scss" scoped>
.progress-circular {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
