import pool  from "../../db"


export default async function handler(req, res) {
    let tags = ['comments','android']
    let string = '' 
    for(var i = 0 ; i < tags.length ;i++){
        let a = '<'
        let b = '>'
        string += a + tags[i] + b
    }
    let user = 423931
    let post =  1
    let a = [user,post,0,string,'CC BY-SA 4.0','What is love?']
    // console.log(:)
    let query = "insert into posts(owner_user_id,post_type_id,score,tags,content_license,body,creation_date) values ($1,$2,$3,$4,$5,$6,CURRENT_TIMESTAMP)"
    pool.query(query,a ,(error, results) => {
      if (error) {
        throw error
      }
      console.log('successfully inserted')
      res.status(200).send("inserted succesfully")
    })
  }