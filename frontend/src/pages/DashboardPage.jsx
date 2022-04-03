import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import MessageBox from '../components/MessageBox';
import styled from "styled-components";
import Axios from "axios";
import Chart from 'react-google-charts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2'
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

const data2 = {
   labels: [],
   datasets: [{
     label: 'Средняя цена по странам',
     data: [],
     backgroundColor: [
       'rgb(255, 99, 132)',
       'rgb(54, 162, 235)',
       'rgb(54, 132, 215)',
       'rgb(255, 199, 232)',
       'rgb(84, 122, 135)',
       'rgb(114, 132, 215)',
       'rgb(255, 205, 86)'
     ],
     hoverOffset: 4
   }]
 };

 const data3 = {
   labels: [],
   datasets: [{
     label: 'Средняя цена по странам',
     data: [],
     backgroundColor: [
       'rgb(255, 99, 132)',
       'rgb(54, 162, 235)',
       'rgb(255, 205, 86)',
       'rgb(245, 109, 152)',
       'rgb(54, 132, 215)',
       'rgb(255, 199, 232)',
       'rgb(84, 122, 135)',
       'rgb(114, 132, 215)',
       'rgb(155, 109, 132)',
       'rgb(245, 152, 235)',
     ],
     hoverOffset: 4
   }]
 };


export default function DashBoardPage() {
   const [data, setData] = useState({})
   const [x, setX] = useState(true);

   const [charData, setCharData] = useState({
      datasets: []
   })

   const [charData2, setCharData2] = useState({
      datasets: []
   })

   const [charData3, setCharData3] = useState({
      datasets: []
   })

   const soldCheckbox = ({ target: { checked } }) => {
      setX(checked);
      if (checked) {
         updateChartOrders()
      } else {
         updateChartOrders2()
      }
   };

   const dispatch = useDispatch()
   useEffect(() => {
      updateChartOrders()
   }, [dispatch])

   const updateChartOrders = async () => {
      const response = await Axios.get('/api/dashboard/summary')
      await setData(response.data)
      console.log(response.data)
      let newData = { labels: [], datasets: [{ label: "jidsjodfdsofj dsfd", data: [], borderColor: "rgb(53, 162, 235)", background: "rgba(53, 162, 235, 0.4)" }] }
      response.data.dailyOrders.forEach(el => {
         newData.labels.push(el._id)
         newData.datasets[0].data.push(el.orders)
      })
      setCharData(newData)

      response.data.averagePriceOnTour.forEach(el => {
         data2.labels.push(el._id)
         data2.datasets[0].data.push(el.avg_price)
      })
      setCharData2(data2)

      response.data.findPopularCategory.forEach(el => {
         data3.labels.push(el.tour.title)
         data3.datasets[0].data.push(el.count)
      })
      setCharData3(data3)
   }

   const updateChartOrders2 = async () => {
      let newData = { labels: [], datasets: [{ label: "jidsjodfdsofj dsfd", data: [], borderColor: "rgb(53, 162, 235)", background: "rgba(53, 162, 235, 0.4)" }] }
      let prevData
      data.dailyOrders.forEach(el => {
         newData.labels.push(el._id)
         newData.datasets[0].data.push(el.orders)
         if (prevData !== undefined) {
            let date1 = Date.parse(el._id)
            let date2 = Date.parse(prevData)
            let timeDiff = (date1 - date2) / 864e5
            for (let i = 0; i < timeDiff; i++) {
               newData.labels.push('')
               newData.datasets[0].data.push(0)
            }
         }
         prevData = el._id
      })
      setCharData(newData)
   }



   const getData = async () => {

      let newData = { labels: [], datasets: [{ label: "Количество заказов", data: [], borderColor: "rgb(53, 162, 235)", background: "rgba(53, 162, 235, 0.4)" }] }
      let prevData
      data.dailyOrders.forEach(el => {
         newData.labels.push(el._id)
         newData.datasets[0].data.push(el.orders)
         if (prevData !== undefined) {
            let date1 = Date.parse(el._id)
            let date2 = Date.parse(prevData)
            let timeDiff = (date1 - date2) / 864e5
            for (let i = 0; i < timeDiff; i++) {
               newData.labels.push('')
               newData.datasets[0].data.push(0)
            }
         }
         prevData = el._id
      })
      setCharData(newData)




   }




   const [chartOptions, setChartOptions] = useState({})



   useEffect(() => {

      /*       setCharData({
               labels: ["qwe", "vcxvd", "vjoicx", "vioc", "qmibo"],
               datasets: [
                  {
                     label: "jidsjodfdsofj dsfd",
                     data: [12, 55, 34, 120, 720],
                     borderColor: "rgb(53, 162, 235)",
                     background: "rgba(53, 162, 235, 0.4)"
                  }
      
               ]
            }) */
      setChartOptions({
         responsive: true,
         plugins: {
            legend: {
               position: "top",
            },
            title: {
               display: true,
               text: "Заказы"
            }
         }
      })

   }, dispatch)
   return (
      <>
       
         <div className='title-div'>
            <h1>Панель администратора</h1>
         </div>

         <div id="container-chart">
            <section class="one">
               <h3 >Заказы</h3>
               <div className='item-dashboard'>
                  <span className='chart-span'>
                     Количество заказов: {data && data.countOrders}
                  </span>
                  <span className='chart-span'>
                     Количество туров в заказов: {data && data.countOrdersTours}
                  </span>
                  <span className='chart-span'>
                     Оплачено заказов: {data && data.paidOrders}
                  </span>
                  <span className='chart-span'>
                     Отменено заказов: {data && data.paidOrders}
                  </span>
                  <span className='chart-span'>
                     Количество заказов в день: {data && data.orderInDay}
                  </span>
               </div>

            </section>
            <section class="two">
               <h3 >Туры</h3>
               <div className='item-dashboard'>
                  <span className='chart-span'>
                     Количество туров: {data && data.tourCount}
                  </span>
                  <span className='chart-span'>
                     Количество стран: {data && data.countyCount}
                  </span>
                  <span className='chart-span'>
                     Количество город: {data && data.cityCount}
                  </span>
                  <span className='chart-span'>
                     Средний рейтинг: {data && data.tourCount}
                  </span>
                  <span className='chart-span'>
                     Средняя цена: {data && data.tourCount}
                  </span>
               </div>


            </section>
            <section class="three">
               <h3 >График заказов</h3>





               <div className='item-dashboard'>
                  <div>
                     <div>
                        <input type="checkbox" checked={x} onChange={soldCheckbox}  />  Показать дни с заказами
                     </div>
                     <Bar options={chartOptions} data={charData} />
                  </div>
               </div>
            </section>
            <section class="four">
               <h3 >Средняя стоимость туров по странам</h3>
               <div className='item-dashboard'>
               <Doughnut data={charData2} />
               </div>
            </section>

            <section class="five">
               <h3 >Самые популярные категории (кол-во заказов)</h3>
               <div className='item-dashboard'>
               <Pie data={charData3} />
               </div>
            </section>

         </div>

      </>




   );
}