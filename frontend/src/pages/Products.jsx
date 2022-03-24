import React, { useEffect, useState } from "react";
import Axios from "axios"
import { YMaps, Map, Clusterer, Placemark, FullscreenControl, GeolocationControl, TypeSelector, ZoomControl } from 'react-yandex-maps';

const coordinates = [
   [55.851574, 37.873856],
   [55.651574, 37.773856],
   [55.551574, 37.673856],
   [55.451574, 37.273856],
   [55.351574, 37.373856],
   [55.2751574, 37.473856],
]

const mapState = {
   center: [55.751574, 37.573856],
   zoom: 9,
   behaviors: ['default', 'scrollZoom'],
};

const getPointData = index => {
   return {
      balloonContentBody: 'placemark <strong>balloon ' + index + '</strong>',
      clusterCaption: 'placemark <strong>' + index + '</strong>',
   };
};

const getPointOptions = () => {
   return {
      preset: 'islands#violetIcon',
   };
};

const getCoordinate = async () => {
   let getCoordinate = await Axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_API_KEY_YANDEX_MAPS}&format=json&geocode=Минск&results=1`)
   getCoordinate = getCoordinate.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
   let splits = getCoordinate.split(' ')

}

function ClustererCreate (props) {
   const [city, setCity] = useState('')
   return (

   <>
      <button  className='btn_auth' onClick={getCoordinate}>Get coordinate</button>
      <div className='form-box'>
         <label className="form-box__field" >
            <span className='form-label'>
               setCity
            </span>
            <input className="form-input"  onChange={e => setCity(e.target.value)} type="text" />
         </label>
      </div>


      <YMaps query={{ apikey: '999cd2b1-77d8-49dd-8b58-81ee0c6d3506' }}>
         <Map width='100%'
            height='500px' state={mapState}>
            <Clusterer
               options={{
                  preset: 'islands#invertedVioletClusterIcons',
                  groupByCoordinates: false,
                  clusterDisableClickZoom: true,
                  clusterHideIconOnBalloonOpen: false,
                  geoObjectHideIconOnBalloonOpen: false,
               }}
            >
               {coordinates.map((coordinate, idx) =>
                  <Placemark
                     geometry={coordinate}
                     key={idx}
                     options={getPointOptions()}
                     properties={getPointData(idx)}
                     modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                  />)

               }
            </Clusterer>
            <FullscreenControl />
            <GeolocationControl options={{ float: 'left' }} />
            <TypeSelector options={{ float: 'right' }} />
            <ZoomControl options={{ float: 'right' }} />
         </Map>
      </YMaps>;
   </>
)}

export default ClustererCreate;
