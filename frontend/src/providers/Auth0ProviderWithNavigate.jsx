/* // импортируем дефолтный провайдер
import { Auth0Provider } from '@auth0/auth0-react'
// хук для выполнения программной навигации
import  { navigate }  from 'react-router-dom'
import { children } from 'types'

const domain = process.env.REACT_APP_AUTH0_DOMAIN 
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID 
const audience = process.env.REACT_APP_AUTH0_AUDIENCE

const Auth0ProviderWithNavigate = (children) => {
 const navigate = useNavigate()

 // функция, вызываемая после авторизации
 const onRedirectCallback = (appState) => {
   // путь для перенаправления указывается в свойстве `returnTo`
   // по умолчанию пользователь возвращается на текущую страницу
   navigate(appState || window.location.pathname)
 }

 return (
   <Auth0Provider
     domain={domain}
     clientId={clientId}
     // данная настройка нужна для взаимодействия с сервером
     audience={audience}
     redirectUri={window.location.origin}
     onRedirectCallback={onRedirectCallback}
   >
     {children}
   </Auth0Provider>
 )
}

export default Auth0ProviderWithNavigate */