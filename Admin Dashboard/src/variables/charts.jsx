// Colors
var colors = {
  gray: {
    100: '#f6f9fc',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#8898aa',
    700: '#525f7f',
    800: '#32325d',
    900: '#212529'
  },
  theme: {
    default: '#172b4d',
    primary: '#5e72e4',
    secondary: '#f4f5f7',
    info: '#11cdef',
    success: '#2dce89',
    danger: '#f5365c',
    warning: '#fb6340'
  },
  black: '#12263F',
  white: '#FFFFFF',
  transparent: 'transparent'
}

// Example 1 of Chart inside src/views/Index.jsx (Sales value - Card)
const chartExample1 = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900]
          },
          ticks: {
            callback: function(value) {
              if (!(value % 10)) {
                return '$' + value + 'k'
              }
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function(item, data) {
          var label = data.datasets[item.datasetIndex].label || ''
          var yLabel = item.yLabel
          var content = ''

          if (data.datasets.length > 1) {
            content += label
          }

          content += '$' + yLabel + 'k'
          return content
        }
      }
    }
  },
  data1: canvas => {
    return {
      labels: [
        10,
        30,
        15,
        40,
        20,
        60,
        60,
        10,
        30,
        15,
        40,
        20,
        60,
        60,
        10,
        30,
        15,
        40,
        20,
        60,
        60,
        10,
        30,
        15,
        40,
        20,
        60,
        60,
        10,
        30,
        15,
        40,
        20,
        60,
        60,
        10,
        30,
        15,
        40,
        20,
        60
      ],
      datasets: [
        {
          label: 'Performance',
          data: [
            10,
            30,
            15,
            40,
            20,
            60,
            60,
            10,
            30,
            15,
            40,
            20,
            60,
            60,
            10,
            30,
            15,
            40,
            20,
            60,
            60,
            10,
            30,
            15,
            40,
            20,
            60,
            60,
            10,
            30,
            15,
            40,
            20,
            60
          ]
        }
      ]
    }
  },
  data2: canvas => {
    return {
      labels: [
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      datasets: [
        {
          label: 'Performance',
          data: [
            0,
            20,
            5,
            25,
            10,
            30,
            15,
            40,
            40,
            0,
            20,
            5,
            25,
            10,
            30,
            15,
            40,
            40
          ]
        }
      ]
    }
  }
}

// Example 2 of Chart inside src/views/Index.jsx (Total orders - Card)
const chartExample2 = {
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function(value) {
              if (!(value % 10)) {
                // return '$' + value + 'k'
                return value
              }
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function(item, data) {
          var label = data.datasets[item.datasetIndex].label || ''
          var yLabel = item.yLabel
          var content = ''
          if (data.datasets.length > 1) {
            content += label
          }
          content += yLabel
          return content
        }
      }
    }
  },
  data: {
    labels: [
      0,
      20,
      5,
      25,
      10,
      30,
      15,
      40,
      40,
      0,
      20,
      5,
      25,
      10,
      30,
      15,
      40,
      40
    ],
    datasets: [
      {
        label: 'Sales',
        data: [
          0,
          20,
          5,
          25,
          10,
          30,
          15,
          40,
          40,
          0,
          20,
          5,
          25,
          10,
          30,
          15,
          40,
          40
        ]
      }
    ]
  }
}

module.exports = {
  chartExample1, // used inside src/views/Index.jsx
  chartExample2 // used inside src/views/Index.jsx
}
