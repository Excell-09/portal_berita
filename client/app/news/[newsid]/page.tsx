import React from 'react'

type NewsIdProps ={
  params:{
    newsid:string
  }
}
export default function page({params}:NewsIdProps) {
  return (
    <div>post : {params.newsid}</div>
  )
}
