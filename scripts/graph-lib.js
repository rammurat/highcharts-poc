window.MFS = {};

(function (window, MFS, $, undefined) {
    "use strict";
    MFS.chart = (function () {
        function Chart() {
            this.column = function ($cnt, chartData, options) {

                Highcharts.chart($cnt, {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: chartData.title
                    },
                    xAxis: {
                        categories: chartData.data.categories
                    },
                    credits: {
                        enabled: false
                    },
                    series: chartData.data.series
                });
            };

            this.stock = function ($cnt, chartData, options) {

                // Create a timer
                var start = + new Date();

                // Create the chart
                Highcharts.stockChart($cnt, {
                    chart: {
                        events: {
                            load: function () {

                            }
                        },
                        zoomType: 'x'
                    },

                    rangeSelector: {

                        buttons: chartData.rangeSelector,
                        selected: 3
                    },

                    yAxis: {
                        title: {
                            text: chartData.data.yAxis.title
                        }
                    },

                    title: {
                        text: chartData.title
                    },

                    subtitle: {
                        text: chartData.subtitle
                    },

                    series: [{
                        name: 'Temperature',
                        data: chartData.data.series[0].data,
                        pointStart: chartData.data.options.pointStart,
                        pointInterval: chartData.data.options.pointInterval,
                        tooltip: {
                            valueDecimals: 1,
                            valueSuffix: '°C'
                        }
                    }]

                });

            };

            this.treeMap = function ($cnt, chartData, options) {

                Highcharts.chart($cnt, {
                    series: [{
                        type: "treemap",
                        layoutAlgorithm: 'stripes',
                        alternateStartingDirection: true,
                        levels: [{
                            level: 1,
                            layoutAlgorithm: 'sliceAndDice',
                            dataLabels: {
                                enabled: false,
                                align: 'left',
                                verticalAlign: 'top',
                                style: {
                                    fontSize: '15px',
                                    fontWeight: 'bold'
                                }
                            }
                        }],
                        data: [{
                            id: 'A',
                            name: 'Apples',
                            color: "#EC2500"
                        }, {
                            id: 'B',
                            name: 'Bananas',
                            color: "#ECE100"
                        }, {
                            id: 'O',
                            name: 'Oranges',
                            color: '#EC9800'
                        }, {
                            name: 'Anne',
                            parent: 'A',
                            value: 5
                        }, {
                            name: 'Rick',
                            parent: 'A',
                            value: 3
                        }, {
                            name: 'Peter',
                            parent: 'A',
                            value: 4
                        }, {
                            name: 'Anne',
                            parent: 'B',
                            value: 4
                        }, {
                            name: 'Rick',
                            parent: 'B',
                            value: 10
                        }, {
                            name: 'Peter',
                            parent: 'B',
                            value: 1
                        }, {
                            name: 'Anne',
                            parent: 'O',
                            value: 1
                        }, {
                            name: 'Rick',
                            parent: 'O',
                            value: 3
                        }, {
                            name: 'Peter',
                            parent: 'O',
                            value: 3
                        }, {
                            name: 'Susanne',
                            parent: 'Kiwi',
                            value: 2,
                            color: '#9EDE00'
                        }]
                    }],
                    title: {
                        text: chartData.title
                    }
                });
            };

            this.map = function ($cnt, chartData, options) {

                //get resources
                var mapKey = "custom/world",
                    svgPath = 'world.svg',
                    geojsonPath = 'world.geo.json',
                    mapGeoJSON = Highcharts.maps[mapKey],
                    data = [],
                    parent,
                    match;

                // Generate non-random data for the map
                $.each(mapGeoJSON.features, function (index, feature) {
                    data.push({
                        key: feature.properties['hc-key'],
                        value: index
                    });
                });

                // Instantiate chart
                $($cnt).highcharts('Map', {
                    title: {
                        text: null
                    },
                    mapNavigation: {
                        enabled: false
                    },
                    colorAxis: {
                        min: 0,
                        stops: [
                            [0, '#EFEFFF'],
                            [0.5, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
                        ]
                    },
                    legend: false,
                    series: [{
                        data: data,
                        mapData: mapGeoJSON,
                        joinBy: ['hc-key', 'key'],
                        name: 'Random data',
                        states: {
                            hover: {
                                color: Highcharts.getOptions().colors[2]
                            }
                        },
                        dataLabels: {
                            enabled: false,
                            formatter: function () {
                                return mapKey === 'custom/world' || mapKey === 'countries/us/us-all' ?
                                    (this.point.properties && this.point.properties['hc-a2']) :
                                    this.point.name;
                            }
                        },
                        point: {
                            events: {
                                // On click, look for a detailed map
                                click: function () {

                                }
                            }
                        }
                    }, {
                        type: 'mapline',
                        name: "Separators",
                        data: Highcharts.geojson(mapGeoJSON, 'mapline'),
                        nullColor: 'gray',
                        showInLegend: false,
                        enableMouseTracking: false
                    }]
                });

            };
        }

        return new Chart();
    }());
}(window, MFS, $));