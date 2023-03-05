import { list } from "@chakra-ui/react";
import pool  from "../../db"

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async function handler(req, res) {
  if(req.method=='POST'){
  // console.log(req.body.queryData)
  let page=1
  if(req.body.queryData.p){
    page=req.body.queryData.p
  }
    let a = (req.body.queryData.frontpage).split('&')
    // let a=['code-smell']
    // console.table(a)
    let b = []
    for(let i = 0 ; i < a.length ;i++){
      let mystring = "%"+a[i] + "%" ;
      const list = await new Promise(function(resolve,reject){
      pool.query(`select id from posts where tags like '${mystring}'`,(error, results) => {
        if (error) {
          throw error
        }
        let list_temp = []
        for(let j = 0 ; j < results.rows.length ; j++){
          list_temp.push(results.rows[j]["id"])
        }
        resolve(list_temp)
      })
    })
      // console.log(list)
      if(i == 0){
        b =  list
      }
      else {
        b = b.filter(x => list.indexOf(x) !== -1);
      }
    }
    // console.log(b)
    let newquery = "CREATE TABLE IF NOT EXISTS mytable ("
				+ "id numeric(25))"
    pool.query(newquery,(error, results) => {
      if (error) {
        throw error
      }
    })
    // await pool
    await sleep(20)
    for(let i = 0 ; i < b.length ; i++){
      pool.query("insert into public.mytable values ("+b[i]+")",(error, results) => {
        if (error) {
          throw error
        }
      })
    }
    await sleep(20);
    var finquery
    if(req.body.queryData.sortby==='time'){
     finquery = `select id,title,body,score,view_count,answer_count from posts where id in (select * from public.mytable)   order by creation_date desc LIMIT 10 offset $1`
    }
    else{
      finquery=`select id,title,body,score,view_count,answer_count from posts where id in (select * from public.mytable)   order by score desc LIMIT 10 offset $1`
    }

    pool.query(finquery,[10*(page-1)],(error, results) => {
      if (error) {
        throw error
      }
      pool.query("drop table public.mytable",(error, results) => {
        if (error) {
          throw error
        }
        
      })
      res.status(200).send(results.rows)
    })
    
  }
  else{
    res.send({error:true,message:"this method is not allow"})
  }
}