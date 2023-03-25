const chart = new Chart(document.getElementById('chart'), {
 type: 'line',
 data: {
  labels: [],
  datasets: [{
   label: 'Bitcoin Price',
   data: [],
   fill: false,
   borderColor: 'green',
   pointRadius: 5,
   pointBackgroundColor: function(context) {
     var index = context.dataIndex;
     var value = context.dataset.data[index];
     var previousValue = index > 0 ? context.dataset.data[index - 1] : value;
     return value > previousValue ? 'green' : 'red';
   },
   tension: 0.1
  }]
 },
 options: {
  scales: {
   xAxes: [{
    display: false
   }],
   yAxes: [{
    ticks: {
     beginAtZero: false,
     callback: function(value, index, values) {
       return '$' + (value / 100).toFixed(2);
     }
    },
    gridLines: {
     color: 'grey',
     borderDash: [5],
     zeroLineWidth: 1,
     zeroLineColor: 'grey'
   }
  }]
 },
 legend: {
  display: false
  },
  tooltips: {
   intersect: false,
   mode: 'index',
      callbacks: {
        label: function(tooltipItem, chart) {
          var value = tooltipItem.yLabel;
          return '$' + (value / 100).toFixed(2);
        },
        title: function(tooltipItem, chart) {
          return '';
        }
      }
    }
  }
});

const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
let count = 0;

function updateData() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const price = data.bpi.USD.rate_float;
      if (count >= 25) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
      } else {
        count++;
      }
      chart.data.labels.push('');
      chart.data.datasets[0].data.push(price);
      chart.update();
    })
    .catch(error => console.error(error));
}

setInterval(updateData, 1500);
