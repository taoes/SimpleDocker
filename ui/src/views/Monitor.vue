<template>
  <div id="monitor">
    <a-row>
      <a-col :span="24">
        <div id="cpu" class="charSize"></div>
      </a-col>

    </a-row>


    <a-row>

      <a-col :span="16">
        <div id="memoryUsage" class="charSize"></div>
      </a-col>


      <a-col :span="8">
        <div id="memory" class="charSize"></div>
      </a-col>

    </a-row>

    <a-row>
      <a-col :span="16">
        <div id="network" class="charSize"></div>
      </a-col>


      <a-col :span="8">
        <div id="networkPackage" class="charSize"></div>
      </a-col>
    </a-row>
  </div>

</template>


<script>

import * as echarts from 'echarts';

import containerApi from '../api/ContainerApi'
import {formatUTCTime} from '../utils/index'
import _ from "lodash";

export default {
  name: 'Monitor',
  data() {
    return {
      cpuChart: null,
      preCpuChart: null,
      memoryChart: null,
      memoryUsageChart: null,
      networkChart: null,
      networkPackageChart: null,
      containerId: '',
      interval: null,
      x: [],
      cpu: {
        usageRate: []
      }, network: []
      , memory: []
      , memoryUsage: []
    }
  }, mounted() {
    this.$message.info("正在初始化数据，请稍后......")
    this.containerId = this.$route.query.containerId
    this.cpuChart = echarts.init(document.getElementById('cpu'))
    this.memoryChart = echarts.init(document.getElementById('memory'))
    this.memoryUsageChart = echarts.init(document.getElementById('memoryUsage'))

    this.networkChart = echarts.init(document.getElementById('network'))
    this.networkPackageChart = echarts.init(document.getElementById('networkPackage'))

    this.updateData()
    this.interval = setInterval(this.updateData, 2000);
  }, beforeDestroy() {
    window.clearInterval(this.interval)
  }, methods: {
    updateData() {
      containerApi.monitorContainer(this.containerId)
      .then(res => {
            let Data = res.data

            // 解析CPU数据
            let cpuTotalUsage = _.get(Data, 'cpu_stats.cpu_usage.total_usage', 10)
            let preCpuTotalUsage = _.get(Data, 'precpu_stats.cpu_usage.total_usage', 0)
            let cpuDelta = cpuTotalUsage - preCpuTotalUsage

            let systemCpuTotalUsage = _.get(Data, 'cpu_stats.system_cpu_usage', 0)
            let preSystemCpuTotalUsage = _.get(Data, 'precpu_stats.system_cpu_usage', 0)
            let preSystemCpuDelta = systemCpuTotalUsage - preSystemCpuTotalUsage

            let numberCpu = _.get(Data, "cpu_stats.online_cpus", 1)

            let usageRate = 0;
            if (preSystemCpuTotalUsage !== 0) {
              usageRate = (cpuDelta / preSystemCpuDelta) * numberCpu * 100
            }

            // 网络数据
            let networksData = _.get(Data, "networks.eth0", {})

            // 内存使用率
            let usedMemory = _.get(Data, "memory_stats.usage", 0)
            let usedMemoryOfCache = _.get(Data, "memory_stats.stats.cache", 0)
            let availableMemory = _.get(Data, "memory_stats.limit", 0)
            let usageMemoryWithoutCache = usedMemory - usedMemoryOfCache
            let memoryRate = usageMemoryWithoutCache / availableMemory * 100

            if (this.x.length > 30) {
              this.x.splice(0, 1)
              this.cpu.usageRate.splice(0, 1)
              this.network.splice(0, 1)
              this.memory.splice(0, 1)
              this.memoryUsage.splice(0, 1)
            }

            // 塞入数据
            let date = new Date()
            this.x.push(date.getMinutes() + ":" + date.getSeconds())

            this.cpu.usageRate.push(usageRate.toFixed(2))
            this.updateCpu()

            this.memory.push(memoryRate.toFixed(2))
            this.memoryUsage.push((usageMemoryWithoutCache / 1000000).toFixed(2))
            this.updateMemory()

            this.network.push(networksData)
            this.updateNetwork()

          }
      )
    },
    updateCpu() {
      let cpuOptions = {
        title: {text: 'CPU 使用率', left: 'center',},
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {data: this.x, inverse: false},
        yAxis: {
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          },
        },
        series: [{
          name: '使用率',
          type: 'line',
          smooth: true,
          data: this.cpu.usageRate
        }]
      }
      this.cpuChart.setOption(cpuOptions)
    }, updateMemory() {
      let options = {
        title: {text: '内存使用率', left: 'center',},
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {data: this.x, inverse: false},
        yAxis: {
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          },
        },
        series: [{
          name: '内存使用率',
          type: 'line',
          smooth: true,
          itemStyle: {color: '#9ADD9CFF'},
          lineStyle: {color: '#9ADD9CFF'},
          data: this.memory
        }]
      }
      this.memoryChart.setOption(options)

      let usageOptions = {
        title: {text: '内存 使用量', left: 'center',},
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {data: this.x, inverse: false},
        yAxis: {
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} M'
          },
        },
        series: [{
          name: '内存使用量',
          type: 'line',
          smooth: true,
          itemStyle: {color: '#D26566'},
          lineStyle: {color: '#D26566'},
          data: this.memoryUsage
        }]
      }
      this.memoryUsageChart.setOption(usageOptions)

    },
    updateNetwork() {
      let networkData = {
        title: {text: '容器网络流量(千字节)', left: 'center',},
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {data: this.x, inverse: false},
        yAxis: {},
        series: [
          {
            name: '接收字节数',
            type: 'line',
            data: this.network.map(n => (n.rx_bytes / 1000).toFixed(2))
          }, {
            name: '发送字节数',
            type: 'line',
            data: this.network.map(n => (n.tx_bytes / 1000).toFixed(2))
          }
        ]
      }
      this.networkChart.setOption(networkData)

      let networkPageData = {
        title: {text: '容器网络包数', left: 'center',},
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {data: this.x, inverse: false},
        yAxis: {},
        series: [
          {
            name: '接收包数',
            type: 'line',
            data: this.network.map(n => n.rx_packets)
          }, {
            name: '发送包数',
            type: 'line',
            data: this.network.map(n => n.tx_packets)
          }
        ]
      }
      this.networkPackageChart.setOption(networkPageData)
    }
  }
}
</script>

<style>

#monitor {
  padding: 50px;
  overflow-y: scroll;
  overflow-x: auto;
  height: 100%
}


.charSize {
  width: 100%;
  height: 300px;
}
</style>
