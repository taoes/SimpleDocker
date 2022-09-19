const memoryStst = {
    title: {
        text: '内存使用率',
        textALign: 'center'
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
        {
            name: 'Pressure',
            type: 'gauge',
            max: 1,
            progress: {
                show: true,
                width: 18
            },
            detail: {
                formatter: '{value}%'
            },
            data: [
                {
                    value: 0
                }
            ]
        }

    ]
}

const cpuCoreStat =
    {
        title: {
            text: 'CPU 可用核心数',
            textALign: 'center'
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                max: 20,
                detail: {
                    formatter: '{value}'
                },
                progress: {
                    show: true,
                    width: 18
                },
                data: [
                    {
                        value: 0,
                        name: '核心数'
                    }
                ]
            }

        ]
    }

const cpuUsageLineStat = {
    title: {
        text: 'CPU使用曲线图',
        textALign: 'center'
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {

            data: [],
            type: 'line',
            smooth: true
        }
    ]
}


const memoryUsageRateStat = {

    title: {
        text: '内存使用率',
        textALign: 'center'
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {

            data: [],
            type: 'line',
            smooth: true,
            areaStyle: {}
        }
    ]
}

const memoryUsageCountStat = {

    title: {
        text: '内存使用量',
        textALign: 'center'
    },
    legend: {
        data: ['内存使用量(Kb)']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    tooltip: {
        formatter: '{a} <br/>{b} : {c}KB'
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            color: 'lightgreen',
            data: [],
            type: 'line',
            smooth: true
        }
    ]
}

const netLineStat = {
    title: {
        text: '网络使用曲线图',
        textALign: 'center'
    },
    color: ['#5470C6', '#EE6666'],
    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {},
    grid: {
        top: 70,
        bottom: 50
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#EE6666'
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params: any) {
                        return (
                            'Precipitation  ' +
                            params.value +
                            (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                        );
                    }
                }
            },
            // prettier-ignore
            data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
        },
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#5470C6'
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params: any) {
                        return (
                            'Precipitation  ' +
                            params.value +
                            (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                        );
                    }
                }
            },
            // prettier-ignore
            data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Precipitation(2015)',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            emphasis: {
                focus: 'series'
            },
            data: [
                2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
        },
        {
            name: 'Precipitation(2016)',
            type: 'line',
            smooth: true,
            emphasis: {
                focus: 'series'
            },
            data: [
                3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
            ]
        }
    ]
}

export {
    memoryStst, cpuCoreStat, cpuUsageLineStat, memoryUsageRateStat, memoryUsageCountStat, netLineStat
}