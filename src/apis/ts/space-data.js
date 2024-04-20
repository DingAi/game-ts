const spaceOption = {
    visualMap: {
        show: false,
        min: 2,
        max: 6,
        inRange: {
            symbolSize: [0.5, 25],
            color: [
                '#313695',
                '#4575b4',
                '#74add1',
                '#abd9e9',
                '#e0f3f8',
                '#ffffbf',
                '#fee090',
                '#fdae61',
                '#f46d43',
                '#d73027',
                '#a50026'
            ],
            colorAlpha: [0.2, 1]
        }
    },
    xAxis3D: {
        type: 'value'
    },
    yAxis3D: {
        type: 'value'
    },
    zAxis3D: {
        type: 'value'
    },
    grid3D: {
        axisLine: {
            lineStyle: {color: '#fff'}
        },
        axisPointer: {
            lineStyle: {color: '#fff'}
        },
        viewControl: {
            // autoRotate: true
        }
    },
    series: [
        {
            type: 'scatter3D',
            data: []
        }
    ]
}

export {
    spaceOption,
}