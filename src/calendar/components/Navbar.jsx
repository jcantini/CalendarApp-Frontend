import { useAuthStore } from "../../hooks"

export const Navbar = () => {

  const { user, startLogout } = useAuthStore()
  
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; {/* creo un espacio en blanco */}
        { user.name }
      </span>
 
      <button 
          className="btn btn-outline-danger"
          onClick={ startLogout }
      >
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Logout</span>
      </button>
    </div>
  )
}


// className="navbar navbar-dark bg-dark mb-4 px-4></div> clases de bootstrap 
// px padding en eje x

