import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data'
import { Product } from './Product'
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
export const Products = ({ cat, filters, sort }) => {   //takes the props from ProductList page
  console.log(cat,filters,sort);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat 
        ? `http://localhost:5000/api/products?category=${cat}`  //condition added if theres a "cat ? use this url"
        : "http://localhost:5000/api/products");   //if theres none just fetch data from this url; all products
        setProducts(res.data)  //update products
      } catch (err) {}
      
    };
    getProducts()
  }, [cat])

  //everytime we change filters its gonna set products

  useEffect(()=>{
    cat && setFilteredProducts(
      products.filter(item=> Object.entries(filters).every(([key,value])=>  //if any itmes includes those filters , the keys and values we are going to display them
        item[key].includes(value)         
      ))    
    )
  },[cat,filters,products])

  useEffect(()=>{
    if(sort === "newest"){
      setFilteredProducts((prev)=>   //
        [...prev].sort((a,b)=>a.createdAt - b.createdAt)   //compare two items in the array, if first one is greater it's gonna display the newest item
        )
      } else if(sort === "asc"){   
        setFilteredProducts((prev)=>  
          [...prev].sort((a,b)=>a.price - b.price)   
          )
        } else {
          setFilteredProducts((prev)=>   //lowest price
            [...prev].sort((a,b)=>b.price - a.price)   //compare two items in the array, if first one is greater it's gonna display the newest item
            )
          } 
  },[sort])
  return (
    <Container>
      {filteredProducts.map(item => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  )
}
