import Chart, { ChartTypeRegistry } from "chart.js/auto";
import "chartjs-plugin-datalabels";
import React, { useEffect, useRef } from "react";

interface ChartDataset {
	label: string;
	data: number[];
	backgroundColor?: string | string[];
	borderColor?: string | string[];
	borderWidth?: number;
}

export interface ChartData {
	labels: string[];
	datasets: ChartDataset[];
}

interface ChartComponentProps {
	data: ChartData;
	type?: keyof ChartTypeRegistry;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, type }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstance = useRef<Chart>();

	useEffect(() => {
		if (chartRef.current) {
			const ctx = chartRef.current.getContext("2d");
			if (ctx) {
				if (chartInstance.current) {
					chartInstance.current.destroy();
				}

				chartInstance.current = new Chart(ctx, {
					type: type ?? "bar",
					data: data,
					options: {
						plugins: {
							datalabels: {
								display: true,
								color: "black",
								font: {
									weight: "bold",
								},
							},
						},
						scales: {
							y: {
								beginAtZero: true,
							},
						},
					},
				});
			}
		}

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [data, type]);

	return <canvas ref={chartRef} />;
};

export default ChartComponent;
