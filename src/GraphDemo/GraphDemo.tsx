import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsAnnotations from "highcharts/modules/annotations";
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsExporting from 'highcharts/modules/exporting';

highchartsAnnotations(Highcharts);
HighchartsExporting(Highcharts);
Highcharts3D(Highcharts);

const GraphDemo: React.FC = () => {

    const getOptions = 
    (type: string): { plotOptions: { [p: string]: { depth: number } }; yAxis: { title: { text: string } }; xAxis: ({ visible: boolean } | { visible: boolean } | { visible: boolean })[]; 
    credits: { enabled: boolean }; series: ({ xAxis: number; data: number[] } | { xAxis: number; data: number[] } | { xAxis: number; data: number[] })[]; title: { text: string }; chart: 
    { options3d: { depth: number; alpha: number; enabled: boolean; beta: number }; type: string }, accessibility: {
        enabled: boolean
      } } => ({
        chart: {
            type,
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 30,
                depth: 300,
            },
        },
        title: {
            text: `${type} chart`,
        },
        yAxis: {
            title: {
                text: 'Values',
            },
        },
        xAxis: [
            {
                visible: false,
            },
            {
                visible: false,
            },
            {
                visible: false,
            },
        ],
        plotOptions: {
            [type]: {
                depth: 100,
            },
        },
        series: [
            {
                xAxis: 0,
                data: [2, 2, 1, 4, 3, 2],
            },
            {
                xAxis: 1,
                data: [4, 3, 6, 5, 4, 6],
            },
            {
                xAxis: 2,
                data: [5, 7, 7, 6, 7, 7],
            },
        ],
        credits: {
            enabled: false,
        },
        accessibility: {
            enabled: false
          }
        
    });

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={getOptions('column')} />
            <HighchartsReact highcharts={Highcharts} options={getOptions('bar')} />
        </div>
    );
};

export default GraphDemo;
