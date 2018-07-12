import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    {value: 0, name: 'VG', backgroundColor: 'rgba(255, 99, 132, 0.2)', hoverBackgroundColor: "#FF6384"},
    {value: 1, name: 'G', backgroundColor: 'rgba(54, 162, 235, 0.2)', hoverBackgroundColor: "#36A2EB"},
    {value: 2, name: 'S', backgroundColor: 'rgba(255, 206, 86, 0.2)', hoverBackgroundColor: "#FFCE56"},
    {value: 3, name: 'NS', backgroundColor: 'rgba(75, 192, 192, 0.2)', hoverBackgroundColor: "#FF6384"}
  ];

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart : any;

  chartData = null;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.questionsRef = this.db.list('questions');
    this.questionList = this.questionsRef.snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
    
    // Reference to our Firebase List
    this.ref = this.db.list('feedback', ref => ref.orderByChild('dealerName'));
//    this.displayChart(0);

  }

  displayChart(qnId) {
    // Catch any update to draw the Chart
    this.ref.valueChanges().subscribe(result => {      
      this.createCharts(result, qnId);
      })
  }

  createCharts(data, qnId) {
    this.clearCanvas(); // not happening
    this.chartData = data;
   
    // Calculate Values for the Chart
    let chartData = this.getReportValues();
   
    let i = 0;
    for (let response of chartData) {
      if(i == qnId) {
        // Create the chart
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.answers).map(a => this.answers[a].name),
            datasets: [{
              label: '# of Votes',
              data: [response[100], response[75], response[50], response[25]],
              backgroundColor: Object.keys(this.answers).map(a => this.answers[a].backgroundColor),
              hoverBackgroundColor: Object.keys(this.answers).map(a => this.answers[a].hoverBackgroundColor)
            }]
          }
        });
        break;
      }
      i++;
    }
  }
  
  clearCanvas() {
    let context = this.doughnutCanvas.nativeElement.getContext('2d');
          // Store the current transformation matrix
      context.save();

      // Use the identity matrix while clearing the canvas
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, this.doughnutCanvas.width, this.doughnutCanvas.height);

      // Restore the transform
      context.restore();
  }

  updateCharts(data, qnId) {
    this.chartData = data;
    let chartData = this.getReportValues();
   
    let i = 0;
    for (let response of chartData) {
      if(i == qnId) {
        // Update our dataset
        this.doughnutChart.data.datasets.forEach((dataset) => {
          dataset.data = response
        });
      }
      this.doughnutChart.update();
      break;
    }
    i++;
  }
  
  getReportValues() {
    let reportByAnswer = {
      0: {100: null, 75: null, 50: null, 25: null},
      1: {100: null, 75: null, 50: null, 25: null},
      2: {100: null, 75: null, 50: null, 25: null},
      3: {100: null, 75: null, 50: null, 25: null},
      4: {100: null, 75: null, 50: null, 25: null}
    };
   
    let data = this.chartData;
    for (let trans of data) {
      for (let transResponse of trans.responses) {
        let questionId = transResponse.questionId;
        //let response = transResponse.response;
        //let question = reportByAnswer[questionId];
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
