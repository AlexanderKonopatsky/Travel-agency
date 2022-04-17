import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import MessageBox from '../components/MessageBox';
import styled from "styled-components";
import Axios from "axios";
import Chart from 'react-google-charts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, LineElement, PointElement)

 const options = {
   indexAxis: 'y' ,
   elements: {
     bar: {
       borderWidth: 2,
     },
   },
   responsive: true,
   plugins: {
     legend: {
       position: 'right' ,
     },
     title: {
       display: true,
       text: 'Chart.js Horizontal Bar Chart',
     },
   },
 };

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
   const [x2, setX2] = useState(true);

   const [charData, setCharData] = useState({
      datasets: []
   })

   const [charData2, setCharData2] = useState({
      datasets: []
   })

   const [charData3, setCharData3] = useState({
      datasets: []
   })

   const [charData4, setCharData4] = useState({
      datasets: []
   })

   const [charData5, setCharData5] = useState({
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

   const soldCheckbox2 = ({ target: { checked } }) => {
      setX2(checked);
      if (checked) {
         updateChartOrders()
      } else {
         updateChartOrders3()
      }
   };

   const dispatch = useDispatch()
   useEffect(() => {
      updateChartOrders()
   }, [dispatch])

   const updateChartOrders = async () => {
      const response = await Axios.get('/api/dashboard/summary')
      await setData(response.data)

      let newData = { labels: [], datasets: [{ label: "jidsjodfdsofj dsfd", data: [], borderColor: "rgb(53, 162, 235)", background: "rgba(53, 162, 235, 0.4)" }] }
      response.data.dailyOrders.forEach(el => {
         newData.labels.push(el._id)
         newData.datasets[0].data.push(el.orders)
      })
      setCharData(newData)
     
      newData = { labels: [], datasets: [{ label: "jidsjodfdsofj dsfd", data: [], borderColor: "rgb(53, 162, 235)", background: "rgba(53, 162, 235, 0.4)" }] }
      response.data.dailyOrders.forEach(el => {
         newData.labels.push(el._id)
         newData.datasets[0].data.push(el.sales)
      })
      setCharData4(newData)

      newData = { labels: [], datasets: [{ label: "Количество просмотров", data: [], borderColor: "rgb(53, 162, 235)",backgroundColor: [
         'rgb(223, 199, 132)',
         'rgb(54, 122, 235)',
         'rgb(255, 205, 86)',
         'rgb(215, 109, 152)',
         'rgb(54, 132, 215)',
         'rgb(255, 129, 232)',
         'rgb(84, 122, 135)',
         'rgb(114, 132, 225)',
         'rgb(155, 109, 132)',
         'rgb(245, 152, 235)',
      ], }] }
      response.data.arrayOfToursVisits.forEach(el => {
         newData.labels.push(el._id[0].title)
         newData.datasets[0].data.push(el.count)
      })
      console.log(newData)
      setCharData5(newData)
      
      response.data.averagePriceOnTour.forEach(el => {
         data2.labels.push(el._id)
         data2.datasets[0].data.push(el.avg_price)
      })
      setCharData2(data2)

      response.data.findPopularCategory.forEach(el => {
         data3.labels.push(el.tour[0].category)
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

   const updateChartOrders3 = async () => {
      let newData = { labels: [], datasets: [{ label: "jidsjodfdsofj dsfd", data: [], borderColor: "rgb(53, 162, 235)", background: "rgba(53, 162, 235, 0.4)" }] }
      let prevData
      data.dailyOrders.forEach(el => {
         newData.labels.push(el._id)
         newData.datasets[0].data.push(el.sales)
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
      setCharData4(newData)
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
                     Средний рейтинг: {data && data.averageRatingTour}
                  </span>
                  <span className='chart-span'>
                     Средняя цена: {data && data.averagePriceTour}
                  </span>
               </div>


            </section>
            <section class="three">
               <h3 >График заказов</h3>





               <div className='item-dashboard'>
                  <div>
                     <div>
                        <input type="checkbox" checked={x} onChange={soldCheckbox} />  Показать дни только с заказами
                     </div>
                     <Bar options={chartOptions} data={charData} />
                  </div>
               </div>
            </section>


            <section class="three2">
               <h3 >График дохода</h3>





               <div className='item-dashboard'>
                  <div>
                  <div>
                        <input type="checkbox" checked={x2} onChange={soldCheckbox2} />  Показать только дни с доходом
                     </div>
                     <Line options={chartOptions} data={charData4} />

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

            <section class="six">
               <h3 >Количество просмотров туров</h3>





               <div className='item-dashboard'>
                  <div>
                     <Bar options={options} data={charData5} />
                  </div>
               </div>
            </section>

         </div>

      </>




   );
}