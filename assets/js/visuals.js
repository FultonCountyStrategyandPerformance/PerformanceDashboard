type = ['','info','success','warning','danger'];

/**
* Visual charts object of functions related to rendering the charts
*/
visuals = {
  /**
  * Color for the bar and line charts
  */
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },
    /**
    * Initializes all the charts on the page
    * @param {array} d - the line chart data (observed)
    * @param {array} t - the line chart target data
    * @param {string} goalId - The goal id used to identify the goal chart div
    * @param {array} budget - budget data
    */
    initChartist: function(d, t, goalId, budget){
      /**
      * Add the labels to points along the bar graphs
      * @param {object} options
      * @return {function}
      */
      function ctPointLabels(options) {
        return function ctPointLabels(chart) {
          var defaultOptions = {
            labelClass: 'ct-label',
            labelOffset: {
              x: 0,
              y: -15
            },
            textAnchor: 'middle'
          };
          // Get Chartist Options
          options = Chartist.extend({}, defaultOptions, options);

          if(chart instanceof Chartist.Bar) {
            chart.on('draw', function(data) {
              if(data.type === 'bar') {
                data.group.elem('text', {
                  x: data.x2 + options.labelOffset.x,
                  y: data.y1 + options.labelOffset.y,
                  style: 'text-anchor: ' + options.textAnchor
                }, options.labelClass).text("$"+addCommas(data.value.x.toFixed(2)));
              }
            });
          }
        }
      }
      /** Add commas to large goal values
      * @param {string} nStr - Value to add commas to
      * @return {string}
      */
      function addCommas(nStr) {
          nStr += '';
          if(nStr == 'NaN') {
            return 'N/A';
          }
          var x = nStr.split('.');
          var x1 = x[0];
          var x2 = x.length > 1 ? '.' + x[1] : '';
          var rgx = /(\d+)(\d{3})/;
          while (rgx.test(x1)) {
              x1 = x1.replace(rgx, '$1' + ',' + '$2');
          }
          return x1 + x2;
      }

      // Set up the variables to go into the chart
      expenses = [];
      budgets = [];
      total_b = 0;
      total_e = 0;
      for(i in budget) {
        total_b += +budget[i]["expenses"];
        total_e += +budget[i]["budget"];

        expenses.push(+budget[i]["expenses"])
        budgets.push(+budget[i]["budget"])
      }
      var total =  new Chartist.Bar('#total-chart', {
          labels: ["Total"],
          series: [
            [total_b],
            [total_e]
          ]
          }, {
          seriesBarDistance: 0,
          reverseData: true,
          horizontalBars: true,
          axisX: {
            labelInterpolationFnc: function(value) {
              return "$"+addCommas(value);
            },
            type: Chartist.FixedScaleAxis,
            low:0,
            ticks:[0]
          },
          height:75,
          axisY: {
            offset: 70
          },
          plugins: [
            ctPointLabels({
              textAnchor: 'end'
            })
          ]
      });

      total.on('draw', function(data) {
        if(data.type === 'bar') {
          // Get the total path length in order to use for dash array animation
          var pathLength = data.x2;//data.element._node.getTotalLength();

          // Set a dasharray that matches the path length as prerequisite to animate dashoffset
          data.element.attr({
            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
          });

          // Create animation definition while also assigning an ID to the animation for later sync usage
          var animationDefinition = {
            'stroke-dashoffset': {
              id: 'anim' + data.index,
              dur: 2000,
              from: pathLength + 'px',
              to:  '0px',
              easing: Chartist.Svg.Easing.easeOutQuint,
              // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
              fill: 'freeze'
            }
          };

          // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
          if(data.index !== 0) {
            animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
          }

          // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
          data.element.attr({
            'stroke-dashoffset': "0px"//-pathLength + 'px'
          });

          // We can't use guided mode as the animations need to rely on setting begin manually
          // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
          data.element.animate(animationDefinition, false);
        }
      });
      var chart =  new Chartist.Bar('#budget-chart', {
          labels: ['Operating',"Personnel"],
          series: [
            expenses,
            budgets
          ]
        }, {
          seriesBarDistance: 0,
          reverseData: true,
          horizontalBars: true,
          axisX: {
            labelInterpolationFnc: function(value) {
              return "$"+addCommas(value);
            },
            type: Chartist.FixedScaleAxis,
            low:0,
            ticks:[0]
          },
          axisY: {
            showGrid: false,
            offset: 70
          },
          plugins: [
            ctPointLabels({
              textAnchor: 'end',
              textColor: 'black'
            })
          ]
      });

      chart.on('draw', function(data) {
        if(data.type === 'bar') {
          // Get the total path length in order to use for dash array animation
          var pathLength = data.x2; //data.element._node.getTotalLength();

          // Set a dasharray that matches the path length as prerequisite to animate dashoffset
          data.element.attr({
            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
          });

          // Create animation definition while also assigning an ID to the animation for later sync usage
          var animationDefinition = {
            'stroke-dashoffset': {
              id: 'anim' + data.index,
              dur: 2000,
              from: pathLength + 'px',
              to:  '0px',
              easing: Chartist.Svg.Easing.easeOutQuint,
              // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
              fill: 'freeze'
            }
          };

          // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
          data.element.attr({
            'stroke-dashoffset': "0px"//-pathLength + 'px'
          });

          // We can't use guided mode as the animations need to rely on setting begin manually
          // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
          data.element.animate(animationDefinition, false);
        }
      });
      // Line Chart
      var data = {
            series: [
              {
                name: 'series-1',
                data: d
              },
              {
                name: 'target',
                data: t
              }
            ]
          };
        var byDate = d.slice(0);
        byDate.sort(function(a,b) {
            return a.x - b.x;
        });
        var ticks = []
        for(d in byDate) {
          ticks.push(new Date(byDate[d].x))
        }
        var options = {
            axisX: {
              type: Chartist.FixedScaleAxis,
              labelInterpolationFnc: function(value) {
                return moment(value).format('MMM YYYY');
              },
              ticks:ticks
            },
            low:0
          };

        var goal = '#goal-'+goalId;
        var linechart = Chartist.Line(goal, data, options);
        // Let's put a sequence number aside so we can use it in the event callbacks
        var seq = 0, // TODO: SLOW THESE DOWN
          delays = 40,
          durations = 200;

        // Once the chart is fully created we reset the sequence
        linechart.on('created', function() {
          seq = 0;
        });
        // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
        linechart.on('draw', function(data) {
          seq++;

          if(data.type === 'line') {
            // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
            data.element.animate({
              opacity: {
                // The delay when we like to start the animation
                begin: seq * delays + 1000,
                // Duration of the animation
                dur: durations,
                // The value where the animation should start
                from: 0,
                // The value where it should end
                to: 1
              }
            });
          } else if(data.type === 'label' && data.axis === 'x') {
            data.element.animate({
              y: {
                begin: seq * delays,
                dur: durations,
                from: data.y + 100,
                to: data.y,
                // We can specify an easing function from Chartist.Svg.Easing
                easing: 'easeOutQuart'
              }
            });
          } else if(data.type === 'label' && data.axis === 'y') {
            data.element.animate({
              x: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 100,
                to: data.x,
                easing: 'easeOutQuart'
              }
            });
          } else if(data.type === 'point') {
            data.element.animate({
              x1: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
              },
              x2: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
              },
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
              }
            });
          }
        });

    },
    /**
    * Redraw each chart after the carousel slider moves
    * @param {object} d - Goal data
    * @param {object} t - Target data
    * @param {string} goalId - the ID of the goal to select the right div
    */
    newChart: function(d, t, goalId) {
      var data = {
            series: [
              {
                name: 'series-1',
                data: d
              },
              {
                name: 'target',
                data: t
              }
            ]
          };
          var byDate = d.slice(0);
          byDate.sort(function(a,b) {
              return a.x - b.x;
          });
          var ticks = []
          for(d in byDate) {
            ticks.push(new Date(byDate[d].x))
          }
        var options = {
            axisX: {
              type: Chartist.FixedScaleAxis,
              divisor: byDate.length + 2,
              labelInterpolationFnc: function(value) {
                return moment(value).format('MMM YYYY');
              },
              ticks:ticks
            },
            low:0
          };

      var linechart = Chartist.Line("#goal-"+goalId, data, options);
      d = d.slice(-2,1);
      var seq = 0,
        delays = 40,
        durations = 800;

      // Once the chart is fully created we reset the sequence
      linechart.on('created', function() {
        seq = 0;
      });
      // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
      linechart.on('draw', function(data) {
        seq++;

        if(data.type === 'line') {
          // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
          data.element.animate({
            opacity: {
              // The delay when we like to start the animation
              begin: seq * delays + 1000,
              // Duration of the animation
              dur: durations,
              // The value where the animation should start
              from: 0,
              // The value where it should end
              to: 1
            }
          });
        } else if(data.type === 'label' && data.axis === 'x') {
          data.element.animate({
            y: {
              begin: seq * delays,
              dur: durations,
              from: data.y + 100,
              to: data.y,
              // We can specify an easing function from Chartist.Svg.Easing
              easing: 'easeOutQuart'
            }
          });
        } else if(data.type === 'label' && data.axis === 'y') {
          data.element.animate({
            x: {
              begin: seq * delays,
              dur: durations,
              from: data.x - 100,
              to: data.x,
              easing: 'easeOutQuart'
            }
          });
        } else if(data.type === 'point') {
          data.element.animate({
            x1: {
              begin: seq * delays,
              dur: durations,
              from: data.x - 10,
              to: data.x,
              easing: 'easeOutQuart'
            },
            x2: {
              begin: seq * delays,
              dur: durations,
              from: data.x - 10,
              to: data.x,
              easing: 'easeOutQuart'
            },
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'easeOutQuart'
            }
          });
        }
      });
    }
}
