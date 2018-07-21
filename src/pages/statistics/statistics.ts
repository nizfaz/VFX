import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  data: Observable<any[]>;
  ref: AngularFireList<any>;
  questionsRef: AngularFireList<any>;
  questionList: Observable<any[]>;

  answers = [
    {value: 0, name: 'VG', backgroundColor: "#6ED06A", hoverBackgroundColor: "#0B9A06"},
    {value: 1, name: 'G', backgroundColor: "#79A9E8", hoverBackgroundColor: "#0B5FCB"},
    {value: 2, name: 'S', backgroundColor: "#FAF675", hoverBackgroundColor: "#E6E01C"},
    {value: 3, name: 'NS', backgroundColor: "#FA6A6A", hoverBackgroundColor: "#E91515"}
  ];

  @ViewChild('doughnutCanvas0') doughnutCanvas0;
  @ViewChild('doughnutCanvas1') doughnutCanvas1;
  @ViewChild('doughnutCanvas2') doughnutCanvas2;
  @ViewChild('doughnutCanvas3') doughnutCanvas3;
  @ViewChild('doughnutCanvas4') doughnutCanvas4;
  @ViewChild('doughnutCanvas5') doughnutCanvas5;
  @ViewChild('doughnutCanvas6') doughnutCanvas6;
  @ViewChild('doughnutCanvas7') doughnutCanvas7;
  @ViewChild('doughnutCanvas8') doughnutCanvas8;
  @ViewChild('doughnutCanvas9') doughnutCanvas9;

  doughnutChart0 : any;
  doughnutChart1 : any;
  doughnutChart2 : any;
  doughnutChart3 : any;
  doughnutChart4 : any;
  doughnutChart5 : any;
  doughnutChart6 : any;
  doughnutChart7 : any;
  doughnutChart8 : any;
  doughnutChart9 : any;

  chartData = null;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase,
    public loading: LoadingController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: '',
    });
  
    loader.present().then(() => {

    this.questionsRef = this.db.list('questions');
      this.questionList = this.questionsRef.snapshotChanges().map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        });
      
      // Reference to our Firebase List
      this.ref = this.db.list('feedback', ref => ref.orderByChild('dealerId'));
      this.displayChart();
      setTimeout(() => {
        loader.dismiss();
      }, 2000);
  });

  }

  displayChart() {
    // Catch any update to draw the Chart
    this.ref.valueChanges().subscribe(result => {      
      this.createCharts(result);
      })
  }

  createCharts(data) {
    this.chartData = data;
   
    // Calculate Values for the Chart
    let chartData = this.getReportValues();
   
    var i = 0;
    for (let response of chartData) {
      if(response[100] || response[75] || response[50] || response[25]) { 
        var nativeElement;
        if(i == 0) {
          nativeElement = this.doughnutCanvas0.nativeElement;
                  // Create the chart
        this.doughnutChart0 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        } else if(i == 1) {
          nativeElement = this.doughnutCanvas1.nativeElement;
                  // Create the chart
        this.doughnutChart1 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        } else if(i == 2) {
          nativeElement = this.doughnutCanvas2.nativeElement;
                  // Create the chart
        this.doughnutChart2 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        } else if(i == 3) {
          nativeElement = this.doughnutCanvas3.nativeElement;
                  // Create the chart
        this.doughnutChart3 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        } else if(i == 4) {
          nativeElement = this.doughnutCanvas4.nativeElement;
                  // Create the chart
        this.doughnutChart4 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        } else if(i == 5) {
          nativeElement = this.doughnutCanvas5.nativeElement;
                  // Create the chart
        this.doughnutChart5 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        } else if(i == 6) {
          nativeElement = this.doughnutCanvas6.nativeElement;
                  // Create the chart
        this.doughnutChart6 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        } else if(i == 7) {
          nativeElement = this.doughnutCanvas7.nativeElement;
        // Create the chart
        this.doughnutChart7 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        } else if(i == 8) {
          nativeElement = this.doughnutCanvas8.nativeElement;
        // Create the chart
        this.doughnutChart8 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        } else if(i == 9) {
          nativeElement = this.doughnutCanvas9.nativeElement;
        // Create the chart
        this.doughnutChart9 = new Chart(nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                  return precentage + "%";
                }
              }
            }
          }
        });
        }   
        i++;  
      }
    }
  }
  
  getReportValues() {
    let reportByAnswer = {
      0: {100: null, 75: null, 50: null, 25: null},
      1: {100: null, 75: null, 50: null, 25: null},
      2: {100: null, 75: null, 50: null, 25: null},
      3: {100: null, 75: null, 50: null, 25: null},
      4: {100: null, 75: null, 50: null, 25: null},
      5: {100: null, 75: null, 50: null, 25: null},
      6: {100: null, 75: null, 50: null, 25: null},
      7: {100: null, 75: null, 50: null, 25: null},
      8: {100: null, 75: null, 50: null, 25: null},
      9: {100: null, 75: null, 50: null, 25: null}
    };
   
    let data = this.chartData;
    for (let trans of data) {
      for (let transResponse of trans.responses) {
        let questionId = transResponse.questionId;
        if (reportByAnswer[questionId]) {
          if(reportByAnswer[questionId][transResponse.response]) {
            reportByAnswer[questionId][transResponse.response] += 1;
          } else {
            reportByAnswer[questionId][transResponse.response] = 1;
          }
        } else {          
          reportByAnswer[questionId][transResponse.response] = 1;
        }
      }
    }
    return Object.keys(reportByAnswer).map(a => reportByAnswer[a]);
  }
}
