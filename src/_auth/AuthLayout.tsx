import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {
  const isAuthenticated = false

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              paddingTop: "10rem",
              paddingBottom: "10rem",
            }}
          >
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout