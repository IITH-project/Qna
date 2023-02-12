import { list } from "@chakra-ui/react";
import pool  from "../../db"

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function handler(req, res) {
  // console.log(req.body.queryData)
    let a = (req.body.queryData).split('&')
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
    await sleep(10)
    for(let i = 0 ; i < b.length ; i++){
      pool.query("insert into public.mytable values ("+b[i]+")",(error, results) => {
        if (error) {
          throw error
        }
      })
    }
    await sleep(10);
    let finquery = "select id,body from posts where id in (select * from public.mytable) LIMIT 5"
    pool.query(finquery,(error, results) => {
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