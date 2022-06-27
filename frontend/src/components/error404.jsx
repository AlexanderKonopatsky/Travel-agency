import React, { useEffect, useState } from "react";
import MessageBox from "../components/MessageBox";
import env from "dotenv"
env.config()

function error404(props) {

   return (
      <>
        <div className='error403'><MessageBox variant="danger">Ошибка 404. Такой страницы нет.</MessageBox></div>
      </>
   )
}

export default error404