'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function TradStatistika() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: { show: true },
      zoom: { enabled: true },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: { position: 'bottom', offsetX: -10, offsetY: 0 },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        dataLabels: {
          total: {
            enabled: true,
            style: { fontSize: '13px', fontWeight: 900 },
          },
        },
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '01/01/2011 GMT',
        '01/02/2011 GMT',
        '01/03/2011 GMT',
        '01/04/2011 GMT',
        '01/05/2011 GMT',
        '01/06/2011 GMT',
      ],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: { opacity: 1 },
  }

  const series = [
    { name: 'Фарш', data: [320, 299, 320, 285, 200, 301] },
    { name: 'Нежный', data: [98, 131, 70, 85, 128, 127] },
    { name: 'Кусковой', data: [21, 47, 35, 45, 0, 24] },
    { name: 'Таxтача', data: [21, 7, 15, 8, 10, 13] },
    { name: 'Mурғ', data: [21, 38, 40, 32, 22, 25] },
    { name: 'Барбекю', data: [21, 23, 25, 23, 30, 23] },
  ]

  if (!mounted) return <div>Загрузка...</div>

  return (
    <div className="flex justify-center items-center h-[50vh]">
      <Chart options={options} series={series} type="bar" height={350} className="w-[800px]" />
    </div>
  )
}
