"use client";

import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function CircleStatistik() {
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    colors: ["#800020", "#A0522D", "#C71585", "#CD5C5C"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        dataLabels: {
          name: {
            fontSize: "18px",
          },
          value: {
            fontSize: "14px",
            color: "#800020",
          },
          total: {
            show: true,
            label: "Всего",
            color: "#800020",
            formatter: () => 249,
          },
        },
      },
    },
    labels: ["Яблоки", "Апельсины", "Бананы", "Ягоды"],
  };

  const series = [44, 55, 67, 83];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <h2 className="text-lg font-bold mb-3 text-[#800020]">Статистика официанток</h2>
      <Chart options={options} series={series} type="radialBar" width="100%" height={290} />
    </div>
  );
}
