import React, {useState, useEffect} from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Products() {

   const [charData, setCharData] = useState({
      datasets: []
   })
   const [chartOptions, setChartOptions] = useState({})

   useEffect(() => {
      setCharData({
         labels: ["qwe", "vcxvd", "vjoicx", "vioc", "qmibo"],
         datasets: [
            {
               label: "jidsjodfdsofj dsfd", 
               data: [12, 55, 34, 120, 720], 
               borderColor: "rgb(53, 162, 235)",
               background: "rgba(53, 162, 235, 0.4)"
            }

         ]
      })
      setChartOptions({
         responsive: true, 
         plugins: {
            legend: {
               position: "top", 
            },
            title: {
               display: true, 
               text: " fsdofopsdfsopdfk "
            }
         }
      })
   },)

    return (
        <div>
           <Bar options={chartOptions} data={charData}/>
        </div>
    )
}

export default Products;