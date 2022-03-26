
import { useAuth0 } from '@auth0/auth0-react'

export const LogoutButton = () => {
 // получаем метод для выхода из системы
 const { logout } = useAuth0()

 return (
   <button
     className='auth logout'
     // после выхода из системы, пользователь перенаправляется на главную страницу
     onClick={() => logout({ returnTo: window.location.origin })}
   >
     Log Out
   </button>
 )
}