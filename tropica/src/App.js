import React from "react";
import { Home } from "./components/Home";
import "./App.css";

function App() {
  return (
    <Home></Home>
    // <BrowserRouter>
    //   <Navigation></Navigation>
    //   <Routes>
    //     <Route path="/" element={<Home {...user} />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/profile" element={<Profile {...user} />} />
    //     <Route path="/logout" element={<Logout />} />
    //     {user.products.map((product, index) => (
    //       <Route
    //         key={index}
    //         path={`/product/${product.anid}`}
    //         element={<ProductPage product={product} />}
    //       />
    //     ))}
    //     <Route path="/ar" element={<AR />}></Route>
    //   </Routes>
    // </BrowserRouter>
  );
}
export default App;
